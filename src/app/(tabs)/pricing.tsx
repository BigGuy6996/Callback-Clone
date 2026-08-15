import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';
import {
  EnterprisePlan,
  PricingAddOns,
  PricingFaqs,
  PricingPlans,
  type PricingAddOn,
} from '@/constants/content';
import { ADDON_OPTIONS, addonNames, PLAN_OPTIONS, type PlanOption } from '@/lib/selection';
import { Section, SectionHeader } from '@/components/Section';
import { Accordion } from '@/components/ui/Accordion';
import { Blob } from '@/components/ui/Blob';
import { Button } from '@/components/ui/Button';
import { CountUp } from '@/components/ui/CountUp';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { GlassCard } from '@/components/ui/GlassCard';

const fmt = (n: number) => `$${n.toLocaleString('en-US')}`;

/** Segmented Monthly / Annual toggle — port of the pricing.html switch. */
function BillingToggle({ annual, onChange }: { annual: boolean; onChange: (v: boolean) => void }) {
  return (
    <View style={styles.toggleWrap}>
      <View style={styles.toggle}>
        <Pressable style={[styles.toggleBtn, !annual && styles.toggleBtnOn]} onPress={() => onChange(false)}>
          <Text style={[styles.toggleLabel, !annual && styles.toggleLabelOn]}>Monthly</Text>
        </Pressable>
        <Pressable style={[styles.toggleBtn, annual && styles.toggleBtnOn]} onPress={() => onChange(true)}>
          <Text style={[styles.toggleLabel, annual && styles.toggleLabelOn]}>Annual</Text>
        </Pressable>
      </View>
      <View style={styles.savePill}>
        <Text style={styles.savePillText}>save ~15%</Text>
      </View>
    </View>
  );
}

function AddOnRow({
  addon,
  selected,
  onToggle,
  short = false,
}: {
  addon: PricingAddOn;
  selected: boolean;
  onToggle: () => void;
  short?: boolean;
}) {
  return (
    <Pressable
      onPress={onToggle}
      style={({ pressed }) => [styles.addonCard, selected && styles.addonCardSelected, pressed && styles.cardPressed]}>
      <View style={styles.addonTop}>
        <View style={styles.addonIconWrap}>
          <Text style={styles.addonIcon}>{addon.icon}</Text>
        </View>
        <View style={styles.addonBody}>
          <Text style={styles.addonTitle}>{short ? addon.short : addon.title}</Text>
          <Text style={styles.addonPrice}>+{fmt(addon.price)}/mo</Text>
        </View>
        <View style={[styles.checkCircle, selected && styles.checkCircleOn]}>
          {selected ? <Ionicons name="checkmark" size={14} color="#FFFFFF" /> : null}
        </View>
      </View>
      <Text style={styles.addonDesc}>{short ? addon.shortDesc : addon.desc}</Text>
    </Pressable>
  );
}

function PlanPickRow({ plan, selected, onPress }: { plan: PlanOption; selected: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.planPick, selected && styles.planPickOn, pressed && styles.cardPressed]}>
      <View style={styles.planPickText}>
        <Text style={[styles.planPickName, selected && styles.planPickNameOn]}>{plan.name}</Text>
        <Text style={styles.planPickCalls}>{plan.calls}</Text>
      </View>
      <Text style={[styles.planPickPrice, selected && styles.planPickPriceOn]}>{fmt(plan.price)}/mo</Text>
    </Pressable>
  );
}

