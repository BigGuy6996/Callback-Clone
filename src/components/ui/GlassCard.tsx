import { BlurView } from 'expo-blur';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import { Colors, Radius } from '@/constants/theme';

type Props = {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  intensity?: number;
  dark?: boolean;
};

/** Frosted glass card — port of the site's .glass (rgba(255,255,255,0.72) + blur(20px)). */
export function GlassCard({ children, style, intensity = 40, dark = false }: Props) {
  if (dark) {
    return (
      <View style={[styles.darkCard, style]}>{children}</View>
    );
  }
  return (
    <BlurView intensity={intensity} tint="light" style={[styles.card, style]}>
      {children}
    </BlurView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.glass,
    borderWidth: 1,
    borderColor: Colors.hairline,
    borderRadius: Radius.lg,
    overflow: 'hidden',
  },
  darkCard: {
    backgroundColor: Colors.bg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: Radius.lg,
    overflow: 'hidden',
  },
});
