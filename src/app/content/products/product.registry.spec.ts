import { describe, it, expect } from 'vitest';

import { routes } from '../../app.routes';
import { PRODUCT_REGISTRY, getProductById, getProductsByPortfolio, getStandaloneProducts, getAllProducts } from './product.registry';
import {
  MATURITY_LABELS,
  AVAILABILITY_LABELS,
  maturityLabel,
  availabilityLabel
} from './product.model';

const APPROVED_SERVICE_IDS = [
  'quantum-computing',
  'space-systems',
  'ai-intelligent-systems',
  'scientific-computing',
  'cybersecurity-digital-trust',
  'industrial-intelligence-digital-twin'
] as const;

const APP_ROUTE_PATHS = new Set(
  routes.map(route => (route.path === '' ? '/' : `/${route.path}`))
);

const RESEARCH_OR_TECHNOLOGY_ONLY_NAMES = [
  'QuantsMind SDK',
  'QuantsMind Relational DB',
  'GuardMCP',
  'QuantsMind-Agent',
  'QuantsMind-LLM',
  'Vsector',
  'QuantsMind OSINT Intelligence Platform',
  'QuantsMind AI Fake News Detection System'
];

const EXPECTED_NAMES = [
  'QuantsMind Document Intelligence Mini',
  'InvoicePilot',
  'FormFlow',
  'ClientDesk',
  'BookWise',
  'ProposalPro',
  'StockPilot',
  'SupportNest',
  'ReportHub',
  'TeamTrack',
  'ContractFlow',
  'MicroQuantum',
  'QuantumStudio',
  'QubitSim',
  'QuantumForge',
  'QOptima',
  'QuantumShield',
  'HybridQ',
  'QuantumBench',
  'QuantumChem',
  'QResource',
  'QuantumVerify',
  'SpaceIntel',
  'GroundLink',
  'FlightData Gateway',
  'TelemetryHub',
  'SatHealth',
  'MissionOps',
  'PassOps',
  'MissionArchive',
  'ThreatIntel',
  'AIGuard',
  'CodeSentinel',
  'ForensicVault',
  'IdentityShield',
  'IncidentFlow',
  'TruthLens',
  'CloudFort',
  'SupplyGuard',
  'PrivacyCore'
];

const MARKETPLACE_SELECTIONS = [
  { id: 'quantum-studio', portfolio: 'quantum', maturity: 'released', availability: 'general-availability' },
  { id: 'ground-link', portfolio: 'space', maturity: 'in-development', availability: 'not-available' },
  { id: 'ai-guard', portfolio: 'cybersecurity', maturity: 'proposed', availability: 'not-available' },
  { id: 'qubit-sim', portfolio: 'quantum', maturity: 'released', availability: 'general-availability' },
  { id: 'threat-intel', portfolio: 'cybersecurity', maturity: 'proposed', availability: 'not-available' },
  { id: 'telemetry-hub', portfolio: 'space', maturity: 'in-development', availability: 'not-available' }
] as const;

