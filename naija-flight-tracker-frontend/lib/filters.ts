import type { FlightDto } from './api';

export type SortKey = 'cheapest' | 'bestvalue' | 'earliest' | 'shortest';
export type DepartureWindow = 'early' | 'morning' | 'afternoon' | 'evening';

export const SORT_LABELS: Record<SortKey, string> = {
  cheapest: 'Cheapest',
  bestvalue: 'Best value',
  earliest: 'Earliest',
  shortest: 'Shortest',
};

export function departureWindow(dep: string): DepartureWindow {
  const hour = Number(dep.split(':')[0]);
  if (hour < 6) return 'early';
  if (hour < 12) return 'morning';
  if (hour < 18) return 'afternoon';
  return 'evening';
}

export function durationMinutes(dur: string): number {
  const m = dur.match(/(\d+)h\s*(\d+)?m?/);
  if (!m) return 0;
  return Number(m[1]) * 60 + Number(m[2] || 0);
}

export function sortFlights(flights: FlightDto[], sort: SortKey): FlightDto[] {
  const arr = [...flights];
  switch (sort) {
    case 'cheapest': return arr.sort((a, b) => a.price - b.price);
    case 'bestvalue': return arr.sort((a, b) => b.score - a.score);
    case 'earliest': return arr.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
    case 'shortest': return arr.sort((a, b) => durationMinutes(a.duration) - durationMinutes(b.duration));
  }
}
