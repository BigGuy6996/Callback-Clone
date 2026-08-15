/**
 * All marketing copy for Callback Clone — ported verbatim from the legacy site
 * (see /home/team/shared/CALLBACK_CLONE_AUDIT.md §3 and the extracted www/ HTML).
 */

export const Brand = {
  name: 'Callback Clone',
  tagline: 'Never miss a call. Never miss a customer.',
  position: '24/7 AI front desk · 1/10 of the cost',
  email: 'callbackclone@gmail.com',
  calendlyUrl: 'https://calendly.com/jdenning33344/30min',
  formspreeUrl: 'https://formspree.io/f/xbdnjweq',
};

export const HeroCopy = {
  eyebrow: '24/7 receptionist · 1/10 of the cost',
  badge: 'Live in 48 hours',
  title1: 'Never miss a call.',
  title2: 'Never miss a customer.',
  sub: 'AI receptionist at 1/10 of the cost. It answers every call on the first ring, books the appointment, and follows up automatically — in your business\u2019s name and tone.',
  ctaPrimary: 'Book a Free Demo',
  ctaSecondary: 'See how it works',
  trust: ['No contracts', 'Cancel anytime', 'Free lead-recovery audit'],
};

export const HeroStats = [
  { value: 50, suffix: '+', label: 'local businesses' },
  { value: 99.9, suffix: '%', label: 'uptime SLA' },
  { value: 6, suffix: 'x', label: 'avg ROI' },
] as const;

export const Industries = [
  'Dental',
  'HVAC',
  'Med spas',
  'Home services',
  'Plumbing',
  'Auto shops',
  'Salons',
  'Pet care',
  'Roofing',
  'Law firms',
] as const;

export const Problems = [
  {
    title: "You're on the job, not by the phone",
    body: "Up a ladder, under a sink, mid-appointment — the phone doesn't wait for a good moment to ring.",
  },
  {
    title: 'Missed calls rarely call back',
    body: 'Most callers who hit voicemail simply hang up and dial the next business on the list.',
  },
  {
    title: 'Nights and weekends go silent',
    body: 'After hours is exactly when many customers have time to call — and exactly when no one picks up.',
  },
] as const;

export const Steps = [
  {
    step: '01',
    title: 'The call comes in',
    body: 'Callback Clone answers instantly, day or night, in your business\u2019s name and tone.',
  },
  {
    step: '02',
    title: 'It understands the request',
    body: 'It answers questions on hours, pricing, and services from the details you gave it.',
  },
  {
    step: '03',
    title: 'It books the appointment',
    body: 'It checks your live calendar, finds a real opening, and confirms a time on the spot.',
  },
  {
    step: '04',
    title: 'It follows up automatically',
    body: 'Confirmation texts, reminders, and rebooking outreach — no one lifts a finger.',
  },
] as const;

export const ResultsStats = [
  { value: 99.9, suffix: '%', label: 'of calls answered, 24/7' },
  { value: 31, suffix: '%', label: 'more bookings on average' },
  { value: 6, suffix: 'x', label: 'average ROI in month one' },
  { value: 50, suffix: '+', label: 'local businesses trust it' },
] as const;

export const Testimonials = [
  {
    quote:
      '\u201CWe stopped losing weekend calls entirely. It books appointments better than my old front desk did.\u201D',
    name: 'Dr. Melissa Hart',
    role: 'Hart Family Dental',
    metric: '+31% bookings',
  },
  {
    quote:
      '\u201CSetup took one afternoon. Within a week it had already caught calls we would\u2019ve missed after 6pm.\u201D',
    name: 'Jordan Reyes',
    role: 'Reyes HVAC & Air',
    metric: 'Live in 48hr',
  },
  {
    quote:
      '\u201CThe follow-up texts alone paid for the plan. Customers who never called back are rebooking now.\u201D',
    name: 'Priya Nair',
    role: 'Bloom Med Spa',
    metric: '6x ROI',
  },
] as const;

export const PricingTiers = [
  {
    name: 'Starter',
    monthly: 199,
    annual: 169,
    calls: '~200 calls/mo',
    features: ['24/7 AI receptionist', 'Live call transcripts', 'SMS follow-ups', 'Google Calendar sync'],
    featured: false,
  },
  {
    name: 'Growth',
    monthly: 249,
    annual: 212,
    calls: '325 calls/mo',
    features: ['Everything in Starter', 'Missed-call alerts', 'Email + SMS campaigns', 'Priority support'],
    featured: true,
  },
  {
    name: 'Pro',
    monthly: 349,
    annual: 297,
    calls: '500 calls/mo',
    features: ['Everything in Growth', 'Multi-location', 'Custom AI voice', 'Dedicated onboarding'],
    featured: false,
  },
] as const;

