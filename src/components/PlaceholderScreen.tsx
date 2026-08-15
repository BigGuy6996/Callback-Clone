import { router } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';
import { Button } from '@/components/ui/Button';

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  body: string;
  bullets?: string[];
  ctaLabel?: string;
};

/** Themed placeholder for tabs that land in a later build (Pricing, Calculator, How it works, Customers). */
export function PlaceholderScreen({ icon, title, body, bullets, ctaLabel = 'Book a Free Demo' }: Props) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.iconWrap}>
        <Ionicons name={icon} size={26} color={Colors.blue} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
      {bullets ? (
        <View style={styles.bullets}>
          {bullets.map((b) => (
            <View key={b} style={styles.bulletRow}>
              <Ionicons name="checkmark-circle" size={15} color={Colors.success} />
              <Text style={styles.bulletText}>{b}</Text>
            </View>
          ))}
        </View>
      ) : null}
      <View style={styles.cta}>
        <Button label={ctaLabel} onPress={() => router.push('/demo')} />
      </View>
      <Text style={styles.note}>Full screen ships in the next build.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  content: {
    padding: Spacing.lg,
    alignItems: 'center',
    paddingTop: Spacing.xxl,
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: Radius.md,
    backgroundColor: 'rgba(47,111,237,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  title: {
    fontFamily: Fonts.display,
    fontSize: 24,
    letterSpacing: -0.4,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  body: {
    fontFamily: Fonts.body,
    fontSize: 15,
    lineHeight: 23,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.sm,
    maxWidth: 480,
  },
  bullets: {
    marginTop: Spacing.lg,
    gap: Spacing.sm,
    alignSelf: 'stretch',
    maxWidth: 480,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.bgElevated,
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
  },
  bulletText: {
    fontFamily: Fonts.body,
    fontSize: 13.5,
    color: Colors.textPrimary,
    flex: 1,
  },
  cta: {
    marginTop: Spacing.xl,
    alignSelf: 'center',
  },
  note: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: Spacing.lg,
  },
});
