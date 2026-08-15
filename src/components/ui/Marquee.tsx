import { useEffect } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';

type Item = { label: string; icon?: string };
type Props = {
  items: readonly string[];
  style?: ViewStyle;
};

/**
 * Horizontal auto-scrolling marquee (Reanimated linear loop).
 * Port of the site's industry marquee strip.
 */
export function Marquee({ items, style }: Props) {
  const x = useSharedValue(0);
  const contentWidth = useSharedValue(0);

  useEffect(() => {
    if (contentWidth.value > 0) {
      x.value = 0;
      x.value = withRepeat(
        withTiming(-contentWidth.value / 2, {
          duration: 18000,
          easing: Easing.linear,
        }),
        -1,
        false
      );
    }
  }, [contentWidth.value]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }],
  }));

  const Row = ({ half }: { half: boolean }) => (
    <View style={styles.row}>
      {items.map((item) => (
        <View key={`${half}-${item}`} style={styles.item}>
          <View style={styles.bullet} />
          <Text style={styles.label}>{item}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <View
      style={[styles.clip, style]}
      onLayout={(e) => {
        const w = e.nativeEvent.layout.width;
        if (contentWidth.value !== w) contentWidth.value = w;
      }}>
      <Animated.View style={[styles.track, animatedStyle]}>
        <Row half={false} />
        <Row half />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  clip: {
    overflow: 'hidden',
  },
  track: {
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: Spacing.md,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginRight: Spacing.xl,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.blue,
  },
  label: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 14,
    color: Colors.textSecondary,
    letterSpacing: 0.3,
  },
});
