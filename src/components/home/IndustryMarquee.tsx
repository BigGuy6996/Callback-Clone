import { StyleSheet, Text, View } from 'react-native';
import { Colors, Fonts, Spacing } from '@/constants/theme';
import { Industries } from '@/constants/content';
import { Marquee } from '@/components/ui/Marquee';

/** Industry marquee band — "Trusted by local businesses across…" */
export function IndustryMarquee() {
  return (
    <View style={styles.wrap}>
      <Text style={styles.caption}>Trusted by local businesses across</Text>
      <Marquee items={Industries} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: Colors.bgElevated,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.hairline,
    paddingVertical: Spacing.lg,
    gap: Spacing.md,
    overflow: 'hidden',
  },
  caption: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 10,
    letterSpacing: 2.4,
    textTransform: 'uppercase',
    color: Colors.textMuted,
    textAlign: 'center',
  },
});
