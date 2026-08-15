import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';
import { PricingTiers } from '@/constants/content';
import { Section, SectionHeader } from '@/components/Section';
import { Button } from '@/components/ui/Button';

export function PricingBand() {
  return (
    <Section elevated>
      <SectionHeader
        eyebrow="Pricing"
        title="Three tiers, sized to call volume."
        subtitle="No contracts, no per-minute surprises. Annual billing saves 15%."
      />
      <View style={styles.grid}>
        {PricingTiers.map((tier) => (
          <View key={tier.name} style={[styles.card, tier.featured && styles.cardFeatured]}>
            {tier.featured ? (
              <View style={styles.featuredBadge}>
                <Text style={styles.featuredText}>MOST POPULAR</Text>
              </View>
            ) : null}
            <Text style={styles.tierName}>{tier.name}</Text>
            <View style={styles.priceRow}>
              <Text style={[styles.price, tier.featured && styles.priceFeatured]}>${tier.monthly}</Text>
              <Text style={styles.perMonth}>/mo</Text>
            </View>
            <Text style={styles.calls}>{tier.calls}</Text>
            <View style={styles.divider} />
            {tier.features.map((f) => (
              <View key={f} style={styles.featureRow}>
                <Ionicons name="checkmark-circle" size={15} color={tier.featured ? Colors.blue : Colors.success} />
                <Text style={styles.featureText}>{f}</Text>
              </View>
            ))}
            <View style={styles.cta}>
              <Button
                label="Get started"
                variant={tier.featured ? 'primary' : 'secondary'}
                fullWidth
                onPress={() => router.push('/demo')}
              />
            </View>
          </View>
        ))}
      </View>
      <Text style={styles.note}>Enterprise (500+ calls/mo) — custom pricing. Talk to us during your demo.</Text>
    </Section>
  );
}

const styles = StyleSheet.create({
  grid: {
    gap: Spacing.md,
  },
  card: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.hairline,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  cardFeatured: {
    borderColor: Colors.blue,
    borderWidth: 2,
    shadowColor: Colors.blue,
    shadowOpacity: 0.18,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 6,
  },
  featuredBadge: {
    position: 'absolute',
    top: -11,
    alignSelf: 'center',
    backgroundColor: Colors.blue,
    borderRadius: Radius.pill,
    paddingVertical: 4,
    paddingHorizontal: 14,
  },
  featuredText: {
    fontFamily: Fonts.bodySemibold,
    fontSize: 10.5,
    letterSpacing: 1.4,
    color: '#FFFFFF',
  },
  tierName: {
    fontFamily: Fonts.displaySemibold,
    fontSize: 18,
    color: Colors.textPrimary,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: Spacing.xs,
  },
  price: {
    fontFamily: Fonts.monoMedium,
    fontSize: 34,
    letterSpacing: -1,
    color: Colors.textPrimary,
  },
  priceFeatured: {
    color: Colors.blue,
  },
  perMonth: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.textMuted,
    marginLeft: 4,
  },
  calls: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.hairline,
    marginVertical: Spacing.md,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  featureText: {
    fontFamily: Fonts.body,
    fontSize: 13.5,
    color: Colors.textSecondary,
    flex: 1,
  },
  cta: {
    marginTop: Spacing.md,
  },
  note: {
    fontFamily: Fonts.body,
    fontSize: 12.5,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: Spacing.lg,
  },
});
