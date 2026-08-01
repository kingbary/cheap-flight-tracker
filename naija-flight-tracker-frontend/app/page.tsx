import { Home } from '@/components/screens/Home';
import { getTrending } from '@/lib/api';

export default async function Page() {
  const trending = await getTrending();
  return <Home trending={trending} />;
}
