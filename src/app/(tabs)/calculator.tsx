import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';
import { CalculatorIndustries } from '@/constants/content';
import { ADDON_OPTIONS, addonNames, PLAN_OPTIONS } from '@/lib/selection';
import { Blob } from '@/components/ui/Blob';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { GlassCard } from '@/components/ui/GlassCard';
import { OptionSelect, SliderRow, Stepper } from '@/components/ui/Field';

const fmt = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`;
const fmtPlain = (n: number) => Math.round(n).toLocaleString('en-US');

/** Port of calculator.html's math — exact formulas, verbatim defaults. */
function useCalc() {
  const [calls, setCalls] = useState(10); // missed calls per week (1–100)
  const [job, setJob] = useState(350); // average job value
  const [industry, setIndustry] = useState<string>(CalculatorIndustries[0].label);

  const factor = CalculatorIndustries.find((i) => i.label === industry)?.factor ?? 1.6;
  const leads = Math.round(calls * factor); // leads/month
  const monthly = leads * job;
  const yearly = Math.round(monthly * 10);
  const annualCost = 249 * 12 + 249;
  const roi = Math.max(1, Math.round(yearly / annualCost));

  return { calls, setCalls, job, setJob, industry, setIndustry, factor, leads, monthly, yearly, roi };
}

export default function CalculatorScreen() {
  const { calls, setCalls, job, setJob, industry, setIndustry, leads, monthly, yearly, roi } = useCalc();

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

  const perDay = Math.round(monthly / 30);
  const perWeek = Math.round(monthly / 4.33);

  const setJobText = (t: string) => {
    const v = parseInt(t.replace(/[^0-9]/g, ''), 10);
    setJob(Number.isNaN(v) ? 0 : Math.min(100000, v));
  };

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
      {/* Hero */}
      <View style={styles.hero}>
        <Blob size={320} opacity={0.14} style={styles.heroBlob} />
        <View style={styles.wrap}>
          <Eyebrow label="Callback Clone · 24/7 receptionist" />
          <Text style={styles.heroTitle}>Missed Call Revenue Calculator</Text>
          <Text style={styles.heroSub}>
            See exactly how much missed calls are costing your business — and the ROI of fixing it. Never miss a call.
            Never miss a customer.
          </Text>
        </View>
      </View>

      {/* Your numbers */}
      <View style={styles.wrap}>
        <View style={styles.card}>
          <Text style={styles.cardEyebrow}>Your numbers</Text>
          <Text style={styles.cardTitle}>Drag & fill to see what you&apos;re leaving on the table.</Text>

          <View style={styles.divider} />

          <SliderRow
            label="How many calls do you estimate you miss per week?"
            value={calls}
            min={1}
            max={100}
            step={1}
            display={`${calls}`}
            onChange={setCalls}
          />
          <View style={styles.spacer} />
          <Stepper
            label="Missed calls per week"
            value={calls}
            display={`${calls}`}
            onChange={setCalls}
            min={1}
            max={100}
            step={1}
          />

          <View style={styles.divider} />

          <Text style={styles.fieldLabel}>What&apos;s your average job value?</Text>
          <View style={styles.jobRow}>
            <View style={styles.jobInputWrap}>
              <Text style={styles.jobPrefix}>$</Text>
              <TextInput
                style={styles.jobInput}
                value={job === 0 ? '' : `${job}`}
                onChangeText={setJobText}
                keyboardType="number-pad"
                placeholder="350"
                placeholderTextColor={Colors.textMuted}
              />
            </View>
            <View style={styles.jobSteppers}>
              <Stepper label="" value={job} display="" onChange={setJob} min={0} max={100000} step={25} />
            </View>
          </View>

          <View style={styles.divider} />

          <OptionSelect
            label="Your industry"
            options={CalculatorIndustries.map((i) => i.label)}
            value={industry}
            onChange={setIndustry}
            hint="Industries with repeat customers get slightly different recovery rates."
          />
        </View>

        {/* Your Missed Revenue */}
        <GlassCard style={styles.revenueCard}>
          <Text style={styles.cardEyebrow}>Your Missed Revenue</Text>
          <View style={styles.revenueMain}>
            <Text style={styles.revenueLabel}>Monthly loss</Text>
            <Text style={styles.revenueValue}>{fmt(monthly)}</Text>
          </View>
          <View style={styles.perStrip}>
            <View style={styles.perCell}>
              <Text style={styles.perLabel}>per day</Text>
              <Text style={styles.perValue}>{fmt(perDay)}</Text>
            </View>
            <View style={styles.perDivider} />
            <View style={styles.perCell}>
              <Text style={styles.perLabel}>per week</Text>
              <Text style={styles.perValue}>{fmt(perWeek)}</Text>
            </View>
            <View style={styles.perDivider} />
            <View style={styles.perCell}>
              <Text style={styles.perLabel}>per month</Text>
              <Text style={styles.perValue}>{fmt(monthly)}</Text>
            </View>
          </View>
          <View style={styles.revenueRow}>
            <Text style={styles.revenueLabel}>Lost leads per month</Text>
            <Text style={styles.revenueMono}>{fmtPlain(leads)}</Text>
          </View>
          <View style={styles.revenueRow}>
            <Text style={styles.revenueLabel}>Yearly loss</Text>
            <Text style={styles.revenueMono}>{fmt(yearly)}</Text>
          </View>
          <Text style={styles.revenueNote}>Revenue walking away annually</Text>
        </GlassCard>

        {/* The Fix */}
        <GlassCard style={styles.fixCard}>
          <Text style={styles.cardEyebrow}>The Fix</Text>
          <View style={styles.fixRow}>
            <Text style={styles.fixLabel}>Callback Clone cost</Text>
            <Text style={styles.fixValue}>$249/mo</Text>
          </View>
          <Text style={styles.fixNote}>+ $249 one-time setup</Text>
          <View style={styles.roiWrap}>
            <Text style={styles.roiLabel}>Your ROI</Text>
            <Text style={styles.roiValue}>
              {roi}
              <Text style={styles.roiSuffix}>x return</Text>
            </Text>
          </View>
          <Text style={styles.roiCallout}>That&apos;s a massive return</Text>
          <Text style={styles.fixCopy}>
            For just $249/month, you stop losing {fmt(monthly)}/month to missed calls. That&apos;s a {roi}x ROI.
          </Text>
          <View style={styles.cta}>
            <Button
              label="Start Capturing Every Call — $199 Setup"
              size="lg"
              fullWidth
              icon="call-outline"
              onPress={() => router.push('/demo')}
            />
            <Text style={styles.ctaNote}>Setup in 24 hours. No contracts. Cancel anytime.</Text>
          </View>
        </GlassCard>
      </View>

      {/* Build your plan */}
      <View style={styles.buildWrap}>
        <View style={styles.wrap}>
          <Eyebrow label="Build your plan" />
          <Text style={styles.buildTitle}>Stop the leak — and add the extras that fill you back up</Text>
          <Text style={styles.buildSub}>
            Your AI front desk recovers the missed revenue above. Choose the service tier that fits your call volume,
            then stack on add-ons to also capture website leads, social inboxes, and 5-star reviews. We&apos;ll carry
            your exact selection into the demo so you never re-enter it.
          </Text>
        </View>

        <View style={styles.wrap}>
          {PLAN_OPTIONS.map((p) => {
            const selected = p.id === planId;
            return (
              <View key={p.id}>
                <Button
                  label={`${p.name} — $${p.price}/mo`}
                  variant={selected ? 'primary' : 'secondary'}
                  fullWidth
                  onPress={() => setPlanId(p.id)}
                />
                <Text style={styles.planCalls}>{p.calls}</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.wrap}>
          <View style={styles.recoveredRow}>
            <View>
              <Text style={styles.recoveredLabel}>Recovered from the calculator above</Text>
              <Text style={styles.recoveredValue}>{fmt(monthly)}/mo</Text>
            </View>
            <View style={styles.recoveredRight}>
              <Text style={styles.recoveredBig}>48hr</Text>
              <Text style={styles.recoveredSmall}>to go live, no contracts</Text>
            </View>
          </View>
        </View>

        {/* Add-ons */}
        <View style={styles.wrap}>
          <Text style={styles.addonsTitle}>Add-ons</Text>
          {ADDON_OPTIONS.map((a) => {
            const selected = addonIds.includes(a.id);
            return (
              <Button
                key={a.id}
                label={selected ? `${a.short} · +$${a.price}/mo ✓` : `${a.short} · +$${a.price}/mo`}
                variant={selected ? 'primary' : 'secondary'}
                fullWidth
                onPress={() => toggleAddon(a.id)}
              />
            );
          })}
        </View>

        {/* Your selection */}
        <View style={styles.wrap}>
          <GlassCard style={styles.selCard}>
            <Text style={styles.selEyebrow}>Your selection</Text>
            <Text style={styles.selBody}>
              {addonIds.length ? addonNames(addonIds).split(', ').join(' · ') : 'No add-on selected yet — pick any that fit.'}
            </Text>
            <View style={styles.selTotalRow}>
              <Text style={styles.selTotal}>{fmt(total)}/mo</Text>
            </View>
            <Button
              label="Continue to book a demo with my selection"
              size="lg"
              fullWidth
              icon="calendar-outline"
              onPress={goDemo}
            />
            <Text style={styles.selNote}>
              The plan and add-ons you pick here will be filled into the demo automatically. Add-ons are configured at
              no extra setup cost.
            </Text>
          </GlassCard>
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
    marginBottom: Spacing.lg,
  },
  heroTitle: {
    fontFamily: Fonts.display,
    fontSize: 29,
    lineHeight: 35,
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
  card: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.hairline,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    shadowColor: '#0F172A',
    shadowOpacity: 0.05,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  cardEyebrow: {
    fontFamily: Fonts.bodySemibold,
    fontSize: 11,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: Colors.blueLight,
  },
  cardTitle: {
    fontFamily: Fonts.displaySemibold,
    fontSize: 17,
    lineHeight: 23,
    color: Colors.textPrimary,
    marginTop: 2,
  },
  fieldLabel: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 6,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.hairline,
    marginVertical: Spacing.lg,
  },
  spacer: {
    height: Spacing.md,
  },
  jobRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  jobInputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15,23,42,0.03)',
    borderWidth: 1,
    borderColor: Colors.hairline,
    borderRadius: Radius.sm,
    paddingHorizontal: 14,
  },
  jobPrefix: {
    fontFamily: Fonts.bodySemibold,
    fontSize: 18,
    color: Colors.textMuted,
    marginRight: 6,
  },
  jobInput: {
    flex: 1,
    fontFamily: Fonts.displaySemibold,
    fontSize: 20,
    color: Colors.textPrimary,
    paddingVertical: 12,
  },
  jobSteppers: {
    minWidth: 118,
  },
  revenueCard: {
    padding: Spacing.lg,
  },
  revenueMain: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginTop: Spacing.sm,
  },
  revenueLabel: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.textSecondary,
  },
  revenueValue: {
    fontFamily: Fonts.monoMedium,
    fontSize: 32,
    letterSpacing: -1,
    color: Colors.blue,
  },
  perStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgElevated,
    borderRadius: Radius.md,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    marginTop: Spacing.sm,
  },
  perCell: {
    flex: 1,
    alignItems: 'center',
  },
  perDivider: {
    width: 1,
    height: 26,
    backgroundColor: Colors.hairline,
  },
  perLabel: {
    fontFamily: Fonts.body,
    fontSize: 10.5,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  perValue: {
    fontFamily: Fonts.monoMedium,
    fontSize: 13.5,
    color: Colors.textPrimary,
    marginTop: 2,
  },
  revenueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.md,
  },
  revenueMono: {
    fontFamily: Fonts.monoMedium,
    fontSize: 15,
    color: Colors.textPrimary,
  },
  revenueNote: {
    fontFamily: Fonts.body,
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
  },
  fixCard: {
    padding: Spacing.lg,
  },
  fixRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.sm,
  },
  fixLabel: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.textSecondary,
  },
  fixValue: {
    fontFamily: Fonts.monoMedium,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  fixNote: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.textMuted,
    textAlign: 'right',
    marginTop: 2,
  },
  roiWrap: {
    marginTop: Spacing.lg,
    backgroundColor: Colors.bg,
    borderRadius: Radius.md,
    padding: Spacing.md,
    alignItems: 'center',
  },
  roiLabel: {
    fontFamily: Fonts.bodySemibold,
    fontSize: 11,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.55)',
  },
  roiValue: {
    fontFamily: Fonts.display,
    fontSize: 44,
    letterSpacing: -1.5,
    color: Colors.blueLight,
    marginTop: 2,
  },
  roiSuffix: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.7)',
  },
  roiCallout: {
    fontFamily: Fonts.bodySemibold,
    fontSize: 14,
    color: Colors.success,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
  fixCopy: {
    fontFamily: Fonts.body,
    fontSize: 13.5,
    lineHeight: 20,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
  cta: {
    marginTop: Spacing.lg,
    alignItems: 'center',
  },
  ctaNote: {
    fontFamily: Fonts.body,
    fontSize: 11.5,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
  buildWrap: {
    backgroundColor: Colors.bgElevated,
    borderTopWidth: 1,
    borderTopColor: Colors.hairline,
    paddingVertical: Spacing.xxl,
    gap: Spacing.lg,
  },
  buildTitle: {
    fontFamily: Fonts.display,
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: -0.5,
    color: Colors.textPrimary,
  },
  buildSub: {
    fontFamily: Fonts.body,
    fontSize: 14,
    lineHeight: 21,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
  },
  planCalls: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: Spacing.sm,
  },
  recoveredRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.hairline,
    borderRadius: Radius.md,
    padding: Spacing.md,
    gap: Spacing.md,
  },
  recoveredLabel: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.textSecondary,
  },
  recoveredValue: {
    fontFamily: Fonts.monoMedium,
    fontSize: 22,
    color: Colors.blue,
    marginTop: 2,
  },
  recoveredRight: {
    alignItems: 'flex-end',
  },
  recoveredBig: {
    fontFamily: Fonts.displayBold,
    fontSize: 26,
    color: Colors.textPrimary,
  },
  recoveredSmall: {
    fontFamily: Fonts.body,
    fontSize: 11,
    color: Colors.textMuted,
  },
  addonsTitle: {
    fontFamily: Fonts.bodySemibold,
    fontSize: 11,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: Colors.textMuted,
    marginBottom: Spacing.sm,
  },
  selCard: {
    padding: Spacing.lg,
  },
  selEyebrow: {
    fontFamily: Fonts.bodySemibold,
    fontSize: 11,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: Colors.blueLight,
  },
  selBody: {
    fontFamily: Fonts.body,
    fontSize: 13,
    lineHeight: 19,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  selTotalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: Spacing.sm,
  },
  selTotal: {
    fontFamily: Fonts.monoMedium,
    fontSize: 24,
    color: Colors.textPrimary,
  },
  selNote: {
    fontFamily: Fonts.body,
    fontSize: 12,
    lineHeight: 18,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
});
