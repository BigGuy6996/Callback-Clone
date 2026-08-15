import { PlaceholderScreen } from '@/components/PlaceholderScreen';

export default function CustomersScreen() {
  return (
    <PlaceholderScreen
      icon="people-outline"
      title="Fewer missed calls. More booked jobs."
      body="Local business owners who stopped losing the phone. The full stories with video clips and more customers ship in the next build."
      bullets={[
        'Dr. Melissa Hart — Hart Family Dental · +31% bookings',
        'Jordan Reyes — Reyes HVAC & Air · live in 48hr',
        'Priya Nair — Bloom Med Spa · 6x ROI',
      ]}
    />
  );
}