export default function PricingScreen() {
  const [annual, setAnnual] = useState(false);
  const [planId, setPlanId] = useState<string>(PLAN_OPTIONS[1].id);
  const [addonIds, setAddonIds] = useState<string[]>([]);

  const toggleAddon = (id: string) =>
    setAddonIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const plan = PLAN_OPTIONS.find((p) => p.id === planId) ?? PLAN_OPTIONS[1];
  const total = plan.price + ADDON_OPTIONS.filter((a) => addonIds.includes(a.id)).reduce((s, a) => s + a.price, 0);

  const goDemo = () =>
    router.push({
      pathname: '/demo',
      params: { plan: plan.name, addons: addonNames(addonIds) },
    });

  const goDemoWith = (name: string, addons: string) =>
    router.push({ pathname: '/demo', params: { plan: name, addons } });

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
      {/* Hero */}
      <View style={styles.hero}>
        <Blob size={300} opacity={0.14} style={styles.heroBlob} />
        <View style={styles.wrap}>
          <Eyebrow label="Pricing" />
          <Text style={styles.heroTitle}>Simple pricing. Real results.</Text>
          <Text style={styles.heroSub}>
            Simple, call-volume pricing — pay for the calls your AI front desk actually handles, with room to grow. No
            contracts. Cancel anytime.
          </Text>
          <BillingToggle annual={annual} onChange={setAnnual} />
          {annual ? (
            <Text style={styles.annualNote}>Annual plans are billed once per year at the discounted rate shown — not monthly.</Text>
          ) : null}
          <View style={styles.trustRow}>
            <View style={styles.trustItem}>
              <Text style={styles.trustNum}>
                <CountUp value={99.9} suffix="%" style={styles.trustNum} />
              </Text>
              <Text style={styles.trustLabel}>uptime SLA</Text>
            </View>
            <View style={styles.trustItem}>
              <Ionicons name="shield-checkmark-outline" size={20} color={Colors.blue} />
              <Text style={styles.trustLabel}>SOC 2-aligned data handling</Text>
            </View>
            <View style={styles.trustItem}>
              <Ionicons name="swap-horizontal-outline" size={20} color={Colors.blue} />
              <Text style={styles.trustLabel}>Free migration from your current setup</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Tier cards */}
      <View style={styles.tiersWrap}>
        {PricingPlans.map((tier) => {
          const price = annual ? tier.annual : tier.monthly;
          return (
            <View key={tier.id} style={[styles.tierCard, tier.featured && styles.tierCardFeatured]}>
              {tier.featured ? (
                <View style={styles.featuredBadge}>
                  <Text style={styles.featuredText}>★ MOST POPULAR</Text>
                </View>
              ) : null}
              <Text style={styles.tierName}>{tier.name}</Text>
              <View style={styles.priceRow}>
                <Text style={[styles.tierPrice, tier.featured && styles.tierPriceFeatured]}>{fmt(price)}</Text>
                <Text style={styles.perMonth}>/mo</Text>
              </View>
              <Text style={styles.tierCalls}>{tier.calls}</Text>
              <Text style={styles.tierSetup}>
                +{fmt(tier.setup)} one-time setup · {tier.perCall}
              </Text>

              <Text style={styles.blockLabel}>Perfect for</Text>
              {tier.perfectFor.map((p) => (
                <Text key={p} style={styles.perfectFor}>
                  {p}
                </Text>
              ))}

              <View style={styles.divider} />
              {tier.details.map((f) => (
                <View key={f} style={styles.featureRow}>
                  <Ionicons name="checkmark" size={15} color={tier.featured ? Colors.blue : Colors.success} />
                  <Text style={[styles.featureText, f.endsWith(':') && styles.featureHeader]}>{f}</Text>
                </View>
              ))}
              <View style={styles.tierCta}>
                <Button
                  label="Get started"
                  variant={tier.featured ? 'primary' : 'secondary'}
                  fullWidth
                  onPress={() => goDemoWith(tier.name, '')}
                />
              </View>
            </View>
          );
        })}

        {/* Enterprise */}
        <View style={styles.tierCard}>
          <Text style={styles.tierName}>{EnterprisePlan.name}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.tierPrice}>{EnterprisePlan.priceLabel}</Text>
            <Text style={styles.perMonth}>/mo</Text>
          </View>
          <Text style={styles.tierCalls}>{EnterprisePlan.calls}</Text>
          <Text style={styles.tierSetup}>{EnterprisePlan.setup}</Text>

          <Text style={styles.blockLabel}>Perfect for</Text>
          {EnterprisePlan.perfectFor.map((p) => (
            <Text key={p} style={styles.perfectFor}>
              {p}
            </Text>
          ))}

          <View style={styles.divider} />
          {EnterprisePlan.details.map((f) => (
            <View key={f} style={styles.featureRow}>
              <Ionicons name="checkmark" size={15} color={Colors.success} />
              <Text style={[styles.featureText, f.endsWith(':') && styles.featureHeader]}>{f}</Text>
            </View>
          ))}
          <View style={styles.tierCta}>
            <Button label="Talk to sales" variant="secondary" fullWidth onPress={() => router.push('/demo')} />
          </View>
        </View>
      </View>

      {/* Add-ons */}
      <Section elevated>
        <SectionHeader
          eyebrow="Add-ons"
          title="Every extra lead, message & review — covered"
          subtitle="Your AI front desk handles the phone. These add-ons extend that same coverage to your website, your social inboxes, and your reputation — for less than the cost of missing a single job."
        />
        <View style={styles.addonsList}>
          {PricingAddOns.map((a) => (
            <AddOnRow
              key={a.id}
              addon={a}
              selected={addonIds.includes(a.id)}
              onToggle={() => toggleAddon(a.id)}
            />
          ))}
        </View>
      </Section>

      {/* Your selection */}
      <View style={styles.selectionWrap}>
        <GlassCard style={styles.selectionCard}>
          <Text style={styles.selectionTitle}>Your selection</Text>
          <Text style={styles.selectionBody}>
            {addonIds.length
              ? addonNames(addonIds).split(', ').join(' · ')
              : 'No add-on selected yet — pick any that fit.'}
          </Text>
          <Text style={styles.blockLabel}>Service plan</Text>
          <View style={styles.planPickList}>
            {PLAN_OPTIONS.map((p) => (
              <PlanPickRow key={p.id} plan={p} selected={p.id === planId} onPress={() => setPlanId(p.id)} />
            ))}
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Estimated monthly</Text>
            <Text style={styles.totalValue}>
              {fmt(total)}<Text style={styles.totalSuffix}>/mo</Text>
            </Text>
          </View>
          <View style={styles.selectionCta}>
            <Button label="Continue to book a demo with my selection" size="lg" fullWidth icon="calendar-outline" onPress={goDemo} />
          </View>
          <Text style={styles.selectionNote}>
            Your chosen service and add-on will be prefilled on the next step — just add your contact details and pick a
            time. Add-ons are configured at no extra setup cost when added to an active plan.
          </Text>
        </GlassCard>

        <View style={styles.customWrap}>
          <Text style={styles.customText}>Need more than 500 calls a month, or a unique setup?</Text>
          <Pressable onPress={() => router.push('/demo')}>
            <Text style={styles.customLink}>Let&apos;s talk custom per-call pricing.</Text>
          </Pressable>
        </View>

        <Text style={styles.fairUse}>
          Fair use — Plans include a monthly call allowance (200 / 325 / 500 calls). If you regularly go over,
          you&apos;ll be billed at your plan&apos;s per-call rate — never more than the plan&apos;s value — and
          we&apos;ll suggest the next tier so you always pay the best price. No surprise fees.
        </Text>
      </View>

      {/* FAQ */}
      <Section>
        <SectionHeader eyebrow="FAQ" title="Pricing questions" />
        <Accordion items={PricingFaqs} />
      </Section>
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
  toggleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },
  toggle: {
    flexDirection: 'row',
    backgroundColor: Colors.bgElevated,
    borderRadius: Radius.pill,
    padding: 4,
  },
  toggleBtn: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: Radius.pill,
  },
  toggleBtnOn: {
    backgroundColor: Colors.blue,
  },
  toggleLabel: {
    fontFamily: Fonts.bodySemibold,
    fontSize: 13,
    color: Colors.textSecondary,
  },
  toggleLabelOn: {
    color: '#FFFFFF',
  },
  savePill: {
    backgroundColor: 'rgba(5,150,105,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(5,150,105,0.3)',
    borderRadius: Radius.pill,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  savePillText: {
    fontFamily: Fonts.bodySemibold,
    fontSize: 11.5,
    color: Colors.success,
  },
  annualNote: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: Spacing.sm,
  },
  trustRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.lg,
    marginTop: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.hairline,
    paddingTop: Spacing.lg,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    maxWidth: '100%',
  },
  trustNum: {
    fontFamily: Fonts.monoMedium,
    fontSize: 15,
    color: Colors.textPrimary,
  },
  trustLabel: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 12,
    color: Colors.textSecondary,
    flexShrink: 1,
  },
  tiersWrap: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  tierCard: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.hairline,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  tierCardFeatured: {
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
    letterSpacing: 1.2,
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
  tierPrice: {
    fontFamily: Fonts.monoMedium,
    fontSize: 36,
    letterSpacing: -1,
    color: Colors.textPrimary,
  },
  tierPriceFeatured: {
    color: Colors.blue,
  },
  perMonth: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.textMuted,
    marginLeft: 4,
  },
  tierCalls: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 13,
    color: Colors.textPrimary,
    marginTop: 2,
  },
  tierSetup: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  blockLabel: {
    fontFamily: Fonts.bodySemibold,
    fontSize: 11,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: Colors.textMuted,
    marginTop: Spacing.md,
    marginBottom: 6,
  },
  perfectFor: {
    fontFamily: Fonts.body,
    fontSize: 13,
    lineHeight: 19,
    color: Colors.textSecondary,
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
  featureHeader: {
    fontFamily: Fonts.bodySemibold,
    color: Colors.textPrimary,
  },
  tierCta: {
    marginTop: Spacing.md,
  },
  addonsList: {
    gap: Spacing.md,
  },
  addonCard: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.hairline,
    borderRadius: Radius.md,
    padding: Spacing.lg,
    gap: Spacing.sm,
  },
  addonCardSelected: {
    borderColor: Colors.blue,
    backgroundColor: 'rgba(47,111,237,0.04)',
  },
  cardPressed: {
    opacity: 0.85,
  },
  addonTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  addonIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(47,111,237,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addonIcon: {
    fontSize: 22,
  },
  addonBody: {
    flex: 1,
  },
  addonTitle: {
    fontFamily: Fonts.displaySemibold,
    fontSize: 15.5,
    color: Colors.textPrimary,
  },
  addonPrice: {
    fontFamily: Fonts.monoMedium,
    fontSize: 13,
    color: Colors.blueDim,
    marginTop: 2,
  },
  addonDesc: {
    fontFamily: Fonts.body,
    fontSize: 13,
    lineHeight: 19,
    color: Colors.textSecondary,
    paddingLeft: 60,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.hairline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircleOn: {
    backgroundColor: Colors.blue,
    borderColor: Colors.blue,
  },
  selectionWrap: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xxl,
  },
  selectionCard: {
    padding: Spacing.lg,
    width: '100%',
    maxWidth: 560,
    alignSelf: 'center',
  },
  selectionTitle: {
    fontFamily: Fonts.displaySemibold,
    fontSize: 17,
    color: Colors.textPrimary,
  },
  selectionBody: {
    fontFamily: Fonts.body,
    fontSize: 13,
    lineHeight: 19,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  planPickList: {
    gap: Spacing.sm,
  },
  planPick: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.hairline,
    borderRadius: Radius.md,
    paddingVertical: 12,
    paddingHorizontal: Spacing.md,
  },
  planPickOn: {
    borderColor: Colors.blue,
    backgroundColor: 'rgba(47,111,237,0.05)',
  },
  planPickText: {
    flex: 1,
  },
  planPickName: {
    fontFamily: Fonts.bodySemibold,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  planPickNameOn: {
    color: Colors.blueDim,
  },
  planPickCalls: {
    fontFamily: Fonts.body,
    fontSize: 11.5,
    color: Colors.textMuted,
    marginTop: 1,
  },
  planPickPrice: {
    fontFamily: Fonts.monoMedium,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  planPickPriceOn: {
    color: Colors.blue,
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.hairline,
  },
  totalLabel: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: Colors.textSecondary,
  },
  totalValue: {
    fontFamily: Fonts.monoMedium,
    fontSize: 24,
    color: Colors.textPrimary,
  },
  totalSuffix: {
    fontSize: 13,
    color: Colors.textMuted,
  },
  selectionCta: {
    marginTop: Spacing.lg,
  },
  selectionNote: {
    fontFamily: Fonts.body,
    fontSize: 12,
    lineHeight: 18,
    color: Colors.textMuted,
    marginTop: Spacing.md,
    textAlign: 'center',
  },
  customWrap: {
    alignItems: 'center',
    marginTop: Spacing.xl,
    maxWidth: 560,
    alignSelf: 'center',
  },
  customText: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  customLink: {
    fontFamily: Fonts.bodySemibold,
    fontSize: 14,
    color: Colors.blue,
    textDecorationLine: 'underline',
    marginTop: 4,
  },
  fairUse: {
    fontFamily: Fonts.body,
    fontSize: 11.5,
    lineHeight: 17,
    color: Colors.textMuted,
    marginTop: Spacing.xl,
    maxWidth: 560,
    alignSelf: 'center',
    textAlign: 'center',
  },
});
