import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';
import { Steps } from '@/constants/content';
import { Section, SectionHeader } from '@/components/Section';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';

export function HowItWorks() {
  return (
    <Section elevated>
      <SectionHeader
        eyebrow="How it works"
        title="Meet the receptionist who never misses a call."
        subtitle="Built to sound human. Built to actually answer."
      />
      <View style={styles.list}>
        {Steps.map((s, i) => (
          <View key={s.step} style={styles.stepRow}>
            <View style={styles.timeline}>
              <View style={styles.stepBadge}>
                <Text style={styles.stepNum}>{s.step}</Text>
              </View>
              {i < Steps.length - 1 ? <View style={styles.timelineLine} /> : null}
            </View>
            <GlassCard style={styles.card}>
              <Text style={styles.cardTitle}>{s.title}</Text>
              <Text style={styles.cardBody}>{s.body}</Text>
            </GlassCard>
          </View>
        ))}
      </View>
      <View style={styles.ctaRow}>
        <Button label="Hear it answer a real call" icon="play-circle-outline" onPress={() => router.push('/demo')} />
      </View>
    </Section>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: Spacing.md,
  },
  stepRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  timeline: {
    alignItems: 'center',
    width: 44,
  },
  stepBadge: {
    width: 44,
    height: 44,
    borderRadius: Radius.pill,
    backgroundColor: Colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNum: {
    fontFamily: Fonts.monoMedium,
    fontSize: 13,
    color: Colors.blueLight,
  },
  timelineLine: {
    flex: 1,
    width: 1,
    backgroundColor: Colors.hairline,
    marginVertical: Spacing.xs,
  },
  card: {
    flex: 1,
    padding: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  cardTitle: {
    fontFamily: Fonts.displaySemibold,
    fontSize: 16.5,
    color: Colors.textPrimary,
  },
  cardBody: {
    fontFamily: Fonts.body,
    fontSize: 14,
    lineHeight: 21,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  ctaRow: {
    alignItems: 'center',
    marginTop: Spacing.xl,
  },
});
