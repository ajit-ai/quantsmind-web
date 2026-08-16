import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../shared/components/qm-section/qm-section.component';

@Component({
    selector: 'app-cookies',
    imports: [RouterModule, QmContainerComponent, QmSectionComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <section class="legal-hero surface-subtle">
      <qm-container size="narrow">
        <div class="legal-hero__breadcrumb">
          <a routerLink="/">Home</a>
          <span aria-hidden="true">›</span>
          <span>Cookie Policy</span>
        </div>
        <h1>Cookie Policy</h1>
        <p class="legal-meta">Last updated: 15 August 2025</p>
      </qm-container>
    </section>

    <qm-section surface="white">
      <qm-container size="narrow">
        <div class="legal-body">

          <section class="legal-section">
            <h2>1. What Are Cookies?</h2>
            <p>
              Cookies are small text files that are placed on your device when you visit
              a website. They are widely used to make websites work efficiently, to improve
              the user experience, and to provide information to website owners.
            </p>
            <p>
              Cookies can be "session cookies" (which expire when you close your browser)
              or "persistent cookies" (which remain on your device for a set period or
              until you delete them). Cookies can be set by the website you are visiting
              ("first-party cookies") or by third parties ("third-party cookies").
            </p>
          </section>

          <section class="legal-section">
            <h2>2. How We Use Cookies</h2>
            <p>
              The QuantsMind website is designed to be lightweight and privacy-conscious.
              We use only the minimum cookies necessary for the website to function.
              We do not use advertising cookies, cross-site tracking cookies, or
              third-party behavioural tracking.
            </p>
          </section>

          <section class="legal-section">
            <h2>3. Cookies We Use</h2>

            <div class="cookie-table-wrapper">
              <table class="cookie-table" role="table">
                <thead>
                  <tr>
                    <th scope="col">Category</th>
                    <th scope="col">Purpose</th>
                    <th scope="col">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Strictly Necessary</strong></td>
                    <td>
                      Required for the website to function correctly. These cookies
                      cannot be disabled without breaking core functionality.
                      Examples: session management, security tokens.
                    </td>
                    <td>Session</td>
                  </tr>
                  <tr>
                    <td><strong>Preference</strong></td>
                    <td>
                      Remember choices you have made on the website, such as
                      accessibility preferences. These are set only if you interact
                      with relevant features.
                    </td>
                    <td>Up to 12 months</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="cookie-note">
              <strong>What we do not use:</strong> We do not currently use analytics cookies,
              advertising cookies, social media tracking cookies, or any third-party
              behavioural tracking technology on this website.
            </div>
          </section>

          <section class="legal-section">
            <h2>4. Third-Party Services</h2>
            <p>
              Our website loads the Inter typeface from Google Fonts. This involves
              a request to Google's servers, which may result in Google receiving
              your IP address. We load fonts using the standard Google Fonts CDN
              link. If you wish to prevent this, you may use a browser extension
              that blocks Google Fonts requests.
            </p>
            <p>
              Our website includes a link to our LinkedIn company page.
              LinkedIn may set cookies if you follow that link. LinkedIn's
              use of cookies is governed by LinkedIn's own
              <a href="https://www.linkedin.com/legal/cookie-policy"
                 target="_blank" rel="noopener noreferrer">Cookie Policy</a>.
            </p>
          </section>

          <section class="legal-section">
            <h2>5. Managing Cookies</h2>
            <p>
              You can control and manage cookies through your browser settings.
              All modern browsers allow you to view, delete, and block cookies.
              Please note that blocking all cookies may affect the functionality
              of this and other websites.
            </p>
            <p>Instructions for managing cookies in common browsers:</p>
            <ul>
              <li>
                <a href="https://support.google.com/chrome/answer/95647"
                   target="_blank" rel="noopener noreferrer">Google Chrome</a>
              </li>
              <li>
                <a href="https://support.mozilla.org/kb/enable-and-disable-cookies-website-preferences"
                   target="_blank" rel="noopener noreferrer">Mozilla Firefox</a>
              </li>
              <li>
                <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471"
                   target="_blank" rel="noopener noreferrer">Apple Safari</a>
              </li>
              <li>
                <a href="https://support.microsoft.com/help/4027947"
                   target="_blank" rel="noopener noreferrer">Microsoft Edge</a>
              </li>
            </ul>
          </section>

          <section class="legal-section">
            <h2>6. Changes to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time. Changes will be
              reflected by updating the "Last updated" date above. We encourage you
              to review this policy periodically.
            </p>
          </section>

          <section class="legal-section">
            <h2>7. Contact</h2>
            <p>
              If you have any questions about our use of cookies, please contact us:
            </p>
            <address class="legal-address">
              QuantsMind<br>
              28, Shikargarh, Jodhpur – 342015<br>
              Rajasthan, India<br>
              <a href="mailto:ajitkumar&#64;quantsmind.com">ajitkumar&#64;quantsmind.com</a>
            </address>
          </section>

        </div>
      </qm-container>
    </qm-section>
  `,
    styles: [`
    .legal-hero { padding: 64px 0 48px; border-bottom: 1px solid #E2E8F0; }
    .legal-hero h1 { margin: 8px 0 8px; }
    .legal-meta { font-size: 13px; color: #94A3B8; margin: 0; }
    .legal-hero__breadcrumb {
      display: flex; align-items: center; gap: 8px;
      font-size: 13px; color: #64748B; margin-bottom: 16px;
    }
    .legal-hero__breadcrumb a { color: #2563EB; text-decoration: none; }
    .legal-hero__breadcrumb a:hover { text-decoration: underline; }
    .legal-body { display: flex; flex-direction: column; }
    .legal-section { padding: 32px 0; border-bottom: 1px solid #F1F5F9; }
    .legal-section:first-child { padding-top: 0; }
    .legal-section:last-child  { border-bottom: none; }
    .legal-section h2 { font-size: 20px; font-weight: 600; color: #111827; margin: 0 0 16px; letter-spacing: -0.01em; }
    .legal-section p  { font-size: 15px; line-height: 1.75; color: #475569; margin: 0 0 14px; }
    .legal-section p:last-child { margin: 0; }
    .legal-section ul { margin: 0 0 14px; padding-left: 20px; display: flex; flex-direction: column; gap: 8px; }
    .legal-section li { font-size: 15px; color: #475569; line-height: 1.65; }
    .legal-section a  { color: #2563EB; }
    .legal-section a:hover { text-decoration: underline; }

    /* Cookie table */
    .cookie-table-wrapper { overflow-x: auto; margin: 16px 0; }
    .cookie-table {
      width: 100%; border-collapse: collapse;
      font-size: 14px; color: #475569;
    }
    .cookie-table th {
      font-size: 12px; font-weight: 600;
      letter-spacing: 0.06em; text-transform: uppercase;
      color: #64748B; text-align: left;
      padding: 10px 14px; background: #F8FAFC;
      border: 1px solid #E2E8F0;
    }
    .cookie-table td {
      padding: 14px; border: 1px solid #E2E8F0;
      line-height: 1.6; vertical-align: top;
    }
    .cookie-table tr:hover td { background: #FAFBFC; }

    .cookie-note {
      font-size: 14px; color: #475569; line-height: 1.6;
      padding: 16px 20px; background: #F0FDF4;
      border: 1px solid #BBF7D0; border-radius: 8px;
      margin-top: 16px;
    }
    .cookie-note strong { color: #166534; }

    .legal-address {
      font-size: 14px; color: #475569; line-height: 1.8; font-style: normal;
      margin: 16px 0; padding: 16px 20px; background: #F8FAFC;
      border: 1px solid #E2E8F0; border-radius: 8px; display: inline-block;
    }
  `]
})
export class CookiesComponent {}
