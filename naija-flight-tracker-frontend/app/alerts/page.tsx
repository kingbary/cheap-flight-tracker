import { Alerts } from '@/components/screens/Alerts';
import { getAlerts } from '@/lib/api';

export default async function Page() {
  const alerts = await getAlerts();
  return <Alerts alerts={alerts} />;
}
