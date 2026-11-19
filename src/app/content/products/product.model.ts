export type ProductPortfolio =
  | 'standalone'
  | 'quantum'
  | 'space'
  | 'cybersecurity'
  | 'developer-tools';

export type ProductMaturity =
  | 'proposed'
  | 'in-development'
  | 'research-prototype'
  | 'alpha'
  | 'developer-preview'
  | 'beta'
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

export type ProductCategory =
  | 'programming-languages'
  | 'developer-tools'
  | 'ai-intelligent-systems'
  | 'scientific-quantum'
  | 'data-database'
  | 'business-applications'
  | 'enterprise-software'
  | 'research';

export const PRODUCT_CATEGORY_LABELS: Readonly<Record<ProductCategory, string>> = {
  'programming-languages': 'Programming Languages',
  'developer-tools': 'Developer Tools',
  'ai-intelligent-systems': 'AI & Intelligent Systems',
  'scientific-quantum': 'Scientific & Quantum Computing',
  'data-database': 'Data & Database Systems',
  'business-applications': 'Business Applications',
  'enterprise-software': 'Enterprise Software',
  'research': 'Research'
};

export const PRODUCT_CATEGORY_DESCRIPTIONS: Readonly<Record<ProductCategory, string>> = {
  'programming-languages': 'Languages and their first-class toolchains.',
  'developer-tools': 'Compilers, extensions and engineering tools.',
  'ai-intelligent-systems': 'AI applications and agent platforms.',
  'scientific-quantum': 'Simulation SDKs and scientific computing.',
  'data-database': 'Databases and data-processing systems.',
  'business-applications': 'Business workflow and productivity software.',
  'enterprise-software': 'Industrial and space-systems engineering software.',
  'research': 'Experimental research releases and prototypes.'
};

export interface ProductCta {
  readonly label: string;
  readonly route: string;
}

export interface ProductDistributionLink {
  readonly label: string;
  readonly url: string;
}

export interface ProductReleaseHistoryEntry {
  readonly version: string;
  readonly date?: string;
  readonly notes: string;
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
  /** Customer-facing store category. Store sections filter on this. */
  readonly category?: ProductCategory;
  readonly relatedServiceId?: ServiceId;
  /**
   * Explicit product detail route for curated selections that expose a detail
   * page (for example a Marketplace pick rendered as a catalogue card). Takes
   * precedence over the generic CTA when present.
   */
  readonly detailRoute?: string;
  readonly anchor?: string;
  /** Primary destination for catalogue CTAs. */
  readonly route?: string;
  readonly version?: string;
  readonly releaseChannel?: string;
  readonly documentationUrl?: string;
  readonly license?: string;
  readonly platforms?: readonly string[];
  readonly systemRequirements?: string;
  readonly installInstructions?: string;
  readonly repositoryUrl?: string;
  /** Public marketplace / package registry links (Open VSX, PyPI, ...). */
  readonly marketplaceUrls?: readonly ProductDistributionLink[];
  /** Public package index links (PyPI, piwheels, ...). */
  readonly packageUrls?: readonly ProductDistributionLink[];
  readonly releaseHistory?: readonly ProductReleaseHistoryEntry[];
  /**
   * Route of a dedicated rich page for this product (for example /karkain).
   * The store links to that route instead of the generic product detail
   * template when set.
   */
  readonly dedicatedRoute?: string;
  readonly featured?: boolean;
  readonly limitations?: readonly string[];
  readonly technologyTags?: readonly string[];
  readonly visualAsset?: string;
  readonly deployment?: string;
  readonly availabilityDetail?: string;
  readonly cta?: ProductCta;
  readonly verification: ProductVerification;
  /** ISO date (YYYY-MM-DD) of the most recent verification of external claims. */
  readonly lastVerified?: string;
}

export const MATURITY_LABELS: Readonly<Record<ProductMaturity, string>> = {
  'proposed': 'Proposed',
  'in-development': 'In Development',
  'research-prototype': 'Research Prototype',
  'alpha': 'Alpha',
  'developer-preview': 'Developer Preview',
  'beta': 'Beta',
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

/**
 * Products in this set are shown in the Products Store as currently obtainable.
 * Everything else appears under In Development and is never presented as
 * installable.
 */
export const AVAILABLE_AVAILABILITIES: ReadonlySet<ProductAvailability> = new Set([
  'general-availability',
  'public-download',
  'early-access',
  'developer-access'
]);

/** Maturities that are never presented as an obtainable product. */
export const NON_STORE_MATURITIES: ReadonlySet<ProductMaturity> = new Set([
  'proposed',
  'research-prototype'
]);

export function isAvailableProduct(product: Product): boolean {
  return AVAILABLE_AVAILABILITIES.has(product.availability)
    && !NON_STORE_MATURITIES.has(product.maturity)
    && product.category !== 'research';
}

/** A product needs at least one public access mechanism to be Available. */
export function hasDistributionLinks(product: Product): boolean {
  return Boolean(
    (product.packageUrls && product.packageUrls.length)
    || (product.marketplaceUrls && product.marketplaceUrls.length)
    || product.repositoryUrl
    || product.documentationUrl
  );
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
    case 'beta':
      return 'early-access';
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
  switch (serviceId) {
    case 'quantum-computing':
      return '/services/quantum-computing';
    case 'space-systems':
      return '/services/space-systems';
    case 'ai-intelligent-systems':
      return '/services/ai-engineering';
    case 'scientific-computing':
      return '/services/scientific-computing';
    case 'cybersecurity-digital-trust':
      return '/services/cybersecurity';
    case 'industrial-intelligence-digital-twin':
      return '/services/industrial-intelligence';
  }
}
