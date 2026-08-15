import { StyleSheet, Text, type TextStyle } from 'react-native';
import { EyebrowStyle, Fonts, Spacing } from '@/constants/theme';

type Props = {
  label: string;
  style?: TextStyle;
};

/** 12px uppercase eyebrow label, letterSpacing .18em, brand blue */
export function Eyebrow({ label, style }: Props) {
  return <Text style={[styles.eyebrow, style]}>{label}</Text>;
}

const styles = StyleSheet.create({
  eyebrow: {
    ...EyebrowStyle,
    marginBottom: Spacing.sm,
  },
});
