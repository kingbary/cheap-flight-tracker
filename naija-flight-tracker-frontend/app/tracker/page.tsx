import { Tracker } from '@/components/screens/Tracker';
import { getSavedTrip, getDailyFares } from '@/lib/api';

export default async function Page() {
  const [savedTrip, dailyFares] = await Promise.all([
    getSavedTrip('LOS', 'ABV'),
    getDailyFares('LOS', 'ABV'),
  ]);
  return <Tracker savedTrip={savedTrip} dailyFares={dailyFares} />;
}
