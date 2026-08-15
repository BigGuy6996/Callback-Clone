import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';

const TRANSCRIPT = [
  { id: 1, who: 'Caller', text: 'Hi — do you have any openings this week?' },
  { id: 2, who: 'AI', text: "Thanks for calling Hart Family Dental — we sure do. One sec, let me check your calendar…" },
  { id: 3, who: 'AI', text: 'I have Thursday at 3:30 available. Want me to book it?' },
  { id: 4, who: 'Caller', text: "That works. Can you text me the details?" },
  { id: 5, who: 'AI', text: 'Done — appointment confirmed, reminder on its way. Have a great day!' },
];

const BAR_HEIGHTS = [14, 26, 18, 34, 22, 30, 16];

function WaveBar({ index, height }: { index: number; height: number }) {
  const scale = useSharedValue(1);
  useEffect(() => {
    scale.value = withDelay(
      index * 140,
      withRepeat(
        withSequence(
          withTiming(1.9, { duration: 420 + index * 60, easing: Easing.inOut(Easing.quad) }),
          withTiming(1, { duration: 420 + index * 60, easing: Easing.inOut(Easing.quad) })
        ),
        -1,
        true
      )
    );
  }, [scale, index]);
  const style = useAnimatedStyle(() => ({
    transform: [{ scaleY: scale.value }],
  }));
  return <Animated.View style={[styles.bar, { height }, style]} />;
}

function PulseRing({ delay }: { delay: number }) {
  const ring = useSharedValue(0);
  useEffect(() => {
    ring.value = withDelay(
      delay,
      withRepeat(withTiming(1, { duration: 2200, easing: Easing.out(Easing.quad) }), -1, false)
    );
  }, [ring, delay]);
  const style = useAnimatedStyle(() => ({
    opacity: 0.6 * (1 - ring.value),
    transform: [{ scale: 1 + ring.value * 1.9 }],
  }));
  return <Animated.View style={[styles.pulseRing, style]} />;
}

/**
 * The signature visual — a dark "AI answering a call" card with a pulse ring,
 * animated voice-wave bars and a live mono transcript. Port of the hero demo card.
 */
export function LiveCallDemo() {
  const [visible, setVisible] = useState(1);

  useEffect(() => {
    let active = true;
    let t: ReturnType<typeof setTimeout>;
    const advance = (i: number) => {
      if (!active) return;
      setVisible(i);
      if (i >= TRANSCRIPT.length) {
        t = setTimeout(() => advance(1), 3200);
      } else {
        t = setTimeout(() => advance(i + 1), 1500);
      }
    };
    t = setTimeout(() => advance(1), 400);
    return () => {
      active = false;
      clearTimeout(t);
    };
  }, []);

  return (
    <View style={styles.card}>
      {/* header */}
      <View style={styles.header}>
        <View style={styles.liveRow}>
          <View style={styles.dotWrap}>
            <PulseRing delay={0} />
            <View style={styles.dot} />
          </View>
          <Text style={styles.liveLabel}>LIVE · AI answering a call</Text>
        </View>
        <View style={styles.waveRow}>
          {BAR_HEIGHTS.map((h, i) => (
            <WaveBar key={i} index={i} height={h} />
          ))}
        </View>
      </View>

      {/* transcript */}
      <View style={styles.transcript}>
        {TRANSCRIPT.slice(0, visible).map((line) => (
          <View key={line.id} style={styles.line}>
            <Text style={[styles.mono, styles.lineNo]}>
              {String(line.id).padStart(2, '0')}
            </Text>
            <Text style={[styles.mono, styles.speaker, line.who === 'AI' && styles.speakerAi]}>
              {line.who.toUpperCase()}
            </Text>
            <Text style={[styles.mono, styles.lineText]} numberOfLines={2}>
              {line.text}
            </Text>
          </View>
        ))}
      </View>

      {/* footer */}
      <View style={styles.footer}>
        <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
        <Text style={styles.footerText}>Booking confirmed · Thursday 3:30 PM</Text>
        <Text style={styles.footerMuted}>SMS reminder scheduled</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.bg,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: Spacing.lg,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
    paddingBottom: Spacing.md,
  },
  liveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  dotWrap: {
    width: 12,
    height: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.success,
  },
  pulseRing: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: Colors.success,
  },
  liveLabel: {
    fontFamily: Fonts.mono,
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 0.8,
  },
  waveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    height: 36,
  },
  bar: {
    width: 4,
    borderRadius: 2,
    backgroundColor: Colors.blueLight,
  },
  transcript: {
    marginTop: Spacing.md,
    gap: Spacing.sm,
    minHeight: 150,
  },
  line: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  mono: {
    fontFamily: Fonts.mono,
    fontSize: 12,
  },
  lineNo: {
    color: 'rgba(110,155,255,0.6)',
    width: 20,
  },
  speaker: {
    color: 'rgba(255,255,255,0.45)',
    width: 52,
  },
  speakerAi: {
    color: Colors.blueLight,
  },
  lineText: {
    color: 'rgba(255,255,255,0.92)',
    flex: 1,
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
    paddingTop: Spacing.md,
    flexWrap: 'wrap',
  },
  footerText: {
    fontFamily: Fonts.monoMedium,
    fontSize: 12,
    color: Colors.success,
  },
  footerMuted: {
    fontFamily: Fonts.mono,
    fontSize: 11,
    color: 'rgba(255,255,255,0.4)',
  },
});
