import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

import { RouterModule } from '@angular/router';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../shared/components/qm-section/qm-section.component';
import { QmButtonComponent }    from '../../shared/components/qm-button/qm-button.component';
import { QmBadgeComponent }     from '../../shared/components/qm-badge/qm-badge.component';
import { SafeHtmlPipe }         from '../../shared/pipes/safe-html.pipe';

interface LinkItem { label: string; href: string; }

interface Capability {
  icon: string;
  title: string;
  items: string[];
}

interface Algorithm {
  name: string;
  fullName: string;
  description: string;
}

interface Principle { title: string; description: string; }

interface FlowStep { title: string; description: string; }

@Component({
    selector: 'app-microquantum',
    imports: [RouterModule, QmContainerComponent, QmSectionComponent, QmButtonComponent, QmBadgeComponent, SafeHtmlPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <!-- ═══════════════════════════════════════════════ -->
    <!-- HERO                                             -->
    <!-- ═══════════════════════════════════════════════ -->
    <section class="mq-hero" aria-label="MicroQuantum overview">
      <qm-container>
        <a routerLink="/technology" class="mq-back">&larr; Technology Ecosystem</a>

        <qm-badge variant="early-access" class="mq-hero__badge">Developer Preview · v0.4.0</qm-badge>
        <h1 class="mq-hero__title">MicroQuantum</h1>
        <p class="mq-hero__tagline">Quantum computing, built for developers.</p>
        <p class="mq-hero__lead">
          An open Python SDK for building, executing and analyzing quantum programs.
        </p>

        <div class="mq-hero__actions">
          <qm-button variant="primary" size="lg" [href]="links.docs" target="_blank">
            Explore Documentation →
          </qm-button>
          <qm-button variant="secondary" size="lg" [href]="links.github" target="_blank">
            GitHub
          </qm-button>
          <qm-button variant="outline" size="lg" [href]="links.pypi" target="_blank">
            PyPI
          </qm-button>
        </div>

        <ul class="mq-hero__meta" role="list">
          @for (chip of heroChips; track chip) {
            <li class="mq-hero__chip">{{ chip }}</li>
          }
        </ul>
      </qm-container>
    </section>

    <!-- ═══════════════════════════════════════════════ -->
    <!-- ECOSYSTEM CONTEXT                                -->
    <!-- ═══════════════════════════════════════════════ -->
    <qm-section surface="subtle" size="sm">
      <qm-container size="narrow">
        <p class="mq-ecosystem">
          MicroQuantum is an open-source quantum software project within the QuantsMind
          technology ecosystem.
          <a routerLink="/technology" class="mq-ecosystem__link">Built by QuantsMind →</a>
        </p>
      </qm-container>
    </qm-section>

    <!-- ═══════════════════════════════════════════════ -->
    <!-- CAPABILITIES                                     -->
    <!-- ═══════════════════════════════════════════════ -->
    <qm-section surface="white">
      <qm-container>
        <div class="mq-section-head">
          <span class="mq-eyebrow">CAPABILITIES</span>
          <h2>What MicroQuantum Provides</h2>
        </div>

        <div class="mq-cap-grid">
          @for (cap of capabilities; track cap) {
            <article class="mq-cap-card">
              <div class="mq-cap-card__icon" aria-hidden="true" [innerHTML]="cap.icon | qmSafeHtml"></div>
              <h3 class="mq-cap-card__title">{{ cap.title }}</h3>
              <ul class="mq-cap-card__list" role="list">
                @for (item of cap.items; track item) {
                  <li>{{ item }}</li>
                }
              </ul>
            </article>
          }
        </div>
      </qm-container>
    </qm-section>

    <!-- ═══════════════════════════════════════════════ -->
    <!-- ARCHITECTURE                                     -->
    <!-- ═══════════════════════════════════════════════ -->
    <qm-section surface="canvas">
      <qm-container>
        <div class="mq-section-head mq-section-head--center">
          <span class="mq-eyebrow">ARCHITECTURE</span>
          <h2>How MicroQuantum Is Structured</h2>
        </div>

        <div class="mq-arch" role="img" aria-label="MicroQuantum architecture: a quantum layer and algorithms feed an execution runtime, which connects through backend abstraction to the experiment layer and analysis.">
          <div class="mq-arch__node mq-arch__node--root">MicroQuantum</div>

          <div class="mq-arch__connector" aria-hidden="true"></div>

          <div class="mq-arch__pair">
            <div class="mq-arch__col">
              <div class="mq-arch__col-head">Quantum Layer</div>
              <ul class="mq-arch__col-list" role="list">
                <li>Quantum states</li>
                <li>Gates</li>
                <li>Circuits</li>
                <li>Measurement</li>
              </ul>
            </div>
            <div class="mq-arch__hjoin" aria-hidden="true"></div>
            <div class="mq-arch__col">
              <div class="mq-arch__col-head">Algorithms</div>
              <ul class="mq-arch__col-list" role="list">
                <li>VQE</li>
                <li>QAOA</li>
                <li>Grover</li>
                <li>Phase Estimation</li>
              </ul>
            </div>
          </div>

          <div class="mq-arch__connector" aria-hidden="true"></div>

          @for (node of archNodes; track node) {
            <div class="mq-arch__node">{{ node }}</div>
            @if (!$last) {
              <div class="mq-arch__connector" aria-hidden="true"></div>
            }
          }
        </div>
      </qm-container>
    </qm-section>

    <!-- ═══════════════════════════════════════════════ -->
    <!-- DEVELOPER EXPERIENCE                             -->
    <!-- ═══════════════════════════════════════════════ -->
    <qm-section surface="white">
      <qm-container>
        <div class="mq-section-head">
          <span class="mq-eyebrow">DEVELOPER EXPERIENCE</span>
          <h2>Designed for Python Developers</h2>
        </div>

        <div class="mq-exp-grid">
          @for (exp of experience; track exp) {
            <article class="mq-exp-card">
              <h3 class="mq-exp-card__title">{{ exp.title }}</h3>
              <p class="mq-exp-card__desc">{{ exp.description }}</p>
            </article>
          }
        </div>
      </qm-container>
    </qm-section>

    <!-- ═══════════════════════════════════════════════ -->
    <!-- WORKFLOW                                         -->
    <!-- ═══════════════════════════════════════════════ -->
    <qm-section surface="subtle">
      <qm-container>
        <div class="mq-section-head">
          <span class="mq-eyebrow">WORKFLOW</span>
          <h2>From Program to Result</h2>
          <p class="mq-section-head__lead">
            A developer's typical journey through the SDK: build a program, execute it,
            experiment, and analyze what came back.
          </p>
        </div>

        <div class="mq-steps">
          @for (step of workflow; track step) {
            <div class="mq-step">
              <div class="mq-step__rail" aria-hidden="true">
                <span class="mq-step__dot"></span>
                <span class="mq-step__line"></span>
              </div>
              <div class="mq-step__body">
                <h3 class="mq-step__title">{{ step.title }}</h3>
                <p class="mq-step__desc">{{ step.description }}</p>
              </div>
            </div>
          }
        </div>
      </qm-container>
    </qm-section>

    <!-- ═══════════════════════════════════════════════ -->
    <!-- EXAMPLE CODE                                     -->
    <!-- ═══════════════════════════════════════════════ -->
    <qm-section surface="white">
      <qm-container>
        <div class="mq-section-head">
          <span class="mq-eyebrow">QUICK START</span>
          <h2>MicroQuantum in Minutes</h2>
          <p class="mq-section-head__lead">
            Build a two-qubit Bell state, run it through the executor, and inspect the
            measurement counts.
          </p>
        </div>

        <div class="mq-code">
          <div class="mq-code__head">
            <span class="mq-code__lang">Python</span>
            <button type="button" class="mq-code__copy" (click)="copyText(exampleCode)"
              [attr.aria-label]="copied() ? 'Copied' : 'Copy example code to clipboard'">
              {{ copied() ? 'Copied ✓' : 'Copy' }}
            </button>
          </div>
          <pre class="mq-code__block" aria-label="MicroQuantum Python example"><code>{{ exampleCode }}</code></pre>
        </div>

        <p class="mq-examples-note">
          More runnable examples —
          <a [href]="links.examples" target="_blank" rel="noopener noreferrer"
            class="mq-inline-link">View More Examples →</a>
        </p>
      </qm-container>
    </qm-section>

    <!-- ═══════════════════════════════════════════════ -->
    <!-- ALGORITHMS                                       -->
    <!-- ═══════════════════════════════════════════════ -->
    <qm-section surface="canvas">
      <qm-container>
        <div class="mq-section-head">
          <span class="mq-eyebrow">ALGORITHMS</span>
          <h2>Implemented Algorithm Families</h2>
          <p class="mq-section-head__lead">
            The SDK ships with working implementations of established quantum
            algorithms.
          </p>
        </div>

        <div class="mq-algo-grid">
          @for (algo of algorithms; track algo) {
            <article class="mq-algo-card">
              <span class="mq-algo-card__acronym" aria-hidden="true">{{ algo.name }}</span>
              <h3 class="mq-algo-card__name">{{ algo.fullName }}</h3>
              <p class="mq-algo-card__desc">{{ algo.description }}</p>
            </article>
          }
        </div>
      </qm-container>
    </qm-section>

    <!-- ═══════════════════════════════════════════════ -->
    <!-- EXECUTION ARCHITECTURE                           -->
    <!-- ═══════════════════════════════════════════════ -->
    <qm-section surface="white">
      <qm-container>
        <div class="mq-split">
          <div class="mq-split__text">
            <span class="mq-eyebrow">EXECUTION</span>
            <h2>Execution Architecture</h2>
            <p>
              MicroQuantum separates how a program is defined from how it is executed.
              A quantum program is turned into an execution plan, dispatched through
              the runtime, and run against a configured backend that returns a
              backend result.
            </p>
            <p>
              The <strong>backend abstraction</strong> lets quantum program
              construction stay independent of execution infrastructure. The developer
              preview ships with local simulation backends, including statevector and
              density-matrix based execution.
            </p>
          </div>

          <div class="mq-steps">
            @for (step of executionFlow; track step) {
              <div class="mq-step">
                <div class="mq-step__rail" aria-hidden="true">
                  <span class="mq-step__dot"></span>
                  <span class="mq-step__line"></span>
                </div>
                <div class="mq-step__body">
                  <h3 class="mq-step__title">{{ step.title }}</h3>
                  <p class="mq-step__desc">{{ step.description }}</p>
                </div>
              </div>
            }
          </div>
        </div>
      </qm-container>
    </qm-section>

    <!-- ═══════════════════════════════════════════════ -->
    <!-- EXPERIMENTS & ANALYSIS                           -->
    <!-- ═══════════════════════════════════════════════ -->
    <qm-section surface="canvas">
      <qm-container>
        <div class="mq-section-head">
          <span class="mq-eyebrow">EXPERIMENTS & ANALYSIS</span>
          <h2>From Execution to Insight</h2>
          <p class="mq-section-head__lead">
            Beyond single runs, MicroQuantum structures executions into records and
            experiments that can be analyzed and reproduced.
          </p>
        </div>

        <div class="mq-steps mq-steps--centered">
          @for (step of insightFlow; track step) {
            <div class="mq-step">
              <div class="mq-step__rail" aria-hidden="true">
                <span class="mq-step__dot"></span>
                <span class="mq-step__line"></span>
              </div>
              <div class="mq-step__body">
                <h3 class="mq-step__title">{{ step.title }}</h3>
                <p class="mq-step__desc">{{ step.description }}</p>
              </div>
            </div>
          }
        </div>

        <div class="mq-insight-grid">
          @for (item of insightHighlights; track item) {
            <div class="mq-insight-chip">{{ item }}</div>
          }
        </div>
      </qm-container>
    </qm-section>

    <!-- ═══════════════════════════════════════════════ -->
    <!-- RESOURCES                                        -->
    <!-- ═══════════════════════════════════════════════ -->
    <qm-section surface="white">
      <qm-container>
        <div class="mq-section-head">
          <span class="mq-eyebrow">RESOURCES</span>
          <h2>Documentation & Developer Resources</h2>
        </div>

        <div class="mq-res-grid">
          <article class="mq-res-card">
            <div class="mq-res-card__icon" aria-hidden="true" [innerHTML]="resDocs.icon | qmSafeHtml"></div>
            <h3 class="mq-res-card__title">Documentation</h3>
            <p class="mq-res-card__desc">Explore the MicroQuantum API, guides and examples.</p>
            <qm-button variant="secondary" size="sm" [href]="resDocs.href" target="_blank">
              Read Documentation →
            </qm-button>
          </article>

          <article class="mq-res-card">
            <div class="mq-res-card__icon" aria-hidden="true" [innerHTML]="resGit.icon | qmSafeHtml"></div>
            <h3 class="mq-res-card__title">Source Code</h3>
            <p class="mq-res-card__desc">Explore the implementation, tests and examples.</p>
            <qm-button variant="secondary" size="sm" [href]="resGit.href" target="_blank">
              View on GitHub →
            </qm-button>
          </article>

          <article class="mq-res-card">
            <div class="mq-res-card__icon" aria-hidden="true" [innerHTML]="resPyPi.icon | qmSafeHtml"></div>
            <h3 class="mq-res-card__title">PyPI</h3>
            <p class="mq-res-card__desc">Install the current Developer Preview from PyPI.</p>
            <qm-button variant="secondary" size="sm" [href]="resPyPi.href" target="_blank">
              Install MicroQuantum →
            </qm-button>
          </article>
        </div>
      </qm-container>
    </qm-section>

    <!-- ═══════════════════════════════════════════════ -->
    <!-- INSTALLATION                                     -->
    <!-- ═══════════════════════════════════════════════ -->
    <qm-section surface="subtle" size="sm">
      <qm-container size="narrow">
        <div class="mq-install">
          <div class="mq-install__head">
            <div>
              <span class="mq-eyebrow">INSTALLATION</span>
              <h2 class="mq-install__title">Ready to Install</h2>
            </div>
            <qm-badge variant="early-access">MicroQuantum v0.4.0</qm-badge>
          </div>
          <p class="mq-install__note">
            Requires Python 3.10–3.13. NumPy is installed automatically.
          </p>
          <div class="mq-code mq-code--compact">
            <div class="mq-code__head">
              <span class="mq-code__lang">Bash</span>
              <button type="button" class="mq-code__copy" (click)="copyText(installCommand)"
                [attr.aria-label]="installCopied() ? 'Copied' : 'Copy install command to clipboard'">
                {{ installCopied() ? 'Copied ✓' : 'Copy' }}
              </button>
            </div>
            <pre class="mq-code__block mq-code__block--single" aria-label="Install MicroQuantum with pip"><code>pip install microquantum</code></pre>
          </div>
        </div>
      </qm-container>
    </qm-section>

    <!-- ═══════════════════════════════════════════════ -->
    <!-- DEVELOPER PREVIEW NOTICE                         -->
    <!-- ═══════════════════════════════════════════════ -->
    <qm-section surface="white" size="sm">
      <qm-container size="narrow">
        <div class="mq-notice" role="note">
          <span class="mq-eyebrow">DEVELOPER PREVIEW</span>
          <h2>MicroQuantum 0.4.0 Is a Developer Preview</h2>
          <p class="mq-notice__desc">
            APIs and capabilities may evolve as the project develops. Feedback, issues
            and contributions are welcome through the project's
            <a [href]="links.issues" target="_blank" rel="noopener noreferrer" class="mq-inline-link">
              GitHub repository
            </a>.
          </p>
        </div>
      </qm-container>
    </qm-section>

    <!-- ═══════════════════════════════════════════════ -->
    <!-- WHY                                              -->
    <!-- ═══════════════════════════════════════════════ -->
    <qm-section surface="canvas">
      <qm-container>
        <div class="mq-section-head">
          <span class="mq-eyebrow">RATIONALE</span>
          <h2>Why MicroQuantum?</h2>
        </div>

        <div class="mq-why-grid">
          @for (principle of principles; track principle) {
            <article class="mq-why-card">
              <h3 class="mq-why-card__title">{{ principle.title }}</h3>
              <p class="mq-why-card__desc">{{ principle.description }}</p>
            </article>
          }
        </div>
      </qm-container>
    </qm-section>

    <!-- ═══════════════════════════════════════════════ -->
    <!-- ECOSYSTEM                                        -->
    <!-- ═══════════════════════════════════════════════ -->
    <qm-section surface="white">
      <qm-container size="narrow">
        <div class="mq-ecosystem-links">
          <span class="mq-eyebrow">ECOSYSTEM</span>
          <h2>Part of the QuantsMind Technology Ecosystem</h2>
          <p class="mq-ecosystem-links__desc">
            MicroQuantum is one of the technologies being developed within the
            QuantsMind ecosystem, alongside Karkain and the QuantsMind SDK.
          </p>
          <ul class="mq-ecosystem-links__list" role="list">
            @for (link of ecosystemLinks; track link) {
              <li>
                <a [routerLink]="link.href" class="mq-inline-link">{{ link.label }} →</a>
              </li>
            }
          </ul>
        </div>
      </qm-container>
    </qm-section>

    <!-- ═══════════════════════════════════════════════ -->
    <!-- FINAL CTA                                        -->
    <!-- ═══════════════════════════════════════════════ -->
    <section class="mq-cta" aria-label="Explore MicroQuantum">
      <qm-container size="narrow">
        <span class="mq-eyebrow mq-eyebrow--light">GET STARTED</span>
        <h2 class="mq-cta__title">Explore MicroQuantum</h2>
        <p class="mq-cta__sub">
          Start with the documentation, explore the source code, or install the
          Developer Preview.
        </p>
        <div class="mq-cta__actions">
          <qm-button variant="primary" size="lg" [href]="links.docs" target="_blank">
            Documentation →
          </qm-button>
          <qm-button variant="secondary" size="lg" [href]="links.github" target="_blank">
            GitHub
          </qm-button>
          <qm-button variant="secondary" size="lg" [href]="links.pypi" target="_blank">
            PyPI
          </qm-button>
        </div>
      </qm-container>
    </section>
    `,
    styles: [`
    /* ── Shared eyebrow / section head ─────────────────── */
    .mq-eyebrow {
      display: inline-block;
      font-size: 12px; font-weight: 600;
      letter-spacing: 0.1em; text-transform: uppercase;
      color: #2563EB; margin-bottom: 14px;
    }
    .mq-eyebrow--light { color: #93C5FD; }
    .mq-section-head { max-width: 720px; margin-bottom: 40px; }
    .mq-section-head--center { margin-left: auto; margin-right: auto; text-align: center; }
    .mq-section-head h2 {
      font-size: clamp(26px, 3vw, 36px);
      font-weight: 700; letter-spacing: -0.02em;
      color: #111827; margin: 0;
    }
    .mq-section-head__lead {
      font-size: 17px; line-height: 1.7;
      color: #475569; margin: 12px 0 0;
    }
    .mq-inline-link {
      color: #2563EB; font-weight: 500; text-decoration: none;
    }
    .mq-inline-link:hover { text-decoration: underline; }
    .mq-inline-link:focus-visible { outline: 2px solid #2563EB; outline-offset: 2px; border-radius: 2px; }

    /* ── Hero ─────────────────────────────────────────── */
    .mq-hero {
      position: relative;
      background:
        radial-gradient(900px 420px at 85% -10%, #EFF6FF 0%, rgba(239,246,255,0) 60%),
        #FFFFFF;
      border-bottom: 1px solid #E2E8F0;
      padding: 72px 0 64px;
    }
    @media (min-width: 768px) { .mq-hero { padding: 104px 0 88px; } }

    .mq-back {
      display: inline-block; margin-bottom: 28px;
      font-size: 13px; font-weight: 500;
      color: #475569; text-decoration: none;
    }
    .mq-back:hover { color: #2563EB; }

    .mq-hero__badge { margin-bottom: 20px; }
    .mq-hero__title {
      font-size: clamp(40px, 5.5vw, 60px);
      font-weight: 700; letter-spacing: -0.03em;
      line-height: 1.05; color: #111827; margin: 0 0 10px;
    }
    .mq-hero__tagline {
      font-size: 19px; font-weight: 600;
      color: #2563EB; margin: 0 0 16px;
    }
    .mq-hero__lead {
      font-size: 18px; line-height: 1.7;
      color: #475569; max-width: 600px; margin: 0 0 32px;
    }
    .mq-hero__actions {
      display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 32px;
    }
    .mq-hero__meta {
      display: flex; flex-wrap: wrap; gap: 8px;
      list-style: none; margin: 0; padding: 0;
    }
    .mq-hero__chip {
      font-size: 12px; font-weight: 500; color: #475569;
      background: #F1F5F9; border: 1px solid #E2E8F0;
      border-radius: 9999px; padding: 4px 12px;
    }

    /* ── Ecosystem band ───────────────────────────────── */
    .mq-ecosystem {
      font-size: 15px; line-height: 1.7; color: #475569;
      margin: 0; text-align: center;
    }
    .mq-ecosystem__link { margin-left: 8px; }

    /* ── Capabilities ─────────────────────────────────── */
    .mq-cap-grid {
      display: grid; grid-template-columns: 1fr; gap: 16px;
    }
    @media (min-width: 640px)  { .mq-cap-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 1024px) { .mq-cap-grid { grid-template-columns: repeat(3, 1fr); } }

    .mq-cap-card {
      padding: 26px; background: #F8FAFC;
      border: 1px solid #E2E8F0; border-radius: 12px;
      display: flex; flex-direction: column; gap: 12px;
    }
    .mq-cap-card__icon {
      width: 42px; height: 42px; border-radius: 10px;
      background: #EFF6FF; color: #2563EB;
      display: flex; align-items: center; justify-content: center;
    }
    .mq-cap-card__icon svg { width: 20px; height: 20px; }
    .mq-cap-card__title {
      font-size: 16px; font-weight: 600; color: #111827; margin: 0;
    }
    .mq-cap-card__list {
      list-style: none; margin: 0; padding: 0;
      display: flex; flex-direction: column; gap: 8px;
    }
    .mq-cap-card__list li {
      position: relative; padding-left: 18px;
      font-size: 13.5px; line-height: 1.5; color: #475569;
    }
    .mq-cap-card__list li::before {
      content: ''; position: absolute; left: 0; top: 7px;
      width: 6px; height: 6px; border-radius: 2px; background: #2563EB;
    }

    /* ── Architecture ─────────────────────────────────── */
    .mq-arch {
      background: #0F172A; border: 1px solid #1E293B;
      border-radius: 16px; padding: 32px 20px;
      display: flex; flex-direction: column; align-items: center;
    }
    .mq-arch__node {
      background: #1E293B; border: 1px solid #334155;
      border-radius: 10px; color: #E2E8F0;
      font-size: 14px; font-weight: 600;
      padding: 12px 28px; text-align: center; min-width: 200px;
    }
    .mq-arch__node--root {
      background: #2563EB; border-color: #2563EB; color: #FFF;
      font-size: 16px;
    }
    .mq-arch__connector {
      width: 2px; height: 18px; background: #334155;
    }
    .mq-arch__pair {
      display: flex; flex-direction: column;
      gap: 10px; width: 100%; max-width: 560px;
    }
    @media (min-width: 768px) {
      .mq-arch__pair { flex-direction: row; align-items: stretch; gap: 0; }
      .mq-arch__hjoin { width: 44px; position: relative; }
      .mq-arch__hjoin::before {
        content: ''; position: absolute; left: 0; right: 0; top: 50%;
        height: 2px; background: #334155;
      }
    }
    .mq-arch__col {
      flex: 1; background: #1E293B;
      border: 1px solid #334155; border-radius: 12px;
      padding: 18px 22px;
    }
    @media (max-width: 767px) {
      .mq-arch__hjoin { display: none; }
    }
    .mq-arch__col-head {
      font-size: 13px; font-weight: 700;
      letter-spacing: 0.08em; text-transform: uppercase;
      color: #93C5FD; margin-bottom: 12px;
    }
    .mq-arch__col-list {
      list-style: none; margin: 0; padding: 0;
      display: flex; flex-wrap: wrap; gap: 8px 18px;
    }
    .mq-arch__col-list li {
      font-size: 13px; color: #CBD5E1; line-height: 1.5;
    }

    /* ── Developer experience ─────────────────────────── */
    .mq-exp-grid {
      display: grid; grid-template-columns: 1fr; gap: 16px;
    }
    @media (min-width: 640px)  { .mq-exp-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 1024px) { .mq-exp-grid { grid-template-columns: repeat(4, 1fr); } }
    .mq-exp-card {
      padding: 24px; background: #F8FAFC;
      border: 1px solid #E2E8F0; border-radius: 12px;
    }
    .mq-exp-card__title {
      font-size: 15px; font-weight: 600; color: #111827; margin: 0 0 8px;
    }
    .mq-exp-card__desc { font-size: 13.5px; line-height: 1.6; color: #475569; margin: 0; }

    /* ── Stepper flow ─────────────────────────────────── */
    .mq-steps { display: flex; flex-direction: column; }
    .mq-steps--centered .mq-step { max-width: 680px; margin: 0 auto; width: 100%; }

    .mq-step {
      display: flex; gap: 16px; align-items: stretch;
    }
    .mq-step__rail {
      display: flex; flex-direction: column; align-items: center; flex-shrink: 0;
    }
    .mq-step__dot {
      width: 14px; height: 14px; border-radius: 50%;
      background: #FFFFFF; border: 3px solid #2563EB;
      flex-shrink: 0; margin-top: 4px;
    }
    .mq-step__line { flex: 1; width: 2px; background: #E2E8F0; margin: 4px 0; }
    .mq-step:last-child .mq-step__line { display: none; }
    .mq-step__body { padding-bottom: 28px; }
    .mq-step:last-child .mq-step__body { padding-bottom: 0; }
    .mq-step__title {
      font-size: 17px; font-weight: 600; color: #111827; margin: 0 0 6px;
    }
    .mq-step__desc { font-size: 14.5px; line-height: 1.6; color: #475569; margin: 0; }

    /* ── Code block ───────────────────────────────────── */
    .mq-code {
      background: #0F172A; border: 1px solid #1E293B;
      border-radius: 14px; overflow: hidden;
    }
    .mq-code__head {
      display: flex; align-items: center; justify-content: space-between;
      padding: 10px 16px; border-bottom: 1px solid #1E293B;
      background: #111B2E;
    }
    .mq-code__lang {
      font-size: 11px; font-weight: 600; letter-spacing: 0.1em;
      text-transform: uppercase; color: #94A3B8;
    }
    .mq-code__copy {
      font-family: inherit; font-size: 12px; font-weight: 500;
      color: #94A3B8; border: 1px solid #334155; background: transparent;
      border-radius: 6px; padding: 5px 12px; cursor: pointer;
      transition: color 150ms ease, border-color 150ms ease;
    }
    .mq-code__copy:hover { color: #FFF; border-color: #94A3B8; }
    .mq-code__copy:focus-visible { outline: 2px solid #93C5FD; outline-offset: 2px; }
    .mq-code__block {
      margin: 0; padding: 20px 22px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      font-size: 13.5px; line-height: 1.65;
      color: #E2E8F0; white-space: pre; overflow-x: auto;
    }
    .mq-code__block--single { padding: 18px 22px; font-weight: 500; color: #93C5FD; }
    .mq-examples-note { font-size: 14px; color: #64748B; margin: 18px 0 0; }

    /* ── Algorithms ───────────────────────────────────── */
    .mq-algo-grid {
      display: grid; grid-template-columns: 1fr; gap: 16px;
    }
    @media (min-width: 640px)  { .mq-algo-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 1024px) { .mq-algo-grid { grid-template-columns: repeat(4, 1fr); } }

    .mq-algo-card {
      padding: 24px; background: #FFFFFF;
      border: 1px solid #E2E8F0; border-radius: 12px;
      display: flex; flex-direction: column; gap: 8px;
    }
    .mq-algo-card__acronym {
      display: inline-flex; align-items: center;
      width: fit-content; padding: 2px 10px;
      font-size: 12px; font-weight: 700;
      background: #EFF6FF; color: #1D4ED8;
      border: 1px solid #BFDBFE; border-radius: 6px;
    }
    .mq-algo-card__name {
      font-size: 15px; font-weight: 600; color: #111827; margin: 0;
    }
    .mq-algo-card__desc { font-size: 13.5px; line-height: 1.6; color: #475569; margin: 0; }

    /* ── Split (execution) ────────────────────────────── */
    .mq-split {
      display: grid; grid-template-columns: 1fr; gap: 40px; align-items: start;
    }
    @media (min-width: 1024px) { .mq-split { grid-template-columns: 1fr 1fr; } }
    .mq-split__text p {
      font-size: 15.5px; line-height: 1.75; color: #475569; margin: 0 0 16px;
    }
    .mq-split__text p:last-child { margin: 0; }

    /* ── Insight chips ────────────────────────────────── */
    .mq-insight-grid {
      display: flex; flex-wrap: wrap; gap: 10px;
      margin-top: 40px; justify-content: center;
    }
    .mq-insight-chip {
      padding: 8px 16px; background: #FFFFFF;
      border: 1px solid #E2E8F0; border-radius: 9999px;
      font-size: 13px; font-weight: 500; color: #475569;
    }

    /* ── Resources ────────────────────────────────────── */
    .mq-res-grid {
      display: grid; grid-template-columns: 1fr; gap: 16px;
    }
    @media (min-width: 768px) { .mq-res-grid { grid-template-columns: repeat(3, 1fr); } }
    .mq-res-card {
      padding: 28px; background: #F8FAFC;
      border: 1px solid #E2E8F0; border-radius: 12px;
      display: flex; flex-direction: column; align-items: flex-start; gap: 12px;
    }
    .mq-res-card__icon {
      width: 42px; height: 42px; border-radius: 10px;
      background: #EFF6FF; color: #2563EB;
      display: flex; align-items: center; justify-content: center;
    }
    .mq-res-card__icon svg { width: 20px; height: 20px; }
    .mq-res-card__title { font-size: 16px; font-weight: 600; color: #111827; margin: 0; }
    .mq-res-card__desc { font-size: 14px; line-height: 1.6; color: #475569; margin: 0; flex: 1; }

    /* ── Install ──────────────────────────────────────── */
    .mq-install__head {
      display: flex; align-items: flex-start; justify-content: space-between;
      flex-wrap: wrap; gap: 12px; margin-bottom: 12px;
    }
    .mq-install__title {
      font-size: clamp(22px, 2.6vw, 28px); font-weight: 700;
      color: #111827; margin: 0;
    }
    .mq-install__note {
      font-size: 14px; color: #64748B; margin: 0 0 16px;
    }

    /* ── Preview notice ───────────────────────────────── */
    .mq-notice {
      background: #F8FAFC; border: 1px solid #E2E8F0;
      border-left: 4px solid #2563EB;
      border-radius: 12px; padding: 28px 32px;
    }
    .mq-notice h2 {
      font-size: 19px; font-weight: 600; color: #111827; margin: 0 0 8px;
    }
    .mq-notice__desc { font-size: 15px; line-height: 1.7; color: #475569; margin: 0; }

    /* ── Why ──────────────────────────────────────────── */
    .mq-why-grid {
      display: grid; grid-template-columns: 1fr; gap: 16px;
    }
    @media (min-width: 640px)  { .mq-why-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 1024px) { .mq-why-grid { grid-template-columns: repeat(4, 1fr); } }
    .mq-why-card {
      padding: 24px; background: #FFFFFF;
      border: 1px solid #E2E8F0; border-radius: 12px;
    }
    .mq-why-card__title {
      font-size: 15px; font-weight: 600; color: #111827; margin: 0 0 8px;
    }
    .mq-why-card__desc { font-size: 13.5px; line-height: 1.6; color: #475569; margin: 0; }

    /* ── Ecosystem links ──────────────────────────────── */
    .mq-ecosystem-links {
      text-align: center; display: flex; flex-direction: column; align-items: center;
    }
    .mq-ecosystem-links h2 { margin: 0 0 12px; }
    .mq-ecosystem-links__desc { font-size: 16px; line-height: 1.7; color: #475569; max-width: 620px; margin: 0 0 24px; }
    .mq-ecosystem-links__list {
      list-style: none; display: flex; flex-wrap: wrap; justify-content: center;
      gap: 12px 28px; margin: 0; padding: 0;
    }

    /* ── Final CTA ────────────────────────────────────── */
    .mq-cta {
      background: #0F172A; padding: 88px 0;
      border-top: 1px solid #1E293B;
    }
    @media (min-width: 768px) { .mq-cta { padding: 112px 0; } }
    .mq-cta__title {
      font-size: clamp(28px, 3.5vw, 42px); font-weight: 700;
      color: #F1F5F9; margin: 0 0 16px; text-align: center;
    }
    .mq-cta__sub {
      font-size: 17px; line-height: 1.7; color: #94A3B8;
      max-width: 560px; margin: 0 auto 32px; text-align: center;
    }
    .mq-cta__actions {
      display: flex; flex-wrap: wrap; gap: 12px; justify-content: center;
    }
  `]
})
export class MicroQuantumComponent {
  copied = signal(false);
  installCopied = signal(false);

  readonly exampleCode = [
    'from microquantum import Executor, QuantumCircuit, StatevectorBackend',
    '',
    'qc = QuantumCircuit(2)',
    'qc.h(0)        # Hadamard on qubit 0',
    'qc.cx(0, 1)    # CNOT (control=0, target=1)',
    '',
    'result = Executor(backend=StatevectorBackend()).run(qc, shots=1024)',
    "print(result.counts)          # {'00': ~512, '11': ~512}",
    "print(result.most_frequent()) # '00' or '11'"
  ].join('\n');

  readonly installCommand = 'pip install microquantum';

  readonly links: Record<'docs' | 'github' | 'pypi' | 'issues' | 'examples', string> = {
    docs:     'https://ajit-ai.github.io/microquantum/',
    github:   'https://github.com/ajit-ai/microquantum',
    pypi:     'https://pypi.org/project/microquantum/',
    issues:   'https://github.com/ajit-ai/microquantum/issues',
    examples: 'https://github.com/ajit-ai/microquantum/tree/main/examples'
  };

  readonly heroChips = [
    'Open source',
    'MIT License',
    'Python 3.10–3.13',
    'NumPy-only'
  ];

  readonly capabilities: Capability[] = [
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 0 1 10 10c0 4-4 8-10 10S2 16 2 12 4 2 12 2z"/><path d="M12 6v6l-4 2"/></svg>`,
      title: 'Quantum Foundations',
      items: ['Quantum states', 'Gates', 'Circuits', 'Measurement', 'Tensor operations']
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
      title: 'Algorithms',
      items: ['VQE', 'QAOA', 'Grover', 'Phase Estimation']
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
      title: 'Execution',
      items: ['Execution plans', 'Runtime execution', 'Backend abstraction', 'Local execution', 'Result handling']
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6M10 3v6l-5 8a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-8V3"/></svg>`,
      title: 'Experiments',
      items: ['Experiments', 'Execution records', 'Parameter sweeps', 'Reproducibility', 'Execution status / failure info']
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 14l4-4 3 3 5-6"/></svg>`,
      title: 'Analysis',
      items: ['Sampling analysis', 'Expectation analysis', 'State analysis', 'Result aggregation', 'Statistics']
    }
  ];

  readonly archNodes = [
    'Execution Runtime',
    'Backend Abstraction',
    'Experiment Layer',
    'Analysis'
  ];

  readonly experience = [
    { title: 'Python Native', description: 'Built as a Python SDK and designed to fit naturally into Python development workflows.' },
    { title: 'Composable', description: 'Quantum programs, execution, experiments and analysis are separated into reusable building blocks.' },
    { title: 'Backend Independent', description: 'The backend abstraction separates quantum program construction from execution infrastructure.' },
    { title: 'Reproducible', description: 'Experiment execution supports structured records and reproducibility-oriented metadata.' }
  ];

  readonly workflow: FlowStep[] = [
    { title: 'Build', description: 'Construct circuits, states, gates and quantum programs.' },
    { title: 'Execute', description: 'Create execution plans and run against available backends.' },
    { title: 'Experiment', description: 'Run structured experiments and parameter sweeps.' },
    { title: 'Analyze', description: 'Inspect samples, expectations, states and aggregated results.' }
  ];

  readonly executionFlow: FlowStep[] = [
    { title: 'Quantum Program', description: 'A circuit or algorithm expressed with the SDK core.' },
    { title: 'Execution Plan', description: 'How and where the program should run.' },
    { title: 'Runtime', description: 'Coordinates execution against a backend.' },
    { title: 'Backend', description: 'A concrete execution target, such as a local simulator.' },
    { title: 'Backend Result', description: 'Typed results returned for analysis.' }
  ];

  readonly insightFlow: FlowStep[] = [
    { title: 'Execution', description: 'A single run against a backend.' },
    { title: 'Execution Record', description: 'A structured record of what ran and why.' },
    { title: 'Experiment', description: 'Structured runs, including parameter sweeps.' },
    { title: 'Analysis', description: 'Sampling, expectation and state analysis.' },
    { title: 'Result', description: 'Aggregated results and statistics.' }
  ];

  readonly insightHighlights = [
    'Structured execution records',
    'Parameter sweeps',
    'Reproducibility',
    'Sampling analysis',
    'Expectation analysis',
    'State analysis',
    'Result aggregation'
  ];

  readonly algorithms: Algorithm[] = [
    { name: 'VQE', fullName: 'Variational Quantum Eigensolver', description: 'A variational approach for estimating ground state energies.' },
    { name: 'QAOA', fullName: 'Quantum Approximate Optimization Algorithm', description: 'A parameterized hybrid approach for combinatorial optimization.' },
    { name: 'Grover', fullName: 'Quantum Search', description: 'A quantum search algorithm for unstructured search problems.' },
    { name: 'Phase Estimation', fullName: 'Quantum Phase Estimation', description: 'Estimating the eigenvalues of a unitary operator.' }
  ];

  readonly principles: Principle[] = [
    { title: 'Developer First', description: 'Designed around practical Python development.' },
    { title: 'Clear Abstractions', description: 'Separate quantum programs, execution, experiments and analysis.' },
    { title: 'Open Foundation', description: 'The core SDK is openly available to developers.' },
    { title: 'Extensible Architecture', description: 'Designed to evolve toward additional execution and technology integrations.' }
  ];

  readonly resDocs: LinkItem & { icon: string } = {
    label: 'docs',
    href: this.links.docs,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`
  };

  readonly resGit: LinkItem & { icon: string } = {
    label: 'github',
    href: this.links.github,
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.16 1.18a11 11 0 0 1 5.75 0c2.2-1.49 3.16-1.18 3.16-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.66.41.36.78 1.06.78 2.14v3.17c0 .3.21.67.8.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/></svg>`
  };

  readonly resPyPi: LinkItem & { icon: string } = {
    label: 'pypi',
    href: this.links.pypi,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3h8a3 3 0 0 1 3 3v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a3 3 0 0 1 3-3z"/><path d="M9 2v2M15 2v2M9 12h6M9 16h6"/></svg>`
  };

  readonly ecosystemLinks: LinkItem[] = [
    { label: 'Technology Ecosystem', href: '/technology' },
    { label: 'Karkain', href: '/karkain' },
    { label: 'QuantsMind SDK', href: '/quantsmind-sdk' }
  ];

  copyText(text: string): void {
    const done = () => {
      this.copied.set(true);
      this.installCopied.set(true);
      setTimeout(() => {
        this.copied.set(false);
        this.installCopied.set(false);
      }, 1800);
    };

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(() => this.fallbackCopy(text, done));
    } else {
      this.fallbackCopy(text, done);
    }
  }

  private fallbackCopy(text: string, done: () => void): void {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      done();
    } catch {
      /* clipboard unavailable — do nothing */
    }
  }
}