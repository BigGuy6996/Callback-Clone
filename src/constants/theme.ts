/**
 * Callback Clone — design system.
 * Single source of truth: /home/team/shared/CALLBACK_CLONE_AUDIT.md (§3 theme tokens).
 * Values are exact ports of the legacy site's Tailwind config.
 */

export const Colors = {
  /** dark accent — live-call demo card, hero glows */
  bg: '#08090C',
  /** section bands */
  bgElevated: '#F4F5FA',
  /** body / surface */
  surface: '#FFFFFF',
  /** primary brand */
  blue: '#2F6FED',
  blueLight: '#6E9BFF',
  blueDim: '#1B3E93',
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  textMuted: '#94A3B8',
  success: '#059669',
  warning: '#D97706',
  danger: '#DC2626',
  hairline: 'rgba(15,23,42,0.12)',
  /** frosted panels */
  glass: 'rgba(255,255,255,0.72)',
} as const;

/** Font family names — must match the @expo-google-fonts exports loaded in src/app/_layout.tsx */
export const Fonts = {
  display: 'InterTight_800ExtraBold',
  displayBold: 'InterTight_700Bold',
  displaySemibold: 'InterTight_600SemiBold',
  displayMedium: 'InterTight_500Medium',
  body: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemibold: 'Inter_600SemiBold',
  mono: 'IBMPlexMono_400Regular',
  monoMedium: 'IBMPlexMono_500Medium',
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

export const Radius = {
  sm: 10,
  md: 16,
  lg: 24,
  pill: 9999,
} as const;

/** Primary button glow — port of `0 24px 60px -20px rgba(47,111,237,0.25)` */
export const Glow = {
  shadowColor: Colors.blue,
  shadowOpacity: 0.25,
  shadowRadius: 24,
  shadowOffset: { width: 0, height: 12 },
  elevation: 8,
} as const;

export const ShadowCard = {
  shadowColor: '#0F172A',
  shadowOpacity: 0.06,
  shadowRadius: 16,
  shadowOffset: { width: 0, height: 8 },
  elevation: 3,
} as const;

/** 12px uppercase eyebrow labels, letterSpacing .18em, #6E9BFF */
export const EyebrowStyle = {
  fontSize: 12,
  letterSpacing: 2.2,
  textTransform: 'uppercase' as const,
  color: Colors.blueLight,
  fontFamily: Fonts.bodySemibold,
};

/** Max content width — port of the site's 80rem container */
export const MaxContentWidth = 640;
