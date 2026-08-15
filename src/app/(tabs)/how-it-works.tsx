import { PlaceholderScreen } from '@/components/PlaceholderScreen';

export default function HowItWorksScreen() {
  return (
    <PlaceholderScreen
      icon="bulb-outline"
      title="The receptionist who never misses a call"
      body="Built to sound human. Built to actually answer. The full animated walkthrough with a live call demo ships in the next build."
      bullets={[
        'The call comes in — answered on the first ring',
        'It understands the request — hours, pricing, services',
        'It books the appointment — live calendar check',
        'It follows up automatically — texts & reminders',
      ]}
    />
  );
}
