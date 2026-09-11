import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RouterModule } from '@angular/router';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../shared/components/qm-section/qm-section.component';
import { QmButtonComponent }    from '../../shared/components/qm-button/qm-button.component';
import { QmBadgeComponent, BadgeVariant } from '../../shared/components/qm-badge/qm-badge.component';

interface KernelFact { index: string; title: string; text: string; }
interface ComputingModel { name: string; detail: string; status: string; variant: BadgeVariant; }
interface EcosystemCard { name: string; detail: string; variant: BadgeVariant; status: string; }
interface StdlibCard { category: string; modules: string; detail: string; }
interface FlowStep { step: string; command: string; note: string; }
interface StatusRow { area: string; status: string; note: string; variant: BadgeVariant; }
interface PipelineZone { zone: string; title: string; note: string; package: string; }

@Component({
    selector: 'app-karkain',
    imports: [RouterModule, QmContainerComponent, QmSectionComponent, QmButtonComponent, QmBadgeComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <!-- ══════════ HERO ══════════ -->
    <section class="k-hero surface-subtle">
      <qm-container>
        <a routerLink="/technology" class="k-back">&larr; Technology Ecosystem</a>
        <div class="k-badges">
          <qm-badge variant="development">Active Development</qm-badge>
          <qm-badge variant="software">Programming Language</qm-badge>
          <qm-badge variant="early-access">v1.0.0</qm-badge>
        </div>
        <h1 class="k-title">Karkain</h1>
        <p class="k-tagline">A programming language for the next generation of computing.</p>
        <p class="k-lead">
          Karkain is an independently developed, statically typed systems programming
          language. It compiles <span class="k-mono">.kark</span> source to C23 and delegates to
          GCC, Clang or MSVC for final machine code — built around ownership-based memory safety,
          native concurrency, and a heterogeneous computing vision spanning CPU, GPU and quantum
          hardware.
        </p>
        <div class="k-cta">
          <qm-button variant="primary" size="lg" [href]="'#karkain-pipeline'">
            Explore the Technology →
          </qm-button>
          <qm-button variant="outline" size="lg" [href]="'https://github.com/ajit-ai/Karkain'" [target]="'_blank'" [ariaLabel]="'View Karkain on GitHub (opens in a new tab)'">
            View on GitHub
          </qm-button>
        </div>
        <ul class="k-meta" aria-label="Karkain at a glance">
          <li><span class="k-mono k-mono--accent">.kark</span> source extension</li>
          <li><span class="k-mono">C23</span> native backend</li>
          <li><span class="k-mono">Self-hosting</span> compiler</li>
          <li><span class="k-mono">Borrow checking</span> memory safety</li>
          <li><span class="k-mono">v1.0.0</span> released</li>
        </ul>
      </qm-container>
    </section>

    <!-- ══════════ CODE PANEL SECTION ══════════ -->
    <qm-section surface="white" size="sm" ariaLabel="Hello, Karkain — a verified example program">
      <qm-container size="narrow">
        <div class="k-two">
          <div>
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
          <div>
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
          @for (f of principles; track f.title) {
            <article class="k-card">
              <div class="k-index">{{ f.index }}</div>
              <h3>{{ f.title }}</h3>
              <p>{{ f.text }}</p>
            </article>
          }
        </div>
      </qm-container>
    </qm-section>

    <!-- ══════════ PIPELINE ══════════ -->
    <section class="k-pipeline surface-dark" aria-label="The Karkain compiler pipeline">
      <div id="karkain-pipeline" class="k-anchor"></div>
      <qm-container>
        <div class="k-dark-head">
          <span class="k-eyebrow-dark">COMPILER PIPELINE</span>
          <h2 class="k-h2 k-h2--dark">From <span class="k-mono k-mono--dark">.kark</span> source to a running binary</h2>
          <p class="k-lead k-lead--dark">
            A deterministic, multi-stage pipeline. Karkain performs its own lexing, parsing,
            semantic analysis and optimization; only the final machine-code lowering is delegated
            to a mature C compiler.
          </p>
        </div>

        <div class="k-flow" aria-label="High-level compilation flow">
          @for (s of flow; track s[0]) {
            <span class="k-flow-chip k-mono">{{ s[0] }}</span><span class="k-flow-arrow" aria-hidden="true">→</span>
          }
          <span class="k-flow-chip k-flow-chip--accent k-mono">Binary</span>
        </div>

        <div class="k-zones">
          @for (z of zones; track z.zone) {
            <div class="k-zone">
              <div class="k-zone-head">
                <span class="k-zone-name k-mono">{{ z.zone }}</span>
                <span class="k-zone-pkg k-mono">{{ z.package }}</span>
              </div>
              <p class="k-zone-title">{{ z.title }}</p>
              <p class="k-zone-note">{{ z.note }}</p>
            </div>
          }
        </div>

        <p class="k-dark-note">
          The CPU path is the production pipeline behind Karkain 1.0. GPU shaders (WGSL, SPIR-V,
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
          @for (m of models; track m.name) {
            <article class="k-card">
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
          <div>
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
          <div class="k-stack">
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
          <div>
            <div class="k-code k-code--tall" role="presentation">
              <div class="k-code__head">
                <span class="k-dots"><i></i><i></i><i></i></span>
                <span class="k-filename">src/compiler/ — written in Karkain</span>
              </div>
              <pre><code>{{ compilerCode }}</code></pre>
            </div>
            <p class="k-note">Boostrapped through C, the self-hosted front-end then builds Karkain programs by emitting C23 and linking with a system C compiler.</p>
          </div>
          <div class="k-stack">
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
          @for (e of ecosystem; track e.name) {
            <article class="k-card">
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
          @for (s of stdlib; track s.category) {
            <article class="k-card">
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
          @for (s of steps; track s.step) {
            <div class="k-step">
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
          Karkain reached version 1.0.0 for its core pipeline and continues in active development.
          Some areas are fully shipping; others are being built or are direction.
        </p>
        <div class="k-table-wrap">
          <table class="k-table">
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
          <article class="k-road">
            <qm-badge variant="development">Current</qm-badge>
            <h3>Consolidating 1.0</h3>
            <ul>
              <li>Deepening the core language and compiler pipeline.</li>
              <li>Self-hosted front-end as the daily driver.</li>
              <li>Extending the standard library modules.</li>
              <li>Expanding the package ecosystem and lockfile workflow.</li>
            </ul>
          </article>
          <article class="k-road">
            <qm-badge variant="early-access">Developing</qm-badge>
            <h3>Heterogeneous reach</h3>
            <ul>
              <li>WASM/WASI as a first-class deployment target.</li>
              <li>GPU kernel compilation from the same source file.</li>
              <li>Cross-compilation and target triples maturing.</li>
              <li>An even richer standard library and LSP experience.</li>
            </ul>
          </article>
          <article class="k-road">
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
        <div class="page-cta">
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
    <qm-section surface="dark" size="sm" ariaLabel="Explore Karkain on GitHub">
      <qm-container size="narrow">
        <div class="page-cta">
          <span class="k-eyebrow-dark">GET INVOLVED</span>
          <h2 class="k-h2--dark">Explore Karkain</h2>
          <p class="k-lead k-lead--dark">
            Follow the project on GitHub. The language, the compiler, the standard library and the
            documentation evolve together — and the repository is the source of truth.
          </p>
          <div class="k-cta k-cta--center">
            <qm-button variant="primary" size="lg" [href]="'https://github.com/ajit-ai/Karkain'" [target]="'_blank'" [ariaLabel]="'View Karkain on GitHub (opens in a new tab)'">
              View on GitHub →
            </qm-button>
            <qm-button variant="outline" size="lg" [href]="'https://github.com/ajit-ai/Karkain/releases'" [target]="'_blank'" [ariaLabel]="'View Karkain releases on GitHub (opens in a new tab)'">
              Releases
            </qm-button>
          </div>
          <p class="k-docs-note k-lead k-lead--dark">
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
    .k-section-lead { max-width: 680px; margin: 0 0 40px; font-size: 18px; line-height: 1.7; color: #475569; }
    .k-lead { max-width: 680px; margin: 0 0 24px; font-size: 18px; line-height: 1.7; color: #475569; }
    .k-note { font-size: 14px; line-height: 1.6; color: #64748B; margin: 20px 0 0; }
    .k-note--center { text-align: center; max-width: 720px; margin-left: auto; margin-right: auto; }
    .k-mono { font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', ui-monospace, 'SFMono-Regular', Consolas, monospace; font-size: 14px; }
    .k-code-subhead { font-size: 15px; color: #2563EB; margin: 0 0 8px; font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace; }
    .k-index { font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', ui-monospace, Consolas, monospace; font-size: 13px; color: #2563EB; margin-bottom: 12px; }
    .k-two { display: grid; gap: 40px; }
    @media (min-width: 1024px) { .k-two { grid-template-columns: 1fr 1fr; gap: 56px; align-items: start; } }
    .k-grid { display: grid; gap: 24px; grid-template-columns: 1fr; }
    @media (min-width: 640px) { .k-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 1024px) { .k-grid { grid-template-columns: repeat(3, 1fr); } }
    .k-stack { display: grid; gap: 16px; }

    .k-card {
      background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px;
      padding: 28px; transition: box-shadow 200ms ease, transform 200ms ease, border-color 200ms ease;
    }
    .k-card:hover { box-shadow: 0 10px 15px rgba(0, 0, 0, 0.06), 0 4px 6px rgba(0, 0, 0, 0.04); transform: translateY(-2px); border-color: #CBD5E1; }
    .k-card h3 { margin: 0 0 12px; font-size: 20px; }
    .k-card h4 { margin: 0 0 8px; font-size: 15px; color: #475569; }
    .k-card p { font-size: 15px; line-height: 1.7; color: #475569; margin: 0; }
    .k-card--compact { padding: 20px; }
    .k-card-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 12px; }
    .k-card-head h3 { margin: 0; }

    /* ══════════ HERO ══════════ */
    .k-hero { padding: 80px 0 56px; border-bottom: 1px solid #E2E8F0; }
    @media (min-width: 768px) { .k-hero { padding: 112px 0 72px; } }
    .k-back { display: inline-block; margin-bottom: 28px; font-size: 14px; font-weight: 500; color: #475569; text-decoration: none; }
    .k-back:hover { color: #2563EB; text-decoration: underline; }
    .k-badges { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
    .k-title { margin: 0 0 12px; font-size: clamp(44px, 6vw, 72px); line-height: 1.02; letter-spacing: -0.03em; font-weight: 700; }
    .k-tagline { margin: 0 0 20px; font-size: 22px; font-weight: 600; color: #111827; }
    .k-cta { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 32px; }
    .k-cta--center { justify-content: center; }
    .k-meta { list-style: none; display: flex; flex-wrap: wrap; gap: 12px 28px; padding: 24px 0 0; margin: 32px 0 0; border-top: 1px solid #E2E8F0; }
    .k-meta li { display: flex; align-items: center; gap: 8px; font-size: 14px; color: #475569; margin: 0; }
    .k-mono--accent { color: #D97706; }

    /* ══════════ CODE PANELS ══════════ */
    .k-inline-dot { font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', ui-monospace, Consolas, monospace; color: #D97706; }
    .k-whatnot { margin: 20px 0 0; padding-left: 20px; color: #475569; }
    .k-whatnot li { margin-bottom: 10px; line-height: 1.6; }
    .k-code {
      background: #0F172A; border: 1px solid #1E293B; border-radius: 12px; overflow: hidden;
      box-shadow: 0 10px 15px rgba(0, 0, 0, 0.12), 0 4px 6px rgba(0, 0, 0, 0.08);
    }
    .k-code__head { display: flex; align-items: center; gap: 12px; padding: 12px 16px; background: #1E293B; border-bottom: 1px solid #334155; }
    .k-dots { display: flex; gap: 6px; }
    .k-dots i { width: 10px; height: 10px; border-radius: 50%; background: #334155; display: block; }
    .k-dots i:nth-child(1) { background: #EF4444; }
    .k-dots i:nth-child(2) { background: #F59E0B; }
    .k-dots i:nth-child(3) { background: #10B981; }
    .k-filename { font-size: 13px; color: #94A3B8; }
    .k-code pre { margin: 0; padding: 20px 24px; overflow-x: auto; }
    .k-code pre code { background: none; border: none; padding: 0; color: #E2E8F0; font-size: 13.5px; line-height: 1.6; }
    .k-code__foot { padding: 10px 16px; background: #0F172A; border-top: 1px solid #1E293B; color: #64748B; font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace; font-size: 12.5px; }
    .k-code--tall pre { padding: 28px 24px; }
    .k-code--mini { box-shadow: none; }
    .k-code--mini .k-code__head { background: transparent; border-bottom: none; color: #E2E8F0; padding: 14px 18px; font-size: 13.5px; }

    /* ══════════ DARK SECTIONS ══════════ */
    .k-pipeline { padding-top: 96px; padding-bottom: 96px; }
    @media (min-width: 768px) { .k-pipeline { padding-top: 128px; padding-bottom: 128px; } }
    .k-anchor { scroll-margin-top: 88px; }
    .k-dark-head { max-width: 760px; margin: 0 0 40px; }
    .k-eyebrow-dark { display: inline-block; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #60A5FA; margin-bottom: 16px; }
    .k-h2--dark { color: #F1F5F9; }
    .k-lead--dark { color: #94A3B8; }
    .k-mono--dark { color: #E2E8F0; background: #1E293B; border: 1px solid #334155; border-radius: 6px; padding: 1px 6px; }
    .k-flow { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; margin: 0 0 40px; }
    .k-flow-chip { font-size: 13px; color: #E2E8F0; background: #1E293B; border: 1px solid #334155; padding: 8px 14px; border-radius: 8px; white-space: nowrap; }
    .k-flow-chip--accent { background: #D97706; border-color: #D97706; color: #FFFFFF; font-weight: 600; }
    .k-flow-arrow { color: #64748B; font-size: 16px; }
    .k-zones { display: grid; gap: 16px; grid-template-columns: 1fr; }
    @media (min-width: 768px) { .k-zones { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 1024px) { .k-zones { grid-template-columns: repeat(4, 1fr); } }
    .k-zone { background: #1E293B; border: 1px solid #334155; border-radius: 12px; padding: 20px; }
    .k-zone-head { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; margin-bottom: 10px; }
    .k-zone-name { color: #60A5FA; font-size: 12px; letter-spacing: 0.04em; text-transform: uppercase; }
    .k-zone-pkg { color: #64748B; font-size: 12px; }
    .k-zone-title { color: #E2E8F0; font-size: 14px; font-weight: 600; margin: 0 0 6px; }
    .k-zone-note { color: #94A3B8; font-size: 13px; line-height: 1.6; margin: 0; }
    .k-dark-note { color: #64748B; font-size: 13px; line-height: 1.6; margin: 32px 0 0; max-width: 820px; }

    .page-cta { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 16px; }
    .page-cta h2 { margin: 0; font-size: clamp(28px, 3.2vw, 40px); }
    .page-cta .lead { max-width: 640px; }
    .k-docs-note { max-width: 600px; margin: 8px auto 0; font-size: 14px; line-height: 1.6; }

    /* ══════════ STEPS ══════════ */
    .k-steps { display: grid; gap: 16px; grid-template-columns: 1fr; margin-bottom: 32px; }
    @media (min-width: 480px) { .k-steps { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 1024px) { .k-steps { grid-template-columns: repeat(3, 1fr); } }
    .k-step { background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; padding: 18px; display: flex; flex-direction: column; gap: 10px; }
    .k-step-num { color: #2563EB; font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em; }
    .k-step-note { font-size: 14px; color: #475569; line-height: 1.6; margin: 0; }
    .k-tools { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
    .k-tools-label { font-size: 14px; font-weight: 500; color: #475569; }
    .k-chip-list { list-style: none; display: flex; flex-wrap: wrap; gap: 8px; padding: 0; margin: 0; }
    .k-chip { font-size: 13px; color: #2563EB; background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 9999px; padding: 6px 14px; }

    /* ══════════ STDLIB / ROADMAP ══════════ */
    .k-grid--std { grid-template-columns: 1fr; }
    @media (min-width: 640px) { .k-grid--std { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 1024px) { .k-grid--std { grid-template-columns: repeat(3, 1fr); } }
    .k-std-mods { color: #D97706; font-size: 13px; margin-bottom: 10px; word-break: break-word; }
    .k-grid--roadmap { grid-template-columns: 1fr; }
    @media (min-width: 768px) { .k-grid--roadmap { grid-template-columns: repeat(3, 1fr); } }
    .k-road { background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 28px; }
    .k-road h3 { margin: 16px 0 12px; font-size: 20px; }
    .k-road ul { margin: 0; padding-left: 20px; color: #475569; }
    .k-road li { margin-bottom: 10px; line-height: 1.6; }

    /* ══════════ STATUS TABLE ══════════ */
    .k-table-wrap { overflow-x: auto; border: 1px solid #E2E8F0; border-radius: 12px; background: #FFFFFF; }
    .k-table { width: 100%; border-collapse: collapse; min-width: 640px; }
    .k-table th { text-align: left; font-size: 12px; letter-spacing: 0.07em; text-transform: uppercase; color: #64748B; padding: 14px 18px; border-bottom: 1px solid #E2E8F0; }
    .k-table td { padding: 14px 18px; border-bottom: 1px solid #F1F5F9; vertical-align: top; }
    .k-table tr:last-child td { border-bottom: none; }
    .k-table td:first-child { font-weight: 600; color: #111827; }
    .k-table td:last-child { color: #475569; font-size: 14px; line-height: 1.6; min-width: 240px; }
    .k-table td:nth-child(2) { white-space: nowrap; }
    .k-table tr:hover td { background: #F8FAFC; }
    @media (max-width: 640px) {
      .k-table th { display: none; }
      .k-table, .k-table tbody, .k-table tr, .k-table td { display: block; width: 100%; }
      .k-table tr { padding: 12px 16px; border-bottom: 1px solid #E2E8F0; }
      .k-table tr:last-child { border-bottom: none; }
      .k-table td { border: none; padding: 6px 0; }
      .k-table td:first-child { padding-top: 0; font-size: 15px; }
      .k-table td:nth-child(2) { white-space: normal; }
      .k-table td::before { display: block; font-size: 11px; letter-spacing: 0.07em; text-transform: uppercase; color: #64748B; margin-bottom: 2px; content: attr(data-label); }
      .k-table td:last-child { min-width: 0; }
    }

    /* ══════════ A11Y ══════════ */
    .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }

    @media (prefers-reduced-motion: reduce) {
      .k-card { transition: none; transform: none; }
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
    { name: 'CPU', status: 'Current', variant: 'development', detail: 'Compiles to C23 and links with GCC, Clang or MSVC. Full native support with Karkain\u2019s own target-triple model (x86_64, aarch64).' },
    { name: 'SIMD', status: 'Evolving', variant: 'experimental', detail: 'AVX2-aware intrinsics and optimized matrix operations for performance-critical kernels.' },
    { name: 'WASM', status: 'Active', variant: 'early-access', detail: 'A wasm32-wasi target whose module is emitted directly, without an external linker.' },
    { name: 'GPU', status: 'Evolving', variant: 'experimental', detail: 'Kernel-driven design aiming to emit WGSL, OpenCL and SPIR-V shaders from the same source file.' },
    { name: 'Quantum', status: 'Direction', variant: 'research', detail: 'Gate-level circuits targeted at OpenQASM 3.0 and QIR as part of the long-term heterogeneous architecture.' },
    { name: 'Hardware reach', status: 'Future', variant: 'concept', detail: 'NPU, FPGA, DPU and neuromorphic-class targets remain long-term research horizons on the project\u2019s abstraction agenda.' }
  ];

  compilerComponents: KernelFact[] = [
    { index: 'lexer.kark', title: 'Lexer', text: 'Tokenizes Karkain source, written in Karkain.' },
    { index: 'parser.kark', title: 'Parser', text: 'Builds the AST from the token stream.' },
    { index: 'ast.kark · atypes.kark', title: 'AST & types', text: 'Syntax tree and attribute type definitions.' },
    { index: 'sema.kark · checker.kark', title: 'Semantic analysis', text: 'Type checking and analysis in Karkain.' },
    { index: 'codegen.kark', title: 'Code generation', text: 'Emits C23 from the analyzed program.' }
  ];

  ecosystem: EcosystemCard[] = [
    { name: 'Language', status: 'Active Development', variant: 'development', detail: 'Static typing, ownership and borrow checking, algebraic data types, pattern matching, and a spec tracked in SPEC.md.' },
    { name: 'Compiler', status: 'Active Development', variant: 'development', detail: 'The self-hosted engine lexes, parses, analyzes, optimizes and emits C23.' },
    { name: 'Runtime', status: 'Active Development', variant: 'development', detail: 'A concurrency runtime with tasks and channels; a separate bytecode (.kbc) and JIT engine. No garbage collector.' },
    { name: 'Standard Library', status: 'Evolving', variant: 'early-access', detail: '.kark modules for core semantics, strings, collections, I/O, encoding, crypto, math and more.' },
    { name: 'Toolchain', status: 'Active Development', variant: 'development', detail: 'run, build, check, test, fmt, lint, bench, prof, plus package manager and workspaces.' },
    { name: 'Developer Tools', status: 'Evolving', variant: 'experimental', detail: 'LSP server for hover and go-to-definition, with IDE integration via a machine-readable contract.' }
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
    { area: 'Compiler core · Karkain 1.0', status: 'Active Development', variant: 'development', note: 'The production release gate passed; version 1.0.0 is published and development continues across phases.' },
    { area: 'Self-hosting', status: 'Active Development', variant: 'development', note: 'The compiler\u2019s Karkain-written front-end is the default engine and builds Karkain programs today.' },
    { area: 'Language & core pipeline', status: 'Active Development', variant: 'development', note: 'Additional type-system features, autodiff and quantum safety are tracked in the language spec.' },
    { area: 'Concurrency runtime', status: 'Active Development', variant: 'development', note: 'Task model, channels and synchronization primitives.' },
    { area: 'Standard library', status: 'Evolving', variant: 'early-access', note: 'Core, string, collections, I/O, encoding, crypto, math and system modules live in-repo as .kark.' },
    { area: 'Cross-compilation', status: 'Active Development', variant: 'development', note: 'An owned target-triple model covering x86_64, aarch64 and wasm32 over windows, linux and wasi. Running foreign targets is refused for honesty.' },
    { area: 'Heterogeneous backends', status: 'Direction', variant: 'research', note: 'GPU and quantum backends are documented in the compiler architecture and on the roadmap.' }
  ];
}