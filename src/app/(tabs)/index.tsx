import { Image } from 'expo-image';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing } from '@/constants/theme';
import { Pressable } from 'react-native';
import { Text } from 'react-native';
import { Hero } from '@/components/home/Hero';
import { MissedCallTeaser } from '@/components/home/MissedCallTeaser';
import { IndustryMarquee } from '@/components/home/IndustryMarquee';
import { ProblemsSection } from '@/components/home/Problems';
import { HowItWorks } from '@/components/home/HowItWorks';
import { StatsBand } from '@/components/home/StatsBand';
import { TestimonialsSection } from '@/components/home/Testimonials';
import { PricingBand } from '@/components/home/PricingBand';
import { FAQ } from '@/components/home/FAQ';
import { FinalCTA } from '@/components/home/FinalCTA';
import { Footer } from '@/components/home/Footer';
import { Fonts } from '@/constants/theme';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        bounces>
        {/* compact brand header */}
        <View style={styles.brandBar}>
          <Image source={require('@/assets/images/logo-icon.png')} style={styles.brandIcon} contentFit="contain" />
          <Image source={require('@/assets/images/logo-wordmark.png')} style={styles.brandWordmark} contentFit="contain" />
          <View style={styles.brandSpacer} />
          <Pressable style={({ pressed }) => [styles.bookPill, pressed && styles.bookPillPressed]} onPress={() => router.push('/demo')}>
            <Text style={styles.bookPillText}>Book demo</Text>
          </Pressable>
        </View>

        <Hero />
        <MissedCallTeaser />
        <IndustryMarquee />
        <ProblemsSection />
        <HowItWorks />
        <StatsBand />
        <TestimonialsSection />
        <PricingBand />
        <FAQ />
        <FinalCTA />
        <Footer />
        <View style={styles.tabBarSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  scroll: {
    backgroundColor: Colors.surface,
  },
  brandBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.hairline,
    backgroundColor: Colors.surface,
  },
  brandIcon: {
    width: 28,
    height: 28,
  },
  brandWordmark: {
    width: 118,
    height: 24,
  },
  brandSpacer: {
    flex: 1,
  },
  bookPill: {
    backgroundColor: Colors.blue,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  bookPillPressed: {
    opacity: 0.85,
  },
  bookPillText: {
    color: '#FFFFFF',
    fontFamily: Fonts.bodySemibold,
    fontSize: 13,
  },
  tabBarSpacer: {
    height: 24,
  },
});
