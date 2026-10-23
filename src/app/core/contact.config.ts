/**
 * Public configuration for the contact form.
 *
 * Everything here ships to the browser. None of it is a private credential:
 * a Formspree form endpoint and a Web3Forms access key are both designed to be
 * public identifiers that can only deliver mail to the configured inbox.
 *
 * Activate exactly one provider. While the selected provider is unconfigured,
 * the contact page disables automatic submission and shows the direct email
 * address instead, so no enquiry is silently discarded.
 */
export type ContactProvider = 'formspree' | 'web3forms';

/** The active provider. */
export const CONTACT_PROVIDER: ContactProvider = 'formspree';

/**
 * Formspree form endpoint, for example:
 *
 *   https://formspree.io/f/abcdwxyz
 *
 * Formspree's Free plan is permanent and allows 50 submissions/month.
 */
export const CONTACT_FORMSPREE_ENDPOINT =
  'https://formspree.io/f/xaqgpbqg';

/**
 * Web3Forms access key, for example:
 *
 *   00000000-0000-0000-0000-000000000000
 *
 * The key is issued by Web3Forms for the destination inbox. It is public by
 * design (it is an alias for the email address, not a secret API key) and
 * cannot be used to read submissions. Web3Forms' Free plan is permanent and
 * allows 250 submissions/month.
 */
export const CONTACT_WEB3FORMS_ACCESS_KEY = '';

/** Abort a submission that has not completed within this time. */
export const CONTACT_TIMEOUT_MS = 15_000;
