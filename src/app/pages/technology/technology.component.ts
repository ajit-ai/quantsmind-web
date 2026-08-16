import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../shared/components/qm-section/qm-section.component';
import { QmButtonComponent }    from '../../shared/components/qm-button/qm-button.component';
import { QmBadgeComponent }     from '../../shared/components/qm-badge/qm-badge.component';

@Component({
  selector: 'app-technology',
  standalone: true,
  imports: [CommonModule, RouterModule, QmContainerComponent, QmSectionComponent, QmButtonComponent, QmBadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-hero surface-subtle">
      <qm-container>
        <span class="eyebrow">TECHNOLOGY</span>
        <h1>Technical Depth Across the Modern Engineering Landscape.</h1>
        <p class="lead">
          We do not advocate for technology. We apply the right technology to the problem.
          Our landscape spans AI, data, cloud, software systems, optimisation, and
          advanced computing — including quantum.
        </p>
      </qm-container>
    </section>

    <ng-container *ngFor="let domain of domains; let i = index">
      <qm-section [surface]="i % 2 === 0 ? 'white' : 'canvas'" [id]="domain.id">
        <qm-container>
          <div class="domain-layout">
            <div class="domain-header">
              <qm-badge [variant]="domain.badge">{{ domain.category }}</qm-badge>
              <h2 class="domain-title">{{ domain.title }}</h2>
              <p class="domain-desc">{{ domain.description }}</p>
            </div>
            <div class="domain-body">
              <div class="domain-areas">
                <div *ngFor="let area of domain.areas" class="domain-area">
                  <h3 class="domain-area__title">{{ area.title }}</h3>
                  <p class="domain-area__desc">{{ area.description }}</p>
                  <div class="domain-area__tech">
                    <span *ngFor="let t of area.technologies" class="tech-tag">{{ t }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </qm-container>
      </qm-section>
    </ng-container>

    <qm-section surface="subtle" size="sm">
      <qm-container size="narrow">
        <div class="page-cta">
          <h2>Technology Questions?</h2>
          <p class="lead">Tell us what you are trying to build or improve. We will discuss the right technical approach.</p>
          <qm-button variant="primary" size="lg" [routerLinkValue]="'/contact'">
            Talk to QuantsMind →
          </qm-button>
        </div>
      </qm-container>
    </qm-section>
  `,
  styles: [`
    .page-hero { padding: 80px 0 64px; border-bottom: 1px solid #E2E8F0; }
    @media (min-width: 768px) { .page-hero { padding: 112px 0 80px; } }
    .page-hero h1 { max-width: 760px; margin: 0 0 20px; }
    .page-hero .lead { max-width: 620px; margin: 0; }

    .domain-layout { display: flex; flex-direction: column; gap: 32px; }
    .domain-header { max-width: 680px; }
    .domain-title { font-size: clamp(24px,3vw,36px); font-weight: 600; color: #111827; margin: 12px 0 16px; }
    .domain-desc  { font-size: 16px; color: #475569; line-height: 1.7; margin: 0; }

    .domain-areas {
      display: grid; grid-template-columns: 1fr; gap: 16px;
    }
    @media (min-width: 640px) { .domain-areas { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 1024px) { .domain-areas { grid-template-columns: repeat(3, 1fr); } }

    .domain-area {
      padding: 20px; background: #FFFFFF;
      border: 1px solid #E2E8F0; border-radius: 10px;
    }
    .domain-area__title { font-size: 14px; font-weight: 600; color: #111827; margin: 0 0 8px; }
    .domain-area__desc  { font-size: 13px; color: #475569; line-height: 1.6; margin: 0 0 12px; }
    .domain-area__tech  { display: flex; flex-wrap: wrap; gap: 4px; }
    .tech-tag {
      font-size: 11px; color: #475569; background: #F1F5F9;
      border: 1px solid #E2E8F0; border-radius: 9999px; padding: 2px 8px;
    }

    .page-cta { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 20px; }
    .page-cta h2 { margin: 0; }
    .eyebrow {
      display: inline-block; font-size: 12px; font-weight: 600;
      letter-spacing: 0.1em; text-transform: uppercase; color: #2563EB; margin-bottom: 16px;
    }
    .lead { font-size: 18px; line-height: 1.7; color: #475569; }
  `]
})
export class TechnologyComponent {
  domains = [
    {
      id: 'ai', badge: 'ai' as const, category: 'AI',
      title: 'Artificial Intelligence',
      description: 'Applied AI engineering — from large language model integration to production ML systems. We build AI capabilities that are measurable, maintainable, and genuinely useful.',
      areas: [
        { title: 'Large Language Models', description: 'LLM integration, prompt engineering, RAG architectures, and fine-tuning for specific domains.', technologies: ['OpenAI', 'Anthropic Claude', 'Llama', 'Mistral', 'LangChain', 'LlamaIndex'] },
        { title: 'Machine Learning Systems', description: 'End-to-end ML platform design, model training, serving infrastructure, and MLOps.', technologies: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'MLflow', 'Kubeflow', 'BentoML'] },
        { title: 'Computer Vision', description: 'Image classification, object detection, segmentation, and vision-language models.', technologies: ['YOLO', 'OpenCV', 'Detectron2', 'SAM', 'CLIP'] },
        { title: 'Natural Language Processing', description: 'Text classification, entity extraction, sentiment analysis, and information retrieval.', technologies: ['Transformers', 'spaCy', 'Elasticsearch', 'Vector Databases'] },
        { title: 'AI Evaluation & Safety', description: 'Systematic evaluation frameworks, red-teaming, and responsible AI deployment practices.', technologies: ['RAGAS', 'DeepEval', 'Promptfoo', 'Custom Eval Frameworks'] },
        { title: 'Knowledge Systems', description: 'Knowledge graphs, semantic search, and structured knowledge retrieval architectures.', technologies: ['Neo4j', 'Weaviate', 'Pinecone', 'Qdrant', 'pgvector'] }
      ]
    },
    {
      id: 'data', badge: 'data' as const, category: 'DATA',
      title: 'Data & Analytics',
      description: 'Data platform engineering from ingestion to insight. We design systems where data is reliable, lineage is clear, and analytical requirements can be met without compromising operational systems.',
      areas: [
        { title: 'Data Warehouse & Lakehouse', description: 'Modern analytical platforms combining the flexibility of data lakes with the governance of warehouses.', technologies: ['Snowflake', 'BigQuery', 'Databricks', 'Delta Lake', 'Apache Iceberg'] },
        { title: 'Data Pipeline Engineering', description: 'Reliable, observable, testable pipelines for batch and streaming data transformation.', technologies: ['dbt', 'Apache Spark', 'Airflow', 'Prefect', 'Dagster'] },
        { title: 'Streaming & Real-Time', description: 'Event streaming architectures for real-time analytics and operational intelligence.', technologies: ['Apache Kafka', 'Apache Flink', 'Kinesis', 'Redpanda'] },
        { title: 'Data Governance', description: 'Data quality frameworks, lineage tracking, cataloguing, and access control.', technologies: ['Apache Atlas', 'DataHub', 'Great Expectations', 'dbt Tests'] },
        { title: 'Analytical Engineering', description: 'Dimensional modelling, semantic layers, and metric frameworks for business intelligence.', technologies: ['dbt Semantic Layer', 'Cube', 'Looker', 'Metabase'] },
        { title: 'Data Platform Architecture', description: 'Data mesh, domain ownership, and federated analytical platform design.', technologies: ['Data Mesh', 'Data Vault 2.0', 'Medallion Architecture'] }
      ]
    },
    {
      id: 'cloud', badge: 'cloud' as const, category: 'CLOUD',
      title: 'Cloud & Distributed Systems',
      description: 'Cloud infrastructure and distributed platform engineering — reliable, scalable, observable, and cost-controlled. Infrastructure is code; production is designed to be understood.',
      areas: [
        { title: 'Cloud Platforms', description: 'Native engineering across major cloud platforms with a focus on well-architected principles.', technologies: ['AWS', 'Google Cloud', 'Azure', 'Multi-Cloud Patterns'] },
        { title: 'Container Orchestration', description: 'Kubernetes platform engineering, operator development, and production operations.', technologies: ['Kubernetes', 'Helm', 'Kustomize', 'Argo CD', 'Flux'] },
        { title: 'Infrastructure as Code', description: 'Every resource defined, version-controlled, testable, and auditable.', technologies: ['Terraform', 'OpenTofu', 'Pulumi', 'AWS CDK', 'Crossplane'] },
        { title: 'Observability', description: 'Metrics, traces, logs, and alerting designed from the start — not added after problems occur.', technologies: ['OpenTelemetry', 'Prometheus', 'Grafana', 'Jaeger', 'Datadog'] },
        { title: 'Service Mesh & Networking', description: 'Service-to-service communication, traffic management, and zero-trust networking.', technologies: ['Istio', 'Linkerd', 'Envoy', 'Cilium'] },
        { title: 'Serverless & Event-Driven', description: 'Event-driven architectures and serverless computing where they genuinely simplify operations.', technologies: ['AWS Lambda', 'Cloud Functions', 'EventBridge', 'SNS/SQS', 'Pub/Sub'] }
      ]
    },
    {
      id: 'software', badge: 'software' as const, category: 'SOFTWARE',
      title: 'Software Systems',
      description: 'Engineering software that is correct, maintainable, and designed to evolve. We apply disciplined software engineering across backend systems, APIs, and distributed applications.',
      areas: [
        { title: 'Backend Engineering', description: 'Server-side systems engineered for correctness, performance, and long-term maintainability.', technologies: ['Java', 'Go', 'Python', 'TypeScript', 'Rust', '.NET', 'Kotlin'] },
        { title: 'API Design & Engineering', description: 'Clean, versioned, well-documented APIs that are a pleasure to integrate with.', technologies: ['REST', 'GraphQL', 'gRPC', 'AsyncAPI', 'OpenAPI'] },
        { title: 'Domain-Driven Design', description: 'Modelling complex business domains in software with bounded contexts and ubiquitous language.', technologies: ['DDD', 'CQRS', 'Event Sourcing', 'Aggregates', 'Domain Events'] },
        { title: 'Distributed Systems', description: 'Designing systems that are correct under network partitions, node failures, and concurrent access.', technologies: ['CAP Theorem Applied', 'Consensus Algorithms', 'CRDTs', 'Saga Pattern'] },
        { title: 'Testing & Quality', description: 'Comprehensive testing strategies from unit through integration to production chaos engineering.', technologies: ['TDD', 'BDD', 'Contract Testing', 'Property Testing', 'Chaos Engineering'] },
        { title: 'Security Engineering', description: 'Security by design — threat modelling, zero-trust architecture, and secure coding practices.', technologies: ['OWASP', 'Zero Trust', 'mTLS', 'SAST/DAST', 'Secrets Management'] }
      ]
    },
    {
      id: 'optimization', badge: 'optimization' as const, category: 'OPTIMISATION',
      title: 'Optimisation',
      description: 'Mathematical optimisation methods for problems where conventional algorithms are insufficient. We apply rigorous methods to scheduling, routing, allocation, and planning problems at operational scale.',
      areas: [
        { title: 'Linear & Mixed-Integer Programming', description: 'Exact methods for optimisation problems with linear objectives and constraints.', technologies: ['OR-Tools', 'CPLEX', 'Gurobi', 'HiGHS', 'PuLP', 'Pyomo'] },
        { title: 'Constraint Programming', description: 'Declarative modelling of combinatorial problems with constraint propagation solvers.', technologies: ['CP-SAT', 'Choco', 'MiniZinc', 'Jacop'] },
        { title: 'Metaheuristics', description: 'Population-based and trajectory methods for large-scale optimisation problems.', technologies: ['Genetic Algorithms', 'Simulated Annealing', 'NSGA-II', 'Tabu Search'] },
        { title: 'Stochastic Optimisation', description: 'Optimisation under uncertainty with probabilistic constraints and scenario-based methods.', technologies: ['Stochastic Programming', 'Robust Optimisation', 'Monte Carlo Methods'] },
        { title: 'Network & Graph Optimisation', description: 'Shortest paths, flow problems, and network design with graph-theoretic methods.', technologies: ['NetworkX', 'Neo4j Graph Algorithms', 'Min-Cost Flow', 'TSP Solvers'] },
        { title: 'Simulation & Digital Twin', description: 'Discrete event simulation and digital twin development for process optimisation.', technologies: ['SimPy', 'AnyLogic', 'Arena', 'Process Mining'] }
      ]
    },
    {
      id: 'quantum', badge: 'quantum' as const, category: 'QUANTUM',
      title: 'Quantum Computing',
      description: 'Quantum computing research and algorithm development with an honest view of current hardware limitations and near-term practical opportunities. Quantum is one advanced technology domain within QuantsMind — not our entire identity.',
      areas: [
        { title: 'Quantum Algorithms', description: 'Designing and analysing quantum algorithms for combinatorial optimisation, simulation, and linear algebra.', technologies: ['QAOA', 'VQE', 'Grover\'s Algorithm', 'Quantum Walks'] },
        { title: 'Hybrid Quantum-Classical', description: 'Practical near-term quantum computing that combines quantum and classical processing intelligently.', technologies: ['PennyLane', 'Qiskit', 'Cirq', 'Amazon Braket', 'Azure Quantum'] },
        { title: 'Quantum Simulation', description: 'Simulating quantum systems for materials science, chemistry, and physics applications.', technologies: ['Qiskit Nature', 'OpenFermion', 'PySCF', 'QuTiP'] },
        { title: 'Quantum Error Mitigation', description: 'Techniques for extracting reliable results from noisy intermediate-scale quantum devices.', technologies: ['Zero-Noise Extrapolation', 'Probabilistic Error Cancellation', 'Mitiq'] }
      ]
    }
  ];
}
