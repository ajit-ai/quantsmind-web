import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../shared/components/qm-section/qm-section.component';
import { QmButtonComponent }    from '../../shared/components/qm-button/qm-button.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, QmContainerComponent, QmSectionComponent, QmButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-hero surface-subtle">
      <qm-container>
        <span class="eyebrow">ABOUT</span>
        <h1>Built Around Deep Technical Craft.</h1>
        <p class="lead">
          QuantsMind is a technology engineering company. We exist because complex
          technology problems deserve engineers who think carefully, design rigorously,
          and build systems worth maintaining.
        </p>
      </qm-container>
    </section>

    <!-- Why QuantsMind -->
    <qm-section surface="white">
      <qm-container>
        <div class="about-section">
          <div class="about-section__heading">
            <span class="eyebrow">WHY QUANTSMIND</span>
            <h2>Technology Engineering, Not Technology Services.</h2>
          </div>
          <div class="about-section__body">
            <p>Most technology problems of real consequence are engineering problems — not procurement problems, methodology problems, or resourcing problems. They require engineers who understand the domain deeply, reason carefully about architecture, and make decisions that hold up under operational pressure.</p>
            <p>QuantsMind was created with that premise at its centre. We are not a services marketplace, a digital agency, or a technology vendor. We are a technology engineering company that works on genuinely difficult problems: complex enterprise systems, intelligent applications, data platforms, cloud infrastructure, modernisation challenges, and advanced computing.</p>
            <p>The name reflects our roots. Quantitative thinking — rigorous, mathematical, evidence-based — combined with systems intelligence. The problems we find most interesting sit at the intersection of computational complexity, data at scale, and real organisational consequence.</p>
          </div>
        </div>
      </qm-container>
    </qm-section>

    <!-- Mission & Vision -->
    <qm-section surface="canvas">
      <qm-container>
        <div class="mv-grid">
          <div class="mv-card">
            <span class="eyebrow">MISSION</span>
            <h2 class="mv-card__headline">
              To engineer technology solutions to genuinely complex problems —
              with rigour, clarity, and long-term responsibility.
            </h2>
          </div>
          <div class="mv-card">
            <span class="eyebrow">VISION</span>
            <h2 class="mv-card__headline">
              To be the engineering company organisations turn to when
              the problem is hard, the stakes are high, and precision matters.
            </h2>
          </div>
        </div>
      </qm-container>
    </qm-section>

    <!-- Principles -->
    <qm-section surface="white">
      <qm-container>
        <span class="eyebrow">PRINCIPLES</span>
        <h2>How We Work and Why.</h2>
        <div class="principles-grid">
          <div *ngFor="let p of principles" class="principle-card">
            <h3 class="principle-card__title">{{ p.title }}</h3>
            <p class="principle-card__desc">{{ p.description }}</p>
          </div>
        </div>
      </qm-container>
    </qm-section>

    <!-- Technical Culture -->
    <qm-section surface="canvas">
      <qm-container>
        <div class="culture-layout">
          <div class="culture-text">
            <span class="eyebrow">TECHNICAL CULTURE</span>
            <h2>What We Value in Engineering.</h2>
            <p>At QuantsMind, engineering quality is not negotiated. We hold ourselves to a standard of work that is technically coherent, architecturally sound, and maintainable by the teams who inherit it.</p>
            <p>We value engineers who read widely, reason carefully, and communicate clearly. We prefer systems that are simple enough to be understood completely over systems that are impressively complex. We treat software as an engineering discipline, not a craft to be rushed.</p>
          </div>
          <div class="culture-values">
            <div *ngFor="let v of cultureValues" class="culture-value">
              <div class="culture-value__title">{{ v.title }}</div>
              <p class="culture-value__desc">{{ v.description }}</p>
            </div>
          </div>
        </div>
      </qm-container>
    </qm-section>

    <!-- Long-term direction -->
    <qm-section surface="white">
      <qm-container size="narrow">
        <span class="eyebrow">DIRECTION</span>
        <h2>Where We Are Going.</h2>
        <div class="direction-text">
          <p>QuantsMind is building a technology engineering company with genuine depth — across AI, data, cloud, software, and advanced computing. We are developing intellectual property, publishing technical research, and building reusable engineering frameworks that compound over time.</p>
          <p>We are specifically interested in problems at the intersection of organisational complexity and computational difficulty: where the data is large, the constraints are real, and the correctness requirements are high. This includes financial systems, industrial optimisation, intelligent enterprise applications, and the early practical applications of advanced computing.</p>
          <p>We are not trying to be everything. We are trying to be exceptionally good at technology engineering for complex problems, and to build the research and intellectual property that makes us increasingly valuable to the organisations we work with.</p>
        </div>
        <qm-button variant="primary" size="lg" [routerLinkValue]="'/contact'">
          Talk to QuantsMind →
        </qm-button>
      </qm-container>
    </qm-section>
  `,
  styles: [`
    .page-hero { padding: 80px 0 64px; border-bottom: 1px solid #E2E8F0; }
    @media (min-width: 768px) { .page-hero { padding: 112px 0 80px; } }
    .page-hero h1 { max-width: 700px; margin: 0 0 20px; }
    .page-hero .lead { max-width: 620px; margin: 0; }

    /* About section */
    .about-section {
      display: grid; grid-template-columns: 1fr; gap: 48px;
    }
    @media (min-width: 1024px) { .about-section { grid-template-columns: 1fr 1.6fr; } }
    .about-section__heading h2 { margin: 0; max-width: 360px; }
    .about-section__body p {
      font-size: 16px; line-height: 1.8; color: #475569;
      margin: 0 0 20px;
    }
    .about-section__body p:last-child { margin: 0; }

    /* Mission & Vision */
    .mv-grid {
      display: grid; grid-template-columns: 1fr; gap: 24px;
    }
    @media (min-width: 768px) { .mv-grid { grid-template-columns: repeat(2, 1fr); } }
    .mv-card {
      padding: 40px; background: #FFFFFF;
      border: 1px solid #E2E8F0; border-radius: 16px;
    }
    .mv-card__headline {
      font-size: clamp(18px, 2vw, 22px);
      font-weight: 500; color: #111827;
      line-height: 1.5; letter-spacing: -0.01em; margin: 0;
    }

    /* Principles */
    .principles-grid {
      display: grid; grid-template-columns: 1fr; gap: 16px; margin-top: 40px;
    }
    @media (min-width: 640px)  { .principles-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 1024px) { .principles-grid { grid-template-columns: repeat(3, 1fr); } }
    .principle-card {
      padding: 24px; background: #F8FAFC;
      border: 1px solid #E2E8F0; border-radius: 12px;
    }
    .principle-card__title {
      font-size: 15px; font-weight: 600; color: #111827; margin: 0 0 8px;
    }
    .principle-card__desc {
      font-size: 13px; color: #475569; line-height: 1.6; margin: 0;
    }

    /* Culture */
    .culture-layout {
      display: grid; grid-template-columns: 1fr; gap: 48px; align-items: start;
    }
    @media (min-width: 1024px) { .culture-layout { grid-template-columns: 1fr 1fr; } }
    .culture-text h2 { margin: 0 0 20px; }
    .culture-text p { font-size: 15px; line-height: 1.8; color: #475569; margin: 0 0 16px; }
    .culture-text p:last-child { margin: 0; }

    .culture-values { display: flex; flex-direction: column; gap: 16px; }
    .culture-value {
      padding: 20px; background: #FFFFFF;
      border: 1px solid #E2E8F0; border-radius: 10px;
    }
    .culture-value__title {
      font-size: 14px; font-weight: 600; color: #111827; margin-bottom: 6px;
    }
    .culture-value__desc {
      font-size: 13px; color: #475569; line-height: 1.6; margin: 0;
    }

    /* Direction */
    .direction-text { margin-bottom: 32px; }
    .direction-text p {
      font-size: 16px; line-height: 1.8; color: #475569; margin: 0 0 20px;
    }
    .direction-text p:last-child { margin: 0; }

    .eyebrow {
      display: inline-block; font-size: 12px; font-weight: 600;
      letter-spacing: 0.1em; text-transform: uppercase; color: #2563EB; margin-bottom: 16px;
    }
    .lead { font-size: 18px; line-height: 1.7; color: #475569; }
  `]
})
export class AboutComponent {
  principles = [
    { title: 'Start With Understanding',   description: 'We do not begin with solutions. We begin with questions. Every engagement starts with an honest attempt to understand the problem domain fully.' },
    { title: 'Architecture Is Design',     description: 'The structural decisions made before implementation are the most consequential. We treat architecture as a first-class engineering activity, not a diagram added afterwards.' },
    { title: 'Correctness Is Non-Negotiable', description: 'Systems must behave correctly under all specified conditions, including failure modes and edge cases. Correctness is a requirement, not a quality enhancement.' },
    { title: 'Be Honest About Maturity',   description: 'We do not present research as product capability. We do not claim expertise we do not have. Clients deserve an accurate picture of what is possible today.' },
    { title: 'Long-Term Thinking',         description: 'We build systems that the next engineering team can understand, maintain, and evolve. Short-term velocity at the expense of long-term maintainability is a false economy.' },
    { title: 'Technical Depth First',      description: 'We value genuine technical depth over breadth of capability claims. It is better to be excellent at fewer things than mediocre across many.' },
    { title: 'Evidence Over Assumption',   description: 'Engineering decisions should be grounded in evidence — measured performance, characterised behaviour, and understood trade-offs — not intuition or fashion.' },
    { title: 'Problems Before Technology', description: 'Technology is the answer to a problem. We insist on understanding the problem before selecting the technology, regardless of how compelling a particular technology may be.' },
    { title: 'Responsibility to Quality',  description: 'We are responsible for the quality of what we build. That means code review, testing, documentation, and the discipline to tell clients when something is not ready.' }
  ];

  cultureValues = [
    { title: 'Read Deeply, Think Carefully',      description: 'We read research papers, engineering post-mortems, and technical documentation. We form views based on evidence and update them when evidence changes.' },
    { title: 'Prefer Simple, Resist Complexity',  description: 'Complexity is a liability. We prefer the simplest architecture that solves the problem, and we resist the temptation to add sophistication that is not required.' },
    { title: 'Communicate With Precision',        description: 'Imprecise communication about technical systems leads to imprecise systems. We value clear, accurate, concise technical communication.' },
    { title: 'Take Ownership',                    description: 'We do not hand off problems. Engineers at QuantsMind take ownership of outcomes, not just tasks, and care about what happens after they stop working on something.' }
  ];
}
