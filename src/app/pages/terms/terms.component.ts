import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../shared/components/qm-section/qm-section.component';

@Component({
    selector: 'app-terms',
    imports: [RouterModule, QmContainerComponent, QmSectionComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <section class="qm-legal-hero surface-subtle">
      <qm-container size="narrow">
        <div class="qm-legal-crumb">
          <a routerLink="/">Home</a>
          <span aria-hidden="true">›</span>
          <span>Terms of Use</span>
        </div>
        <h1>Terms of Use</h1>
        <p class="qm-legal-meta">Last updated: 15 August 2025</p>
      </qm-container>
    </section>

    <qm-section surface="white">
      <qm-container size="narrow">
        <div class="qm-legal-body">

          <section class="qm-legal-section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using the QuantsMind website at
              <strong>www.quantsmind.com</strong> (the "Website"), you accept and agree
              to be bound by these Terms of Use. If you do not agree to these terms,
              please do not use our Website.
            </p>
            <p>
              These terms apply to all visitors, users, and others who access the Website.
              QuantsMind reserves the right to modify these terms at any time. Continued use
              of the Website following any changes constitutes your acceptance of the
              revised terms.
            </p>
          </section>

          <section class="qm-legal-section">
            <h2>2. About QuantsMind</h2>
            <p>
              QuantsMind is a technology engineering company operating from:
            </p>
            <address class="qm-legal-address">
              28, Shikargarh<br>
              Jodhpur – 342015<br>
              Rajasthan, India<br>
              <a href="mailto:ajitkumar&#64;quantsmind.com">ajitkumar&#64;quantsmind.com</a>
            </address>
          </section>

          <section class="qm-legal-section">
            <h2>3. Use of the Website</h2>
            <h3>3.1 Permitted Use</h3>
            <p>
              You may use this Website for lawful purposes only. You may access and view
              content on the Website for informational purposes, submit enquiries through
              our contact form, and share links to pages on our Website.
            </p>
            <h3>3.2 Prohibited Conduct</h3>
            <p>You must not:</p>
            <ul>
              <li>Use the Website in any way that violates applicable local, national,
                  or international law or regulation</li>
              <li>Attempt to gain unauthorised access to any part of the Website or
                  its underlying systems</li>
              <li>Transmit any unsolicited or unauthorised advertising or promotional material</li>
              <li>Introduce any viruses, malware, or other harmful code to the Website</li>
              <li>Use automated tools to scrape, crawl, or extract content from the Website
                  in a manner that places unreasonable load on our infrastructure</li>
              <li>Impersonate QuantsMind, our employees, or any other person or entity</li>
              <li>Use the Website to transmit any content that is unlawful, defamatory,
                  obscene, or otherwise objectionable</li>
            </ul>
          </section>

          <section class="qm-legal-section">
            <h2>4. Intellectual Property</h2>
            <p>
              All content on this Website — including text, graphics, diagrams, logos,
              icons, and software — is the property of QuantsMind or its content suppliers
              and is protected by applicable intellectual property law.
            </p>
            <p>
              You may not reproduce, distribute, modify, create derivative works from,
              publicly display, or exploit any content from this Website without our
              prior written consent, except as permitted by applicable law or for
              the purpose of sharing links to our pages.
            </p>
            <p>
              The QuantsMind name, logo, and associated marks are trademarks of QuantsMind.
              Nothing on this Website grants any licence to use our trademarks.
            </p>
          </section>

          <section class="qm-legal-section">
            <h2>5. Disclaimer of Warranties</h2>
            <p>
              The Website and its content are provided on an "as is" and "as available"
              basis without any warranties of any kind, either express or implied.
              QuantsMind does not warrant that the Website will be uninterrupted,
              error-free, or free of viruses or other harmful components.
            </p>
            <p>
              Content on this Website is for general information purposes only.
              It does not constitute professional advice. You should not rely on
              information on this Website as a substitute for professional technical,
              legal, financial, or other specialist advice.
            </p>
          </section>

          <section class="qm-legal-section">
            <h2>6. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, QuantsMind shall not
              be liable for any indirect, incidental, special, consequential, or
              punitive damages arising from your use of, or inability to use, this
              Website or its content.
            </p>
            <p>
              QuantsMind's total liability to you for any claim arising from your use
              of the Website shall not exceed the amount you have paid to QuantsMind
              in the twelve months preceding the claim, or INR 1,000, whichever is greater.
            </p>
          </section>

          <section class="qm-legal-section">
            <h2>7. Third-Party Links</h2>
            <p>
              Our Website may contain links to third-party websites, including LinkedIn
              and other external resources. These links are provided for your convenience.
              QuantsMind has no control over the content of those sites and accepts no
              responsibility for them or for any loss or damage that may arise from
              your use of them. Linking to an external site does not constitute
              endorsement of that site or its content.
            </p>
          </section>

          <section class="qm-legal-section">
            <h2>8. Privacy</h2>
            <p>
              Your use of this Website is also governed by our
              <a routerLink="/privacy">Privacy Policy</a> and
              <a routerLink="/cookies">Cookie Policy</a>, which are incorporated
              into these Terms of Use by reference. Please review those documents
              to understand our practices.
            </p>
          </section>

          <section class="qm-legal-section">
            <h2>9. Governing Law and Jurisdiction</h2>
            <p>
              These Terms of Use are governed by and construed in accordance with
              the laws of India. Any disputes arising from or related to these terms
              or your use of the Website shall be subject to the exclusive jurisdiction
              of the courts of Jodhpur, Rajasthan, India.
            </p>
          </section>

          <section class="qm-legal-section">
            <h2>10. Contact</h2>
            <p>
              If you have any questions about these Terms of Use, please contact us at:
            </p>
            <address class="qm-legal-address">
              QuantsMind<br>
              28, Shikargarh, Jodhpur – 342015<br>
              Rajasthan, India<br>
              <a href="mailto:ajitkumar&#64;quantsmind.com">ajitkumar&#64;quantsmind.com</a>
            </address>
          </section>

        </div>
      </qm-container>
    </qm-section>
  `
})
export class TermsComponent {}