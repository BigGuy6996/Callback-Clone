import { PlaceholderScreen } from '@/components/PlaceholderScreen';

export default function PricingScreen() {
  return (
    <PlaceholderScreen
      icon="pricetag-outline"
      title="Pricing, without surprises"
      body="Three tiers sized to call volume — no contracts, no per-minute surprises. Monthly from $199, annual saves 15%, and add-ons like Website AI Chat and Google Review Automation can be added anytime."
      bullets={[
        'Starter $199/mo — ~200 calls',
        'Growth $249/mo — 325 calls (most popular)',
        'Pro $349/mo — 500 calls',
        'Enterprise 500+ — custom',
      ]}
    />
  );
}
