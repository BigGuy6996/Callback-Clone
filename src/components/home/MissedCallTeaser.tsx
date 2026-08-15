import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';
import { Blob } from '@/components/ui/Blob';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';

const fmt = (n: number) => n.toLocaleString('en-US');

function Stepper({
  label,
  value,
  display,
  onChange,
  min,
  max,
  step,
}: {
  label: string;
  value: number;
  display: string;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
}) {
  return (
    <View style={styles.stepperBlock}>
      <Text style={styles.stepperLabel}>{label}</Text>
      <View style={styles.stepper}>
        <Pressable
          style={({ pressed }) => [styles.stepperBtn, pressed && styles.stepperBtnPressed]}
          onPress={() => onChange(Math.max(min, value - step))}
          accessibilityLabel={`Decrease ${label}`}>
          <Ionicons name="remove" size={18} color={Colors.textPrimary} />
        </Pressable>
        <Text style={styles.stepperValue}>{display}</Text>
        <Pressable
          style={({ pressed }) => [styles.stepperBtn, pressed && styles.stepperBtnPressed]}
          onPress={() => onChange(Math.min(max, value + step))}
          accessibilityLabel={`Increase ${label}`}>
          <Ionicons name="add" size={18} color={Colors.textPrimary} />
        </Pressable>
      </View>
    </View>
  );
}

/**
 * Quick missed-call calculator (teaser for the full Calculator tab).
 * Port of the site's #calc band — steppers keep it dependency-free and native-feeling.
 */
export function MissedCallTeaser() {
  const [missed, setMissed] = useState(12);
  const [value, setValue] = useState(350);

  const monthlyLoss = missed * value;
  const yearlyLoss = monthlyLoss * 12;

  return (
    <View style={styles.wrap}>
      <Blob size={300} opacity={0.16} style={styles.blob} />
      <View style={styles.inner}>
        <Eyebrow label="Missed-call calculator" />
        <Text style={styles.title}>What is a missed call really costing you?</Text>
        <Text style={styles.sub}>
          Callback Clone is especially valuable where one missed call can be a valuable customer and a booked
          appointment.
        </Text>

        <View style={styles.card}>
          <Stepper label="Missed calls per month" value={missed} display={`${missed}`} onChange={setMissed} min={1} max={60} step={1} />
          <View style={styles.divider} />
          <Stepper
            label="Average job value"
            value={value}
            display={`$${fmt(value)}`}
            onChange={setValue}
            min={50}
            max={2000}
            step={25}
          />

          <View style={styles.results}>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Monthly loss</Text>
              <Text style={styles.resultValue}>${fmt(monthlyLoss)}</Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Yearly loss</Text>
              <Text style={styles.resultValue}>${fmt(yearlyLoss)}</Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Lost leads / mo</Text>
              <Text style={styles.resultValue}>{missed}</Text>
            </View>
          </View>

          <Text style={styles.note}>*Based on typical local-service businesses in our calculator.</Text>
        </View>

        <View style={styles.ctaRow}>
          <Button
            label="Open the full calculator"
            variant="secondary"
            icon="calculator-outline"
            onPress={() => router.push('/calculator')}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.hairline,
    paddingVertical: Spacing.xxxl,
    paddingHorizontal: Spacing.lg,
    overflow: 'hidden',
  },
  inner: {
    width: '100%',
    maxWidth: 560,
    alignSelf: 'center',
  },
  blob: {
    position: 'absolute',
    top: -120,
    right: -140,
  },
  title: {
    fontFamily: Fonts.display,
    fontSize: 26,
    lineHeight: 32,
    letterSpacing: -0.4,
    color: Colors.textPrimary,
  },
  sub: {
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
    marginTop: Spacing.xl,
    shadowColor: '#0F172A',
    shadowOpacity: 0.05,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  stepperBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  stepperLabel: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 13.5,
    color: Colors.textSecondary,
    flex: 1,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.hairline,
    borderRadius: Radius.pill,
    overflow: 'hidden',
  },
  stepperBtn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: Colors.bgElevated,
  },
  stepperBtnPressed: {
    backgroundColor: Colors.blue,
  },
  stepperValue: {
    fontFamily: Fonts.monoMedium,
    fontSize: 14,
    color: Colors.textPrimary,
    paddingHorizontal: Spacing.md,
    minWidth: 76,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.hairline,
    marginVertical: Spacing.md,
  },
  results: {
    marginTop: Spacing.lg,
    backgroundColor: Colors.bgElevated,
    borderRadius: Radius.md,
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resultLabel: {
    fontFamily: Fonts.body,
    fontSize: 12.5,
    color: Colors.textSecondary,
  },
  resultValue: {
    fontFamily: Fonts.monoMedium,
    fontSize: 14,
    color: Colors.blueDim,
  },
  note: {
    fontFamily: Fonts.body,
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: Spacing.sm,
  },
  ctaRow: {
    marginTop: Spacing.lg,
    alignItems: 'flex-start',
  },
});
