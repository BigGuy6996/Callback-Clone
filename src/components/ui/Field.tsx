import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';

/* ------------------------------------------------------------------ */
/* TextField — port of the site's .input (grey fill, hairline, 10px)   */
/* ------------------------------------------------------------------ */

type TextFieldProps = {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'email-address' | 'phone-pad' | 'number-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words';
  multiline?: boolean;
  required?: boolean;
  error?: string;
  hint?: string;
};

export function TextField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  multiline = false,
  required = false,
  error,
  hint,
}: TextFieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>
        {label}
        {required ? <Text style={styles.required}> *</Text> : null}
      </Text>
      <TextInput
        style={[styles.input, multiline && styles.inputMultiline, error && styles.inputError]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.textMuted}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
      />
      {hint && !error ? <Text style={styles.hint}>{hint}</Text> : null}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

/* ------------------------------------------------------------------ */
/* OptionSelect — chip picker for enumerated choices (native-feeling)  */
/* ------------------------------------------------------------------ */

type OptionSelectProps<T extends string> = {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  required?: boolean;
  hint?: string;
};

export function OptionSelect<T extends string>({ label, options, value, onChange, required, hint }: OptionSelectProps<T>) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>
        {label}
        {required ? <Text style={styles.required}> *</Text> : null}
      </Text>
      <View style={styles.chips}>
        {options.map((opt) => {
          const selected = opt === value;
          return (
            <Pressable
              key={opt}
              onPress={() => onChange(opt)}
              style={({ pressed }) => [
                styles.chip,
                selected && styles.chipSelected,
                pressed && !selected && styles.chipPressed,
              ]}>
              {selected ? <Ionicons name="checkmark" size={13} color="#FFFFFF" /> : null}
              <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{opt}</Text>
            </Pressable>
          );
        })}
      </View>
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
    </View>
  );
}

/* ------------------------------------------------------------------ */
/* Stepper — +/− numeric control (same pattern as the Home teaser)     */
/* ------------------------------------------------------------------ */

type StepperProps = {
  label: string;
  value: number;
  display: string;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  large?: boolean;
};

export function Stepper({ label, value, display, onChange, min, max, step, large }: StepperProps) {
  return (
    <View style={[styles.stepperBlock, large && styles.stepperBlockLarge]}>
      <Text style={[styles.stepperLabel, large && styles.stepperLabelLarge]}>{label}</Text>
      <View style={styles.stepper}>
        <Pressable
          style={({ pressed }) => [styles.stepperBtn, pressed && styles.stepperBtnPressed]}
          onPress={() => onChange(Math.max(min, value - step))}
          accessibilityLabel={`Decrease ${label}`}>
          <Ionicons name="remove" size={18} color={Colors.textPrimary} />
        </Pressable>
        <Text style={[styles.stepperValue, large && styles.stepperValueLarge]}>{display}</Text>
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

/* ------------------------------------------------------------------ */
/* SliderRow — native Slider with live mono value readout              */
/* ------------------------------------------------------------------ */

type SliderRowProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
};

export function SliderRow({ label, value, min, max, step, display, onChange }: SliderRowProps) {
  const trackRef = useRef<View>(null);
  const [trackW, setTrackW] = useState(0);

  const pressAt = (x: number) => {
    if (trackW <= 0) return;
    const ratio = Math.min(1, Math.max(0, x / trackW));
    const raw = min + ratio * (max - min);
    const stepped = Math.round(raw / step) * step;
    onChange(Math.min(max, Math.max(min, stepped)));
  };

  return (
    <View style={styles.field}>
      <View style={styles.sliderHeader}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.sliderValue}>{display}</Text>
      </View>
      <View
        ref={trackRef}
        onLayout={(e) => setTrackW(e.nativeEvent.layout.width)}
        style={styles.sliderTrack}
        onTouchStart={(e) => pressAt(e.nativeEvent.locationX)}>
        <View style={[styles.sliderFill, { width: `${((value - min) / (max - min)) * 100}%` }]} />
      </View>
      <View style={styles.sliderTicks}>
        <Pressable style={styles.sliderTickBtn} onPress={() => onChange(Math.max(min, value - step))} hitSlop={8}>
          <Text style={styles.sliderTickLabel}>{min}</Text>
        </Pressable>
        <Pressable style={styles.sliderTickBtn} onPress={() => onChange(Math.min(max, value + step))} hitSlop={8}>
          <Text style={styles.sliderTickLabel}>{max}+</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    marginBottom: Spacing.md,
  },
  label: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 6,
  },
  required: {
    color: Colors.danger,
    fontWeight: '700',
  },
  input: {
    backgroundColor: 'rgba(15,23,42,0.03)',
    borderWidth: 1,
    borderColor: Colors.hairline,
    borderRadius: Radius.sm,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    fontFamily: Fonts.body,
    color: Colors.textPrimary,
  },
  inputMultiline: {
    minHeight: 88,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: Colors.danger,
  },
  errorText: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.danger,
    marginTop: 4,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.hairline,
    borderRadius: Radius.pill,
    paddingVertical: 9,
    paddingHorizontal: 15,
  },
  chipSelected: {
    backgroundColor: Colors.blue,
    borderColor: Colors.blue,
  },
  chipPressed: {
    backgroundColor: Colors.bgElevated,
  },
  chipText: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 13,
    color: Colors.textSecondary,
  },
  chipTextSelected: {
    color: '#FFFFFF',
  },
  hint: {
    fontFamily: Fonts.body,
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 6,
  },
  stepperBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  stepperBlockLarge: {
    alignItems: 'center',
  },
  stepperLabel: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 13.5,
    color: Colors.textSecondary,
    flex: 1,
  },
  stepperLabelLarge: {
    fontSize: 15,
    color: Colors.textPrimary,
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
  stepperValueLarge: {
    fontSize: 26,
    minWidth: 108,
    paddingVertical: 8,
  },
  sliderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sliderValue: {
    fontFamily: Fonts.monoMedium,
    fontSize: 15,
    color: Colors.blueDim,
  },
  sliderTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(15,23,42,0.08)',
    overflow: 'hidden',
  },
  sliderFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: Colors.blue,
  },
  sliderTicks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  sliderTickBtn: {
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  sliderTickLabel: {
    fontFamily: Fonts.mono,
    fontSize: 11,
    color: Colors.textMuted,
  },
});
