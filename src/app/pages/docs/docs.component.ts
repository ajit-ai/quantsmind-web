import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent } from '../../shared/components/qm-section/qm-section.component';

interface DocLink { readonly label: string; readonly url: string; readonly note: string }
interface DocGroup { readonly title: string; readonly items: readonly DocLink[] }

@Component({
  selector: 'app-docs',
  imports: [RouterModule, QmContainerComponent, QmSectionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <qm-section surface="canvas" ariaLabel="Documentation index">
      <qm-container>
        <span class="eyebrow">DOCUMENTATION</span>
        <h1>Documentation index</h1>
        <p class="lead">The authoritative documentation for each QuantsMind project lives in its repository. This index links the public sources of truth; nothing here replaces the release notes.</p>

        @for (group of groups; track group.title) {
          <section class="docs__group" [attr.aria-label]="group.title">
            <h2>{{ group.title }}</h2>
            <ul>
              @for (item of group.items; track item.url) {
                <li>
                  <a [href]="item.url" target="_blank" rel="noopener noreferrer">{{ item.label }} ↗</a>
                  <span>{{ item.note }}</span>
                </li>
              }
            </ul>
          </section>
        }

        <footer class="docs__foot">
          <p class="note">Release notes are the upstream source of truth for behaviour and limitations. Where a page on this site disagrees with the release notes, the release notes win — and the page is a bug, please report it via the contact page.</p>
          <a routerLink="/products">Browse the Products Store →</a>
        </footer>
      </qm-container>
    </qm-section>
  `,
  styles: [`
    :host { display: block; }
    .eyebrow { font-size: 12px; letter-spacing: 0.08em; font-weight: 700; color: var(--color-accent); }
    h1 { margin: 8px 0 12px; font-size: clamp(30px, 4.4vw, 44px); line-height: 1.14; }
    .lead { color: var(--color-text-secondary); font-size: 17px; line-height: 1.65; max-width: 780px; }
    .docs__group { margin-top: 26px; }
    .docs__group h2 { font-size: 20px; margin: 0 0 8px; }
    .docs__group ul { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 10px; }
    .docs__group a { color: var(--color-accent); font-weight: 600; text-decoration: none; }
    .docs__group a:hover { text-decoration: underline; }
    .docs__group span { color: var(--color-text-muted); font-size: 13px; margin-left: 8px; }
    .docs__foot { display: flex; flex-direction: column; gap: 10px; border-top: 1px solid var(--color-border); padding-top: 18px; margin-top: 30px; }
    .note { margin: 0; font-size: 13px; color: var(--color-text-muted); line-height: 1.6; max-width: 780px; }
    .docs__foot a { color: var(--color-accent); font-weight: 600; }
  `]
})
export class DocsComponent {
  readonly groups: readonly DocGroup[] = [
    {
      title: 'Karkain (programming language)',
      items: [
        { label: 'Karkain repository and SPEC.md', url: 'https://github.com/ajit-ai/Karkain', note: 'The repository is the source of truth.' },
        { label: 'Karkain v1.2.0 release notes', url: 'https://github.com/ajit-ai/Karkain/releases/tag/v1.2.0', note: 'Stable release; honest native-target subset.' },
        { label: 'Karkain Language Tools (VS Code)', url: 'https://github.com/ajit-ai/Karkain-VSCode', note: 'Extension documentation and requirements.' }
      ]
    },
    {
      title: 'MicroQuantum',
      items: [
        { label: 'MicroQuantum repository', url: 'https://github.com/ajit-ai/microquantum', note: 'Source, tests and documentation.' },
        { label: 'MicroQuantum docs (GitHub Pages)', url: 'https://ajit-ai.github.io/microquantum/', note: 'Published documentation site.' },
        { label: 'PyPI — microquantum', url: 'https://pypi.org/project/microquantum/', note: 'Released versions.' }
      ]
    },
    {
      title: 'QuantsMind SDK',
      items: [
        { label: 'QuantsMind SDK repository', url: 'https://github.com/ajit-ai/quantsmind-quantum-sdk', note: 'Architecture, ADRs, roadmap, package layout.' },
        { label: 'PyPI — quantsmind', url: 'https://pypi.org/project/quantsmind/', note: 'Released versions (1.1.0).' }
      ]
    },
    {
      title: 'QuantsMind-Agent',
      items: [
        { label: 'QuantsMind-Agent repository', url: 'https://github.com/ajit-ai/QuantsMind-Agent', note: 'README, supported platforms, permission model.' },
        { label: 'Agent v0.9.0 release notes', url: 'https://github.com/ajit-ai/QuantsMind-Agent/releases/tag/v0.9.0', note: 'Workspace Intelligence.' }
      ]
    },
    {
      title: 'QuantsMind AI Coder (VS Code)',
      items: [
        { label: 'QuantsMind-VSCode-AI-Coder repository', url: 'https://github.com/Quantsmind/QuantsMind-VSCode-AI-Coder', note: 'Source, releases, issue tracker.' },
        { label: 'Open VSX listing', url: 'https://open-vsx.org/extension/quantsmind/quantsmind-vscode-ai-coder', note: 'v3.1.0.' }
      ]
    },
    {
      title: 'Taksh (QuantsMind-LLM) — research',
      items: [
        { label: 'QuantsMind-LLM repository', url: 'https://github.com/ajit-ai/QuantsMind-LLM', note: 'Honest negative-result source release.' },
        { label: 'Taksh v1.0.0 release notes', url: 'https://github.com/ajit-ai/QuantsMind-LLM/releases/tag/v1.0.0', note: 'Evaluation records and limitations.' }
      ]
    }
  ];
}
