export type ProductPortfolio =
  | 'standalone'
  | 'quantum'
  | 'space'
  | 'cybersecurity';

export type ProductMaturity =
  | 'proposed'
  | 'in-development'
  | 'research-prototype'
  | 'alpha'
  | 'developer-preview'
  | 'validated'
  | 'released';

export type ProductAvailability =
  | 'not-available'
  | 'private-access'
  | 'early-access'
  | 'developer-access'
  | 'public-download'
  | 'general-availability';

export type ProductVerification =
  | 'verified-source'
  | 'verified-documentation'
  | 'owner-approved-roadmap'
  | 'not-verified';

export type ServiceId =
  | 'quantum-computing'
  | 'space-systems'
  | 'ai-intelligent-systems'
  | 'scientific-computing'
  | 'cybersecurity-digital-trust'
  | 'industrial-intelligence-digital-twin';

export interface ProductCta {
  readonly label: string;
  readonly route: string;
}

export interface Product {
  readonly id: string;
  readonly name: string;
  readonly shortName?: string;
  readonly summary: string;
  readonly description: string;
  readonly capabilities?: readonly string[];
  readonly modules?: readonly string[];
  readonly useCases?: readonly string[];
  readonly targetDomains?: readonly string[];
  readonly targetClients?: readonly string[];
  readonly maturity: ProductMaturity;
  readonly availability: ProductAvailability;
  readonly portfolio: ProductPortfolio;
  readonly relatedServiceId?: ServiceId;
  readonly route?: string;
  readonly anchor?: string;
  readonly version?: string;
  readonly releaseChannel?: string;
  readonly documentationUrl?: string;
  readonly limitations?: readonly string[];
  readonly technologyTags?: readonly string[];
  readonly visualAsset?: string;
  readonly deployment?: string;
  readonly availabilityDetail?: string;
  readonly cta?: ProductCta;
  readonly verification: ProductVerification;
}

export const MATURITY_LABELS: Readonly<Record<ProductMaturity, string>> = {
  'proposed': 'Proposed',
  'in-development': 'In Development',
  'research-prototype': 'Research Prototype',
  'alpha': 'Alpha',
  'developer-preview': 'Developer Preview',
  'validated': 'Validated',
  'released': 'Released'
};

export const AVAILABILITY_LABELS: Readonly<Record<ProductAvailability, string>> = {
  'not-available': 'Not Available',
  'private-access': 'Private Access',
  'early-access': 'Early Access',
  'developer-access': 'Developer Access',
  'public-download': 'Public Download',
  'general-availability': 'General Availability'
};

export function maturityLabel(maturity: ProductMaturity): string {
  return MATURITY_LABELS[maturity];
}

export function availabilityLabel(availability: ProductAvailability): string {
  return AVAILABILITY_LABELS[availability];
}

export function maturityBadgeVariant(maturity: ProductMaturity): string {
  switch (maturity) {
    case 'proposed':
      return 'concept';
    case 'in-development':
      return 'development';
    case 'research-prototype':
      return 'research';
    case 'alpha':
      return 'prototype';
    case 'developer-preview':
      return 'experimental';
    case 'validated':
      return 'stable';
    case 'released':
      return 'product';
    default:
      return 'default';
  }
}

export function availabilityBadgeVariant(availability: ProductAvailability): string {
  switch (availability) {
    case 'early-access':
      return 'early-access';
    case 'developer-access':
      return 'experimental';
    case 'public-download':
      return 'stable';
    case 'general-availability':
      return 'product';
    case 'private-access':
      return 'default';
    case 'not-available':
    default:
      return 'default';
  }
}

export function serviceRoute(serviceId: ServiceId): string {
  return `/services#${serviceId}`;
}
