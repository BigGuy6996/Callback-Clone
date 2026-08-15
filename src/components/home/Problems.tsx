import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';
import { Problems } from '@/constants/content';
import { Section, SectionHeader } from '@/components/Section';
import { GlassCard } from '@/components/ui/GlassCard';

const ICONS: Array<keyof typeof Ionicons.glyphMap> = ['construct-outline', 'call-outline', 'moon-outline'];

export function ProblemsSection() {
  return (
    <Section>
      <SectionHeader
        eyebrow="The problem"
        title="Every missed call is a missed customer."
        subtitle="One ringing phone. One caller who just needs to talk to a human. If nobody picks up, they move on."
      />
      <View style={styles.grid}>
        {Problems.map((p, i) => (
          <GlassCard key={p.title} style={styles.card}>
            <View style={styles.iconWrap}>
              <Ionicons name={ICONS[i]} size={20} color={Colors.blue} />
            </View>
            <Text style={styles.cardTitle}>{p.title}</Text>
            <Text style={styles.cardBody}>{p.body}</Text>
          </GlassCard>
        ))}
      </View>
    </Section>
  );
}

const styles = StyleSheet.create({
  grid: {
    gap: Spacing.md,
  },
  card: {
    padding: Spacing.lg,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: Radius.sm,
    backgroundColor: 'rgba(47,111,237,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  cardTitle: {
    fontFamily: Fonts.displaySemibold,
    fontSize: 17,
    color: Colors.textPrimary,
    letterSpacing: -0.2,
  },
  cardBody: {
    fontFamily: Fonts.body,
    fontSize: 14,
    lineHeight: 21,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
  },
});
