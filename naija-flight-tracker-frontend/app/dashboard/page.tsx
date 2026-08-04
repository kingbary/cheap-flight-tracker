import { Dashboard } from '@/components/screens/Dashboard';
import { getTrackedTrips } from '@/lib/api';

export default async function Page() {
  const trackedTrips = await getTrackedTrips();
  return <Dashboard trackedTrips={trackedTrips} />;
}
