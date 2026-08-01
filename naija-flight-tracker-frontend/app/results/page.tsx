import { Results } from '@/components/screens/results/Results';
import { getFlights } from '@/lib/api';

export default async function Page() {
  const flights = await getFlights('LOS', 'ABV');
  return <Results flights={flights} />;
}
