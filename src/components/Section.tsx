import { StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { Colors, Fonts, MaxContentWidth, Spacing } from '@/constants/theme';
import { Eyebrow } from '@/components/ui/Eyebrow';

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
  /** #F4F5FA section band */
  elevated?: boolean;
  /** centered max-width container */
  container?: boolean;
};

/** Section band wrapper — surface or bgElevated, with max-width container option. */
export function Section({ children, style, elevated = false, container = true }: Props) {
  return (
    <View style={[styles.band, elevated && styles.elevated, style]}>
      {container ? <View style={styles.container}>{children}</View> : children}
    </View>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  center = true,
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  dark?: boolean;
}) {
  const textColor = dark ? '#FFFFFF' : Colors.textPrimary;
  const subColor = dark ? 'rgba(255,255,255,0.65)' : Colors.textSecondary;
  return (
    <View style={[styles.header, center && styles.headerCenter]}>
      {eyebrow ? <Eyebrow label={eyebrow} style={dark ? styles.eyebrowDark : undefined} /> : null}
      <Text style={[styles.title, { color: textColor }]}>{title}</Text>
      {subtitle ? <Text style={[styles.subtitle, { color: subColor }]}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  band: {
    backgroundColor: Colors.surface,
    paddingVertical: Spacing.xxxl,
    paddingHorizontal: Spacing.lg,
  },
  elevated: {
    backgroundColor: Colors.bgElevated,
  },
  container: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  header: {
    marginBottom: Spacing.xl,
  },
  headerCenter: {
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.display,
    fontSize: 30,
    lineHeight: 36,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: Fonts.body,
    fontSize: 16,
    lineHeight: 24,
    marginTop: Spacing.sm,
    textAlign: 'center',
  },
  eyebrowDark: {
    color: Colors.blueLight,
  },
});
