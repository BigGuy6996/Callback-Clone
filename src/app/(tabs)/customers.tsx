import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';
import { CustomersProof, Testimonials } from '@/constants/content';
import { Section, SectionHeader } from '@/components/Section';
import { Blob } from '@/components/ui/Blob';
import { Button } from '@/components/ui/Button';
import { CountUp } from '@/components/ui/CountUp';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { GlassCard } from '@/components/ui/GlassCard';

function Stars() {
  return (
    <View style={styles.stars}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Ionicons key={i} name="star" size={15} color={Colors.warning} />
      ))}
    </View>
  );
}

export default function CustomersScreen() {
  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
      {/* Hero */}
      <View style={styles.hero}>
        <Blob size={320} opacity={0.14} style={styles.heroBlob} />
        <View style={styles.wrap}>
          <Eyebrow label="Customers" />
          <Text style={styles.heroTitle}>Small businesses that stopped losing leads</Text>
          <Text style={styles.heroSub}>
            Local teams in dental, HVAC, and med-spa who traded missed calls for booked appointments.
          </Text>
        </View>
      </View>

      {/* Testimonials */}
      <View style={styles.wrap}>
        {Testimonials.map((t) => (
          <GlassCard key={t.name} style={styles.testiCard}>
            <Stars />
            <Text style={styles.quote}>{t.quote}</Text>
            <View style={styles.person}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{t.name.charAt(0)}</Text>
              </View>
              <View style={styles.personInfo}>
                <Text style={styles.name}>{t.name}</Text>
                <Text style={styles.role}>{t.role}</Text>
              </View>
              <View style={styles.metric}>
                <Text style={styles.metricText}>{t.metric}</Text>
              </View>
            </View>
          </GlassCard>
        ))}
      </View>

      {/* Proof */}
      <Section elevated>
        <SectionHeader
          eyebrow={CustomersProof.eyebrow}
          title={CustomersProof.title}
          subtitle={CustomersProof.body}
        />
        <View style={styles.bulletRow}>
          {CustomersProof.bullets.map((b) => (
            <View key={b} style={styles.bullet}>
              <Ionicons name="checkmark-circle" size={16} color={Colors.blue} />
              <Text style={styles.bulletText}>{b}</Text>
            </View>
          ))}
        </View>
        <View style={styles.statsGrid}>
          {CustomersProof.stats.map((s, i) => (
            <View
              key={s.label}
              style={[
                styles.statCell,
                i % 2 === 0 && styles.statCellLeft,
                i < CustomersProof.stats.length - 2 && styles.statCellBottom,
              ]}>
              <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} style={styles.statNum} />
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>
        <View style={styles.proofCta}>
          <Button label="Get started" icon="arrow-forward" onPress={() => router.push('/demo')} />
        </View>
      </Section>

      {/* Final CTA */}
      <View style={styles.finalWrap}>
        <View style={styles.wrap}>
          <Text style={styles.finalTitle}>Every missed call is a missed customer.</Text>
          <Text style={styles.finalSub}>
            Capture every call for 1/10 of the cost of a full-time receptionist. No miss. No waiting.
          </Text>
          <View style={styles.finalCtaRow}>
            <Button label="Book a Free Demo" size="lg" onPress={() => router.push('/demo')} />
            <Button label="See pricing" size="lg" variant="secondary" onPress={() => router.push('/pricing')} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  scroll: {
    paddingBottom: Spacing.xxl,
  },
  hero: {
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
    overflow: 'hidden',
  },
  heroBlob: {
    position: 'absolute',
    top: -140,
    right: -120,
  },
  wrap: {
    width: '100%',
    maxWidth: 560,
    alignSelf: 'center',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  heroTitle: {
    fontFamily: Fonts.display,
    fontSize: 30,
    lineHeight: 36,
    letterSpacing: -0.6,
    color: Colors.textPrimary,
  },
  heroSub: {
    fontFamily: Fonts.body,
    fontSize: 15,
    lineHeight: 23,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
  },
  testiCard: {
    padding: Spacing.lg,
  },
  stars: {
    flexDirection: 'row',
    gap: 3,
  },
  quote: {
    fontFamily: Fonts.body,
    fontSize: 15.5,
    lineHeight: 24,
    color: Colors.textPrimary,
    marginTop: Spacing.sm,
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
  personInfo: {
    flex: 1,
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
  metric: {
    backgroundColor: 'rgba(5,150,105,0.1)',
    borderRadius: Radius.pill,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  metricText: {
    fontFamily: Fonts.monoMedium,
    fontSize: 11.5,
    color: Colors.success,
  },
  bulletRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  bullet: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  bulletText: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 13,
    color: Colors.textPrimary,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderColor: Colors.hairline,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: Colors.surface,
  },
  statCell: {
    width: '50%',
    padding: Spacing.lg,
    alignItems: 'center',
  },
  statCellLeft: {
    borderRightWidth: 1,
    borderRightColor: Colors.hairline,
  },
  statCellBottom: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.hairline,
  },
  statNum: {
    fontFamily: Fonts.displayBold,
    fontSize: 34,
    letterSpacing: -1,
    color: Colors.blue,
  },
  statLabel: {
    fontFamily: Fonts.body,
    fontSize: 12.5,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
  proofCta: {
    marginTop: Spacing.xl,
    alignItems: 'center',
  },
  finalWrap: {
    borderTopWidth: 1,
    borderTopColor: Colors.hairline,
    backgroundColor: Colors.bgElevated,
    paddingVertical: Spacing.xxxl,
  },
  finalTitle: {
    fontFamily: Fonts.display,
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.6,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  finalSub: {
    fontFamily: Fonts.body,
    fontSize: 15,
    lineHeight: 22,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
  finalCtaRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.xl,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
