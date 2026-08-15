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
