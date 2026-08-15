import { useEffect, useState } from 'react';
import { StyleSheet, Text, type TextStyle } from 'react-native';
import { Fonts } from '@/constants/theme';

type Props = {
  value: number;
  suffix?: string;
  duration?: number;
  decimals?: number;
  style?: TextStyle;
};

/**
 * Lightweight count-up counter (eased interval — no worklets needed).
 * Port of the site's data-counter behaviour.
 */
export function CountUp({ value, suffix = '', duration = 1400, decimals = 0, style }: Props) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let raf: number;
    const start = Date.now();
    const tick = () => {
      const t = Math.min(1, (Date.now() - start) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  const formatted = display.toFixed(decimals);

  return (
    <Text style={[styles.num, style]}>
      {formatted}
      {suffix}
    </Text>
  );
}

const styles = StyleSheet.create({
  num: {
    fontFamily: Fonts.mono,
  },
});
