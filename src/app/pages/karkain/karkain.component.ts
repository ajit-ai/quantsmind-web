import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RouterModule } from '@angular/router';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../shared/components/qm-section/qm-section.component';
import { QmButtonComponent }    from '../../shared/components/qm-button/qm-button.component';
import { QmBadgeComponent, BadgeVariant } from '../../shared/components/qm-badge/qm-badge.component';
import { QmPageHeroComponent }  from '../../shared/components/qm-page-hero/qm-page-hero.component';
import { QmRevealDirective }    from '../../shared/directives/qm-reveal.directive';

interface KernelFact { index: string; title: string; text: string; }
interface ComputingModel { name: string; detail: string; status: string; variant: BadgeVariant; }
interface EcosystemCard { name: string; detail: string; variant: BadgeVariant; status: string; }
interface StdlibCard { category: string; modules: string; detail: string; }
interface FlowStep { step: string; command: string; note: string; }
interface StatusRow { area: string; status: string; note: string; variant: BadgeVariant; }
interface PipelineZone { zone: string; title: string; note: string; package: string; }

@Component({
    selector: 'app-karkain',
    imports: [RouterModule, QmContainerComponent, QmSectionComponent, QmButtonComponent, QmBadgeComponent, QmPageHeroComponent, QmRevealDirective],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <!-- ══════════ HERO ══════════ -->
    <qm-page-hero
      eyebrow="KARKAIN"
      title="Karkain"
      lead="A programming language for the next generation of computing."
      [artLabels]="['.kark', 'C23', 'SSA IR', 'Binary']">
      <div heroBadge class="k-badges">
        <a routerLink="/technology" class="k-back">&larr; Technology Ecosystem</a>
        <div class="k-badge-row">
          <qm-badge variant="experimental">Developer Preview</qm-badge>
          <qm-badge variant="software">Programming Language</qm-badge>
          <qm-badge variant="default">v1.1.0</qm-badge>
        </div>
      </div>
      <p heroLead class="k-hero__note">
        Karkain is an independently developed, statically typed systems programming
        language. It compiles <span class="k-mono">.kark</span> source to C23 and delegates to
        GCC, Clang or MSVC for final machine code — built around ownership-based memory safety,
        native concurrency, and a heterogeneous computing vision spanning CPU, GPU and quantum
        hardware.
      </p>
      <div heroActions class="k-cta k-cta--hero">
        <qm-button variant="primary" size="lg" [href]="'#karkain-pipeline'">
          Explore the Technology →
        </qm-button>
        <qm-button variant="outline" size="lg" [href]="'https://github.com/ajit-ai/Karkain'" [target]="'_blank'" [ariaLabel]="'View Karkain on GitHub (opens in a new tab)'">
          View on GitHub
        </qm-button>
      </div>
      <ul heroMeta class="qm-page-hero__meta k-meta" aria-label="Karkain at a glance">
        <li><span class="k-mono k-mono--accent">.kark</span> source extension</li>
        <li><span class="k-mono">C23</span> native backend</li>
        <li><span class="k-mono">Self-hosting</span> compiler</li>
        <li><span class="k-mono">Borrow checking</span> memory safety</li>
        <li><span class="k-mono">v1.1.0</span> released</li>
      </ul>
      <div heroArt class="k-hero-art" aria-hidden="true">
        <span class="k-hero-art__ring k-hero-art__ring--1"></span>
        <span class="k-hero-art__ring k-hero-art__ring--2"></span>
        <div class="k-hero-art__panel">
          <div class="k-hero-art__head">
            <span class="k-dots"><i></i><i></i><i></i></span>
            <span class="k-mono k-hero-art__filename">hello.kark</span>
            <span class="k-hero-art__live">compiled</span>
          </div>
          <pre class="k-hero-art__code"><code>{{ helloCode }}</code></pre>
          <div class="k-hero-art__pipeline">
            <span class="k-mono">.kark</span>
            <i aria-hidden="true">→</i>
            <span class="k-mono">C23</span>
            <i aria-hidden="true">→</i>
            <span class="k-mono k-hero-art__pipeline-end">binary</span>
          </div>
        </div>
        <span class="k-hero-art__chip k-hero-art__chip--a">v1.1.0 released</span>
        <span class="k-hero-art__chip k-hero-art__chip--b">SSA IR</span>
        <span class="k-hero-art__chip k-hero-art__chip--c">Self-hosting</span>
      </div>
    </qm-page-hero>

    <!-- ══════════ CODE PANEL SECTION ══════════ -->
    <qm-section surface="white" size="sm" ariaLabel="Hello, Karkain — a verified example program">
      <qm-container size="narrow">
        <div class="k-two">
          <div qmReveal>
            <span class="eyebrow">HELLO, KARKAIN</span>
            <h2>Written in <span class="k-inline-dot">.kark</span></h2>
            <p>
              A Karkain program is ordinary text in a <span class="k-mono">.kark</span> file.
              The compiler reads it, analyzes it, and turns it into a native binary. This exact
              program was verified against the current Karkain toolchain.
            </p>
            <ul class="k-whatnot">
              <li>Not a managed language — no garbage collector, no VM.</li>
              <li>Not an interpreted language — source compiles to a native binary.</li>
              <li>Not LLVM-based — delegates to GCC, Clang or MSVC for machine code.</li>
              <li>Not the last compiler — Karkain's own front-end is written in Karkain.</li>
            </ul>
          </div>
          <div qmReveal [qmRevealDelay]="90">
            <div class="k-code" role="presentation">
              <div class="k-code__head">
                <span class="k-dots"><i></i><i></i><i></i></span>
                <span class="k-filename">hello.kark</span>
              </div>
              <pre><code>{{ helloCode }}</code></pre>
              <div class="k-code__foot">$ karkain run hello.kark</div>
            </div>
            <p class="k-note">The <span class="k-mono">.kark</span> extension is canonical in the Karkain project. Tooling, the package manager and the test framework all treat <span class="k-mono">.kark</span> as the source extension.</p>
          </div>
        </div>
      </qm-container>
    </qm-section>

    <!-- ══════════ WHY KARKAIN ══════════ -->
    <qm-section surface="canvas" ariaLabel="Why Karkain">
      <qm-container>
        <span class="eyebrow">DESIGN PRINCIPLES</span>
        <h2 class="k-h2">Why Karkain?</h2>
        <p class="k-section-lead">
          Karkain is built on four non-negotiable principles. They shape the language, the
          compiler and the runtime.
        </p>
        <div class="k-grid">
          @for (f of principles; track f.title; let i = $index) {
            <article class="k-card" qmReveal [qmRevealDelay]="i * 60">
              <div class="k-index">{{ f.index }}</div>
              <h3>{{ f.title }}</h3>
              <p>{{ f.text }}</p>
            </article>
          }
        </div>
      </qm-container>
    </qm-section>

    <!-- ══════════ PIPELINE ══════════ -->
    <section class="k-dark-band" aria-label="The Karkain compiler pipeline">
      <div id="karkain-pipeline" class="k-anchor"></div>
      <qm-container>
        <div class="k-dark-head" qmReveal>
          <span class="k-eyebrow-dark">COMPILER PIPELINE</span>
          <h2 class="k-h2 k-h2--dark">From <span class="k-mono k-mono--dark">.kark</span> source to a running binary</h2>
          <p class="k-lead k-lead--dark">
            A deterministic, multi-stage pipeline. Karkain performs its own lexing, parsing,
            semantic analysis and optimization; only the final machine-code lowering is delegated
            to a mature C compiler.
          </p>
        </div>

        <div class="k-flow" aria-label="High-level compilation flow" qmReveal [qmRevealDelay]="80">
          @for (s of flow; track s[0]) {
            <span class="k-flow-chip k-mono">{{ s[0] }}</span><span class="k-flow-arrow" aria-hidden="true">→</span>
          }
          <span class="k-flow-chip k-flow-chip--accent k-mono">Binary</span>
        </div>

        <div class="k-zones">
          @for (z of zones; track z.zone; let i = $index) {
            <div class="k-zone" qmReveal [qmRevealDelay]="i * 60">
              <div class="k-zone-head">
                <span class="k-zone-name k-mono">{{ z.zone }}</span>
                <span class="k-zone-pkg k-mono">{{ z.package }}</span>
              </div>
              <p class="k-zone-title">{{ z.title }}</p>
              <p class="k-zone-note">{{ z.note }}</p>
            </div>
          }
        </div>

        <p class="k-dark-note" qmReveal>
          The CPU path is the production pipeline behind Karkain 1.1. GPU shaders (WGSL, SPIR-V,
          OpenCL) and quantum circuits (OpenQASM, QIR) are part of the documented architecture and
          represent the project's heterogeneous direction.
        </p>
      </qm-container>
    </section>

    <!-- ══════════ COMPUTING MODELS ══════════ -->
    <qm-section surface="white" ariaLabel="Karkain computing models">
      <qm-container>
        <span class="eyebrow">ARCHITECTURE VISION</span>
        <h2 class="k-h2">One language. Many computing models.</h2>
        <p class="k-section-lead">
          Karkain is designed so that a single <span class="k-mono">.kark</span> program can speak
          to a spectrum of hardware — not only one architecture.
        </p>
        <div class="k-grid">
          @for (m of models; track m.name; let i = $index) {
            <article class="k-card" qmReveal [qmRevealDelay]="i * 60">
              <div class="k-card-head">
                <h3>{{ m.name }}</h3>
                <qm-badge [variant]="m.variant">{{ m.status }}</qm-badge>
              </div>
              <p>{{ m.detail }}</p>
            </article>
          }
        </div>
        <p class="k-note k-note--center">
          Status reflects the Karkain roadmap: what ships today, what is actively being built,
          and where the project is headed.
        </p>
      </qm-container>
    </qm-section>

    <!-- ══════════ IR ══════════ -->
    <qm-section surface="subtle" ariaLabel="Karkain intermediate representation">
      <qm-container>
        <div class="k-two">
          <div qmReveal>
            <span class="eyebrow">INTERMEDIATE REPRESENTATION</span>
            <h2 class="k-h2">An IR Karkain owns</h2>
            <p>
              Instead of delegating its representation layer to an external compiler framework,
              Karkain lowers source to its own SSA intermediate representation. The IR pipeline is
              part of the project and evolves with the language.
            </p>
            <p>
              Programs can also be emitted as Karkain module bytecode (<span class="k-mono">.kbc</span>) and
              executed by Karkain's own stack-based VM and JIT engine — a separate execution path
              from native C23 compilation.
            </p>
          </div>
          <div class="k-stack" qmReveal [qmRevealDelay]="90">
            <article class="k-card k-card--compact">
              <h4 class="k-code-subhead">AST → SSA IR</h4>
              <p>Lowered to SSA form with variable cells and a control-flow graph. Packages: <span class="k-mono">pkg/ir</span>, <span class="k-mono">pkg/codegen/lower.go</span>.</p>
            </article>
            <article class="k-card k-card--compact">
              <h4 class="k-code-subhead">Optimizer → Verifier</h4>
              <p>Constant folding and dead-code elimination run on the IR before a verifier checks types and control flow. Packages: <span class="k-mono">pkg/ir/ssa</span>.</p>
            </article>
            <article class="k-card k-card--compact">
              <h4 class="k-code-subhead">Two execution paths</h4>
              <p>Emit C23 and link with GCC/Clang/MSVC, or emit <span class="k-mono">.kbc</span> bytecode and run on the Karkain VM (<span class="k-mono">pkg/jit</span>).</p>
            </article>
          </div>
        </div>
      </qm-container>
    </qm-section>

    <!-- ══════════ SELF-HOSTING ══════════ -->
    <qm-section surface="white" ariaLabel="Toward a self-hosted toolchain">
      <qm-container>
        <span class="eyebrow">SELF-HOSTING</span>
        <h2 class="k-h2">The compiler is learning to build itself</h2>
        <p class="k-section-lead">
          Karkain's ultimate independence goal: <span class="k-mono">karkain</span> compiles itself. A
          self-hosted front-end written in Karkain is being brought up through a bootstrap path,
          and it is already the language's default engine.
        </p>
        <div class="k-two">
          <div qmReveal>
            <div class="k-code k-code--tall" role="presentation">
              <div class="k-code__head">
                <span class="k-dots"><i></i><i></i><i></i></span>
                <span class="k-filename">src/compiler/ — written in Karkain</span>
              </div>
              <pre><code>{{ compilerCode }}</code></pre>
            </div>
            <p class="k-note">Boostrapped through C, the self-hosted front-end then builds Karkain programs by emitting C23 and linking with a system C compiler.</p>
          </div>
          <div class="k-stack" qmReveal [qmRevealDelay]="90">
            @for (c of compilerComponents; track c.title) {
              <article class="k-card k-card--compact">
                <h4 class="k-mono">{{ c.index }}</h4>
                <p>{{ c.text }}</p>
              </article>
            }
          </div>
        </div>
      </qm-container>
    </qm-section>

    <!-- ══════════ ECOSYSTEM ══════════ -->
    <qm-section surface="canvas" ariaLabel="The Karkain ecosystem">
      <qm-container>
        <span class="eyebrow">ECOSYSTEM</span>
        <h2 class="k-h2">More than a compiler</h2>
        <p class="k-section-lead">
          The Karkain ecosystem grows together: a language, a compiler, a runtime, a standard
          library, a toolchain and developer tooling.
        </p>
        <div class="k-grid">
          @for (e of ecosystem; track e.name; let i = $index) {
            <article class="k-card" qmReveal [qmRevealDelay]="i * 60">
              <div class="k-card-head">
                <h3>{{ e.name }}</h3>
                <qm-badge [variant]="e.variant">{{ e.status }}</qm-badge>
              </div>
              <p>{{ e.detail }}</p>
            </article>
          }
        </div>
      </qm-container>
    </qm-section>

    <!-- ══════════ STANDARD LIBRARY ══════════ -->
    <qm-section surface="white" ariaLabel="The Karkain standard library">
      <qm-container>
        <span class="eyebrow">STANDARD LIBRARY</span>
        <h2 class="k-h2">A native standard library</h2>
        <p class="k-section-lead">
          The standard library is written as <span class="k-mono">.kark</span> modules — the same language
          applications use — and is an active area of development.
        </p>
        <div class="k-grid k-grid--std">
          @for (s of stdlib; track s.category; let i = $index) {
            <article class="k-card" qmReveal [qmRevealDelay]="i * 60">
              <h3>{{ s.category }}</h3>
              <div class="k-mono k-std-mods">{{ s.modules }}</div>
              <p>{{ s.detail }}</p>
            </article>
          }
        </div>
      </qm-container>
    </qm-section>

    <!-- ══════════ BUILT FOR DEVELOPERS ══════════ -->
    <qm-section surface="subtle" ariaLabel="Built for developers">
      <qm-container>
        <span class="eyebrow">DEVELOPER EXPERIENCE</span>
        <h2 class="k-h2">Built for developers</h2>
        <p class="k-section-lead">
          From a first program to a packaged project, the Karkain toolchain is designed around a
          simple loop.
        </p>
        <div class="k-steps">
          @for (s of steps; track s.step; let i = $index) {
            <div class="k-step" qmReveal [qmRevealDelay]="i * 55">
              <div class="k-step-num k-mono">{{ s.step }}</div>
              <div class="k-code k-code--mini">
                <div class="k-code__head k-mono">{{ s.command }}</div>
              </div>
              <p class="k-step-note">{{ s.note }}</p>
            </div>
          }
        </div>
        <div class="k-tools">
          <span class="k-tools-label">Also part of the toolchain</span>
          <ul class="k-chip-list">
            <li class="k-chip k-mono">fmt</li>
            <li class="k-chip k-mono">lint</li>
            <li class="k-chip k-mono">bench</li>
            <li class="k-chip k-mono">prof</li>
            <li class="k-chip k-mono">lsp</li>
            <li class="k-chip k-mono">workspace</li>
            <li class="k-chip k-mono">pkg</li>
          </ul>
        </div>
      </qm-container>
    </qm-section>

    <!-- ══════════ STATUS ══════════ -->
    <qm-section surface="canvas" ariaLabel="Where Karkain is today">
      <qm-container size="narrow">
        <span class="eyebrow">WHERE KARKAIN IS TODAY</span>
        <h2 class="k-h2">An honest status report</h2>
        <p class="k-section-lead">
          Karkain 1.1.0 is a published release. The compiler, language, standard
          library and toolchain below ship today; further engineering continues after
          the release, and planned areas are labelled as such rather than presented as
          available.
        </p>
        <div class="qm-table-wrap" qmReveal>
          <table class="qm-table">
            <caption class="sr-only">Current status of Karkain components</caption>
            <thead>
              <tr><th scope="col">Area</th><th scope="col">Status</th><th scope="col">Notes</th></tr>
            </thead>
            <tbody>
              @for (r of statusRows; track r.area) {
                <tr>
                  <td data-label="Area">{{ r.area }}</td>
                  <td data-label="Status"><qm-badge [variant]="r.variant">{{ r.status }}</qm-badge></td>
                  <td data-label="Notes">{{ r.note }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </qm-container>
    </qm-section>

    <!-- ══════════ ROADMAP ══════════ -->
    <qm-section surface="white" ariaLabel="Karkain roadmap">
      <qm-container>
        <span class="eyebrow">ROADMAP</span>
        <h2 class="k-h2">Where it is heading</h2>
        <div class="k-grid k-grid--roadmap">
          <article class="k-road" qmReveal>
            <qm-badge variant="development">Current</qm-badge>
            <h3>Consolidating 1.0</h3>
            <ul>
              <li>Deepening the core language and compiler pipeline.</li>
              <li>Self-hosted front-end as the daily driver.</li>
              <li>Extending the standard library modules.</li>
              <li>Expanding the package ecosystem and lockfile workflow.</li>
            </ul>
          </article>
          <article class="k-road" qmReveal [qmRevealDelay]="70">
            <qm-badge variant="development">Developing</qm-badge>
            <h3>Heterogeneous reach</h3>
            <ul>
              <li>WASM/WASI as a first-class deployment target.</li>
              <li>GPU kernel compilation from the same source file.</li>
              <li>Cross-compilation and target triples maturing.</li>
              <li>An even richer standard library and LSP experience.</li>
            </ul>
          </article>
          <article class="k-road" qmReveal [qmRevealDelay]="140">
            <qm-badge variant="research">Future</qm-badge>
            <h3>Quantum &amp; beyond</h3>
            <ul>
              <li>Quantum circuits compiling to OpenQASM and QIR.</li>
              <li>Unified representations across CPU, GPU and quantum backends.</li>
              <li>Long-term research into broader hardware abstractions.</li>
            </ul>
          </article>
        </div>
      </qm-container>
    </qm-section>

    <!-- ══════════ QUANTSMIND ECOSYSTEM ══════════ -->
    <qm-section surface="canvas" size="sm" ariaLabel="Part of the QuantsMind technology ecosystem">
      <qm-container size="narrow">
        <div class="k-eco-band" qmReveal>
          <span class="eyebrow">TECHNOLOGY ECOSYSTEM</span>
          <h2>Part of QuantsMind</h2>
          <p class="lead">
            Karkain is one of a family of technologies being engineered by QuantsMind. Explore its
            neighbors in the ecosystem.
          </p>
          <div class="k-cta k-cta--center">
            <qm-button variant="secondary" size="md" [routerLinkValue]="'/technology'">Technology Ecosystem</qm-button>
            <qm-button variant="secondary" size="md" [routerLinkValue]="'/microquantum'">MicroQuantum</qm-button>
            <qm-button variant="secondary" size="md" [routerLinkValue]="'/quantsmind-sdk'">QuantsMind SDK</qm-button>
          </div>
        </div>
      </qm-container>
    </qm-section>

    <!-- ══════════ CTA ══════════ -->
    <qm-section surface="canvas" size="sm" ariaLabel="Explore Karkain on GitHub">
      <qm-container size="narrow">
        <div class="qm-cta-band" qmReveal>
          <span class="eyebrow">GET INVOLVED</span>
          <h2>Explore Karkain</h2>
          <p>
            Follow the project on GitHub. The language, the compiler, the standard library and the
            documentation evolve together — and the repository is the source of truth.
          </p>
          <div class="qm-cta-band__actions">
            <qm-button variant="primary" size="lg" [href]="'https://github.com/ajit-ai/Karkain'" [target]="'_blank'" [ariaLabel]="'View Karkain on GitHub (opens in a new tab)'">
              View on GitHub →
            </qm-button>
            <qm-button variant="outline" size="lg" [href]="'https://github.com/ajit-ai/Karkain/releases'" [target]="'_blank'" [ariaLabel]="'View Karkain releases on GitHub (opens in a new tab)'">
              Releases
            </qm-button>
          </div>
          <p class="k-docs-note">
            Documentation — the language spec and engineering reports — live in the repository and
            evolve alongside the language.
          </p>
        </div>
      </qm-container>
    </qm-section>
    `,
    styles: [`
    /* ══════════ SHARED ══════════ */
    .k-h2 { margin: 0 0 12px; max-width: 760px; }
    .k-section-lead {
      max-width: 680px; margin: 0 0 40px;
      font-size: 18px; line-height: 1.7; color: var(--color-text-secondary);
    }
    .k-lead {
      max-width: 680px; margin: 0 0 24px;
      font-size: 18px; line-height: 1.7; color: var(--color-text-secondary);
    }
    .k-note { font-size: 14px; line-height: 1.6; color: var(--color-text-muted); margin: 20px 0 0; }
    .k-note--center { text-align: center; max-width: 720px; margin-left: auto; margin-right: auto; }
    .k-mono { font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', ui-monospace, monospace; font-size: 14px; }
    .k-code-subhead { font-size: 15px; color: var(--color-accent); margin: 0 0 8px; font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace; }
    .k-index {
      font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', ui-monospace, monospace;
      font-size: 13px; color: var(--color-accent); margin-bottom: 12px;
    }
    .k-two { display: grid; gap: 40px; }
    @media (min-width: 1024px) { .k-two { grid-template-columns: 1fr 1fr; gap: 56px; align-items: start; } }
    .k-grid { display: grid; gap: 24px; grid-template-columns: 1fr; }
    @media (min-width: 640px) { .k-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 1024px) { .k-grid { grid-template-columns: repeat(3, 1fr); } }
    .k-stack { display: grid; gap: 16px; }

    .k-card {
      position: relative; overflow: hidden;
      background:
        radial-gradient(360px 200px at 100% 0%, rgba(37, 99, 235, 0.06), transparent 62%),
        var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: var(--radius-lg); padding: 28px;
      box-shadow: var(--shadow-xs);
      transition:
        border-color 260ms ease,
        box-shadow 260ms var(--qm-ease-out),
        transform 260ms var(--qm-ease-out);
    }
    .k-card::before {
      content: ''; position: absolute; inset: 0 0 auto; height: 3px;
      background: var(--gradient-signal); opacity: 0.7;
    }
    .k-card:hover {
      box-shadow: var(--shadow-xl);
      transform: translateY(-3px);
      border-color: rgba(37, 99, 235, 0.24);
    }
    .k-card h3 { margin: 0 0 12px; font-size: 20px; }
    .k-card h4 { margin: 0 0 8px; font-size: 15px; color: var(--color-text-secondary); }
    .k-card p { font-size: 15px; line-height: 1.7; color: var(--color-text-secondary); margin: 0; }
    .k-card--compact { padding: 20px; }
    .k-card-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 12px; }
    .k-card-head h3 { margin: 0; }

    /* ══════════ HERO ══════════ */
    .k-badges { display: flex; flex-direction: column; align-items: flex-start; gap: 14px; margin-bottom: 22px; }
    .k-badge-row { display: flex; flex-wrap: wrap; gap: 8px; }
    .k-back {
      display: inline-block;
      font-size: 13px; font-weight: 500;
      color: var(--color-text-muted); text-decoration: none;
      transition: color 160ms ease, transform 160ms ease;
    }
    .k-back:hover { color: var(--color-accent); transform: translateX(-2px); }
    .k-hero__note {
      margin: 22px 0 0; max-width: 680px;
      font-size: 16px; line-height: 1.75; color: var(--color-text-secondary);
      text-wrap: pretty;
    }
    .k-cta { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 32px; }
    .k-cta--hero { margin-top: 0; }
    .k-cta--center { justify-content: center; }
    .k-meta {
      list-style: none; display: flex; flex-wrap: wrap; gap: 8px;
      padding: 0; margin: 28px 0 0;
    }
    .k-meta li { margin: 0; }
    .k-mono--accent { color: var(--color-warning); }

    /* ── HERO ARTWORK ── */
    .k-hero-art {
      position: relative;
      width: 100%; max-width: 440px;
      margin: 0 auto; padding: 26px 18px;
    }
    .k-hero-art__ring {
      position: absolute; border-radius: 50%;
      border: 1px solid rgba(37, 99, 235, 0.16);
      animation: qm-orbit-spin 30s linear infinite;
      pointer-events: none;
    }
    .k-hero-art__ring::before {
      content: ''; position: absolute; top: 50%; left: -3px;
      width: 7px; height: 7px; border-radius: 50%;
      background: var(--color-accent);
      box-shadow: 0 0 0 5px rgba(37, 99, 235, 0.09), 0 0 18px rgba(37, 99, 235, 0.5);
    }
    .k-hero-art__ring--1 { inset: -4% 0; }
    .k-hero-art__ring--2 {
      inset: 13% 19%;
      border-color: rgba(6, 182, 212, 0.2);
      animation-duration: 22s; animation-direction: reverse;
    }
    .k-hero-art__ring--2::before {
      background: var(--color-cyan);
      box-shadow: 0 0 0 5px rgba(6, 182, 212, 0.1), 0 0 18px rgba(6, 182, 212, 0.5);
    }
    .k-hero-art__panel {
      position: relative; z-index: 2; overflow: hidden;
      border-radius: var(--radius-xl);
      border: 1px solid var(--color-ink-border);
      background:
        radial-gradient(420px 240px at 100% 0%, rgba(6, 182, 212, 0.18), transparent 62%),
        var(--gradient-ink);
      box-shadow: var(--shadow-float);
    }
    .k-hero-art__panel::after {
      content: ''; position: absolute; left: 0; right: 0; top: 0; height: 42%;
      background: linear-gradient(180deg, transparent, rgba(103, 232, 249, 0.10) 55%, transparent);
      animation: qm-scan 7s ease-in-out infinite;
      pointer-events: none;
    }
    .k-hero-art__head {
      display: flex; align-items: center; gap: 10px;
      padding: 12px 16px;
      border-bottom: 1px solid var(--color-ink-border);
      background: rgba(11, 27, 51, 0.55);
      position: relative; z-index: 1;
    }
    .k-hero-art__filename { color: var(--color-ink-muted); font-size: 12px; }
    .k-hero-art__live {
      margin-left: auto; padding: 3px 8px;
      border-radius: 999px; border: 1px solid rgba(103, 232, 249, 0.28);
      background: rgba(6, 182, 212, 0.12);
      color: var(--color-cyan-soft);
      font-size: 9px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
    }
    .k-hero-art__code { margin: 0; padding: 22px 20px 18px; overflow: hidden; position: relative; z-index: 1; }
    .k-hero-art__code code {
      background: none; border: none; padding: 0;
      font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', ui-monospace, monospace;
      font-size: 12.5px; line-height: 1.75; color: #DBEAFE;
    }
    .k-hero-art__pipeline {
      display: flex; align-items: center; flex-wrap: wrap; gap: 8px;
      padding: 12px 16px;
      border-top: 1px solid var(--color-ink-border);
      background: rgba(255, 255, 255, 0.03);
      position: relative; z-index: 1;
    }
    .k-hero-art__pipeline span {
      padding: 4px 9px; border-radius: 999px;
      border: 1px solid var(--color-ink-border);
      color: var(--color-ink-muted); font-size: 11px;
    }
    .k-hero-art__pipeline i { color: rgba(103, 232, 249, 0.55); font-style: normal; }
    .k-hero-art__pipeline .k-hero-art__pipeline-end {
      border-color: transparent;
      background: linear-gradient(135deg, #2563EB, #06B6D4);
      color: #fff;
    }
    .k-hero-art__chip {
      position: absolute; z-index: 3;
      display: inline-flex; align-items: center; gap: 7px;
      padding: 7px 11px; border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.9);
      background: rgba(255, 255, 255, 0.88);
      box-shadow: var(--shadow-lg);
      backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
      font-size: 10px; font-weight: 600; color: var(--color-text-secondary);
      white-space: nowrap;
      animation: qm-float 8s ease-in-out infinite;
    }
    .k-hero-art__chip::before {
      content: ''; width: 6px; height: 6px; border-radius: 50%;
      background: var(--gradient-signal);
    }
    .k-hero-art__chip--a { top: 4px; right: -2px; animation-delay: -2s; }
    .k-hero-art__chip--b { bottom: 38px; left: -8px; animation-delay: -5s; }
    .k-hero-art__chip--c { bottom: -2px; right: 20px; animation-delay: -3s; }

    /* ══════════ CODE PANELS ══════════ */
    .k-inline-dot {
      font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', ui-monospace, monospace;
      color: var(--color-warning);
    }
    .k-whatnot { margin: 20px 0 0; padding-left: 20px; color: var(--color-text-secondary); }
    .k-whatnot li { margin-bottom: 10px; line-height: 1.6; }
    .k-code {
      background: var(--color-dark-canvas); border: 1px solid var(--color-dark-border);
      border-radius: var(--card-radius); overflow: hidden;
      box-shadow: 0 10px 15px rgba(0, 0, 0, 0.12), 0 4px 6px rgba(0, 0, 0, 0.08);
    }
    .k-code__head {
      display: flex; align-items: center; gap: 12px; padding: 12px 16px;
      background: var(--color-dark-surface); border-bottom: 1px solid var(--color-dark-border);
    }
    .k-dots { display: flex; gap: 6px; }
    .k-dots i {
      width: 10px; height: 10px; border-radius: 50%;
      background: var(--color-dark-border); display: block;
    }
    .k-dots i:nth-child(1) { background: var(--color-dot-close); }
    .k-dots i:nth-child(2) { background: var(--color-dot-min); }
    .k-dots i:nth-child(3) { background: var(--color-dot-max); }
    .k-filename { font-size: 13px; color: var(--color-dark-text-muted); }
    .k-code pre { margin: 0; padding: 20px 24px; overflow-x: auto; }
    .k-code pre code {
      background: none; border: none; padding: 0;
      color: var(--color-border); font-size: 13.5px; line-height: 1.6;
    }
    .k-code__foot {
      padding: 10px 16px; background: var(--color-dark-canvas);
      border-top: 1px solid var(--color-dark-border); color: var(--color-text-muted);
      font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace; font-size: 12.5px;
    }
    .k-code--tall pre { padding: 28px 24px; }
    .k-code--mini { box-shadow: none; }
    .k-code--mini .k-code__head {
      background: transparent; border-bottom: none;
      color: var(--color-border); padding: 14px 18px; font-size: 13.5px;
    }

    /* ══════════ DARK SECTIONS ══════════ */
    .k-dark-band {
      position: relative; isolation: isolate; overflow: hidden;
      padding: 96px 0;
      background:
        radial-gradient(820px 420px at 84% 0%, rgba(6, 182, 212, 0.20), transparent 62%),
        radial-gradient(620px 380px at 4% 110%, rgba(37, 99, 235, 0.20), transparent 62%),
        var(--gradient-ink);
      color: var(--color-ink-text);
    }
    @media (min-width: 768px) { .k-dark-band { padding: 128px 0; } }
    .k-dark-band::before {
      content: ''; position: absolute; inset: 0; z-index: -1;
      background-image:
        linear-gradient(to right, rgba(148, 197, 255, 0.055) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(148, 197, 255, 0.055) 1px, transparent 1px);
      background-size: 64px 64px;
      mask-image: radial-gradient(ellipse 72% 82% at 76% 0%, #000, transparent 72%);
      -webkit-mask-image: radial-gradient(ellipse 72% 82% at 76% 0%, #000, transparent 72%);
      pointer-events: none;
    }
    .k-dark-band::after {
      content: ''; position: absolute; right: -160px; top: -210px; z-index: -1;
      width: 480px; height: 480px; border-radius: 50%;
      border: 1px solid rgba(103, 232, 249, 0.16);
      box-shadow: 0 0 0 52px rgba(103, 232, 249, 0.03);
      pointer-events: none;
    }
    .k-dark-band qm-container { position: relative; }
    .k-anchor { scroll-margin-top: 88px; }
    .k-dark-head { max-width: 760px; margin: 0 0 40px; }
    .k-h2--dark { color: var(--color-ink-text); }
    .k-lead--dark { color: var(--color-ink-muted); }
    .k-mono--dark {
      color: var(--color-ink-text); background: rgba(11, 27, 51, 0.72);
      border: 1px solid var(--color-ink-border); border-radius: 6px; padding: 1px 6px;
    }
    .k-flow { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; margin: 0 0 40px; }
    .k-flow-chip {
      font-size: 13px; color: var(--color-ink-text); background: rgba(11, 27, 51, 0.72);
      border: 1px solid var(--color-ink-border); padding: 8px 14px;
      border-radius: 999px; white-space: nowrap;
      backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
    }
    .k-flow-chip--accent {
      background: linear-gradient(135deg, #2563EB, #06B6D4); border-color: transparent;
      color: #fff; font-weight: 600;
      box-shadow: 0 12px 26px -14px rgba(6, 182, 212, 0.75);
    }
    .k-flow-arrow { color: rgba(103, 232, 249, 0.55); font-size: 16px; }
    .k-zones { display: grid; gap: 16px; grid-template-columns: 1fr; }
    @media (min-width: 768px) { .k-zones { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 1024px) { .k-zones { grid-template-columns: repeat(4, 1fr); } }
    .k-zone {
      position: relative; overflow: hidden;
      background: rgba(11, 27, 51, 0.72); border: 1px solid var(--color-ink-border);
      border-radius: var(--radius-lg); padding: 20px;
      backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
      transition: transform 260ms var(--qm-ease-out), border-color 260ms ease, background-color 260ms ease;
    }
    .k-zone::before {
      content: ''; position: absolute; inset: 0 0 auto; height: 2px;
      background: linear-gradient(90deg, #2563EB, #06B6D4); opacity: 0.7;
    }
    .k-zone:hover { transform: translateY(-3px); border-color: rgba(103, 232, 249, 0.28); }
    .k-zone-head { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; margin-bottom: 10px; }
    .k-zone-name {
      color: var(--color-cyan-soft); font-size: 12px;
      letter-spacing: 0.04em; text-transform: uppercase;
    }
    .k-zone-pkg { color: var(--color-ink-muted); font-size: 12px; }
    .k-zone-title {
      color: var(--color-ink-text); font-size: 14px; font-weight: 600; margin: 0 0 6px;
    }
    .k-zone-note { color: var(--color-ink-muted); font-size: 13px; line-height: 1.6; margin: 0; }
    .k-dark-note {
      color: var(--color-ink-muted); font-size: 13px; line-height: 1.6;
      margin: 32px 0 0; max-width: 820px;
    }

    .k-eco-band {
      position: relative; overflow: hidden; text-align: center;
      padding: 40px 28px;
      background:
        radial-gradient(420px 220px at 100% 0%, rgba(37, 99, 235, 0.08), transparent 64%),
        var(--color-surface);
      border: 1px solid var(--card-border);
      border-radius: var(--radius-2xl);
      box-shadow: var(--shadow-xs);
      display: flex; flex-direction: column; align-items: center; gap: 16px;
    }
    .k-eco-band::before {
      content: ''; position: absolute; inset: 0 0 auto; height: 3px;
      background: var(--gradient-signal);
    }
    .k-eco-band h2 { margin: 0; }
    .k-eco-band p { margin: 0; max-width: 620px; }
    .k-docs-note { max-width: 600px; margin: 24px auto 0; font-size: 14px; line-height: 1.6; }

    /* ══════════ STEPS ══════════ */
    .k-steps { display: grid; gap: 16px; grid-template-columns: 1fr; margin-bottom: 32px; }
    @media (min-width: 480px) { .k-steps { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 1024px) { .k-steps { grid-template-columns: repeat(3, 1fr); } }
    .k-step {
      position: relative; overflow: hidden;
      background: var(--card-bg); border: 1px solid var(--card-border);
      border-radius: var(--radius-lg); padding: 18px;
      box-shadow: var(--shadow-xs);
      display: flex; flex-direction: column; gap: 10px;
      transition: transform 260ms var(--qm-ease-out), border-color 260ms ease, box-shadow 260ms var(--qm-ease-out);
    }
    .k-step:hover { transform: translateY(-3px); border-color: rgba(37, 99, 235, 0.22); box-shadow: var(--shadow-lg); }
    .k-step-num { color: var(--color-accent); font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em; }
    .k-step-note { font-size: 14px; color: var(--color-text-secondary); line-height: 1.6; margin: 0; }
    .k-tools { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
    .k-tools-label { font-size: 14px; font-weight: 500; color: var(--color-text-secondary); }
    .k-chip-list { list-style: none; display: flex; flex-wrap: wrap; gap: 8px; padding: 0; margin: 0; }
    .k-chip {
      font-size: 13px; color: var(--color-accent); background: var(--mark-bg);
      border: 1px solid var(--mark-border); border-radius: 9999px; padding: 6px 14px;
    }

    /* ══════════ STDLIB / ROADMAP ══════════ */
    .k-grid--std { grid-template-columns: 1fr; }
    @media (min-width: 640px) { .k-grid--std { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 1024px) { .k-grid--std { grid-template-columns: repeat(3, 1fr); } }
    .k-std-mods { color: var(--color-warning); font-size: 13px; margin-bottom: 10px; word-break: break-word; }
    .k-grid--roadmap { grid-template-columns: 1fr; }
    @media (min-width: 768px) { .k-grid--roadmap { grid-template-columns: repeat(3, 1fr); } }
    .k-road {
      position: relative; overflow: hidden;
      background:
        radial-gradient(320px 180px at 100% 0%, rgba(37, 99, 235, 0.06), transparent 64%),
        var(--card-bg-subtle);
      border: 1px solid var(--card-border);
      border-radius: var(--radius-lg); padding: 28px;
      transition: transform 260ms var(--qm-ease-out), border-color 260ms ease, box-shadow 260ms var(--qm-ease-out);
    }
    .k-road::before {
      content: ''; position: absolute; inset: 0 0 auto; height: 3px;
      background: var(--gradient-signal); opacity: 0.65;
    }
    .k-road:hover { transform: translateY(-3px); border-color: rgba(37, 99, 235, 0.22); box-shadow: var(--shadow-lg); }
    .k-road h3 { margin: 16px 0 12px; font-size: 20px; }
    .k-road ul { margin: 0; padding-left: 20px; color: var(--color-text-secondary); }
    .k-road li { margin-bottom: 10px; line-height: 1.6; }

    /* ══════════ A11Y ══════════ */
    .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }

    @media (prefers-reduced-motion: reduce) {
      .k-card, .k-road, .k-step, .k-zone { transition: none; }
      .k-card:hover, .k-road:hover, .k-step:hover, .k-zone:hover { transform: none; }
      .k-hero-art__ring, .k-hero-art__chip { animation: none; }
      .k-hero-art__panel::after { animation: none; opacity: 0; }
    }
  `]
})
export class KarkainComponent {
  helloCode = 'func main() {\n    print("hello world")\n}';

  compilerCode =
    'lexer.kark     \u2192 parser.kark\n' +
    'ast.kark       \u2192 atypes.kark\n' +
    'sema.kark      \u2192 checker.kark\n' +
    'codegen.kark   \u2192 main.kark';

  principles: KernelFact[] = [
    { index: '01', title: 'Fast', text: 'Zero-cost abstractions, value semantics and no garbage collector. Source compiles to C23 and is optimized by mature C compilers.' },
    { index: '02', title: 'Safe', text: 'Compile-time ownership and borrow checking. No null pointers, no use-after-free, no data races. Option and Result replace exceptions.' },
    { index: '03', title: 'Heterogeneous', text: 'CPU code and GPU compute kernels written in the same .kark file, with quantum circuits targeting OpenQASM and QIR. One language, a spectrum of hardware.' },
    { index: '04', title: 'Independent', text: 'The ultimate goal: karkain compiles itself. No dependency on Go, Rust or any other toolchain for day-to-day development.' }
  ];

  flow: Array<[string]> = [
    ['.kark source'], ['Lexer'], ['Parser'], ['Macro expand'], ['Semantic analysis'],
    ['SSA IR'], ['Optimizer'], ['Verifier'], ['C23']
  ];

  zones: PipelineZone[] = [
    { zone: 'Frontend', title: 'Lexer & Parser', note: 'Tokenizes .kark source into a token stream and builds an AST with arena allocation and line tracking.', package: 'pkg/lexer · pkg/parser' },
    { zone: 'Analysis', title: 'Semantic analysis', note: 'Borrow checking, type checking and macro expansion validate the program before code generation.', package: 'pkg/sema' },
    { zone: 'IR', title: 'SSA IR pipeline', note: 'Source lowers to SSA form; constant folding and dead-code elimination run before a verifier checks the result.', package: 'pkg/ir · pkg/codegen' },
    { zone: 'Backend', title: 'C23 → native', note: 'The C emitter produces C23, linked with GCC, Clang or MSVC into a native binary.', package: 'pkg/codegen' }
  ];

  models: ComputingModel[] = [
    { name: 'CPU', status: 'Current', variant: 'development', detail: 'Compiles to C23 and links with GCC, Clang or MSVC. Full native support with Karkain’s own target-triple model (x86_64, aarch64).' },
    { name: 'SIMD', status: 'Evolving', variant: 'experimental', detail: 'AVX2-aware intrinsics and optimized matrix operations for performance-critical kernels.' },
    { name: 'WASM', status: 'Active', variant: 'development', detail: 'A wasm32-wasi target whose module is emitted directly, without an external linker.' },
    { name: 'GPU', status: 'Evolving', variant: 'experimental', detail: 'Kernel-driven design aiming to emit WGSL, OpenCL and SPIR-V shaders from the same source file.' },
    { name: 'Quantum', status: 'Direction', variant: 'research', detail: 'Gate-level circuits targeted at OpenQASM 3.0 and QIR as part of the long-term heterogeneous architecture.' },
    { name: 'Hardware reach', status: 'Future', variant: 'concept', detail: 'NPU, FPGA, DPU and neuromorphic-class targets remain long-term research horizons on the project’s abstraction agenda.' }
  ];

  compilerComponents: KernelFact[] = [
    { index: 'lexer.kark', title: 'Lexer', text: 'Tokenizes Karkain source, written in Karkain.' },
    { index: 'parser.kark', title: 'Parser', text: 'Builds the AST from the token stream.' },
    { index: 'ast.kark · atypes.kark', title: 'AST & types', text: 'Syntax tree and attribute type definitions.' },
    { index: 'sema.kark · checker.kark', title: 'Semantic analysis', text: 'Type checking and analysis in Karkain.' },
    { index: 'codegen.kark', title: 'Code generation', text: 'Emits C23 from the analyzed program.' }
  ];

  ecosystem: EcosystemCard[] = [
    { name: 'Language', status: 'Published · 1.1.0', variant: 'experimental', detail: 'Static typing, ownership and borrow checking, algebraic data types, pattern matching, and a spec tracked in SPEC.md.' },
    { name: 'Compiler', status: 'Published · 1.1.0', variant: 'experimental', detail: 'The self-hosted engine lexes, parses, analyzes, optimizes and emits C23.' },
    { name: 'Runtime', status: 'Published · 1.1.0', variant: 'experimental', detail: 'A concurrency runtime with tasks and channels. No garbage collector. A JIT tier remains planned.' },
    { name: 'Standard Library', status: 'Published · 1.1.0', variant: 'experimental', detail: '.kark modules for core semantics, strings, collections, I/O, encoding, crypto, math and more.' },
    { name: 'Toolchain', status: 'Published · 1.1.0', variant: 'experimental', detail: 'run, build, check, test, fmt, lint, bench, prof, plus package manager and workspaces.' },
    { name: 'Developer Tools', status: 'Partial', variant: 'development', detail: 'A language server providing hover and go-to-definition. Some semantic features are not yet provided by the server, and the editor extension is not part of this public repository.' }
  ];

  stdlib: StdlibCard[] = [
    { category: 'Core foundation', modules: 'stdlib/core', detail: 'Identity, conversions, comparison and fundamental operations over owned types.' },
    { category: 'String & text', modules: 'stdlib/string', detail: 'Text processing built on owned byte strings.' },
    { category: 'Collections', modules: 'stdlib/collections', detail: 'A growing set of container and algorithm primitives.' },
    { category: 'I/O & files', modules: 'stdlib/io · stdlib/system', detail: 'Console, filesystem and system-facing operations used by native programs.' },
    { category: 'Encoding & data', modules: 'stdlib/encoding', detail: 'Structured encodings for data exchange.' },
    { category: 'Crypto & math', modules: 'stdlib/crypto · stdlib/math', detail: 'Cryptographic primitives and numerical helpers under active development.' }
  ];

  steps: FlowStep[] = [
    { step: 'write', command: 'hello.kark', note: 'Write plain .kark source.' },
    { step: 'check', command: 'karkain check hello.kark', note: 'Validate syntax and semantics.' },
    { step: 'build', command: 'karkain build hello.kark', note: 'Compile to a native executable.' },
    { step: 'run', command: 'karkain run hello.kark', note: 'Compile and execute in one step.' },
    { step: 'test', command: 'karkain test <path>', note: '*_test.kark files are auto-discovered.' },
    { step: 'package', command: 'karkain pkg add <pkg>', note: 'Resolve dependencies, write lockfile, fetch.' }
  ];

  statusRows: StatusRow[] = [
    { area: 'Compiler core · Karkain 1.1', status: 'Published · 1.1.0', variant: 'experimental', note: 'The project’s own release gate passed and version 1.1.0 was published as its release line. Further engineering continues after the release. No independent performance or reliability assessment has been carried out.' },
    { area: 'Self-hosting', status: 'Published · 1.1.0', variant: 'experimental', note: 'The compiler’s Karkain-written front-end is the default engine and builds Karkain programs today.' },
    { area: 'Language & core pipeline', status: 'Published · 1.1.0', variant: 'experimental', note: 'The core language and pipeline ship in 1.1.0. Additional type-system features, autodiff and quantum safety remain in development for later phases.' },
    { area: 'Concurrency runtime', status: 'Published · 1.1.0', variant: 'experimental', note: 'Task model, channels and synchronization primitives ship in 1.1.0. A JIT tier remains planned.' },
    { area: 'Standard library', status: 'Published · 1.1.0', variant: 'experimental', note: 'Core, string, collections, I/O, encoding, crypto, math and system modules ship in 1.1.0 as .kark.' },
    { area: 'Cross-compilation', status: 'Published · 1.1.0', variant: 'experimental', note: 'An owned target-triple model covering x86_64, aarch64 and wasm32 over windows, linux and wasi. Running foreign targets is refused for honesty.' },
    { area: 'Heterogeneous backends', status: 'Direction', variant: 'research', note: 'GPU and quantum backends are documented in the compiler architecture and on the roadmap.' }
  ];
}