import { describe, it, expect } from 'vitest';

import { PRODUCT_REGISTRY, getProductById, getProductsByPortfolio, getStandaloneProducts, getAllProducts } from './product.registry';
import {
  MATURITY_LABELS,
  AVAILABILITY_LABELS,
  maturityLabel,
  availabilityLabel
} from './product.model';

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

describe('product registry', () => {
  it('has unique product identifiers', () => {
    const ids = PRODUCT_REGISTRY.map(product => product.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('contains exactly 40 product records', () => {
    expect(PRODUCT_REGISTRY).toHaveLength(40);
    expect(getAllProducts()).toHaveLength(40);
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
    expect(product!.maturity).toBe('developer-preview');
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

  it('classifies Quantum Mission applications as released', () => {
    const quantumIds = getProductsByPortfolio('quantum')
      .filter(product => product.id !== 'microquantum')
      .map(product => product.id);
    expect(quantumIds).toHaveLength(10);
    for (const id of quantumIds) {
      expect(getProductById(id)?.maturity).toBe('released');
    }
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
      }
      if (product.cta) {
        expect(product.cta.route.startsWith('/')).toBe(true);
      }
      if (product.relatedServiceId) {
        expect(product.relatedServiceId).toBeTruthy();
      }
    }
  });
});

