/**
 * Plan & add-on selection — port of the legacy site's assets/addons.js.
 * Used by the Pricing and Calculator tabs to carry a selection into the Demo flow.
 * No persistence (native app keeps state in-memory per session).
 */

import { Brand } from '@/constants/content';

export type PlanOption = {
  id: string;
  name: string;
  price: number;
  setup: number;
  calls: string;
};

/** addons.js PLANS — prices/setup are verbatim from the legacy site. */
export const PLAN_OPTIONS: PlanOption[] = [
  { id: 'starter', name: 'Starter', price: 199, setup: 199, calls: 'up to 200 calls/mo · $199 setup' },
  { id: 'growth', name: 'Growth', price: 249, setup: 249, calls: 'up to 325 calls/mo · $249 setup' },
  { id: 'pro', name: 'Pro', price: 349, setup: 299, calls: 'up to 500 calls/mo · $299 setup' },
] as const;

export type AddonOption = {
  id: string;
  name: string;
  short: string;
  price: number;
};

/** addons.js ADDONS — verbatim from the legacy site. */
export const ADDON_OPTIONS: AddonOption[] = [
  { id: 'website', name: 'Website AI Chat', short: 'Website AI Chat', price: 97 },
  { id: 'social', name: 'Facebook & Instagram AI', short: 'Social Inbox AI', price: 75 },
  { id: 'reviews', name: 'Google Review Automation', short: '5-Star Review Automation', price: 79 },
] as const;

export function planById(id: string | undefined | null): PlanOption {
  return PLAN_OPTIONS.find((p) => p.id === id) ?? PLAN_OPTIONS[1];
}

export function addonNames(addonIds: string[]): string {
  return addonIds
    .map((id) => ADDON_OPTIONS.find((a) => a.id === id))
    .filter((a): a is AddonOption => Boolean(a))
    .map((a) => a.name)
    .join(', ');
}

/**
 * Build the Calendly booking URL with the lead + selection carried over.
 * Port of demo.html's params mapping: name, email, a1=business, a2=phone,
 * a3=industry, a4=plan, a5=add-ons.
 */
export function buildCalendlyUrl(opts: {
  name?: string;
  email?: string;
  business?: string;
  phone?: string;
  industry?: string;
  plan?: string;
  addons?: string;
}): string {
  const parts: string[] = [];
  const add = (k: string, v: string | undefined) => {
    if (v) parts.push(`${k}=${encodeURIComponent(v)}`);
  };
  add('name', opts.name);
  add('email', opts.email);
  add('a1', opts.business);
  add('a2', opts.phone);
  add('a3', opts.industry);
  parts.push(`a4=${encodeURIComponent(opts.plan || 'Growth')}`);
  parts.push(`a5=${encodeURIComponent(opts.addons || 'Not selected yet')}`);
  return `${Brand.calendlyUrl}?${parts.join('&')}`;
}
