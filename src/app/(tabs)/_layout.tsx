import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts } from '@/constants/theme';

const TAB_ICONS: Record<string, { active: keyof typeof Ionicons.glyphMap; inactive: keyof typeof Ionicons.glyphMap }> = {
  index: { active: 'home', inactive: 'home-outline' },
  pricing: { active: 'pricetag', inactive: 'pricetag-outline' },
  calculator: { active: 'calculator', inactive: 'calculator-outline' },
  'how-it-works': { active: 'bulb', inactive: 'bulb-outline' },
  customers: { active: 'people', inactive: 'people-outline' },
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerStyle: { backgroundColor: Colors.surface },
        headerTitleStyle: {
          fontFamily: Fonts.displaySemibold,
          fontSize: 16,
          color: Colors.textPrimary,
        },
        tabBarActiveTintColor: Colors.blue,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.hairline,
        },
        tabBarLabelStyle: {
          fontFamily: Fonts.bodySemibold,
          fontSize: 10.5,
          letterSpacing: 0.2,
        },
        tabBarIcon: ({ color, size, focused }) => {
          const icons = TAB_ICONS[route.name] ?? TAB_ICONS.index;
          return <Ionicons name={focused ? icons.active : icons.inactive} size={size} color={color} />;
        },
      })}>
      <Tabs.Screen name="index" options={{ title: 'Home', headerShown: false }} />
      <Tabs.Screen name="pricing" options={{ title: 'Pricing' }} />
      <Tabs.Screen name="calculator" options={{ title: 'Calculator' }} />
      <Tabs.Screen name="how-it-works" options={{ title: 'How it works' }} />
      <Tabs.Screen name="customers" options={{ title: 'Customers' }} />
    </Tabs>
  );
}
