import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import { Colors } from '@/constants/theme';

type Props = {
  size?: number;
  opacity?: number;
  style?: ViewStyle;
};

/** Ambient radial blue blob glow — port of the site's rgba(47,111,237,0.1–0.32) radial gradients. */
export function Blob({ size = 320, opacity = 0.28, style }: Props) {
  return (
    <View
      pointerEvents="none"
      style={[
        styles.wrap,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          opacity,
        },
        style,
      ]}>
      <LinearGradient
        colors={[Colors.blue, Colors.blueLight, 'transparent']}
        locations={[0, 0.55, 1]}
        start={{ x: 0.4, y: 0.3 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    overflow: 'hidden',
  },
});
