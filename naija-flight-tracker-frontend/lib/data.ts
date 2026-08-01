// Mock data — ported 1:1 from project/shared.jsx

export type CityCode = 'LOS' | 'ABV' | 'PHC' | 'KAN' | 'ENU' | 'CBQ' | 'IBA' | 'QUO' | 'QOW' | 'BNI' | 'SKO' | 'YOL' | 'MIU' | 'ILR';

export interface City {
  code: CityCode;
  name: string;
  sub: string;
}

export const CITIES: Record<CityCode, City> = {
  LOS: { code: 'LOS', name: 'Lagos', sub: 'Murtala Muhammed Intl' },
  ABV: { code: 'ABV', name: 'Abuja', sub: 'Nnamdi Azikiwe Intl' },
  PHC: { code: 'PHC', name: 'Port Harcourt', sub: 'Omagwa Intl' },
  KAN: { code: 'KAN', name: 'Kano', sub: 'Mallam Aminu Kano' },
  ENU: { code: 'ENU', name: 'Enugu', sub: 'Akanu Ibiam Intl' },
  CBQ: { code: 'CBQ', name: 'Calabar', sub: 'Margaret Ekpo Intl' },
  IBA: { code: 'IBA', name: 'Ibadan', sub: 'Ibadan Airport' },
  QUO: { code: 'QUO', name: 'Uyo', sub: 'Akwa Ibom Intl' },
  QOW: { code: 'QOW', name: 'Owerri', sub: 'Sam Mbakwe Intl' },
  BNI: { code: 'BNI', name: 'Benin City', sub: 'Benin Airport' },
  SKO: { code: 'SKO', name: 'Sokoto', sub: 'Sadiq Abubakar III' },
  YOL: { code: 'YOL', name: 'Yola', sub: 'Yola Airport' },
  MIU: { code: 'MIU', name: 'Maiduguri', sub: 'Maiduguri Intl' },
  ILR: { code: 'ILR', name: 'Ilorin', sub: 'Ilorin Intl' },
};

export type AirlineCode = 'AP' | 'AR' | 'DA' | 'IB' | 'GA' | 'UN' | 'VJ' | 'MX' | 'AE' | 'OV';

export interface Airline {
  code: AirlineCode;
  name: string;
  mark: string;
  bg: string;
  fg: string;
}

export const AIRLINES: Record<AirlineCode, Airline> = {
  AP: { code: 'AP', name: 'Air Peace', mark: 'AP', bg: '#E63946', fg: '#fff' },
  AR: { code: 'AR', name: 'Arik Air', mark: 'A', bg: '#0a3b6e', fg: '#fff' },
  DA: { code: 'DA', name: 'Dana Air', mark: 'D', bg: '#1f8b4c', fg: '#fff' },
  IB: { code: 'IB', name: 'Ibom Air', mark: 'IB', bg: '#0F3B73', fg: '#f3c969' },
  GA: { code: 'GA', name: 'Green Africa', mark: 'GA', bg: '#1ac580', fg: '#0a1628' },
  UN: { code: 'UN', name: 'United Nigeria', mark: 'U', bg: '#0d4f3c', fg: '#f4c430' },
  VJ: { code: 'VJ', name: 'ValueJet', mark: 'VJ', bg: '#FF6A00', fg: '#fff' },
  MX: { code: 'MX', name: 'Max Air', mark: 'MX', bg: '#005baa', fg: '#fff' },
  AE: { code: 'AE', name: 'Aero Contractors', mark: 'AC', bg: '#7c1722', fg: '#f4c430' },
  OV: { code: 'OV', name: 'Overland', mark: 'OV', bg: '#222', fg: '#fff' },
};

// Flight numbers already carry each carrier's real IATA prefix (e.g. "Q9 421", "W3 502"),
// so the `code` field above intentionally mirrors the object key rather than the source
// bundle's inconsistent alt-codes — nothing in the UI reads `.code` directly.

export interface Flight {
  id: string;
  airline: AirlineCode;
  flight: string;
  dep: string;
  arr: string;
  dur: string;
  stops: number;
  price: number;
  was: number;
  score: number;
  deal?: string;
}

