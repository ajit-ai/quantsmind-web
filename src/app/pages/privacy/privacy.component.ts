import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../shared/components/qm-section/qm-section.component';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [RouterModule, QmContainerComponent, QmSectionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="legal-hero surface-subtle">
      <qm-container size="narrow">
        <div class="legal-hero__breadcrumb">
          <a routerLink="/">Home</a>
          <span aria-hidden="true">›</span>
          <span>Privacy Policy</span>
        </div>
        <h1>Privacy Policy</h1>
        <p class="legal-meta">Last updated: 15 August 2025</p>
      </qm-container>
    </section>

    <qm-section surface="white">
      <qm-container size="narrow">
        <div class="legal-body">

          <section class="legal-section">
            <h2>1. Who We Are</h2>
            <p>
              QuantsMind ("we", "us", "our") is a technology engineering company registered in India.
              Our registered address is:
            </p>
            <address class="legal-address">
              QuantsMind<br>
              28, Shikargarh<br>
              Jodhpur – 342015<br>
              Rajasthan, India
            </address>
            <p>
              You may contact us at
              <a href="mailto:hello&#64;quantsmind.com">hello&#64;quantsmind.com</a>
              regarding any privacy-related matter.
            </p>
          </section>

          <section class="legal-section">
            <h2>2. What Information We Collect</h2>
            <p>We collect information in the following circumstances:</p>
            <h3>2.1 Information You Provide</h3>
            <p>
              When you submit an enquiry through our Contact page, we collect your name,
              company name, work email address, selected area of interest, and the message
              you provide. We collect only what is necessary to respond to your enquiry.
            </p>
            <h3>2.2 Information Collected Automatically</h3>
            <p>
              When you visit our website, our hosting infrastructure may collect standard
              server log data including your IP address, browser type, operating system,
              referring URL, pages visited, and timestamps. This data is used for
              security monitoring and infrastructure purposes and is not used to build
              personal profiles.
            </p>
            <h3>2.3 Cookies and Tracking</h3>
            <p>
              Our website uses only technically necessary cookies required for the website
              to function. We do not use advertising cookies, cross-site tracking cookies,
              or third-party analytics that track individuals across websites. See our
              <a routerLink="/cookies">Cookie Policy</a> for details.
            </p>
          </section>

          <section class="legal-section">
            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect for the following purposes:</p>
            <ul>
              <li>To respond to enquiries you submit through our Contact page</li>
              <li>To understand whether QuantsMind can assist you with your technology challenge</li>
              <li>To maintain records of communications for business purposes</li>
              <li>To comply with legal obligations</li>
              <li>To protect the security of our website and systems</li>
            </ul>
            <p>
              We do not use your contact information for unsolicited marketing.
              We do not sell, rent, or share your personal information with
              third parties for marketing purposes.
            </p>
          </section>

          <section class="legal-section">
            <h2>4. Legal Basis for Processing (GDPR)</h2>
            <p>
              Where the General Data Protection Regulation (GDPR) applies to visitors
              from the European Economic Area, we process personal data on the
              following legal bases:
            </p>
            <ul>
              <li><strong>Legitimate interests</strong> — responding to business enquiries
                  you initiate and maintaining the security of our systems.</li>
              <li><strong>Legal obligation</strong> — where processing is required to
                  comply with applicable law.</li>
              <li><strong>Consent</strong> — where we have obtained your explicit consent
                  for a specific processing activity.</li>
            </ul>
          </section>

          <section class="legal-section">
            <h2>5. Data Retention</h2>
            <p>
              We retain enquiry data for as long as necessary to fulfil the purpose
              for which it was collected and to comply with applicable legal obligations.
              Enquiries that do not result in an ongoing engagement are deleted within
              24 months. You may request deletion of your data at any time by contacting
              us at <a href="mailto:hello&#64;quantsmind.com">hello&#64;quantsmind.com</a>.
            </p>
          </section>

          <section class="legal-section">
            <h2>6. Data Sharing and Transfers</h2>
            <p>
              We do not sell or share your personal information with third parties,
              except in the following circumstances:
            </p>
            <ul>
              <li><strong>Service providers</strong> — we may share data with trusted
                  third-party service providers (such as email infrastructure providers)
                  who process data on our behalf and are contractually bound to protect it.</li>
              <li><strong>Legal requirements</strong> — we may disclose information where
                  required to do so by law or in response to valid legal process.</li>
              <li><strong>Business transfers</strong> — in the event of a merger,
                  acquisition, or asset sale, personal data may be transferred as part
                  of that transaction.</li>
            </ul>
            <p>
              Where personal data is transferred outside India or the EEA, we ensure
              appropriate safeguards are in place in accordance with applicable data
              protection law.
            </p>
          </section>

          <section class="legal-section">
            <h2>7. Your Rights</h2>
            <p>
              Depending on your location, you may have the following rights regarding
              your personal data:
            </p>
            <ul>
              <li><strong>Access</strong> — the right to request a copy of the personal
                  data we hold about you.</li>
              <li><strong>Correction</strong> — the right to request correction of
                  inaccurate data.</li>
              <li><strong>Deletion</strong> — the right to request deletion of your
                  personal data, subject to legal obligations.</li>
              <li><strong>Restriction</strong> — the right to request that we restrict
                  processing of your data in certain circumstances.</li>
              <li><strong>Portability</strong> — the right to receive your data in a
                  structured, commonly used format.</li>
              <li><strong>Objection</strong> — the right to object to processing based
                  on legitimate interests.</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us at
              <a href="mailto:hello&#64;quantsmind.com">hello&#64;quantsmind.com</a>.
              We will respond within 30 days.
            </p>
          </section>

          <section class="legal-section">
            <h2>8. Security</h2>
            <p>
              We implement appropriate technical and organisational measures to protect
              your personal data against unauthorised access, disclosure, alteration,
              or destruction. Our website is served over HTTPS. However, no method of
              transmission over the internet is completely secure, and we cannot
              guarantee absolute security.
            </p>
          </section>

          <section class="legal-section">
            <h2>9. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites, including
              LinkedIn. These websites have their own privacy policies, and we
              are not responsible for their practices. We encourage you to review
              the privacy policy of any third-party site you visit.
            </p>
          </section>

          <section class="legal-section">
            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes
              in our practices or applicable law. We will update the "Last updated"
              date at the top of this page. We encourage you to review this page
              periodically. Continued use of our website after any changes constitutes
              acceptance of the updated policy.
            </p>
          </section>

          <section class="legal-section">
            <h2>11. Contact</h2>
            <p>
              If you have any questions about this Privacy Policy or how we handle
              your personal data, please contact us:
            </p>
            <address class="legal-address">
              QuantsMind<br>
              28, Shikargarh, Jodhpur – 342015<br>
              Rajasthan, India<br>
              <a href="mailto:hello&#64;quantsmind.com">hello&#64;quantsmind.com</a>
            </address>
          </section>

        </div>
      </qm-container>
    </qm-section>
  `,
  styles: [`
    .legal-hero {
      padding: 64px 0 48px; border-bottom: 1px solid #E2E8F0;
    }
    .legal-hero h1 { margin: 8px 0 8px; }
    .legal-meta { font-size: 13px; color: #94A3B8; margin: 0; }

    .legal-hero__breadcrumb {
      display: flex; align-items: center; gap: 8px;
      font-size: 13px; color: #64748B; margin-bottom: 16px;
    }
    .legal-hero__breadcrumb a { color: #2563EB; text-decoration: none; }
    .legal-hero__breadcrumb a:hover { text-decoration: underline; }

    .legal-body { display: flex; flex-direction: column; gap: 0; }

    .legal-section {
      padding: 32px 0; border-bottom: 1px solid #F1F5F9;
    }
    .legal-section:first-child { padding-top: 0; }
    .legal-section:last-child  { border-bottom: none; }

    .legal-section h2 {
      font-size: 20px; font-weight: 600; color: #111827; margin: 0 0 16px;
      letter-spacing: -0.01em;
    }
    .legal-section h3 {
      font-size: 15px; font-weight: 600; color: #111827; margin: 20px 0 8px;
    }
    .legal-section p {
      font-size: 15px; line-height: 1.75; color: #475569; margin: 0 0 14px;
    }
    .legal-section p:last-child { margin: 0; }
    .legal-section ul {
      margin: 0 0 14px; padding-left: 20px;
      display: flex; flex-direction: column; gap: 8px;
    }
    .legal-section li { font-size: 15px; color: #475569; line-height: 1.65; }
    .legal-section a { color: #2563EB; }
    .legal-section a:hover { text-decoration: underline; }

    .legal-address {
      font-size: 14px; color: #475569; line-height: 1.8;
      font-style: normal; margin: 16px 0;
      padding: 16px 20px; background: #F8FAFC;
      border: 1px solid #E2E8F0; border-radius: 8px;
      display: inline-block;
    }
  `]
})
export class PrivacyComponent {}
