import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Colors, Fonts, Spacing } from '@/constants/theme';
import { Text } from 'react-native';
import { Blob } from '@/components/ui/Blob';
import { Button } from '@/components/ui/Button';

/** Final CTA band — "Onboarding takes 5 minutes. Your AI receptionist is live in 48 hours." */
export function FinalCTA() {
  return (
    <View style={styles.wrap}>
      <Blob size={380} opacity={0.24} style={styles.blobLeft} />
      <Blob size={300} opacity={0.16} style={styles.blobRight} />
      <View style={styles.inner}>
        <Text style={styles.title}>Onboarding takes 5 minutes.</Text>
        <Text style={styles.titleAccent}>Your AI receptionist is live in 48 hours.</Text>
        <View style={styles.ctaRow}>
          <Button label="Book a Free Demo" size="lg" onPress={() => router.push('/demo')} />
          <Button
            label="Start onboarding"
            size="lg"
            variant="secondary"
            onPress={() => router.push('/onboarding')}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderTopWidth: 1,
    borderTopColor: Colors.hairline,
    paddingVertical: Spacing.xxxl,
    paddingHorizontal: Spacing.lg,
    overflow: 'hidden',
  },
  inner: {
    width: '100%',
    maxWidth: 560,
    alignSelf: 'center',
    alignItems: 'center',
  },
  blobLeft: {
    position: 'absolute',
    top: -160,
    left: -160,
  },
  blobRight: {
    position: 'absolute',
    bottom: -140,
    right: -140,
  },
  title: {
    fontFamily: Fonts.display,
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.6,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  titleAccent: {
    fontFamily: Fonts.display,
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.6,
    color: Colors.blue,
    textAlign: 'center',
  },
  ctaRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.xl,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
