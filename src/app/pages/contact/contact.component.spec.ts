import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';

import { ContactPayload, ContactService, ContactSubmitError } from '../../core/contact.service';
import { ContactComponent } from './contact.component';

class ContactServiceStub {
  configured = true;
  calls: ContactPayload[] = [];
  response: () => Promise<void> = () => Promise.resolve();

  isConfigured(): boolean {
    return this.configured;
  }

  send(payload: ContactPayload): Promise<void> {
    this.calls.push(payload);
    return this.response();
  }
}

const flush = () => new Promise(resolve => setTimeout(resolve, 0));

function fillValid(component: ContactComponent): void {
  component.form.name = 'Ada Lovelace';
  component.form.company = 'Analytical Engines';
  component.form.email = 'ada@example.com';
  component.form.area = 'Software Architecture';
  component.form.message = 'We need help designing a resilient distributed system.';
}

describe('ContactComponent submission', () => {
  let stub: ContactServiceStub;
  let fixture: ComponentFixture<ContactComponent>;
  let component: ContactComponent;

  async function setup(configured = true): Promise<void> {
    stub = new ContactServiceStub();
    stub.configured = configured;

    await TestBed.configureTestingModule({
      imports: [ContactComponent],
      providers: [provideRouter([]), { provide: ContactService, useValue: stub }]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    component.formOpenedAt = Date.now() - 10_000;
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await setup();
  });

  it('rejects an empty form without contacting the provider', () => {
    component.handleSubmit();

    expect(component.errors.name).toBeTruthy();
    expect(component.errors.company).toBeTruthy();
    expect(component.errors.email).toBeTruthy();
    expect(component.errors.area).toBeTruthy();
    expect(component.errors.message).toBeTruthy();
    expect(stub.calls.length).toBe(0);
    expect(component.submitted()).toBe(false);
  });

  it('rejects an invalid email address', () => {
    fillValid(component);
    component.form.email = 'not-an-email';

    component.handleSubmit();

    expect(component.errors.email).toBeTruthy();
    expect(stub.calls.length).toBe(0);
  });

  it('rejects a message longer than the limit', () => {
    fillValid(component);
    component.form.message = 'x'.repeat(5001);

    component.handleSubmit();

    expect(component.errors.message).toBeTruthy();
    expect(stub.calls.length).toBe(0);
  });

  it('sends a valid enquiry and only then shows success', async () => {
    let resolve!: () => void;
    stub.response = () => new Promise<void>(done => (resolve = done));
    fillValid(component);

    component.handleSubmit();
    await flush();
    fixture.detectChanges();

    expect(stub.calls.length).toBe(1);
    expect(component.submitting()).toBe(true);
    expect(component.submitted()).toBe(false);

    resolve();
    await flush();
    fixture.detectChanges();

    expect(component.submitting()).toBe(false);
    expect(component.submitted()).toBe(true);
    expect(fixture.nativeElement.querySelector('.form-success')).toBeTruthy();
  });

  it('shows an error with the email fallback when the provider fails', async () => {
    stub.response = () => Promise.reject(new ContactSubmitError('rejected'));
    fillValid(component);

    component.handleSubmit();
    await flush();
    fixture.detectChanges();

    expect(component.submitted()).toBe(false);
    expect(component.submitError()).toBe('rejected');
    expect(fixture.nativeElement.querySelector('.form-failure')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.form-failure a[href^="mailto:"]')).toBeTruthy();
  });

  it('reports a timeout distinctly', async () => {
    stub.response = () => Promise.reject(new ContactSubmitError('timeout'));
    fillValid(component);

    component.handleSubmit();
    await flush();
    fixture.detectChanges();

    expect(component.errorMessage()).toContain('too long');
  });

  it('prevents a duplicate submission while one is in flight', async () => {
    let resolve!: () => void;
    stub.response = () => new Promise<void>(done => (resolve = done));
    fillValid(component);

    component.handleSubmit();
    component.handleSubmit();
    component.handleSubmit();
    await flush();

    expect(stub.calls.length).toBe(1);

    resolve();
    await flush();
  });

  it('blocks a repeated attempt inside the cooldown window', async () => {
    stub.response = () => Promise.reject(new ContactSubmitError('network'));
    fillValid(component);

    component.handleSubmit();
    await flush();

    component.handleSubmit();
    await flush();

    expect(stub.calls.length).toBe(1);
    expect(component.submitError()).toBe('rate-limited');
  });

  it('drops a submission that fills the honeypot', () => {
    fillValid(component);
    component.form.website = 'https://spam.example';

    component.handleSubmit();

    expect(stub.calls.length).toBe(0);
    expect(component.submitError()).toBe('rejected');
  });

  it('drops a submission completed faster than a human could type it', () => {
    fillValid(component);
    component.formOpenedAt = Date.now();

    component.handleSubmit();

    expect(stub.calls.length).toBe(0);
  });
});

describe('ContactComponent without a configured endpoint', () => {
  let stub: ContactServiceStub;
  let fixture: ComponentFixture<ContactComponent>;
  let component: ContactComponent;

  beforeEach(async () => {
    stub = new ContactServiceStub();
    stub.configured = false;

    await TestBed.configureTestingModule({
      imports: [ContactComponent],
      providers: [provideRouter([]), { provide: ContactService, useValue: stub }]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    component.formOpenedAt = Date.now() - 10_000;
    fixture.detectChanges();
  });

  it('shows the direct email fallback instead of the form', () => {
    expect(fixture.nativeElement.querySelector('.form-notice')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('form.contact-form')).toBeNull();
    expect(
      fixture.nativeElement.querySelector('.form-notice a[href^="mailto:"]')
    ).toBeTruthy();
  });

  it('never invokes the provider', () => {
    fillValid(component);

    component.handleSubmit();

    expect(stub.calls.length).toBe(0);
    expect(component.submitError()).toBe('not-configured');
  });
});
