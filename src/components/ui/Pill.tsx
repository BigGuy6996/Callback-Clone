import { StyleSheet, Text, View } from 'react-native';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';

type Props = {
  label: string;
  tone?: 'blue' | 'green';
};

/** Small status badge — e.g. the "Live in 48 hours" hero badge. */
export function Pill({ label, tone = 'blue' }: Props) {
  const dotColor = tone === 'green' ? Colors.success : Colors.blueLight;
  return (
    <View style={styles.pill}>
      <View style={[styles.dot, { backgroundColor: dotColor }]} />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: 'rgba(47,111,237,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(47,111,237,0.25)',
    borderRadius: Radius.pill,
    paddingVertical: 6,
    paddingHorizontal: 14,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  label: {
    fontSize: 12,
    fontFamily: Fonts.bodySemibold,
    color: Colors.blueDim,
    letterSpacing: 0.4,
  },
});
