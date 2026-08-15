import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';
import { Testimonials } from '@/constants/content';
import { Section, SectionHeader } from '@/components/Section';
import { GlassCard } from '@/components/ui/GlassCard';

export function TestimonialsSection() {
  return (
    <Section>
      <SectionHeader
        eyebrow="Testimonials"
        title="Fewer missed calls. More booked jobs."
        subtitle="Local business owners who stopped losing the phone."
      />
      <View style={styles.grid}>
        {Testimonials.map((t) => (
          <GlassCard key={t.name} style={styles.card}>
            <Ionicons name="quote" size={22} color={Colors.blueLight} />
            <Text style={styles.quote}>{t.quote}</Text>
            <View style={styles.metric}>
              <Text style={styles.metricText}>{t.metric}</Text>
            </View>
            <View style={styles.person}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{t.name.charAt(0)}</Text>
              </View>
              <View>
                <Text style={styles.name}>{t.name}</Text>
                <Text style={styles.role}>{t.role}</Text>
              </View>
            </View>
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
  quote: {
    fontFamily: Fonts.body,
    fontSize: 15,
    lineHeight: 23,
    color: Colors.textPrimary,
    marginTop: Spacing.sm,
  },
  metric: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(5,150,105,0.1)',
    borderRadius: Radius.pill,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginTop: Spacing.md,
  },
  metricText: {
    fontFamily: Fonts.monoMedium,
    fontSize: 11.5,
    color: Colors.success,
  },
  person: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.hairline,
    paddingTop: Spacing.md,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(47,111,237,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: Fonts.displayBold,
    fontSize: 16,
    color: Colors.blueDim,
  },
  name: {
    fontFamily: Fonts.bodySemibold,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  role: {
    fontFamily: Fonts.body,
    fontSize: 12.5,
    color: Colors.textMuted,
  },
});
