import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, Glow, Spacing } from '@/constants/theme';
import { HeroCopy, HeroStats } from '@/constants/content';
import { Blob } from '@/components/ui/Blob';
import { Button } from '@/components/ui/Button';
import { CountUp } from '@/components/ui/CountUp';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Pill } from '@/components/ui/Pill';
import { LiveCallDemo } from '@/components/home/LiveCallDemo';

export function Hero() {
  return (
    <View style={styles.wrap}>
      {/* ambient blobs */}
      <Blob size={360} opacity={0.22} style={styles.blobTopRight} />
      <Blob size={280} opacity={0.14} style={styles.blobBottomLeft} />

      <View style={styles.inner}>
        <View style={styles.badgeRow}>
          <Pill label={HeroCopy.badge} tone="green" />
        </View>
        <Eyebrow label={HeroCopy.eyebrow} style={styles.eyebrow} />

        <Text style={styles.h1}>{HeroCopy.title1}</Text>
        <Text style={[styles.h1, styles.h1Accent]}>{HeroCopy.title2}</Text>

        <Image
          source={require('@/assets/images/logo-wordmark.png')}
          style={styles.wordmark}
          contentFit="contain"
        />

        <Text style={styles.sub}>{HeroCopy.sub}</Text>

        <View style={styles.ctaRow}>
          <Button label={HeroCopy.ctaPrimary} size="lg" onPress={() => router.push('/demo')} />
          <Button
            label={HeroCopy.ctaSecondary}
            size="lg"
            variant="secondary"
            onPress={() => router.push('/how-it-works')}
          />
        </View>

        <View style={styles.trustRow}>
          {HeroCopy.trust.map((item) => (
            <View key={item} style={styles.trustItem}>
              <Ionicons name="checkmark-circle" size={15} color={Colors.success} />
              <Text style={styles.trustText}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={styles.statsRow}>
          {HeroStats.map((s) => (
            <View key={s.label} style={styles.stat}>
              <CountUp value={s.value} suffix={s.suffix} style={styles.statNum} />
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.demoCard}>
          <Text style={styles.demoCaption}>What your customer hears — in real time</Text>
          <LiveCallDemo />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxl,
    overflow: 'hidden',
  },
  inner: {
    width: '100%',
    maxWidth: 560,
    alignSelf: 'center',
  },
  blobTopRight: {
    position: 'absolute',
    top: -140,
    right: -160,
  },
  blobBottomLeft: {
    position: 'absolute',
    bottom: -80,
    left: -140,
  },
  badgeRow: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
  },
  eyebrow: {
    marginBottom: Spacing.sm,
  },
  h1: {
    fontFamily: Fonts.display,
    fontSize: 40,
    lineHeight: 46,
    letterSpacing: -1.2,
    color: Colors.textPrimary,
  },
  h1Accent: {
    color: Colors.blue,
  },
  wordmark: {
    width: 210,
    height: 44,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  sub: {
    fontFamily: Fonts.body,
    fontSize: 16,
    lineHeight: 25,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
  },
  ctaRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.xl,
    flexWrap: 'wrap',
  },
  trustRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  trustText: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 12.5,
    color: Colors.textSecondary,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.xl,
    paddingTop: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.hairline,
  },
  stat: {
    alignItems: 'center',
  },
  statNum: {
    fontFamily: Fonts.displayBold,
    fontSize: 26,
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  statLabel: {
    fontFamily: Fonts.body,
    fontSize: 11.5,
    color: Colors.textMuted,
    marginTop: 2,
  },
  demoCard: {
    marginTop: Spacing.xxl,
  },
  demoCaption: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: Colors.textMuted,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
});
