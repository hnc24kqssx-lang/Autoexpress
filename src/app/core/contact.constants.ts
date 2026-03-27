export const BRAND_NAME = 'AutoExpress';

export interface WorkshopPhone {
  owner: string;
  display: string;
  telHref: string;
}

export const WORKSHOP_PHONES: readonly WorkshopPhone[] = [
  { owner: 'Szymon', display: '+48 739 051 104', telHref: 'tel:+48739051104' },
  { owner: 'Piotr', display: '+48 608 461 421', telHref: 'tel:+48608461421' },
] as const;

/** Lines for multi-line display */
export const WORKSHOP_ADDRESS_LINES = ['Trzeszczyn', 'ul. Wspólna 24', '72-004'] as const;

/** Single line for footer / compact UI */
export const WORKSHOP_ADDRESS_SINGLE_LINE = 'ul. Wspólna 24, 72-004 Trzeszczyn';
