import { useLocalSearchParams } from 'expo-router';
import * as Linking from 'expo-linking';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';
import { DemoIndustries } from '@/constants/content';
import { ADDON_OPTIONS, buildCalendlyUrl } from '@/lib/selection';
import { LiveCallDemo } from '@/components/home/LiveCallDemo';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { GlassCard } from '@/components/ui/GlassCard';
import { OptionSelect, TextField } from '@/components/ui/Field';

const fmt = (n: number) => `$${n.toLocaleString('en-US')}`;

const HAPPENS_NEXT = [
  { step: '01', label: 'Book a time below — takes about 15 minutes' },
  { step: '02', label: "We'll call you and demo it live using your real business details" },
  { step: '03', label: 'Decide if it\u2019s a fit — no pressure, no obligation' },
];

const CHECKMARKS = [
  'See it answer using your real business info',
  'Watch it book directly on a live calendar',
  'Get a free lead-recovery estimate for your business',
];

export default function DemoScreen() {
  const params = useLocalSearchParams<{ plan?: string; addons?: string }>();
  const planName = typeof params.plan === 'string' && params.plan ? params.plan : 'Growth';
  const addonsParam = typeof params.addons === 'string' ? params.addons : '';
  const addonList = addonsParam
    ? addonsParam
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : [];
  const addonTotal = ADDON_OPTIONS.filter((a) => addonList.includes(a.name)).reduce((s, a) => s + a.price, 0);
  const basePrice = planName === 'Pro' ? 349 : planName === 'Starter' ? 199 : 249;
  const estimated = basePrice + addonTotal;

  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [business, setBusiness] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [industry, setIndustry] = useState<string>(DemoIndustries[0]);

  const step1Ready = name.trim().length > 0 && business.trim().length > 0 && email.trim().length > 0;

  const openCalendly = () => {
    const url = buildCalendlyUrl({
      name: name.trim(),
      email: email.trim(),
      business: business.trim(),
      phone: phone.trim(),
      industry,
      plan: planName,
      addons: addonList.length ? addonList.join(', ') : undefined,
    });
    Linking.openURL(url);
  };

  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView style={styles.screen} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.wrap}>
          {/* Hero */}
          <Eyebrow label="See it live" />
          <Text style={styles.title}>Hear your AI front desk answer a real call</Text>
          <Text style={styles.sub}>
            Fifteen minutes, no pressure. We&apos;ll set up a live call with your business&apos;s details and show you
            exactly how it answers, books, and follows up.
          </Text>

          <View style={styles.checkmarks}>
            {CHECKMARKS.map((c) => (
              <View key={c} style={styles.checkRow}>
                <Ionicons name="checkmark-circle" size={17} color={Colors.success} />
                <Text style={styles.checkText}>{c}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.joinNote}>Join 50+ local businesses already using Callback Clone</Text>

          {/* What happens next */}
          <Text style={styles.blockEyebrow}>What happens next</Text>
          <View style={styles.nextList}>
            {HAPPENS_NEXT.map((h) => (
              <View key={h.step} style={styles.nextRow}>
                <Text style={styles.nextStep}>{h.step}</Text>
                <Text style={styles.nextLabel}>{h.label}</Text>
              </View>
            ))}
          </View>

          {/* Live call demo */}
          <View style={styles.demoCard}>
            <LiveCallDemo />
          </View>

          {/* Wizard steps indicator */}
          <View style={styles.stepsBar}>
            <View style={[styles.stepDot, step >= 1 && styles.stepDotOn]}>
              <Text style={[styles.stepDotText, step >= 1 && styles.stepDotTextOn]}>1</Text>
            </View>
            <View style={[styles.stepLine, step >= 2 && styles.stepLineOn]} />
            <View style={[styles.stepDot, step >= 2 && styles.stepDotOn]}>
              <Text style={[styles.stepDotText, step >= 2 && styles.stepDotTextOn]}>2</Text>
            </View>
            <View style={[styles.stepLabelWrap]}>
              <Text style={[styles.stepLabel, step === 1 && styles.stepLabelActive]}>{step === 1 ? 'Your info' : 'Pick a time'}</Text>
            </View>
          </View>

          {step === 1 ? (
            <GlassCard style={styles.formCard}>
              {/* Your selection */}
              <Text style={styles.cardEyebrow}>Your selection</Text>
              <View style={styles.selectionBox}>
                <View style={styles.selectionRow}>
                  <Text style={styles.selectionName}>{planName} plan</Text>
                  <Text style={styles.selectionPrice}>{fmt(basePrice)}/mo</Text>
                </View>
                {addonList.map((a) => {
                  const addon = ADDON_OPTIONS.find((x) => x.name === a);
                  return addon ? (
                    <View key={a} style={styles.selectionRow}>
                      <Text style={styles.selectionAddon}>{addon.short}</Text>
                      <Text style={styles.selectionPrice}>+{fmt(addon.price)}/mo</Text>
                    </View>
                  ) : null;
                })}
                <View style={styles.selectionTotal}>
                  <Text style={styles.selectionTotalLabel}>Estimated monthly</Text>
                  <Text style={styles.selectionTotalValue}>
                    {fmt(estimated)}
                    <Text style={styles.selectionTotalSuffix}>/mo</Text>
                  </Text>
                </View>
              </View>

              <View style={styles.divider} />

              <TextField label="Your name" value={name} onChangeText={setName} placeholder="Jane Rivera" required />
              <TextField
                label="Business name"
                value={business}
                onChangeText={setBusiness}
                placeholder="Rivera Family Dental"
                autoCapitalize="words"
                required
              />
              <View style={styles.row}>
                <View style={styles.rowHalf}>
                  <TextField
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="jane@rivera.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    required
                  />
                </View>
                <View style={styles.rowHalf}>
                  <TextField
                    label="Phone"
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="(555) 000-0000"
                    keyboardType="phone-pad"
                  />
                </View>
              </View>
              <OptionSelect
                label="What best describes your business?"
                options={DemoIndustries}
                value={industry}
                onChange={setIndustry}
              />

              <View style={styles.cta}>
                <Button
                  label="Continue"
                  size="lg"
                  fullWidth
                  icon="arrow-forward"
                  disabled={!step1Ready}
                  onPress={() => setStep(2)}
                />
              </View>
              <Text style={styles.privacyNote}>
                <Ionicons name="lock-closed-outline" size={11} color={Colors.textMuted} /> We&apos;ll never share your
                info. No spam, ever.
              </Text>
            </GlassCard>
          ) : (
            <GlassCard style={styles.formCard}>
              <Text style={styles.cardEyebrow}>Step 2</Text>
              <Text style={styles.pickTitle}>Pick a time that works for you</Text>
              <Text style={styles.pickSub}>Times shown in your local timezone.</Text>

              <View style={styles.summaryBox}>
                <Text style={styles.summaryName}>{name}</Text>
                <Text style={styles.summaryBiz}>{business}</Text>
                <Text style={styles.summaryPlan}>
                  {planName} · {fmt(estimated)}/mo{addonList.length ? ` · ${addonList.length} add-on${addonList.length > 1 ? 's' : ''}` : ''}
                </Text>
              </View>

              <View style={styles.cta}>
                <Button
                  label="Open Calendly to pick a time"
                  size="lg"
                  fullWidth
                  icon="calendar-outline"
                  onPress={openCalendly}
                />
              </View>
              <Text style={styles.calendlyNote}>
                Opens the Calendly scheduler in your browser (30 min). Your business details and plan are carried over
                automatically.
              </Text>
              <Pressable style={styles.backBtn} onPress={() => setStep(1)} accessibilityRole="button">
                <Ionicons name="chevron-back" size={16} color={Colors.blue} />
                <Text style={styles.backText}>Back</Text>
              </Pressable>
            </GlassCard>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  scroll: {
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
  sub: {
    fontFamily: Fonts.body,
    fontSize: 15,
    lineHeight: 23,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
  },
  checkmarks: {
    marginTop: Spacing.lg,
    gap: Spacing.sm,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  checkText: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 13.5,
    color: Colors.textPrimary,
    flex: 1,
  },
  joinNote: {
    fontFamily: Fonts.body,
    fontSize: 12.5,
    color: Colors.textMuted,
    marginTop: Spacing.md,
  },
  blockEyebrow: {
    fontFamily: Fonts.bodySemibold,
    fontSize: 11,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: Colors.blueLight,
    marginTop: Spacing.xl,
    marginBottom: Spacing.sm,
  },
  nextList: {
    gap: Spacing.sm,
  },
  nextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  nextStep: {
    fontFamily: Fonts.monoMedium,
    fontSize: 12,
    color: Colors.blue,
    width: 26,
  },
  nextLabel: {
    fontFamily: Fonts.body,
    fontSize: 13.5,
    lineHeight: 20,
    color: Colors.textSecondary,
    flex: 1,
  },
  demoCard: {
    marginTop: Spacing.xl,
  },
  stepsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.xl,
    marginBottom: Spacing.md,
  },
  stepDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.bgElevated,
    borderWidth: 1,
    borderColor: Colors.hairline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepDotOn: {
    backgroundColor: Colors.blue,
    borderColor: Colors.blue,
  },
  stepDotText: {
    fontFamily: Fonts.bodySemibold,
    fontSize: 12,
    color: Colors.textMuted,
  },
  stepDotTextOn: {
    color: '#FFFFFF',
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: Colors.hairline,
    marginHorizontal: Spacing.sm,
  },
  stepLineOn: {
    backgroundColor: Colors.blue,
  },
  stepLabelWrap: {
    marginLeft: Spacing.sm,
  },
  stepLabel: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.textMuted,
  },
  stepLabelActive: {
    fontFamily: Fonts.bodySemibold,
    color: Colors.textPrimary,
  },
  formCard: {
    padding: Spacing.lg,
  },
  cardEyebrow: {
    fontFamily: Fonts.bodySemibold,
    fontSize: 11,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: Colors.blueLight,
    marginBottom: Spacing.sm,
  },
  selectionBox: {
    backgroundColor: Colors.bgElevated,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    gap: 6,
  },
  selectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectionName: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 13,
    color: Colors.textPrimary,
  },
  selectionAddon: {
    fontFamily: Fonts.body,
    fontSize: 12.5,
    color: Colors.textSecondary,
  },
  selectionPrice: {
    fontFamily: Fonts.monoMedium,
    fontSize: 12.5,
    color: Colors.textSecondary,
  },
  selectionTotal: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: Colors.hairline,
    marginTop: 6,
    paddingTop: 8,
  },
  selectionTotalLabel: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.textMuted,
  },
  selectionTotalValue: {
    fontFamily: Fonts.monoMedium,
    fontSize: 18,
    color: Colors.textPrimary,
  },
  selectionTotalSuffix: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.hairline,
    marginBottom: Spacing.lg,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  rowHalf: {
    flex: 1,
  },
  cta: {
    marginTop: Spacing.lg,
  },
  privacyNote: {
    fontFamily: Fonts.body,
    fontSize: 11.5,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
  pickTitle: {
    fontFamily: Fonts.displaySemibold,
    fontSize: 19,
    color: Colors.textPrimary,
  },
  pickSub: {
    fontFamily: Fonts.body,
    fontSize: 13.5,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  summaryBox: {
    backgroundColor: Colors.bgElevated,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginTop: Spacing.lg,
    alignItems: 'center',
  },
  summaryName: {
    fontFamily: Fonts.displaySemibold,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  summaryBiz: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  summaryPlan: {
    fontFamily: Fonts.monoMedium,
    fontSize: 12,
    color: Colors.blueDim,
    marginTop: Spacing.sm,
  },
  calendlyNote: {
    fontFamily: Fonts.body,
    fontSize: 11.5,
    lineHeight: 17,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginTop: Spacing.lg,
    paddingVertical: 6,
  },
  backText: {
    fontFamily: Fonts.bodySemibold,
    fontSize: 14,
    color: Colors.blue,
  },
});