/* ------------------------------------------------------------------ */
/* Pricing page — full plan detail (pricing.html, verbatim)            */
/* ------------------------------------------------------------------ */

export type PricingPlanDetail = {
  id: 'starter' | 'growth' | 'pro';
  name: string;
  monthly: number;
  annual: number;
  calls: string;
  setup: number;
  perCall: string;
  perfectFor: string[];
  details: string[];
  featured: boolean;
};

export const PricingPlans: PricingPlanDetail[] = [
  {
    id: 'starter',
    name: 'Starter',
    monthly: 199,
    annual: 169,
    calls: 'Up to ~200 calls/month',
    setup: 199,
    perCall: '~$1/call',
    perfectFor: ['Small & new businesses', 'Solo practices & contractors', 'Low-volume seasons or side lines'],
    details: [
      'AI answers every call, 24/7',
      'Real-time appointment booking',
      'Missed-call text back',
      'SMS confirmations & reminders',
      'AI lead qualification',
      'Call summaries & recordings',
      'CRM & dashboard',
    ],
    featured: false,
  },
  {
    id: 'growth',
    name: 'Growth',
    monthly: 249,
    annual: 212,
    calls: 'Up to 325 calls/month',
    setup: 249,
    perCall: '~77¢/call',
    perfectFor: [
      'Independent chiropractors & dentists',
      'Local HVAC, plumbing & home services',
      'Salons, med spas & single offices',
    ],
    details: [
      'Everything in Starter, plus:',
      '~60% more call capacity',
      'Smart call routing & escalation',
      'Separate AI agent per line/office',
      'Consolidated reporting',
      'Priority support',
    ],
    featured: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    monthly: 349,
    annual: 297,
    calls: 'Up to 500 calls/month',
    setup: 299,
    perCall: '~70¢/call',
    perfectFor: ['Growing local franchises', 'Multi-office dental & medical groups', 'High-volume service brands'],
    details: [
      'Everything in Growth, plus:',
      '500-call allowance',
      'Multi-location management',
      'Dedicated account manager',
      'Advanced routing & escalation rules',
      'Quarterly performance reviews',
    ],
    featured: false,
  },
] as const;

export const EnterprisePlan = {
  name: 'Enterprise',
  priceLabel: 'Custom',
  calls: '500+ calls/month',
  setup: 'White-glove setup & dedicated manager',
  perfectFor: ['Regional & national service brands', 'High-volume call centers', 'Multi-location franchises'],
  details: [
    'Everything in Pro, plus:',
    'Unlimited locations & call volume',
    'Custom AI training & integrations',
    'White-glove onboarding',
    'Dedicated account manager & SLA',
    'Tailored per-call pricing',
  ],
} as const;

export type PricingAddOn = {
  id: 'website' | 'social' | 'reviews';
  icon: string;
  title: string;
  short: string;
  shortDesc: string;
  price: number;
  desc: string;
};

export const PricingAddOns: PricingAddOn[] = [
  {
    id: 'website',
    icon: '\u{1F4AC}',
    title: 'Capture More Website Leads',
    short: 'Website AI Chat',
    shortDesc: 'Answers & books from your site 24/7.',
    price: 97,
    desc: 'Add an AI chat assistant to your website that answers questions and books appointments 24/7 — even while you sleep.',
  },
  {
    id: 'social',
    icon: '\u{1F4F1}',
    title: 'Facebook & Instagram AI',
    short: 'Facebook & Instagram AI',
    shortDesc: 'Reply to social inboxes, no lead waits.',
    price: 75,
    desc: 'Automatically reply to Facebook and Instagram messages so no lead is left waiting, no matter where they reach out.',
  },
  {
    id: 'reviews',
    icon: '\u2B50',
    title: 'Turn Happy Customers Into 5-Star Reviews',
    short: '5-Star Review Automation',
    shortDesc: 'Auto-request a Google review after every visit.',
    price: 79,
    desc: 'Automatically ask happy customers for a Google review right after every appointment — while the experience is still fresh.',
  },
] as const;

