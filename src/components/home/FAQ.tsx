import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, Spacing } from '@/constants/theme';
import { Faqs } from '@/constants/content';
import { Section, SectionHeader } from '@/components/Section';

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section>
      <SectionHeader
        eyebrow="FAQ"
        title="Questions, answered."
        subtitle="The things owners ask us before they go live."
      />
      <View style={styles.list}>
        {Faqs.map((item, i) => {
          const isOpen = open === i;
          return (
            <View key={item.q} style={styles.item}>
              <Pressable
                style={styles.questionRow}
                onPress={() => setOpen(isOpen ? null : i)}
                accessibilityRole="button"
                accessibilityState={{ expanded: isOpen }}>
                <Text style={styles.question}>{item.q}</Text>
                <Ionicons
                  name={isOpen ? 'chevron-up' : 'chevron-down'}
                  size={18}
                  color={Colors.blue}
                />
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
    </Section>
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
