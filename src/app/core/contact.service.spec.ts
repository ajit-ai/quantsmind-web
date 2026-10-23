import { afterEach, describe, expect, it, vi } from 'vitest';

import { ContactPayload, ContactService } from './contact.service';

const ENDPOINT = 'https://formspree.io/f/testform';
const ACCESS_KEY = '00000000-0000-0000-0000-000000000000';

const payload: ContactPayload = {
  name: 'Ada Lovelace',
  company: 'Analytical Engines',
  email: 'ada@example.com',
  area: 'Software Architecture',
  message: 'We need help designing a resilient distributed system.',
  gotcha: ''
};

function formspreeService(): ContactService {
  const service = new ContactService();
  service.provider = 'formspree';
  service.formspreeEndpoint = ENDPOINT;
  return service;
}

function web3formsService(): ContactService {
  const service = new ContactService();
  service.provider = 'web3forms';
  service.web3formsAccessKey = ACCESS_KEY;
  return service;
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe('ContactService configuration', () => {
  it('is not configured without a Formspree endpoint', () => {
    const service = new ContactService();
    service.provider = 'formspree';
    service.formspreeEndpoint = '';

    expect(service.isConfigured()).toBe(false);
  });

  it('rejects endpoints that are not Formspree forms', () => {
    const service = new ContactService();
    service.formspreeEndpoint = 'https://example.com/collect';

    expect(service.isConfigured()).toBe(false);
  });

  it('treats a Web3Forms access key as configured', () => {
    expect(web3formsService().isConfigured()).toBe(true);
  });

  it('rejects a Web3Forms key containing whitespace', () => {
    const service = new ContactService();
    service.provider = 'web3forms';
    service.web3formsAccessKey = 'not a key at all but long enough';

    expect(service.isConfigured()).toBe(false);
  });
});

describe('ContactService with Formspree', () => {
  it('posts the enquiry as JSON and resolves on success', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('', { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);

    await formspreeService().send(payload);

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(ENDPOINT);
    expect(init.method).toBe('POST');
    expect(init.headers).toMatchObject({
      'Content-Type': 'application/json',
      Accept: 'application/json'
    });

    const body = JSON.parse(init.body);
    expect(body).toMatchObject({
      name: payload.name,
      company: payload.company,
      email: payload.email,
      area: payload.area,
      message: payload.message,
      _gotcha: ''
    });
    expect(init.signal).toBeInstanceOf(AbortSignal);
  });

  it('fails with not-configured when no endpoint is set', async () => {
    const service = new ContactService();
    service.provider = 'formspree';
    service.formspreeEndpoint = '';

    await expect(service.send(payload)).rejects.toMatchObject({
      reason: 'not-configured'
    });
  });

  it('fails with rejected on a non-2xx response', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response('', { status: 422 }))
    );

    await expect(formspreeService().send(payload)).rejects.toMatchObject({
      reason: 'rejected'
    });
  });
});

describe('ContactService with Web3Forms', () => {
  it('posts to the Web3Forms endpoint with the public access key', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ success: true }));
    vi.stubGlobal('fetch', fetchMock);

    await web3formsService().send(payload);

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://api.web3forms.com/submit');

    const body = JSON.parse(init.body);
    expect(body).toMatchObject({
      access_key: ACCESS_KEY,
      name: payload.name,
      company: payload.company,
      email: payload.email,
      area: payload.area,
      message: payload.message,
      botcheck: '',
      replyto: payload.email,
      from_name: 'QuantsMind Website'
    });
  });

  it('fails when Web3Forms reports success: false', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(jsonResponse({ success: false, message: 'Invalid key' }))
    );

    await expect(web3formsService().send(payload)).rejects.toMatchObject({
      reason: 'rejected'
    });
  });

  it('fails when the Web3Forms response is not JSON', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response('ok', { status: 200 }))
    );

    await expect(web3formsService().send(payload)).rejects.toMatchObject({
      reason: 'rejected'
    });
  });
});

describe('ContactService transport failures', () => {
  it('fails with network when fetch rejects', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('offline')));

    await expect(formspreeService().send(payload)).rejects.toMatchObject({
      reason: 'network'
    });
  });

  it('fails with timeout when the request is aborted', async () => {
    vi.useFakeTimers();
    vi.stubGlobal(
      'fetch',
      vi.fn(
        (_url: string, init: RequestInit) =>
          new Promise<Response>((_resolve, reject) => {
            init.signal?.addEventListener('abort', () =>
              reject(new DOMException('Aborted', 'AbortError'))
            );
          })
      )
    );

    const promise = formspreeService().send(payload);
    const assertion = expect(promise).rejects.toMatchObject({ reason: 'timeout' });

    await vi.advanceTimersByTimeAsync(15_000);
    await assertion;
  });
});
