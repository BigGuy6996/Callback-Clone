import * as Linking from 'expo-linking';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';
import { Brand } from '@/constants/content';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { LiveCallDemo } from '@/components/home/LiveCallDemo';

const STEPS = [
  { icon: 'person-outline' as const, label: 'Tell us about your business' },
  { icon: 'document-text-outline' as const, label: 'Pick your plan & add-ons' },
  { icon: 'calendar-outline' as const, label: 'Pick a time — Calendly handles it' },
];

/**
 * Demo screen — "Hear your AI front desk answer a real call."
 * Step 1 contact info + plan carry-over, step 2 Calendly booking (external link; native apps can't embed iframes).
 */
export default function DemoScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.wrap}>
        <Eyebrow label="Live demo" />
        <Text style={styles.title}>Hear your AI front desk answer a real call.</Text>
        <Text style={styles.body}>
          A 30-minute walkthrough: we bring your business details, you hear how Callback Clone answers, books,
          and follows up — then we hand you the keys.
        </Text>

        <View style={styles.demoCard}>
          <LiveCallDemo />
        </View>

        <View style={styles.steps}>
          {STEPS.map((s, i) => (
            <View key={s.label} style={styles.stepRow}>
              <View style={styles.stepBadge}>
                <Text style={styles.stepNum}>{i + 1}</Text>
              </View>
              <View style={styles.stepBody}>
                <Ionicons name={s.icon} size={16} color={Colors.blue} />
                <Text style={styles.stepLabel}>{s.label}</Text>
              </View>
            </View>
          ))}
        </View>

        <Button
          label="Continue to book my demo"
          size="lg"
          fullWidth
          icon="calendar-outline"
          onPress={() => Linking.openURL(Brand.calendlyUrl)}
        />

        <Text style={styles.note}>
          Opens Calendly (30 min) with your plan & add-on selection carried over. No contracts — cancel anytime.
        </Text>
      </View>
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
    paddingBottom: Spacing.xxl,
  },
  wrap: {
    width: '100%',
    maxWidth: 560,
    alignSelf: 'center',
  },
  title: {
    fontFamily: Fonts.display,
    fontSize: 27,
    lineHeight: 33,
    letterSpacing: -0.5,
    color: Colors.textPrimary,
  },
  body: {
    fontFamily: Fonts.body,
    fontSize: 15,
    lineHeight: 23,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
  },
  demoCard: {
    marginTop: Spacing.xl,
  },
  steps: {
    marginTop: Spacing.xl,
    gap: Spacing.md,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  stepBadge: {
    width: 32,
    height: 32,
    borderRadius: Radius.pill,
    backgroundColor: 'rgba(47,111,237,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNum: {
    fontFamily: Fonts.monoMedium,
    fontSize: 12,
    color: Colors.blueDim,
  },
  stepBody: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    flex: 1,
  },
  stepLabel: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  note: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
});
