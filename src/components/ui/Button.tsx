import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors, Fonts, Glow, Radius, Spacing } from '@/constants/theme';

type Variant = 'primary' | 'secondary' | 'dark' | 'ghost';
type Size = 'md' | 'lg';

type Props = {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  size?: Size;
  icon?: keyof typeof Ionicons.glyphMap;
  fullWidth?: boolean;
  disabled?: boolean;
};

/** Pill button — primary = brand blue w/ glow, secondary = glass + hairline. Port of the site's .btn. */
export function Button({ label, onPress, variant = 'primary', size = 'md', icon, fullWidth, disabled }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        size === 'lg' && styles.lg,
        fullWidth && styles.fullWidth,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
      ]}>
      <View style={styles.inner}>
        {icon ? <Ionicons name={icon} size={size === 'lg' ? 18 : 16} color={variant === 'primary' ? '#fff' : Colors.blue} /> : null}
        <Text style={[styles.label, styles[`${variant}Label`], size === 'lg' && styles.labelLg]}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: Radius.pill,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lg: {
    paddingVertical: 17,
    paddingHorizontal: 30,
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  primary: {
    backgroundColor: Colors.blue,
    ...Glow,
  },
  secondary: {
    backgroundColor: Colors.glass,
    borderWidth: 1,
    borderColor: Colors.hairline,
  },
  dark: {
    backgroundColor: Colors.bg,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: 15,
    fontFamily: Fonts.bodySemibold,
    letterSpacing: 0.2,
  },
  primaryLabel: { color: '#FFFFFF' },
  secondaryLabel: { color: Colors.textPrimary },
  darkLabel: { color: '#FFFFFF' },
  ghostLabel: { color: Colors.blue },
  labelLg: { fontSize: 16 },
  pressed: {
    transform: [{ translateY: 2 }],
    opacity: 0.92,
  },
  disabled: {
    opacity: 0.4,
  },
});
