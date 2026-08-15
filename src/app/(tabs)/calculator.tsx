import { PlaceholderScreen } from '@/components/PlaceholderScreen';

export default function CalculatorScreen() {
  return (
    <PlaceholderScreen
      icon="calculator-outline"
      title="Missed Call Revenue Calculator"
      body="See exactly what missed calls cost your business every month — and what Callback Clone recovers. The full interactive calculator with sliders, plan picker, and ROI math ships in the next build."
      bullets={[
        'Monthly & yearly revenue loss',
        'Lost leads per month',
        'ROI vs. your plan',
        '18x payback example included',
      ]}
    />
  );
}
