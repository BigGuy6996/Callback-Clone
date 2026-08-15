import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, Spacing } from '@/constants/theme';

type Item = { q: string; a: string };

type Props = {
  items: readonly Item[];
  defaultOpen?: number | null;
};

/** Accordion — same pattern as the Home FAQ (Animated expand/collapse). */
export function Accordion({ items, defaultOpen = 0 }: Props) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <View style={styles.list}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <View key={item.q} style={styles.item}>
            <Pressable
              style={styles.questionRow}
              onPress={() => setOpen(isOpen ? null : i)}
              accessibilityRole="button"
              accessibilityState={{ expanded: isOpen }}>
              <Text style={styles.question}>{item.q}</Text>
              <Ionicons name={isOpen ? 'chevron-up' : 'chevron-down'} size={18} color={Colors.blue} />
            </Pressable>
            {isOpen ? (
              <Animated.View entering={FadeInDown.duration(200)} exiting={FadeOutUp.duration(150)}>
                <Text style={styles.answer}>{item.a}</Text>
              </Animated.View>
            ) : null}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    borderTopWidth: 1,
    borderTopColor: Colors.hairline,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.hairline,
    paddingVertical: Spacing.lg,
  },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  question: {
    fontFamily: Fonts.displaySemibold,
    fontSize: 16,
    color: Colors.textPrimary,
    flex: 1,
    letterSpacing: -0.2,
  },
  answer: {
    fontFamily: Fonts.body,
    fontSize: 14,
    lineHeight: 21,
    color: Colors.textSecondary,
    paddingTop: Spacing.sm,
    paddingRight: Spacing.xl,
  },
});
