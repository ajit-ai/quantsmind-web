import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

import { RouterModule } from '@angular/router';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../shared/components/qm-section/qm-section.component';
import { QmButtonComponent }    from '../../shared/components/qm-button/qm-button.component';
import { QmBadgeComponent }     from '../../shared/components/qm-badge/qm-badge.component';
import { QmPageHeroComponent }  from '../../shared/components/qm-page-hero/qm-page-hero.component';
import { QmRevealDirective }    from '../../shared/directives/qm-reveal.directive';
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
    imports: [RouterModule, QmContainerComponent, QmSectionComponent, QmButtonComponent, QmBadgeComponent, QmPageHeroComponent, QmRevealDirective, SafeHtmlPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <!-- ═══════════════════════════════════════════════ -->
    <!-- HERO                                             -->
    <!-- ═══════════════════════════════════════════════ -->
    <qm-page-hero
      eyebrow="MICROQUANTUM"
      title="MicroQuantum"
      lead="Quantum computing, built for developers."
      tone="quantum"
      art="none"
      [hasProjectedArt]="true">
      <div heroBadge class="mq-hero__badges">
        <a routerLink="/technology" class="mq-back">&larr; Technology Ecosystem</a>
        <qm-badge variant="experimental">Developer Preview · v1.1.0</qm-badge>
      </div>
      <p heroLead class="mq-hero__note">
        An open Python SDK for building, executing and analyzing quantum programs.
      </p>
      <div heroActions class="mq-hero__actions">
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
      <ul heroMeta class="mq-hero__meta" role="list">
        @for (chip of heroChips; track chip) {
          <li class="mq-hero__chip">{{ chip }}</li>
        }
      </ul>
      <div heroArt class="mq-hero-art" aria-hidden="true">
        <div class="mq-hero-art__panel">
          <div class="mq-hero-art__head">
            <span class="mq-hero-art__signal"><i></i> quantum circuit</span>
            <span class="mq-hero-art__badge">bell state</span>
          </div>
          <svg class="mq-hero-art__svg" viewBox="0 0 420 250" focusable="false">
            <g class="mq-hero-art__wires">
              <text x="14" y="85" class="mq-hero-art__qubit">q0</text>
              <text x="14" y="165" class="mq-hero-art__qubit">q1</text>
              <line x1="48" y1="80" x2="392" y2="80"/>
              <line x1="48" y1="160" x2="392" y2="160"/>
            </g>
            <g class="mq-hero-art__pulses">
              <line x1="48" y1="80" x2="392" y2="80"/>
              <line x1="48" y1="160" x2="392" y2="160"/>
            </g>
            <rect x="92" y="60" width="40" height="40" rx="9" class="mq-hero-art__gate"/>
            <text x="112" y="86" text-anchor="middle" class="mq-hero-art__gate-label">H</text>
            <circle cx="188" cy="80" r="5" class="mq-hero-art__control"/>
            <line x1="188" y1="80" x2="188" y2="160" class="mq-hero-art__cnot"/>
            <circle cx="188" cy="160" r="15" class="mq-hero-art__target"/>
            <line x1="173" y1="160" x2="203" y2="160" class="mq-hero-art__cnot"/>
            <line x1="188" y1="145" x2="188" y2="175" class="mq-hero-art__cnot"/>
            <line x1="248" y1="44" x2="248" y2="196" class="mq-hero-art__barrier"/>
            <rect x="286" y="60" width="48" height="40" rx="9" class="mq-hero-art__measure"/>
            <path d="M299 86a11 11 0 0 1 22 0" class="mq-hero-art__meter"/>
            <line x1="299" y1="86" x2="321" y2="70" class="mq-hero-art__meter"/>
            <rect x="286" y="140" width="48" height="40" rx="9" class="mq-hero-art__measure"/>
            <path d="M299 166a11 11 0 0 1 22 0" class="mq-hero-art__meter"/>
            <line x1="299" y1="166" x2="321" y2="150" class="mq-hero-art__meter"/>
            <text x="310" y="216" text-anchor="middle" class="mq-hero-art__shots">1024 shots</text>
          </svg>
          <div class="mq-hero-art__foot">
            <span>|00⟩ → (|00⟩ + |11⟩)/√2</span>
            <span>statevector</span>
          </div>
        </div>
        <span class="mq-hero-art__chip mq-hero-art__chip--a">NumPy-only</span>
        <span class="mq-hero-art__chip mq-hero-art__chip--b">VQE · QAOA</span>
      </div>
    </qm-page-hero>

    <!-- ═══════════════════════════════════════════════ -->
    <!-- ECOSYSTEM CONTEXT                                -->
    <!-- ═══════════════════════════════════════════════ -->
    <qm-section surface="subtle" size="sm">
      <qm-container size="narrow">
        <p class="mq-ecosystem" qmReveal>
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
        <div class="mq-section-head" qmReveal>
          <span class="mq-eyebrow">CAPABILITIES</span>
          <h2>What MicroQuantum Provides</h2>
        </div>

        <div class="mq-cap-grid">
          @for (cap of capabilities; track cap; let i = $index) {
            <article class="mq-cap-card" qmReveal [qmRevealDelay]="i * 60">
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
        <div class="mq-section-head mq-section-head--center" qmReveal>
          <span class="mq-eyebrow">ARCHITECTURE</span>
          <h2>How MicroQuantum Is Structured</h2>
        </div>

        <div class="mq-arch" role="img" aria-label="MicroQuantum architecture: a quantum layer and algorithms feed an execution runtime, which connects through backend abstraction to the experiment layer and analysis." qmReveal [qmRevealDelay]="80">
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
        <div class="mq-section-head" qmReveal>
          <span class="mq-eyebrow">DEVELOPER EXPERIENCE</span>
          <h2>Designed for Python Developers</h2>
        </div>

        <div class="mq-exp-grid">
          @for (exp of experience; track exp; let i = $index) {
            <article class="mq-exp-card" qmReveal [qmRevealDelay]="i * 55">
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
        <div class="mq-section-head" qmReveal>
          <span class="mq-eyebrow">WORKFLOW</span>
          <h2>From Program to Result</h2>
          <p class="mq-section-head__lead">
            A developer's typical journey through the SDK: build a program, execute it,
            experiment, and analyze what came back.
          </p>
        </div>

        <div class="mq-steps">
          @for (step of workflow; track step; let i = $index) {
            <div class="mq-step" qmReveal [qmRevealDelay]="i * 60">
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
        <div class="mq-section-head" qmReveal>
          <span class="mq-eyebrow">QUICK START</span>
          <h2>MicroQuantum in Minutes</h2>
          <p class="mq-section-head__lead">
            Build a two-qubit Bell state, run it through the executor, and inspect the
            measurement counts.
          </p>
        </div>

        <div class="mq-code" qmReveal>
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
        <div class="mq-section-head" qmReveal>
          <span class="mq-eyebrow">ALGORITHMS</span>
          <h2>Implemented Algorithm Families</h2>
          <p class="mq-section-head__lead">
            The SDK ships with working implementations of established quantum
            algorithms.
          </p>
        </div>

        <div class="mq-algo-grid">
          @for (algo of algorithms; track algo; let i = $index) {
            <article class="mq-algo-card" qmReveal [qmRevealDelay]="i * 55">
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
          <div class="mq-split__text" qmReveal>
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
              construction stay independent of execution infrastructure. The current
              release ships with local simulation backends, including statevector and
              density-matrix based execution.
            </p>
          </div>

          <div class="mq-steps" qmReveal [qmRevealDelay]="90">
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
        <div class="mq-section-head" qmReveal>
          <span class="mq-eyebrow">EXPERIMENTS &amp; ANALYSIS</span>
          <h2>From Execution to Insight</h2>
          <p class="mq-section-head__lead">
            Beyond single runs, MicroQuantum structures executions into records and
            experiments that can be analyzed and reproduced.
          </p>
        </div>

        <div class="mq-steps mq-steps--centered" qmReveal [qmRevealDelay]="80">
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

        <div class="mq-insight-grid" qmReveal>
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
        <div class="mq-section-head" qmReveal>
          <span class="mq-eyebrow">RESOURCES</span>
          <h2>Documentation &amp; Developer Resources</h2>
        </div>

        <div class="mq-res-grid">
          <article class="mq-res-card" qmReveal>
            <div class="mq-res-card__icon" aria-hidden="true" [innerHTML]="resDocs.icon | qmSafeHtml"></div>
            <h3 class="mq-res-card__title">Documentation</h3>
            <p class="mq-res-card__desc">Explore the MicroQuantum API, guides and examples.</p>
            <qm-button variant="secondary" size="sm" [href]="resDocs.href" target="_blank">
              Read Documentation →
            </qm-button>
          </article>

          <article class="mq-res-card" qmReveal [qmRevealDelay]="70">
            <div class="mq-res-card__icon" aria-hidden="true" [innerHTML]="resGit.icon | qmSafeHtml"></div>
            <h3 class="mq-res-card__title">Source Code</h3>
            <p class="mq-res-card__desc">Explore the implementation, tests and examples.</p>
            <qm-button variant="secondary" size="sm" [href]="resGit.href" target="_blank">
              View on GitHub →
            </qm-button>
          </article>

          <article class="mq-res-card" qmReveal [qmRevealDelay]="140">
            <div class="mq-res-card__icon" aria-hidden="true" [innerHTML]="resPyPi.icon | qmSafeHtml"></div>
            <h3 class="mq-res-card__title">PyPI</h3>
            <p class="mq-res-card__desc">Install the current published release from PyPI.</p>
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
        <div class="mq-install" qmReveal>
          <div class="mq-install__head">
            <div>
              <span class="mq-eyebrow">INSTALLATION</span>
              <h2 class="mq-install__title">Ready to Install</h2>
            </div>
            <qm-badge variant="experimental">MicroQuantum v1.1.0</qm-badge>
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
    <!-- RELEASE STATUS                                  -->
    <!-- ═══════════════════════════════════════════════ -->
    <qm-section surface="white" size="sm">
      <qm-container size="narrow">
        <div class="mq-notice" role="note" qmReveal>
          <span class="mq-eyebrow">RELEASE STATUS</span>
          <h2>MicroQuantum 1.1.0 Is a Published Public Release</h2>
          <p class="mq-notice__desc">
            Version 1.1.0 is published on PyPI as a final release, so
            <code>pip install microquantum</code> gives you a pinned, published package.
            Individual capabilities still evolve between releases, and we keep
            developing the SDK beyond 1.1.0. Feedback, issues and contributions are
            welcome through the project's
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
        <div class="mq-section-head" qmReveal>
          <span class="mq-eyebrow">RATIONALE</span>
          <h2>Why MicroQuantum?</h2>
        </div>

        <div class="mq-why-grid">
          @for (principle of principles; track principle; let i = $index) {
            <article class="mq-why-card" qmReveal [qmRevealDelay]="i * 55">
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
        <div class="mq-eco-band" qmReveal>
          <span class="mq-eyebrow">ECOSYSTEM</span>
          <h2>Part of the QuantsMind Technology Ecosystem</h2>
          <p class="mq-eco-band__desc">
            MicroQuantum is one of the technologies being developed within the
            QuantsMind ecosystem, alongside Karkain and the QuantsMind SDK.
          </p>
          <ul class="mq-eco-band__list" role="list">
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
    <qm-section surface="canvas" size="sm" ariaLabel="Explore MicroQuantum">
      <qm-container size="narrow">
        <div class="qm-cta-band" qmReveal>
          <span class="eyebrow">GET STARTED</span>
          <h2>Explore MicroQuantum</h2>
          <p>
            Start with the documentation, explore the source code, or install the
            current published release.
          </p>
          <div class="qm-cta-band__actions">
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
        </div>
      </qm-container>
    </qm-section>
    `,
    styles: [`
    /* ── Shared eyebrow / section head ─────────────────── */
    .mq-eyebrow {
      display: inline-block;
      font-size: 12px; font-weight: 600;
      letter-spacing: 0.1em; text-transform: uppercase;
      color: #2563EB; margin-bottom: 14px;
    }
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
    .mq-hero__badges { display: flex; flex-direction: column; align-items: flex-start; gap: 14px; margin-bottom: 22px; }
    .mq-back {
      display: inline-block;
      font-size: 13px; font-weight: 500; color: #64748B; text-decoration: none;
      transition: color 160ms ease, transform 160ms ease;
    }
    .mq-back:hover { color: #2563EB; transform: translateX(-2px); }
    .mq-hero__note {
      margin: 22px 0 0; max-width: 620px;
      font-size: 16px; line-height: 1.75; color: #475569;
      text-wrap: pretty;
    }
    .mq-hero__actions { display: flex; flex-wrap: wrap; gap: 12px; }
    .mq-hero__meta {
      display: flex; flex-wrap: wrap; gap: 8px;
      list-style: none; margin: 28px 0 0; padding: 0;
    }
    .mq-hero__chip {
      font-size: 12px; font-weight: 500; color: #475569;
      background: rgba(255, 255, 255, 0.7); border: 1px solid #E2E8F0;
      border-radius: 9999px; padding: 6px 13px;
      backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
    }

    /* ── Hero circuit artwork ─────────────────────────── */
    .mq-hero-art { position: relative; width: 100%; max-width: 460px; margin: 0 auto; padding: 18px 10px; }
    .mq-hero-art__panel {
      position: relative; z-index: 2; overflow: hidden;
      border-radius: var(--radius-xl);
      border: 1px solid var(--color-ink-border);
      background:
        radial-gradient(420px 260px at 100% 0%, rgba(6, 182, 212, 0.20), transparent 62%),
        var(--gradient-ink);
      box-shadow: var(--shadow-float);
    }
    .mq-hero-art__head {
      display: flex; align-items: center; justify-content: space-between; gap: 12px;
      padding: 12px 16px;
      border-bottom: 1px solid var(--color-ink-border);
      background: rgba(11, 27, 51, 0.55);
    }
    .mq-hero-art__signal {
      display: inline-flex; align-items: center; gap: 8px;
      font-size: 9px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
      color: var(--color-ink-muted);
    }
    .mq-hero-art__signal i {
      width: 6px; height: 6px; border-radius: 50%;
      background: var(--color-cyan);
      box-shadow: 0 0 0 4px rgba(6, 182, 212, 0.12);
      animation: qm-signal-pulse 2.4s ease-in-out infinite;
    }
    .mq-hero-art__badge {
      padding: 3px 8px; border-radius: 999px;
      border: 1px solid rgba(103, 232, 249, 0.28);
      background: rgba(6, 182, 212, 0.12);
      color: var(--color-cyan-soft);
      font-size: 9px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
    }
    .mq-hero-art__svg {
      display: block; width: 100%; height: auto; padding: 6px 0 0;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
    }
    .mq-hero-art__wires line { stroke: rgba(148, 197, 255, 0.22); stroke-width: 1.5; }
    .mq-hero-art__qubit { fill: var(--color-ink-muted); font-size: 12px; }
    .mq-hero-art__pulses line {
      stroke: var(--color-cyan-soft); stroke-width: 2;
      stroke-dasharray: 3 26; opacity: 0.9;
      animation: mq-dash 2.6s linear infinite;
    }
    @keyframes mq-dash { to { stroke-dashoffset: -58; } }
    .mq-hero-art__gate { fill: rgba(37, 99, 235, 0.22); stroke: rgba(103, 232, 249, 0.55); stroke-width: 1.5; }
    .mq-hero-art__gate-label { fill: #EAF2FF; font-size: 18px; font-weight: 700; }
    .mq-hero-art__control { fill: var(--color-cyan-soft); }
    .mq-hero-art__cnot { stroke: rgba(103, 232, 249, 0.55); stroke-width: 1.5; }
    .mq-hero-art__target { fill: rgba(37, 99, 235, 0.18); stroke: rgba(103, 232, 249, 0.6); stroke-width: 1.5; }
    .mq-hero-art__barrier { stroke: rgba(148, 197, 255, 0.18); stroke-width: 1; stroke-dasharray: 4 5; }
    .mq-hero-art__measure { fill: rgba(11, 27, 51, 0.72); stroke: rgba(148, 197, 255, 0.28); stroke-width: 1.5; }
    .mq-hero-art__meter { fill: none; stroke: var(--color-ink-muted); stroke-width: 1.5; stroke-linecap: round; }
    .mq-hero-art__shots { fill: var(--color-ink-muted); font-size: 10px; letter-spacing: 0.08em; }
    .mq-hero-art__foot {
      display: flex; align-items: center; justify-content: space-between; gap: 12px;
      padding: 12px 16px;
      border-top: 1px solid var(--color-ink-border);
      background: rgba(255, 255, 255, 0.03);
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 10px; color: var(--color-ink-muted);
    }
    .mq-hero-art__foot span:last-child { color: var(--color-cyan-soft); }
    .mq-hero-art__chip {
      position: absolute; z-index: 3;
      display: inline-flex; align-items: center; gap: 7px;
      padding: 7px 11px; border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.9);
      background: rgba(255, 255, 255, 0.9);
      box-shadow: var(--shadow-lg);
      backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
      font-size: 10px; font-weight: 600; color: #475569; white-space: nowrap;
      animation: qm-float 8s ease-in-out infinite;
    }
    .mq-hero-art__chip::before {
      content: ''; width: 6px; height: 6px; border-radius: 50%;
      background: var(--color-cyan);
      box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.10);
    }
    .mq-hero-art__chip--a { top: 2px; right: -2px; animation-delay: -2s; }
    .mq-hero-art__chip--b { bottom: 2px; left: -6px; animation-delay: -5s; }

    /* ── Ecosystem band ───────────────────────────────── */
    .mq-ecosystem {
      font-size: 15px; line-height: 1.7; color: #475569;
      margin: 0; text-align: center;
    }
    .mq-ecosystem__link { margin-left: 8px; }

    /* ── Capabilities ─────────────────────────────────── */
    .mq-cap-grid, .mq-exp-grid, .mq-algo-grid, .mq-res-grid, .mq-why-grid {
      display: grid; grid-template-columns: 1fr; gap: 16px;
    }
    @media (min-width: 640px) {
      .mq-cap-grid, .mq-exp-grid, .mq-algo-grid, .mq-why-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (min-width: 768px) { .mq-res-grid { grid-template-columns: repeat(3, 1fr); } }
    @media (min-width: 1024px) {
      .mq-cap-grid { grid-template-columns: repeat(3, 1fr); }
      .mq-exp-grid, .mq-algo-grid, .mq-why-grid { grid-template-columns: repeat(4, 1fr); }
    }

    .mq-cap-card { padding: 26px; display: flex; flex-direction: column; gap: 12px; }
    .mq-cap-card__icon, .mq-res-card__icon {
      width: 42px; height: 42px; border-radius: 10px;
      background: #EFF6FF; color: #2563EB;
      display: flex; align-items: center; justify-content: center;
    }
    .mq-cap-card__icon svg, .mq-res-card__icon svg { width: 20px; height: 20px; }
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
      position: relative; overflow: hidden;
      background:
        radial-gradient(620px 320px at 82% 0%, rgba(37, 99, 235, 0.20), transparent 62%),
        radial-gradient(420px 260px at 4% 110%, rgba(6, 182, 212, 0.12), transparent 62%),
        var(--gradient-ink);
      border: 1px solid var(--color-ink-border);
      border-radius: var(--radius-2xl); padding: 32px 20px;
      box-shadow: var(--shadow-float);
      display: flex; flex-direction: column; align-items: center;
    }
    .mq-arch::before {
      content: ''; position: absolute; inset: 0; pointer-events: none;
      background-image:
        linear-gradient(to right, rgba(148, 197, 255, 0.055) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(148, 197, 255, 0.055) 1px, transparent 1px);
      background-size: 56px 56px;
      mask-image: radial-gradient(ellipse 70% 80% at 76% 0%, #000, transparent 72%);
      -webkit-mask-image: radial-gradient(ellipse 70% 80% at 76% 0%, #000, transparent 72%);
    }
    .mq-arch > * { position: relative; }
    .mq-arch__node {
      background: rgba(11, 27, 51, 0.72); border: 1px solid var(--color-ink-border);
      border-radius: 10px; color: var(--color-ink-text);
      font-size: 14px; font-weight: 600;
      padding: 12px 28px; text-align: center; min-width: 200px;
      backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
    }
    .mq-arch__node--root {
      background: linear-gradient(135deg, #2563EB, #06B6D4);
      border-color: transparent; color: #FFF;
      font-size: 16px;
      box-shadow: 0 14px 32px -16px rgba(6, 182, 212, 0.75);
    }
    .mq-arch__connector {
      width: 2px; height: 18px; background: rgba(148, 197, 255, 0.28);
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
        height: 2px; background: rgba(148, 197, 255, 0.28);
      }
    }
    .mq-arch__col {
      flex: 1; background: rgba(11, 27, 51, 0.72);
      border: 1px solid var(--color-ink-border); border-radius: var(--radius-lg);
      padding: 18px 22px;
      backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
    }
    @media (max-width: 767px) {
      .mq-arch__hjoin { display: none; }
    }
    .mq-arch__col-head {
      font-size: 13px; font-weight: 700;
      letter-spacing: 0.08em; text-transform: uppercase;
      color: var(--color-cyan-soft); margin-bottom: 12px;
    }
    .mq-arch__col-list {
      list-style: none; margin: 0; padding: 0;
      display: flex; flex-wrap: wrap; gap: 8px 18px;
    }
    .mq-arch__col-list li {
      font-size: 13px; color: var(--color-ink-muted); line-height: 1.5;
    }

    /* ── Developer experience ─────────────────────────── */
    .mq-exp-card { padding: 24px; }
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
    .mq-algo-card {
      padding: 24px; display: flex; flex-direction: column; gap: 8px;
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
    .mq-res-card {
      padding: 28px; display: flex; flex-direction: column; align-items: flex-start; gap: 12px;
    }
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
    .mq-why-card { padding: 24px; }
    .mq-why-card__title {
      font-size: 15px; font-weight: 600; color: #111827; margin: 0 0 8px;
    }
    .mq-why-card__desc { font-size: 13.5px; line-height: 1.6; color: #475569; margin: 0; }

    /* ── Shared card treatment ────────────────────────── */
    .mq-cap-card, .mq-exp-card, .mq-algo-card, .mq-res-card, .mq-why-card {
      position: relative; overflow: hidden;
      background: #F8FAFC; border: 1px solid #E2E8F0;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-xs);
      transition: transform 260ms var(--qm-ease-out), box-shadow 260ms var(--qm-ease-out), border-color 260ms ease;
    }
    .mq-algo-card, .mq-why-card { background: #FFFFFF; }
    .mq-cap-card::before, .mq-exp-card::before, .mq-algo-card::before, .mq-res-card::before, .mq-why-card::before {
      content: ''; position: absolute; inset: 0 0 auto; height: 3px;
      background: var(--gradient-signal); opacity: 0.65;
    }
    .mq-cap-card:hover, .mq-exp-card:hover, .mq-algo-card:hover, .mq-res-card:hover, .mq-why-card:hover {
      transform: translateY(-3px); box-shadow: var(--shadow-lg); border-color: rgba(37, 99, 235, 0.24);
    }

    /* ── Ecosystem band ───────────────────────────────── */
    .mq-eco-band {
      position: relative; overflow: hidden;
      text-align: center; display: flex; flex-direction: column; align-items: center;
      padding: 40px 28px;
      background:
        radial-gradient(420px 220px at 100% 0%, rgba(37, 99, 235, 0.08), transparent 64%),
        #FFFFFF;
      border: 1px solid #E2E8F0; border-radius: var(--radius-2xl);
      box-shadow: var(--shadow-xs);
    }
    .mq-eco-band::before {
      content: ''; position: absolute; inset: 0 0 auto; height: 3px;
      background: var(--gradient-signal);
    }
    .mq-eco-band h2 { margin: 0 0 12px; }
    .mq-eco-band__desc { font-size: 16px; line-height: 1.7; color: #475569; max-width: 620px; margin: 0 0 24px; }
    .mq-eco-band__list {
      list-style: none; display: flex; flex-wrap: wrap; justify-content: center;
      gap: 12px 28px; margin: 0; padding: 0;
    }

    @media (prefers-reduced-motion: reduce) {
      .mq-hero-art__signal i, .mq-hero-art__pulses line, .mq-hero-art__chip { animation: none; }
      .mq-cap-card, .mq-exp-card, .mq-algo-card, .mq-res-card, .mq-why-card { transition: none; }
      .mq-cap-card:hover, .mq-exp-card:hover, .mq-algo-card:hover, .mq-res-card:hover, .mq-why-card:hover { transform: none; }
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