export const FLIGHTS_LOS_ABV: Flight[] = [
  { id: 'fl-01', airline: 'GA', flight: 'Q9 421', dep: '06:15', arr: '07:25', dur: '1h 10m', stops: 0, price: 58400, was: 71200, score: 94, deal: 'Cheapest' },
  { id: 'fl-02', airline: 'IB', flight: 'QI 309', dep: '07:40', arr: '08:55', dur: '1h 15m', stops: 0, price: 72500, was: 79000, score: 88, deal: 'Best time' },
  { id: 'fl-03', airline: 'AP', flight: 'AP 712', dep: '09:25', arr: '10:35', dur: '1h 10m', stops: 0, price: 82900, was: 82900, score: 76 },
  { id: 'fl-04', airline: 'UN', flight: 'NUA 117', dep: '12:05', arr: '13:20', dur: '1h 15m', stops: 0, price: 64800, was: 88000, score: 91, deal: 'Hot drop' },
  { id: 'fl-05', airline: 'VJ', flight: 'VK 88', dep: '15:40', arr: '16:55', dur: '1h 15m', stops: 0, price: 69900, was: 74000, score: 82 },
  { id: 'fl-06', airline: 'AR', flight: 'W3 502', dep: '18:30', arr: '19:45', dur: '1h 15m', stops: 0, price: 91500, was: 91500, score: 70 },
];

// 30-day price history for the headline route (₦, in thousands, oldest → newest)
export const PRICE_HISTORY = [
  82, 85, 81, 79, 84, 88, 92, 89, 86, 90,
  95, 97, 93, 88, 84, 80, 76, 72, 70, 68,
  73, 78, 81, 76, 71, 65, 62, 60, 64, 58,
];

// Calendar prices for current month (₦, in thousands). null = no flight.
export const CAL_PRICES: (number | null)[] = [
  null, null, 71, 68, 64, 58, 62, // wk 1 (Sun..Sat) — month starts Tue
  60, 55, 58, 64, 67, 70, 74,
  78, 72, 64, 58, 55, 53, 58, // ← cheap week
  62, 68, 71, 76, 82, 88, 91,
  88, 80, 74, null, null, null, null,
];

export interface Trending {
  from: CityCode;
  to: CityCode;
  price: number;
  drop: number;
  label: string;
}

export const TRENDING: Trending[] = [
  { from: 'LOS', to: 'ABV', price: 55400, drop: -18, label: 'Lagos → Abuja' },
  { from: 'LOS', to: 'PHC', price: 71200, drop: -12, label: 'Lagos → Port Harcourt' },
  { from: 'ABV', to: 'KAN', price: 64900, drop: -7, label: 'Abuja → Kano' },
  { from: 'LOS', to: 'ENU', price: 78600, drop: 4, label: 'Lagos → Enugu' },
  { from: 'LOS', to: 'CBQ', price: 88100, drop: -2, label: 'Lagos → Calabar' },
  { from: 'ABV', to: 'PHC', price: 69500, drop: -15, label: 'Abuja → Port Harcourt' },
];

export interface SavedTrip {
  from: CityCode;
  to: CityCode;
  target: number;
  current: number;
  trend: 'up' | 'down';
  alerts: number;
}

export const SAVED: SavedTrip[] = [
  { from: 'LOS', to: 'ABV', target: 60000, current: 58400, trend: 'down', alerts: 3 },
  { from: 'LOS', to: 'KAN', target: 95000, current: 102500, trend: 'up', alerts: 0 },
  { from: 'ABV', to: 'CBQ', target: 80000, current: 74200, trend: 'down', alerts: 1 },
];

export function naira(n: number): string {
  return '₦' + Number(n).toLocaleString('en-NG');
}

export function nairaK(n: number): string {
  const k = n / 1000;
  return '₦' + (k % 1 === 0 ? k : k.toFixed(1)) + 'k';
}

export function priceTone(price: number | null, lo: number, hi: number): number | null {
  if (price == null) return null;
  return Math.max(0, Math.min(1, (price - lo) / (hi - lo)));
}
