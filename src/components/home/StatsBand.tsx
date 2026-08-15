import { StyleSheet, View } from 'react-native';
import { Colors, Fonts, Spacing } from '@/constants/theme';
import { ResultsStats } from '@/constants/content';
import { Section, SectionHeader } from '@/components/Section';
import { CountUp } from '@/components/ui/CountUp';
import { Text } from 'react-native';

export function StatsBand() {
  return (
    <Section elevated>
      <SectionHeader
        eyebrow="The results"
        title="What happens when every call gets answered."
        subtitle="Real outcomes for local businesses running 24/7 coverage."
      />
      <View style={styles.grid}>
        {ResultsStats.map((s, i) => (
          <View
            key={s.label}
            style={[
              styles.cell,
              i % 2 === 0 && styles.cellLeft,
              i < ResultsStats.length - 2 && styles.cellBottom,
            ]}>
            <CountUp value={s.value} suffix={s.suffix} style={styles.num} />
            <Text style={styles.label}>{s.label}</Text>
          </View>
        ))}
      </View>
    </Section>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderColor: Colors.hairline,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: Colors.surface,
  },
  cell: {
    width: '50%',
    padding: Spacing.lg,
    alignItems: 'center',
  },
  cellLeft: {
    borderRightWidth: 1,
    borderRightColor: Colors.hairline,
  },
  cellBottom: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.hairline,
  },
  num: {
    fontFamily: Fonts.displayBold,
    fontSize: 34,
    letterSpacing: -1,
    color: Colors.blue,
  },
  label: {
    fontFamily: Fonts.body,
    fontSize: 12.5,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
});
