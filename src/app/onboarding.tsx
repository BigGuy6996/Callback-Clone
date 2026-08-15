import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';
import { Brand } from '@/constants/content';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { GlassCard } from '@/components/ui/GlassCard';
import { OptionSelect, TextField } from '@/components/ui/Field';

const APPOINTMENT_LENGTHS = ['15 minutes', '30 minutes', '45 minutes', '60 minutes', '90 minutes', '2 hours', 'Custom'] as const;
const BUFFERS = ['None', '10 minutes', '15 minutes', '30 minutes', '45 minutes'] as const;
const TONES = ['Formal & professional', 'Friendly & casual', 'Balanced (recommended)'] as const;
const VOICES = ['Professional female', 'Professional male', 'Neutral'] as const;
const AFTER_HOURS = ['AI handles 24/7', 'Voicemail after hours', 'Custom message'] as const;

type FormState = {
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  hours: string;
  services: string;
  pricing: string;
  faqs: string;
  calendar: string;
  appointmentLength: string;
  buffer: string;
  bookingTimes: string;
  escalation: string;
  afterHours: string;
  tone: string;
  voice: string;
  greeting: string;
  aiName: string;
  instructions: string;
};

const EMPTY: FormState = {
  businessName: '',
  ownerName: '',
  email: '',
  phone: '',
  address: '',
  hours: '',
  services: '',
  pricing: '',
  faqs: '',
  calendar: '',
  appointmentLength: '',
  buffer: 'None',
  bookingTimes: '',
  escalation: '',
  afterHours: '',
  tone: '',
  voice: 'Neutral',
  greeting: '',
  aiName: '',
  instructions: '',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function OnboardingScreen() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setTouched((t) => ({ ...t, [key]: true }));
  };

  const errors = {
    businessName: !form.businessName.trim() ? 'Please enter your business name.' : null,
    ownerName: !form.ownerName.trim() ? "Please enter the owner's name." : null,
    email: !form.email.trim() ? 'Please enter a valid email address.' : !EMAIL_RE.test(form.email) ? 'Please enter a valid email address.' : null,
    phone: !form.phone.trim() ? 'Please enter a phone number.' : null,
    hours: !form.hours.trim() ? 'Please list your business hours.' : null,
    services: !form.services.trim() ? 'Please describe your services.' : null,
    faqs: !form.faqs.trim() ? 'Please add at least a few FAQs.' : null,
    calendar: !form.calendar.trim() ? 'Please provide your calendar link or email.' : null,
    appointmentLength: !form.appointmentLength ? 'Please select an appointment length.' : null,
    escalation: !form.escalation.trim() ? 'Please provide an escalation number.' : null,
    afterHours: !form.afterHours ? 'Please choose an after-hours option.' : null,
    tone: !form.tone ? 'Please choose a tone preference.' : null,
  } as const;

  const stepValid = (n: number) => {
    if (n === 1) return !errors.businessName && !errors.ownerName && !errors.email && !errors.phone && !errors.hours && !errors.services && !errors.faqs;
    if (n === 2) return !errors.calendar && !errors.appointmentLength && !errors.escalation && !errors.afterHours;
    return !errors.tone;
  };

  const showError = (k: keyof typeof errors) => (touched[k] ? errors[k] ?? undefined : undefined);

  const submit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(Brand.formspreeUrl, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `New onboarding: ${form.businessName}`,
          businessName: form.businessName,
          ownerName: form.ownerName,
          email: form.email,
          phone: form.phone,
          address: form.address,
          hours: form.hours,
          services: form.services,
          pricing: form.pricing,
          faqs: form.faqs,
          calendar: form.calendar,
          appointmentLength: form.appointmentLength,
          buffer: form.buffer,
          bookingTimes: form.bookingTimes,
          escalation: form.escalation,
          afterHours: form.afterHours,
          tone: form.tone,
          voice: form.voice,
          greeting: form.greeting,
          aiName: form.aiName,
          instructions: form.instructions,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.ok !== true) {
        throw new Error(data?.errors?.[0]?.message ?? 'Submission failed — please try again.');
      }
      setDone(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <View style={[styles.screen, styles.successScreen]}>
        <View style={styles.successWrap}>
          <View style={styles.successIcon}>
            <Ionicons name="checkmark" size={34} color="#FFFFFF" />
          </View>
          <Text style={styles.successTitle}>You&apos;re all set!</Text>
          <Text style={styles.successBody}>
            Thanks — we&apos;ve received your onboarding details. Your Callback Clone AI receptionist will be live
            within 48 hours. We&apos;ll email a confirmation to the address you provided.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView style={styles.screen} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.wrap}>
          <View style={styles.trustRow}>
            <View style={styles.trustBadge}>
              <Ionicons name="lock-closed" size={12} color={Colors.success} />
              <Text style={styles.trustText}>SSL secured</Text>
            </View>
            <Pressable onPress={() => {}}>
              <Text style={styles.questions}>Questions? {Brand.email}</Text>
            </Pressable>
          </View>

          <Eyebrow label="Client onboarding" />
          <Text style={styles.title}>Client onboarding — takes about 5 minutes. We go live in 48 hours.</Text>
          <Text style={styles.sub}>Nothing is sent until you hit submit — feel free to close this and come back.</Text>

          {/* Step indicator */}
          <View style={styles.stepsBar}>
            {['Business', 'Scheduling', 'AI Personality'].map((label, i) => {
              const n = i + 1;
              const active = step === n;
              const passed = step > n;
              return (
                <View key={label} style={styles.stepItem}>
                  <View style={[styles.stepDot, (active || passed) && styles.stepDotOn]}>
                    {passed ? (
                      <Ionicons name="checkmark" size={13} color="#FFFFFF" />
                    ) : (
                      <Text style={[styles.stepDotText, active && styles.stepDotTextOn]}>{n}</Text>
                    )}
                  </View>
                  <Text style={[styles.stepLabel, active && styles.stepLabelActive]}>{label}</Text>
                </View>
              );
            })}
          </View>

          <GlassCard style={styles.formCard}>
            {step === 1 ? (
              <>
                <Text style={styles.stepTitle}>1 — Business information</Text>
                <TextField label="Business name" value={form.businessName} onChangeText={(v) => set('businessName', v)} placeholder="Rivera Family Dental" required error={showError('businessName')} />
                <TextField label="Owner name" value={form.ownerName} onChangeText={(v) => set('ownerName', v)} placeholder="Jane Rivera" required error={showError('ownerName')} />
                <TextField label="Email address" value={form.email} onChangeText={(v) => set('email', v)} placeholder="jane@rivera.com" keyboardType="email-address" autoCapitalize="none" required error={showError('email')} />
                <TextField label="Phone number" value={form.phone} onChangeText={(v) => set('phone', v)} placeholder="(555) 000-0000" keyboardType="phone-pad" required error={showError('phone')} />
                <TextField label="Business address" value={form.address} onChangeText={(v) => set('address', v)} placeholder="123 Main St, Springfield" />
                <TextField label="Business hours" value={form.hours} onChangeText={(v) => set('hours', v)} placeholder="Mon–Fri 8am–6pm, Sat 9am–1pm" required error={showError('hours')} hint="Include all days and hours. The AI will route calls based on this." />
                <TextField label="Services offered" value={form.services} onChangeText={(v) => set('services', v)} placeholder="Cleanings, exams, whitening…" required error={showError('services')} />
                <TextField label="Pricing information" value={form.pricing} onChangeText={(v) => set('pricing', v)} placeholder="Exam $99, cleaning $85…" />
                <TextField label="Frequently asked questions" value={form.faqs} onChangeText={(v) => set('faqs', v)} placeholder="Do you take insurance? What are your hours?" multiline required error={showError('faqs')} />
                <Button label="Continue to scheduling →" size="lg" fullWidth disabled={!stepValid(1)} onPress={() => setStep(2)} />
              </>
            ) : null}

            {step === 2 ? (
              <>
                <Text style={styles.stepTitle}>2 — Scheduling</Text>
                <TextField label="Calendar connection" value={form.calendar} onChangeText={(v) => set('calendar', v)} placeholder="calendly.com/you or you@gmail.com" required error={showError('calendar')} hint="We'll connect your calendar so the AI can book appointments directly during calls." />
                <OptionSelect label="Default appointment length" options={APPOINTMENT_LENGTHS} value={form.appointmentLength as (typeof APPOINTMENT_LENGTHS)[number]} onChange={(v) => set('appointmentLength', v)} required />
                {showError('appointmentLength') ? <Text style={styles.inlineError}>{errors.appointmentLength}</Text> : null}
                <OptionSelect label="Buffer between appointments" options={BUFFERS} value={form.buffer as (typeof BUFFERS)[number]} onChange={(v) => set('buffer', v)} />
                <TextField label="Available booking times" value={form.bookingTimes} onChangeText={(v) => set('bookingTimes', v)} placeholder="Mon–Fri 8am–5pm; same-day slots kept open" />
                <TextField label="Emergency / escalation phone number" value={form.escalation} onChangeText={(v) => set('escalation', v)} placeholder="(555) 000-0000" keyboardType="phone-pad" required error={showError('escalation')} hint="The AI will transfer urgent or complex calls to this number." />
                <OptionSelect label="After-hours handling" options={AFTER_HOURS} value={form.afterHours as (typeof AFTER_HOURS)[number]} onChange={(v) => set('afterHours', v)} required />
                {showError('afterHours') ? <Text style={styles.inlineError}>{errors.afterHours}</Text> : null}
                <View style={styles.stepNav}>
                  <Button label="← Back" variant="secondary" onPress={() => setStep(1)} />
                  <Button label="Continue to AI personality →" disabled={!stepValid(2)} onPress={() => setStep(3)} />
                </View>
              </>
            ) : null}

            {step === 3 ? (
              <>
                <Text style={styles.stepTitle}>3 — AI personality</Text>
                <OptionSelect label="Tone preference" options={TONES} value={form.tone as (typeof TONES)[number]} onChange={(v) => set('tone', v)} required />
                {showError('tone') ? <Text style={styles.inlineError}>{errors.tone}</Text> : null}
                <OptionSelect label="AI voice preference" options={VOICES} value={form.voice as (typeof VOICES)[number]} onChange={(v) => set('voice', v)} />
                <TextField label="Preferred greeting" value={form.greeting} onChangeText={(v) => set('greeting', v)} placeholder="Thanks for calling Rivera Family Dental…" hint="Leave blank and we'll write one for you based on your business name and tone." />
                <TextField label="AI name" value={form.aiName} onChangeText={(v) => set('aiName', v)} placeholder="e.g. Ava" />
                <TextField label="Special instructions" value={form.instructions} onChangeText={(v) => set('instructions', v)} placeholder="Anything the AI should always know…" multiline />
                <View style={styles.stepNav}>
                  <Button label="← Back" variant="secondary" onPress={() => setStep(2)} />
                </View>
                {error ? (
                  <View style={styles.errorBox}>
                    <Ionicons name="alert-circle" size={16} color={Colors.danger} />
                    <Text style={styles.errorText}>{error}</Text>
                  </View>
                ) : null}
                <View style={styles.submitCta}>
                  <Button
                    label={submitting ? 'Submitting…' : 'Submit onboarding form'}
                    size="lg"
                    fullWidth
                    icon="arrow-up-circle-outline"
                    disabled={!stepValid(3) || submitting}
                    onPress={submit}
                  />
                  {submitting ? <ActivityIndicator color={Colors.blue} style={styles.spinner} /> : null}
                </View>
                <Text style={styles.secureNote}>
                  <Ionicons name="lock-closed-outline" size={11} color={Colors.textMuted} /> Your information is
                  encrypted and only used to configure your AI receptionist.
                </Text>
              </>
            ) : null}
          </GlassCard>
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
  trustRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  trustBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  trustText: {
    fontFamily: Fonts.bodySemibold,
    fontSize: 11.5,
    color: Colors.success,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  questions: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.textMuted,
  },
  title: {
    fontFamily: Fonts.display,
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: -0.5,
    color: Colors.textPrimary,
  },
  sub: {
    fontFamily: Fonts.body,
    fontSize: 14,
    lineHeight: 21,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
  },
  stepsBar: {
    flexDirection: 'row',
    marginTop: Spacing.xl,
    marginBottom: Spacing.md,
  },
  stepItem: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  stepDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
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
    fontSize: 13,
    color: Colors.textMuted,
  },
  stepDotTextOn: {
    color: '#FFFFFF',
  },
  stepLabel: {
    fontFamily: Fonts.body,
    fontSize: 10.5,
    color: Colors.textMuted,
    textAlign: 'center',
  },
  stepLabelActive: {
    fontFamily: Fonts.bodySemibold,
    color: Colors.textPrimary,
  },
  formCard: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  stepTitle: {
    fontFamily: Fonts.displaySemibold,
    fontSize: 18,
    color: Colors.textPrimary,
  },
  inlineError: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.danger,
    marginTop: -Spacing.sm,
  },
  stepNav: {
    flexDirection: 'row',
    gap: Spacing.md,
    flexWrap: 'wrap',
    marginTop: Spacing.sm,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: 'rgba(220,38,38,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(220,38,38,0.3)',
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginTop: Spacing.md,
  },
  errorText: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 13,
    color: Colors.danger,
    flex: 1,
  },
  submitCta: {
    marginTop: Spacing.lg,
  },
  spinner: {
    marginTop: Spacing.md,
  },
  secureNote: {
    fontFamily: Fonts.body,
    fontSize: 11.5,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
  successScreen: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  successWrap: {
    width: '100%',
    maxWidth: 480,
    padding: Spacing.xl,
    alignItems: 'center',
  },
  successIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successTitle: {
    fontFamily: Fonts.display,
    fontSize: 28,
    letterSpacing: -0.5,
    color: Colors.textPrimary,
    marginTop: Spacing.lg,
  },
  successBody: {
    fontFamily: Fonts.body,
    fontSize: 15,
    lineHeight: 23,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
});
