import { Injectable } from '@angular/core';

import {
  CONTACT_FORMSPREE_ENDPOINT,
  CONTACT_PROVIDER,
  CONTACT_TIMEOUT_MS,
  CONTACT_WEB3FORMS_ACCESS_KEY,
  ContactProvider
} from './contact.config';

/** The fields the contact form sends to the submission provider. */
export interface ContactPayload {
  name: string;
  company: string;
  email: string;
  area: string;
  message: string;
  /** Honeypot value; must stay empty for genuine submissions. */
  gotcha: string;
}

export type ContactErrorReason =
  | 'not-configured'
  | 'network'
  | 'timeout'
  | 'rejected';

/** A submission failure whose reason is safe to show to the visitor. */
export class ContactSubmitError extends Error {
  constructor(readonly reason: ContactErrorReason) {
    super(reason);
    this.name = 'ContactSubmitError';
  }
}

/** A request ready to be sent, independent of the provider. */
interface ContactRequest {
  url: string;
  body: Record<string, string>;
}

/**
 * Accepts only Formspree form endpoints. This keeps a configuration mistake
 * from forwarding enquiry data to an unrelated host.
 */
const FORMSPREE_PATTERN = /^https:\/\/formspree\.io\/f\/[A-Za-z0-9]+$/;

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

@Injectable({ providedIn: 'root' })
export class ContactService {
  /**
   * Overridable for tests; production values come from build-time config and
   * are never assigned at runtime.
   */
  provider: ContactProvider = CONTACT_PROVIDER;
  formspreeEndpoint = CONTACT_FORMSPREE_ENDPOINT;
  web3formsAccessKey = CONTACT_WEB3FORMS_ACCESS_KEY;

  isConfigured(): boolean {
    if (this.provider === 'web3forms') {
      const key = this.web3formsAccessKey.trim();
      return key.length >= 20 && !/\s/.test(key);
    }

    return FORMSPREE_PATTERN.test(this.formspreeEndpoint.trim());
  }

  /**
   * Sends the enquiry to the configured provider.
   *
   * Rejects with {@link ContactSubmitError}; the payload is never logged.
   */
  async send(payload: ContactPayload): Promise<void> {
    if (!this.isConfigured()) {
      throw new ContactSubmitError('not-configured');
    }

    const request = this.buildRequest(payload);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), CONTACT_TIMEOUT_MS);

    try {
      const response = await fetch(request.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(request.body),
        signal: controller.signal
      });

      if (!response.ok) {
        throw new ContactSubmitError('rejected');
      }

      // Web3Forms reports some failures with HTTP 200 and { success: false }.
      if (this.provider === 'web3forms') {
        const result = await response.json().catch(() => null);
        if (result?.success !== true) {
          throw new ContactSubmitError('rejected');
        }
      }
    } catch (error) {
      if (error instanceof ContactSubmitError) {
        throw error;
      }
      throw new ContactSubmitError(
        controller.signal.aborted ? 'timeout' : 'network'
      );
    } finally {
      clearTimeout(timeout);
    }
  }

  private buildRequest(payload: ContactPayload): ContactRequest {
    if (this.provider === 'web3forms') {
      return {
        url: WEB3FORMS_ENDPOINT,
        body: {
          access_key: this.web3formsAccessKey.trim(),
          subject: `Website enquiry - ${payload.area}`,
          from_name: 'QuantsMind Website',
          replyto: payload.email,
          name: payload.name,
          company: payload.company,
          email: payload.email,
          area: payload.area,
          message: payload.message,
          botcheck: payload.gotcha
        }
      };
    }

    return {
      url: this.formspreeEndpoint.trim(),
      body: {
        name: payload.name,
        company: payload.company,
        email: payload.email,
        area: payload.area,
        message: payload.message,
        _gotcha: payload.gotcha,
        _subject: `Website enquiry - ${payload.area}`
      }
    };
  }
}
