import * as Linking from 'expo-linking';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';
import { Brand } from '@/constants/content';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';

const FIELDS = [
  'Business name',
  'Owner name',
  'Email',
  'Phone',
  'Address',
  'Hours',
  'Services',
  'Pricing',
  'FAQs',
  'Calendar link',
  'Appointment length, buffer & times',
];

/**
 * Client onboarding screen — the 5-minute form that gets a business live in 48 hours.
 * The full native form (POSTing to Formspree) ships in the next build.
 */
export default function OnboardingScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.wrap}>
        <Eyebrow label="Client onboarding" />
        <Text style={styles.title}>Go live in 48 hours.</Text>
        <Text style={styles.body}>
          Tell us about your business once — hours, services, pricing, and how you like to book. We train your
          AI receptionist and flip the switch within 48 hours.
        </Text>

        <View style={styles.fields}>
          <Text style={styles.fieldsLabel}>We ask for</Text>
          <View style={styles.chips}>
            {FIELDS.map((f) => (
              <View key={f} style={styles.chip}>
                <Text style={styles.chipText}>{f}</Text>
              </View>
            ))}
          </View>
        </View>

        <Button
          label="Open the onboarding form"
          size="lg"
          fullWidth
          icon="create-outline"
          onPress={() => Linking.openURL(Brand.formspreeUrl)}
        />

        <Text style={styles.note}>
          Submits securely to our onboarding pipeline. No contracts — cancel anytime.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  content: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  wrap: {
    width: '100%',
    maxWidth: 560,
    alignSelf: 'center',
  },
  title: {
    fontFamily: Fonts.display,
    fontSize: 27,
    lineHeight: 33,
    letterSpacing: -0.5,
    color: Colors.textPrimary,
  },
  body: {
    fontFamily: Fonts.body,
    fontSize: 15,
    lineHeight: 23,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
  },
  fields: {
    marginTop: Spacing.xl,
  },
  fieldsLabel: {
    fontFamily: Fonts.bodySemibold,
    fontSize: 12,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: Colors.textMuted,
    marginBottom: Spacing.md,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  chip: {
    backgroundColor: Colors.bgElevated,
    borderWidth: 1,
    borderColor: Colors.hairline,
    borderRadius: Radius.pill,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  chipText: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: Colors.textSecondary,
  },
  note: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
});
