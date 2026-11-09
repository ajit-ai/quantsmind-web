/**
 * Verified research and innovation content, shared by the Research & Innovation
 * page and the homepage. Stages describe how exploration is conducted and areas
 * describe what is being explored. Neither claims a publication, a partnership,
 * an institutional relationship or a commercially available research outcome.
 */
export interface ResearchStage { index: string; title: string; text: string; }

export interface ResearchArea { name: string; tag: string; }

export const RESEARCH_STAGES: ResearchStage[] = [
  { index: '01', title: 'Explore', text: 'Follow interesting ideas and technical questions before deciding whether they are worth pursuing.' },
  { index: '02', title: 'Experiment', text: 'Build small, honest prototypes to test whether an idea works in practice — not just on paper.' },
  { index: '03', title: 'Validate', text: 'Check assumptions against reality, keeping scope clear and claims measured.' },
  { index: '04', title: 'Learn', text: 'Capture what works and what does not — even abandoned directions teach the next one.' },
  { index: '05', title: 'Evolve', text: 'Let mature experiments find a home: a technology, a product, or the wider engineering work of QuantsMind.' }
];

export const RESEARCH_AREAS: ResearchArea[] = [
  { name: 'Intelligent Systems', tag: 'Exploring' },
  { name: 'AI / Machine Learning', tag: 'Emerging' },
  { name: 'Quantum Computing', tag: 'Exploring' },
  { name: 'Programming Languages', tag: 'Developing' },
  { name: 'Developer Infrastructure', tag: 'Exploring' },
  { name: 'Data Intelligence', tag: 'Emerging' },
  { name: 'Scientific Computing', tag: 'Emerging' },
  { name: 'Future Computing Architectures', tag: 'Future Direction' }
];