describe('product registry', () => {
  it('has unique product identifiers', () => {
    const ids = PRODUCT_REGISTRY.map(product => product.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('contains exactly 41 product records', () => {
    expect(PRODUCT_REGISTRY).toHaveLength(41);
    expect(getAllProducts()).toHaveLength(41);
  });

  it('has the expected portfolio counts', () => {
    expect(getStandaloneProducts()).toHaveLength(11);
    expect(getProductsByPortfolio('quantum')).toHaveLength(11);
    expect(getProductsByPortfolio('space')).toHaveLength(8);
    expect(getProductsByPortfolio('cybersecurity')).toHaveLength(10);
  });

  it('contains all approved product names', () => {
    const names = PRODUCT_REGISTRY.map(product => product.name);
    for (const name of EXPECTED_NAMES) {
      expect(names).toContain(name);
    }
  });

  it('preserves Document Intelligence Mini information', () => {
    const product = getProductById('quantsmind-document-intelligence-mini');
    expect(product).toBeDefined();
    expect(product!.name).toBe('QuantsMind Document Intelligence Mini');
    expect(product!.shortName).toBe('DI Mini');
    expect(product!.version).toBe('v0.1.0');
    expect(product!.maturity).toBe('alpha');
    expect(product!.availability).toBe('early-access');
    expect(product!.portfolio).toBe('standalone');
    expect(product!.verification).toBe('verified-documentation');
    expect(product!.summary).toBe('Lightweight document intelligence software');
    expect(product!.description).toContain('no OCR');
    expect(product!.description).toContain('machine-learning');
    expect(product!.description).toContain('embedding');
    expect(product!.availabilityDetail).toContain('Not a generally available release');
    expect(product!.cta?.route).toBe('/contact');
  });

  it('preserves MicroQuantum information', () => {
    const product = getProductById('microquantum');
    expect(product).toBeDefined();
    expect(product!.name).toBe('MicroQuantum');
    expect(product!.maturity).toBe('released');
    expect(product!.portfolio).toBe('quantum');
    expect(product!.version).toBe('v1.1.0');
    expect(product!.route).toBe('/microquantum');
  });

  it('classifies ten individual applications as in development', () => {
    const applicationIds = [
      'invoice-pilot',
      'form-flow',
      'client-desk',
      'book-wise',
      'proposal-pro',
      'stock-pilot',
      'support-nest',
      'report-hub',
      'team-track',
      'contract-flow'
    ];
    for (const id of applicationIds) {
      expect(getProductById(id)?.maturity).toBe('in-development');
    }
  });

  it('classifies Quantum Mission applications as released and generally available', () => {
    const quantumProducts = getProductsByPortfolio('quantum')
      .filter(product => product.id !== 'microquantum');
    expect(quantumProducts).toHaveLength(10);
    for (const product of quantumProducts) {
      expect(product.maturity).toBe('released');
      expect(product.availability).toBe('general-availability');
      expect(product.version).toBeUndefined();
      expect(product.releaseChannel).toBeUndefined();
      expect(product.description).toContain(
        'No public repository, release or documentation is currently available'
      );
      expect(product.limitations?.[0]).toContain(
        'no public repository, release or documentation'
      );
    }
  });

  it('makes no general-availability claim without a verified public release', () => {
    const generallyAvailable = PRODUCT_REGISTRY.filter(
      product => product.availability === 'general-availability' && product.portfolio !== 'quantum'
    );
    expect(generallyAvailable).toEqual([]);
  });

  it('classifies seven mission software initiatives as in development', () => {
    const ids = ['ground-link', 'flightdata-gateway', 'telemetry-hub', 'sat-health', 'mission-ops', 'pass-ops', 'mission-archive'];
    for (const id of ids) {
      expect(getProductById(id)?.maturity).toBe('in-development');
    }
  });

  it('classifies cybersecurity initiatives as proposed', () => {
    for (const product of getProductsByPortfolio('cybersecurity')) {
      expect(product.maturity).toBe('proposed');
    }
  });

  it('preserves the six Marketplace selections in their original portfolios', () => {
    for (const selection of MARKETPLACE_SELECTIONS) {
      const product = getProductById(selection.id);
      expect(product, selection.id).toBeDefined();
      expect(product!.portfolio, selection.id).toBe(selection.portfolio);
      expect(product!.maturity, selection.id).toBe(selection.maturity);
      expect(product!.availability, selection.id).toBe(selection.availability);
      expect(product!.relatedServiceId, selection.id).toBeDefined();
      expect(APPROVED_SERVICE_IDS, selection.id).toContain(product!.relatedServiceId);
    }
  });

  it('keeps developer tools separate from the six Marketplace service domains', () => {
    for (const selection of MARKETPLACE_SELECTIONS) {
      expect(selection.portfolio).not.toBe('developer-tools');
    }
    expect(getProductById('karkain')?.portfolio).toBe('developer-tools');
  });

  it('uses controlled maturity and availability vocabularies', () => {
    for (const product of PRODUCT_REGISTRY) {
      expect(Object.prototype.hasOwnProperty.call(MATURITY_LABELS, product.maturity)).toBe(true);
      expect(Object.prototype.hasOwnProperty.call(AVAILABILITY_LABELS, product.availability)).toBe(true);
      expect(maturityLabel(product.maturity)).toBeTruthy();
      expect(availabilityLabel(product.availability)).toBeTruthy();
    }
  });

  it('has no forbidden public repository fields', () => {
    for (const product of PRODUCT_REGISTRY) {
      expect((product as unknown as Record<string, unknown>)['githubUrl']).toBeUndefined();
      expect((product as unknown as Record<string, unknown>)['repositoryUrl']).toBeUndefined();
    }
  });

  it('uses valid internal navigation targets', () => {
    for (const product of PRODUCT_REGISTRY) {
      if (product.route) {
        expect(product.route.startsWith('/')).toBe(true);
        expect(APP_ROUTE_PATHS.has(product.route.split('#')[0]), product.route).toBe(true);
      }
      if (product.cta) {
        expect(product.cta.route.startsWith('/')).toBe(true);
        expect(APP_ROUTE_PATHS.has(product.cta.route.split('#')[0]), product.cta.route).toBe(true);
      }
      if (product.relatedServiceId) {
        expect(APPROVED_SERVICE_IDS).toContain(product.relatedServiceId);
      }
    }
  });

  it('has unique product names and complete identity fields', () => {
    const names = PRODUCT_REGISTRY.map(product => product.name);
    expect(new Set(names).size).toBe(names.length);
    for (const product of PRODUCT_REGISTRY) {
      expect(product.name.trim()).not.toBe('');
      expect(product.summary.trim()).not.toBe('');
      expect(product.description.trim()).not.toBe('');
    }
  });

  it('does not attach release metadata to proposed or in-development work', () => {
    for (const product of PRODUCT_REGISTRY.filter(
      item => item.maturity === 'proposed' || item.maturity === 'in-development'
    )) {
      expect(product.version).toBeUndefined();
      expect(product.releaseChannel).toBeUndefined();
      expect(product.availability).not.toBe('general-availability');
    }
  });

  it('backs every public download with a version and verified evidence', () => {
    for (const product of PRODUCT_REGISTRY.filter(
      item => item.availability === 'public-download'
    )) {
      expect(product.version, product.name).toMatch(/^v\d+\.\d+\.\d+$/);
      expect(['verified-source', 'verified-documentation']).toContain(product.verification);
    }
  });

  it('does not describe developer-preview products as stable', () => {
    for (const product of PRODUCT_REGISTRY.filter(
      item => item.maturity === 'developer-preview'
    )) {
      expect(product.releaseChannel, product.name).not.toBe('Stable');
      expect(product.description.toLowerCase()).not.toContain('is stable');
    }
  });

  it('keeps research projects and technology-only projects out of the product registry', () => {
    const names = PRODUCT_REGISTRY.map(product => product.name);
    for (const name of RESEARCH_OR_TECHNOLOGY_ONLY_NAMES) {
      expect(names).not.toContain(name);
    }
  });
});

