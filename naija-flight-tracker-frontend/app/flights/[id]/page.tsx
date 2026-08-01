import { FlightDetail } from '@/components/screens/FlightDetail';
import { getFlight } from '@/lib/api';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const flight = await getFlight(id);
  return <FlightDetail flight={flight} />;
}
