import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../shared/components/qm-section/qm-section.component';
import { QmButtonComponent }    from '../../shared/components/qm-button/qm-button.component';
import { QmBadgeComponent }     from '../../shared/components/qm-badge/qm-badge.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule,
            QmContainerComponent, QmSectionComponent, QmButtonComponent, QmBadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Hero -->
    <section class="page-hero surface-subtle">
      <qm-container>
        <span class="eyebrow">CONTACT</span>
        <h1>Let's Talk About the Problem You're Trying to Solve.</h1>
        <p class="lead">
          Whether you are building a new system, modernising an existing platform,
          exploring AI, investigating advanced computing, or facing a complex
          technology challenge — start with the problem.
        </p>
      </qm-container>
    </section>

    <qm-section surface="white">
      <qm-container>
        <div class="contact-layout">

          <!-- ── FORM COLUMN ── -->
          <div class="contact-form-col">
            <h2>Send an Enquiry</h2>
            <p class="contact-form-intro">
              Tell us what you are working on. We will read it carefully and respond thoughtfully.
            </p>

            <!-- Success -->
            <div *ngIf="submitted()" class="form-success" role="alert">
              <div class="form-success__icon" aria-hidden="true">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="16" fill="#DCFCE7"/>
                  <path d="M10 16.5l4 4 8-8" stroke="#166534" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h3 class="form-success__title">Enquiry Received</h3>
              <p class="form-success__text">
                Thank you for reaching out. We will review your enquiry and respond shortly.
              </p>
            </div>

            <div *ngIf="!submitted()" class="contact-form">
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label" for="contact-name">
                    Name <span class="form-required" aria-label="required">*</span>
                  </label>
                  <input id="contact-name" type="text" class="form-input"
                    [(ngModel)]="form.name" placeholder="Your name"
                    autocomplete="name" required
                    [class.form-input--error]="errors.name"/>
                  <span *ngIf="errors.name" class="form-error" role="alert">{{ errors.name }}</span>
                </div>
                <div class="form-group">
                  <label class="form-label" for="contact-company">
                    Company <span class="form-required" aria-label="required">*</span>
                  </label>
                  <input id="contact-company" type="text" class="form-input"
                    [(ngModel)]="form.company" placeholder="Organisation name"
                    autocomplete="organization" required
                    [class.form-input--error]="errors.company"/>
                  <span *ngIf="errors.company" class="form-error" role="alert">{{ errors.company }}</span>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label" for="contact-email">
                  Work Email <span class="form-required" aria-label="required">*</span>
                </label>
                <input id="contact-email" type="email" class="form-input"
                  [(ngModel)]="form.email" placeholder="you&#64;company.com"
                  autocomplete="email" required
                  [class.form-input--error]="errors.email"/>
                <span *ngIf="errors.email" class="form-error" role="alert">{{ errors.email }}</span>
              </div>

              <div class="form-group">
                <label class="form-label" for="contact-area">
                  Area of Interest <span class="form-required" aria-label="required">*</span>
                </label>
                <div class="form-select-wrapper">
                  <select id="contact-area" class="form-select"
                    [(ngModel)]="form.area" required
                    [class.form-input--error]="errors.area">
                    <option value="">Select an area…</option>
                    <option *ngFor="let area of areas" [value]="area">{{ area }}</option>
                  </select>
                  <svg class="form-select-icon" aria-hidden="true" width="16" height="16"
                       viewBox="0 0 16 16" fill="none">
                    <path d="M4 6l4 4 4-4" stroke="#64748B" stroke-width="1.5"
                          stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <span *ngIf="errors.area" class="form-error" role="alert">{{ errors.area }}</span>
              </div>

              <div class="form-group">
                <label class="form-label" for="contact-message">
                  Message <span class="form-required" aria-label="required">*</span>
                </label>
                <textarea id="contact-message" class="form-textarea"
                  [(ngModel)]="form.message"
                  placeholder="Describe the problem you are trying to solve, the system you are building, or the challenge you face."
                  rows="6" required
                  [class.form-input--error]="errors.message"></textarea>
                <span *ngIf="errors.message" class="form-error" role="alert">{{ errors.message }}</span>
              </div>

              <qm-button variant="primary" size="lg" type="submit" (clicked)="handleSubmit()">
                Send Enquiry →
              </qm-button>
            </div>

            <p class="contact-email-note">
              Or email us directly:
              <a href="mailto:hello&#64;quantsmind.com" class="contact-email-link">hello&#64;quantsmind.com</a>
            </p>
          </div>

          <!-- ── SIDEBAR ── -->
          <aside class="contact-sidebar">

            <!-- Entry points -->
            <div class="sidebar-entry-points">
              <div *ngFor="let entry of entryPoints" class="sidebar-entry">
                <qm-badge [variant]="entry.badge">{{ entry.label }}</qm-badge>
                <h3 class="sidebar-entry__title">{{ entry.title }}</h3>
                <p class="sidebar-entry__desc">{{ entry.desc }}</p>
              </div>
            </div>

            <!-- What happens next -->
            <div class="sidebar-next">
              <h3 class="sidebar-next__heading">What Happens Next?</h3>
              <ol class="sidebar-next__list">
                <li *ngFor="let step of nextSteps; let i = index" class="sidebar-next__item">
                  <div class="sidebar-next__num">{{ i + 1 }}</div>
                  <div>
                    <div class="sidebar-next__step-title">{{ step.title }}</div>
                    <div class="sidebar-next__step-desc">{{ step.desc }}</div>
                  </div>
                </li>
              </ol>
            </div>

            <!-- Contact details block -->
            <div class="sidebar-details">
              <h3 class="sidebar-details__heading">Our Details</h3>

              <div class="sidebar-details__item">
                <div class="sidebar-details__icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" stroke-width="1.8"
                       stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div class="sidebar-details__content">
                  <div class="sidebar-details__label">Address</div>
                  <address class="sidebar-details__address">
                    28, Shikargarh<br>
                    Jodhpur – 342015<br>
                    Rajasthan, India
                  </address>
                </div>
              </div>

              <div class="sidebar-details__item">
                <div class="sidebar-details__icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" stroke-width="1.8"
                       stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div class="sidebar-details__content">
                  <div class="sidebar-details__label">Email</div>
                  <a href="mailto:hello&#64;quantsmind.com" class="sidebar-details__link">
                    hello&#64;quantsmind.com
                  </a>
                </div>
              </div>

              <div class="sidebar-details__item">
                <div class="sidebar-details__icon" aria-hidden="true">
                  <!-- LinkedIn icon -->
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853
                             0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046
                             c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337
                             7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063
                             2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0
                             0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24
                             23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div class="sidebar-details__content">
                  <div class="sidebar-details__label">LinkedIn</div>
                  <a href="https://www.linkedin.com/company/quantsmind"
                     target="_blank" rel="noopener noreferrer"
                     class="sidebar-details__link">
                    linkedin.com/company/quantsmind
                  </a>
                </div>
              </div>
            </div>

          </aside>
        </div>
      </qm-container>
    </qm-section>
  `,
  styles: [`
    .page-hero { padding: 80px 0 64px; border-bottom: 1px solid #E2E8F0; }
    @media (min-width: 768px) { .page-hero { padding: 112px 0 80px; } }
    .page-hero h1 { max-width: 760px; margin: 0 0 20px; }
    .page-hero .lead { max-width: 640px; margin: 0; }

    .contact-layout {
      display: grid; grid-template-columns: 1fr; gap: 56px; align-items: start;
    }
    @media (min-width: 1024px) { .contact-layout { grid-template-columns: 1.4fr 1fr; } }

    /* Form column */
    .contact-form-col h2 { margin: 0 0 8px; }
    .contact-form-intro { font-size: 15px; color: #475569; line-height: 1.6; margin: 0 0 32px; }

    .contact-form { display: flex; flex-direction: column; gap: 20px; }
    .form-row { display: grid; grid-template-columns: 1fr; gap: 20px; }
    @media (min-width: 640px) { .form-row { grid-template-columns: repeat(2, 1fr); } }

    .form-group { display: flex; flex-direction: column; gap: 6px; }
    .form-label { font-size: 13px; font-weight: 600; color: #374151; letter-spacing: 0.01em; }
    .form-required { color: #DC2626; margin-left: 2px; }

    .form-input, .form-select, .form-textarea {
      font-family: inherit; font-size: 15px; color: #111827;
      background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px;
      padding: 12px 14px; width: 100%;
      transition: border-color 150ms ease, box-shadow 150ms ease;
      -webkit-appearance: none; appearance: none;
    }
    .form-input::placeholder, .form-select::placeholder, .form-textarea::placeholder { color: #94A3B8; }
    .form-input:focus, .form-select:focus, .form-textarea:focus {
      outline: none; border-color: #2563EB; box-shadow: 0 0 0 3px rgba(37,99,235,.1);
    }
    .form-input--error { border-color: #DC2626; box-shadow: 0 0 0 3px rgba(220,38,38,.08); }

    .form-select-wrapper { position: relative; }
    .form-select { padding-right: 36px; cursor: pointer; }
    .form-select-icon {
      position: absolute; right: 12px; top: 50%; transform: translateY(-50%); pointer-events: none;
    }
    .form-textarea { resize: vertical; min-height: 140px; line-height: 1.6; }
    .form-error { font-size: 12px; color: #DC2626; font-weight: 500; }

    .contact-email-note { font-size: 13px; color: #64748B; margin: 20px 0 0; }
    .contact-email-link { color: #2563EB; text-decoration: none; font-weight: 500; }
    .contact-email-link:hover { text-decoration: underline; }

    .form-success {
      display: flex; flex-direction: column; align-items: flex-start; gap: 12px;
      padding: 32px; background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 12px;
    }
    .form-success__title { font-size: 18px; font-weight: 600; color: #166534; margin: 0; }
    .form-success__text  { font-size: 14px; color: #15803D; line-height: 1.6; margin: 0; }

    /* Sidebar */
    .contact-sidebar { display: flex; flex-direction: column; gap: 24px; }

    .sidebar-entry-points { display: flex; flex-direction: column; gap: 12px; }
    .sidebar-entry {
      padding: 20px; background: #F8FAFC;
      border: 1px solid #E2E8F0; border-radius: 10px;
      display: flex; flex-direction: column; gap: 8px;
    }
    .sidebar-entry__title { font-size: 15px; font-weight: 600; color: #111827; margin: 0; }
    .sidebar-entry__desc  { font-size: 13px; color: #475569; line-height: 1.5; margin: 0; }

    .sidebar-next {
      padding: 24px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px;
    }
    .sidebar-next__heading {
      font-size: 15px; font-weight: 600; color: #111827;
      margin: 0 0 16px; padding-bottom: 12px; border-bottom: 1px solid #F1F5F9;
    }
    .sidebar-next__list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }
    .sidebar-next__item {
      display: flex; gap: 12px; align-items: flex-start;
      padding: 12px 0; border-bottom: 1px solid #F8FAFC;
    }
    .sidebar-next__item:last-child { border-bottom: none; padding-bottom: 0; }
    .sidebar-next__num {
      width: 24px; height: 24px; border-radius: 50%;
      background: #EFF6FF; color: #2563EB; font-size: 12px; font-weight: 700;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    .sidebar-next__step-title { font-size: 13px; font-weight: 600; color: #111827; margin-bottom: 2px; }
    .sidebar-next__step-desc  { font-size: 12px; color: #64748B; line-height: 1.5; }

    /* Details block */
    .sidebar-details {
      padding: 24px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px;
    }
    .sidebar-details__heading {
      font-size: 15px; font-weight: 600; color: #111827;
      margin: 0 0 16px; padding-bottom: 12px; border-bottom: 1px solid #F1F5F9;
    }
    .sidebar-details__item {
      display: flex; gap: 12px; align-items: flex-start;
      padding: 12px 0; border-bottom: 1px solid #F8FAFC;
    }
    .sidebar-details__item:last-child { border-bottom: none; padding-bottom: 0; }
    .sidebar-details__icon {
      width: 32px; height: 32px; border-radius: 8px;
      background: #EFF6FF; color: #2563EB;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    .sidebar-details__content { display: flex; flex-direction: column; gap: 2px; }
    .sidebar-details__label {
      font-size: 11px; font-weight: 600; letter-spacing: 0.07em;
      text-transform: uppercase; color: #94A3B8;
    }
    .sidebar-details__address {
      font-size: 13px; color: #475569; line-height: 1.7;
      font-style: normal; margin: 0;
    }
    .sidebar-details__link {
      font-size: 13px; color: #2563EB; text-decoration: none; font-weight: 500;
    }
    .sidebar-details__link:hover { text-decoration: underline; }
    .sidebar-details__link:focus-visible { outline: 2px solid #2563EB; outline-offset: 2px; border-radius: 2px; }

    .eyebrow {
      display: inline-block; font-size: 12px; font-weight: 600;
      letter-spacing: 0.1em; text-transform: uppercase; color: #2563EB; margin-bottom: 16px;
    }
    .lead { font-size: 18px; line-height: 1.7; color: #475569; }
  `]
})
export class ContactComponent {
  submitted = signal(false);

  form = { name: '', company: '', email: '', area: '', message: '' };
  errors: { name?: string; company?: string; email?: string; area?: string; message?: string } = {};

  areas = [
    'Enterprise Software', 'AI Engineering', 'Data Engineering',
    'Cloud & Platform Engineering', 'Enterprise Modernization',
    'Advanced Computing', 'Technology Strategy',
    'Research / QuantsMind Labs', 'Other'
  ];

  entryPoints = [
    { label: 'BUILD',     badge: 'build'     as const, title: 'Build Something New',
      desc: 'You have a clear vision. We architect and engineer it from first principles.' },
    { label: 'MODERNIZE', badge: 'modernize' as const, title: 'Transform Something Existing',
      desc: 'You have systems slowing you down. We evolve them systematically and safely.' },
    { label: 'EXPLORE',   badge: 'explore'   as const, title: 'Investigate a Hard Problem',
      desc: 'The right approach is not yet clear. We research and reason through it with you.' }
  ];

  nextSteps = [
    { title: 'You tell us about the problem',    desc: 'Describe what you are building, changing, or struggling with.' },
    { title: 'We understand the context',        desc: 'We read carefully and may ask clarifying questions.' },
    { title: 'We discuss possible approaches',   desc: 'We share our thinking on the problem and potential directions.' },
    { title: 'We determine whether we can help', desc: 'We are honest about fit. If we are not the right partner, we will say so.' }
  ];

  handleSubmit(): void {
    this.errors = {};
    if (!this.form.name.trim())    this.errors.name    = 'Please enter your name.';
    if (!this.form.company.trim()) this.errors.company = 'Please enter your company name.';
    if (!this.form.email.trim() || !this.form.email.includes('@'))
                                    this.errors.email  = 'Please enter a valid work email address.';
    if (!this.form.area)            this.errors.area   = 'Please select an area of interest.';
    if (!this.form.message.trim() || this.form.message.trim().length < 20)
                                    this.errors.message = 'Please describe your challenge (at least 20 characters).';
    if (!this.errors.name && !this.errors.company && !this.errors.email &&
        !this.errors.area && !this.errors.message) {
      this.submitted.set(true);
    }
  }
}
