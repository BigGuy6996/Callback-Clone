import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';
import { HowItWorksWhy } from '@/constants/content';
import { HowItWorks } from '@/components/home/HowItWorks';
import { LiveCallDemo } from '@/components/home/LiveCallDemo';
import { Blob } from '@/components/ui/Blob';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { GlassCard } from '@/components/ui/GlassCard';

export default function HowItWorksScreen() {
  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
      {/* Hero */}
      <View style={styles.hero}>
        <Blob size={320} opacity={0.14} style={styles.heroBlob} />
        <View style={styles.wrap}>
          <Eyebrow label="How it works" />
          <Text style={styles.heroTitle}>Meet the receptionist who never misses a call</Text>
          <Text style={styles.heroSub}>
            Four steps between a ringing phone and a booked appointment. Fully automatic, in your voice, 24/7.
          </Text>
          <View style={styles.demoCard}>
            <LiveCallDemo />
          </View>
          <View style={styles.heroCta}>
            <Button label="Hear it live" icon="play-circle-outline" onPress={() => router.push('/demo')} />
          </View>
        </View>
      </View>

      {/* 4 steps — same themed timeline as Home */}
      <HowItWorks />

      {/* Why it works */}
      <View style={styles.whyWrap}>
        <View style={styles.wrap}>
          <Eyebrow label="Why it works" style={styles.whyEyebrow} />
          <Text style={styles.whyTitle}>Built to sound human. Built to actually answer.</Text>
          <View style={styles.whyList}>
            {HowItWorksWhy.map((w) => (
              <GlassCard key={w.title} style={styles.whyCard}>
                <View style={styles.whyIconWrap}>
                  <Ionicons name={w.icon as keyof typeof Ionicons.glyphMap} size={20} color={Colors.blue} />
                </View>
                <Text style={styles.whyCardTitle}>{w.title}</Text>
                <Text style={styles.whyCardBody}>{w.body}</Text>
              </GlassCard>
            ))}
          </View>
          <View style={styles.whyCta}>
            <Button label="Get started" icon="arrow-forward" onPress={() => router.push('/demo')} />
          </View>
        </View>
      </View>

      {/* Final CTA */}
      <View style={styles.finalWrap}>
        <View style={styles.wrap}>
          <Text style={styles.finalTitle}>Every missed call is a missed customer.</Text>
          <Text style={styles.finalSub}>
            Capture every call for 1/10 of the cost of a full-time receptionist. No miss. No waiting.
          </Text>
          <View style={styles.finalCtaRow}>
            <Button label="Book a Free Demo" size="lg" onPress={() => router.push('/demo')} />
            <Button label="See pricing" size="lg" variant="secondary" onPress={() => router.push('/pricing')} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  scroll: {
    paddingBottom: Spacing.xxl,
  },
  hero: {
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
    overflow: 'hidden',
  },
  heroBlob: {
    position: 'absolute',
    top: -140,
    right: -120,
  },
  wrap: {
    width: '100%',
    maxWidth: 560,
    alignSelf: 'center',
    paddingHorizontal: Spacing.lg,
  },
  heroTitle: {
    fontFamily: Fonts.display,
    fontSize: 30,
    lineHeight: 36,
    letterSpacing: -0.6,
    color: Colors.textPrimary,
  },
  heroSub: {
    fontFamily: Fonts.body,
    fontSize: 15,
    lineHeight: 23,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
  },
  demoCard: {
    marginTop: Spacing.xl,
  },
  heroCta: {
    marginTop: Spacing.lg,
    alignItems: 'center',
  },
  whyWrap: {
    backgroundColor: Colors.surface,
    paddingVertical: Spacing.xxl,
  },
  whyEyebrow: {
    marginBottom: Spacing.sm,
  },
  whyTitle: {
    fontFamily: Fonts.display,
    fontSize: 26,
    lineHeight: 32,
    letterSpacing: -0.5,
    color: Colors.textPrimary,
  },
  whyList: {
    marginTop: Spacing.xl,
    gap: Spacing.md,
  },
  whyCard: {
    padding: Spacing.lg,
  },
  whyIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: 'rgba(47,111,237,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  whyCardTitle: {
    fontFamily: Fonts.displaySemibold,
    fontSize: 16.5,
    color: Colors.textPrimary,
  },
  whyCardBody: {
    fontFamily: Fonts.body,
    fontSize: 14,
    lineHeight: 21,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  whyCta: {
    marginTop: Spacing.xl,
    alignItems: 'center',
  },
  finalWrap: {
    borderTopWidth: 1,
    borderTopColor: Colors.hairline,
    backgroundColor: Colors.bgElevated,
    paddingVertical: Spacing.xxxl,
  },
  finalTitle: {
    fontFamily: Fonts.display,
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.6,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  finalSub: {
    fontFamily: Fonts.body,
    fontSize: 15,
    lineHeight: 22,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
  finalCtaRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.xl,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
