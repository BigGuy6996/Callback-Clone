import { Image } from 'expo-image';
import * as Linking from 'expo-linking';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, Spacing } from '@/constants/theme';
import { Brand, FooterLinks } from '@/constants/content';

export function Footer() {
  return (
    <View style={styles.wrap}>
      <View style={styles.inner}>
        <View style={styles.brandRow}>
          <Image source={require('@/assets/images/logo-icon.png')} style={styles.logo} contentFit="contain" />
          <Text style={styles.name}>{Brand.name}</Text>
        </View>
        <Text style={styles.tagline}>{Brand.tagline}</Text>

        <PressableRow
          icon="mail-outline"
          label={Brand.email}
          onPress={() => Linking.openURL(`mailto:${Brand.email}`)}
        />

        <View style={styles.links}>
          {FooterLinks.map((l) => (
            <Text key={l.label} style={styles.link}>
              {l.label}
            </Text>
          ))}
        </View>

        <Text style={styles.copyright}>© {new Date().getFullYear()} Callback Clone. All rights reserved.</Text>
      </View>
    </View>
  );
}

function PressableRow({ icon, label, onPress }: { icon: keyof typeof Ionicons.glyphMap; label: string; onPress: () => void }) {
  return (
    <Text style={styles.contact} onPress={onPress}>
      <Ionicons name={icon} size={14} color={Colors.blue} />  {label}
    </Text>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: Colors.bgElevated,
    borderTopWidth: 1,
    borderTopColor: Colors.hairline,
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
  },
  inner: {
    width: '100%',
    maxWidth: 560,
    alignSelf: 'center',
    alignItems: 'center',
    gap: Spacing.md,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  logo: {
    width: 30,
    height: 30,
  },
  name: {
    fontFamily: Fonts.displaySemibold,
    fontSize: 17,
    color: Colors.textPrimary,
    letterSpacing: -0.3,
  },
  tagline: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: Colors.textMuted,
  },
  contact: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 13.5,
    color: Colors.blueDim,
  },
  links: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: Spacing.lg,
    marginTop: Spacing.sm,
  },
  link: {
    fontFamily: Fonts.body,
    fontSize: 12.5,
    color: Colors.textSecondary,
  },
  copyright: {
    fontFamily: Fonts.body,
    fontSize: 11.5,
    color: Colors.textMuted,
    marginTop: Spacing.sm,
  },
});