export const PricingFaqs = [
  {
    q: 'Is there a setup fee?',
    a: 'Yes — a one-time setup fee applies when you get started, which covers configuring your number, calendar, and AI agent: $199 for Starter, $249 for Growth, and $299 for Pro. Enterprise includes white-glove onboarding with a dedicated account manager. Setup is separate from migration — moving your existing number and data over is always free. There\u2019s no separate setup fee for add-ons you enable after that.',
  },
  {
    q: 'What counts as an \u201Cinbound call\u201D?',
    a: 'Any call your AI front desk answers, whether it results in a booking, a text-back, or a transfer to your team.',
  },
  {
    q: 'What if I go over my plan\u2019s call volume?',
    a: 'Plans include a monthly call allowance (200 / 325 / 500 calls). Usage beyond that is billed per call at your plan\u2019s per-call rate — so you\u2019re never cut off and never surprised. We\u2019ll reach out proactively if you consistently exceed your tier to suggest the plan that saves you the most.',
  },
  {
    q: 'Can I change plans later?',
    a: 'Yes, upgrade or downgrade anytime as your call volume changes.',
  },
] as const;

/* ------------------------------------------------------------------ */
/* Calculator page (calculator.html, verbatim)                         */
/* ------------------------------------------------------------------ */

export const CalculatorIndustries = [
  { label: 'Plumber', factor: 1.8 },
  { label: 'HVAC / Home services', factor: 1.8 },
  { label: 'Electrician', factor: 1.7 },
  { label: 'Dentist', factor: 1.6 },
  { label: 'Chiropractor', factor: 1.5 },
  { label: 'Med spa / Wellness', factor: 1.4 },
  { label: 'Roofer / Remodeling', factor: 1.6 },
] as const;

/* ------------------------------------------------------------------ */
/* Demo page (demo.html, verbatim)                                     */
/* ------------------------------------------------------------------ */

export const DemoIndustries = ['Chiropractic / Dental', 'HVAC / Home services', 'Med spa / Wellness', 'Other local business'] as const;

/* ------------------------------------------------------------------ */
/* How it works page (how-it-works.html, verbatim)                     */
/* ------------------------------------------------------------------ */

export const HowItWorksWhy = [
  {
    icon: 'flash-outline',
    title: 'Instant, every time',
    body: 'Answers in under a second. No hold music, no voicemail, no lost lead.',
  },
  {
    icon: 'mic-outline',
    title: 'In your voice',
    body: 'Trained on your services, hours, and tone so callers can\u2019t tell it\u2019s not a person.',
  },
  {
    icon: 'time-outline',
    title: 'Always on',
    body: 'Weekends, holidays, after hours — the phone is answered 24/7, every day.',
  },
] as const;

/* ------------------------------------------------------------------ */
/* Customers page (customers.html, verbatim)                           */
/* ------------------------------------------------------------------ */

export const CustomersProof = {
  eyebrow: 'Proof',
  title: 'Fewer missed calls. More booked jobs.',
  body: 'Every call is captured, answered, and followed up on — with a transcript you can read in seconds. No lead slips through at 6pm or on Sunday.',
  bullets: ['Monitored after hours', 'Answers in <1s', 'Follows up for you'],
  stats: [
    { value: 31, suffix: '%', prefix: '+', label: 'more appointments booked' },
    { value: 0, suffix: '', prefix: '', label: 'missed calls after launch' },
    { value: 10, suffix: '', prefix: '1/', label: 'the cost of a receptionist' },
    { value: 24, suffix: '/7', prefix: '', label: 'phone coverage' },
  ],
} as const;

export const Faqs = [
  {
    q: 'Will callers know they\u2019re talking to an AI?',
    a: 'Callback Clone answers in your business\u2019s name and tone. Many callers never ask — but if they do, it answers honestly.',
  },
  {
    q: 'What happens with calls it can\u2019t handle?',
    a: 'Anything urgent or outside what it knows gets transferred straight to your escalation number, no dead ends.',
  },
  {
    q: 'Does it work with my existing calendar?',
    a: 'Yes — it connects to Google Calendar and most common scheduling tools during onboarding.',
  },
  {
    q: 'How long does setup take?',
    a: 'Most businesses are live within 48 hours of completing the 5-minute onboarding form.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. There are no long-term contracts on any plan.',
  },
] as const;

export const FooterLinks = [
  { label: 'Security', href: null },
  { label: 'System status', href: null },
  { label: 'No contracts', href: null },
  { label: 'Cancel anytime', href: null },
] as const;
