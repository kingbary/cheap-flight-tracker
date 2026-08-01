'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Icon, type IconName } from '@/components/icons/Icon';
import { AirlinePill } from '@/components/ui/AirlinePill';
import { Badge } from '@/components/ui/Badge';
import {
  AIRLINES, PRICE_HISTORY, CAL_PRICES, SAVED,
  naira, nairaK, type AirlineCode,
} from '@/lib/data';
import { departureWindow, sortFlights, SORT_LABELS, type DepartureWindow, type SortKey } from '@/lib/filters';
import { theme as HD } from '@/lib/theme';
import type { FlightDto } from '@/lib/api';

const W = 1440;

// ── Top bar ──────────────────────────────────────────────────────
const NAV_ITEMS: { icon: IconName; label: string; href: string }[] = [
  { icon: 'home', label: 'Home', href: '/' },
  { icon: 'search', label: 'Search', href: '/results' },
  { icon: 'cal', label: 'Tracker', href: '/tracker' },
  { icon: 'heart', label: 'Saved', href: '/dashboard' },
  { icon: 'map', label: 'Routes', href: '/dashboard' },
];

function DTopBar() {
  const pathname = usePathname();
  const [currency, setCurrency] = useState<'NGN' | 'USD'>('NGN');
  return (
    <div style={{ height: 64, padding: '0 28px', background: HD.cream, borderBottom: '1px solid ' + HD.rule, display: 'flex', alignItems: 'center', gap: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
        <div style={{ width: 32, height: 32, borderRadius: 9, background: HD.ink, color: HD.amber, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="takeoff" size={18} stroke={2.2} />
        </div>
        <div>
          <div style={{ fontFamily: HD.display, fontWeight: 800, fontSize: 18, letterSpacing: -0.4, lineHeight: 1 }}>Harmattan</div>
          <div style={{ fontFamily: HD.mono, fontSize: 9, color: HD.soft, letterSpacing: 0.6, marginTop: 2 }}>9JA · DOMESTIC</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 4, marginLeft: 12 }}>
        {NAV_ITEMS.map((item) => {
          const on = item.href === '/results' ? pathname === '/results' : pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              style={{
                display: 'flex', alignItems: 'center', gap: 7,
                padding: '8px 14px', borderRadius: 10,
                background: on ? HD.ink : 'transparent',
                color: on ? HD.cream2 : HD.mid,
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
              }}
            >
              <Icon name={item.icon} size={15} stroke={on ? 2 : 1.8} />
              {item.label}
            </Link>
          );
        })}
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ display: 'flex', background: HD.cream2, border: '1px solid ' + HD.cream3, borderRadius: 99, padding: 3, fontSize: 12, fontWeight: 600 }}>
        {(['NGN', 'USD'] as const).map((c) => (
          <span
            key={c}
            onClick={() => setCurrency(c)}
            style={{
              padding: '5px 12px', borderRadius: 99, cursor: 'pointer',
              background: currency === c ? HD.ink : 'transparent',
              color: currency === c ? HD.cream2 : HD.mid,
            }}
          >
            {c}
          </span>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', background: HD.cream2, border: '1px solid ' + HD.cream3, borderRadius: 12, fontSize: 12, color: HD.soft, width: 220 }}>
        <Icon name="search" size={14} color={HD.soft} />
        <span style={{ flex: 1 }}>Quick jump…</span>
        <span style={{ fontFamily: HD.mono, fontSize: 10, padding: '2px 5px', background: HD.cream3, borderRadius: 4 }}>⌘K</span>
      </div>

      <Link href="/alerts" style={{ width: 38, height: 38, borderRadius: 12, background: HD.cream2, border: '1px solid ' + HD.cream3, color: HD.ink, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <Icon name="bell" size={17} />
        <span style={{ position: 'absolute', top: 8, right: 8, width: 8, height: 8, background: HD.amber, borderRadius: 99, border: '1.5px solid ' + HD.cream2 }} />
      </Link>

      <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 12px 4px 4px', background: HD.cream2, border: '1px solid ' + HD.cream3, borderRadius: 99 }}>
        <div style={{ width: 30, height: 30, borderRadius: 99, background: HD.ink, color: HD.amber, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: HD.display, fontWeight: 800, fontSize: 13 }}>AO</div>
        <div style={{ lineHeight: 1.1 }}>
          <div style={{ fontSize: 12, fontWeight: 600 }}>Adaeze O.</div>
          <div style={{ fontFamily: HD.mono, fontSize: 9, color: HD.amber, fontWeight: 700, letterSpacing: 0.4 }}>EKO · 14,820 PTS</div>
        </div>
      </Link>
    </div>
  );
}

// ── Search bar ───────────────────────────────────────────────────
function SearchField({ label, value, sub, w, flex }: { label: string; value: string; sub?: string; w?: number; flex?: number }) {
  return (
    <div style={{ flex, width: w, padding: '10px 18px', borderRight: '1px solid rgba(255,248,235,0.1)' }}>
      <div style={{ fontSize: 10, color: 'rgba(255,248,235,0.55)', textTransform: 'uppercase', letterSpacing: 0.6, fontWeight: 600, marginBottom: 3 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{ fontFamily: HD.display, fontWeight: 800, fontSize: 22, letterSpacing: -0.5, color: HD.cream2, whiteSpace: 'nowrap' }}>{value}</span>
        {sub && <span style={{ fontFamily: HD.mono, fontSize: 11, color: 'rgba(255,248,235,0.5)' }}>{sub}</span>}
      </div>
    </div>
  );
}

function DSearchBar({ from, to, onSwap }: { from: string; to: string; onSwap: () => void }) {
  return (
    <div style={{ margin: '20px 28px 0', borderRadius: 18, background: HD.ink, display: 'flex', alignItems: 'stretch', position: 'relative', boxShadow: '0 14px 32px rgba(10,22,40,0.18)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 22px', borderRight: '1px solid rgba(255,248,235,0.1)' }}>
        {['Round trip', 'One-way', 'Multi-city'].map((t, i) => (
          <span key={t} style={{ fontSize: 11, fontWeight: 600, padding: '4px 0', cursor: 'pointer', color: i === 0 ? HD.amber : 'rgba(255,248,235,0.55)', borderBottom: i === 0 ? '1.5px solid ' + HD.amber : '1.5px solid transparent', letterSpacing: 0.2, whiteSpace: 'nowrap' }}>{t}</span>
        ))}
      </div>
      <SearchField label="From" value={from} sub={from === 'Lagos' ? 'LOS' : 'ABV'} flex={1} />
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 0 }}>
        <button onClick={onSwap} style={{ position: 'absolute', left: -18, width: 36, height: 36, borderRadius: 99, background: HD.amber, color: HD.ink, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(244,163,56,0.4)' }}>
          <Icon name="swap" size={15} stroke={2.2} />
        </button>
      </div>
      <SearchField label="To" value={to} sub={to === 'Abuja' ? 'ABV' : 'LOS'} flex={1} />
      <SearchField label="Depart" value="Tue 14 Apr" flex={1} />
      <SearchField label="Return" value="Fri 17 Apr" flex={1} />
      <SearchField label="Travelers" value="1 adult" sub="Econ" w={140} />
      <button style={{ margin: 8, padding: '0 28px', border: 'none', borderRadius: 12, background: HD.amber, color: HD.ink, fontWeight: 700, fontSize: 14, fontFamily: HD.font, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
        <Icon name="search" size={17} stroke={2.2} /> Find flights
      </button>
    </div>
  );
}

// ── Filters rail ─────────────────────────────────────────────────
interface FiltersState {
  directOnly: boolean;
  toggleDirectOnly: () => void;
  airlineFilter: Set<AirlineCode>;
  toggleAirline: (c: AirlineCode) => void;
  window: DepartureWindow | null;
  setWindow: (w: DepartureWindow | null) => void;
}

const AIRLINE_ROWS: { code: AirlineCode; count: number; defaultOn: boolean }[] = [
  { code: 'GA', count: 4, defaultOn: true },
  { code: 'IB', count: 3, defaultOn: true },
  { code: 'AP', count: 5, defaultOn: false },
  { code: 'UN', count: 2, defaultOn: true },
  { code: 'VJ', count: 2, defaultOn: false },
  { code: 'AR', count: 3, defaultOn: false },
];

const WINDOWS: { key: DepartureWindow; label: string; t: string }[] = [
  { key: 'early', label: 'Early', t: '00–06' },
  { key: 'morning', label: 'Morning', t: '06–12' },
  { key: 'afternoon', label: 'Afternoon', t: '12–18' },
  { key: 'evening', label: 'Evening', t: '18–24' },
];

function Check({ checked, label, count, onClick }: { checked: boolean; label: string; count: number; onClick: () => void }) {
  return (
    <label onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '6px 0', cursor: 'pointer' }}>
      <span style={{ width: 17, height: 17, borderRadius: 5, background: checked ? HD.ink : HD.cream2, border: '1.5px solid ' + (checked ? HD.ink : HD.rule), display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {checked && <Icon name="check" size={11} color={HD.amber} stroke={3} />}
      </span>
      <span style={{ flex: 1, fontSize: 13, color: HD.ink, fontWeight: checked ? 600 : 500 }}>{label}</span>
      <span style={{ fontFamily: HD.mono, fontSize: 11, color: HD.soft }}>{count}</span>
    </label>
  );
}

function Section({ title, action, children }: { title: string; action?: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: HD.soft, letterSpacing: 0.6, textTransform: 'uppercase' }}>{title}</div>
        {action && <span style={{ fontSize: 11, color: HD.amber, fontWeight: 600, cursor: 'pointer' }}>{action}</span>}
      </div>
      {children}
    </div>
  );
}

function DFiltersRail({ state, directCount, stopCount }: { state: FiltersState; directCount: number; stopCount: number }) {
  return (
    <div style={{ width: 268, padding: '24px 22px', background: HD.cream2, borderRight: '1px solid ' + HD.rule, overflow: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18 }}>
        <div style={{ fontFamily: HD.display, fontWeight: 700, fontSize: 17, letterSpacing: -0.3 }}>Refine</div>
        <span
          onClick={() => { state.toggleDirectOnly(); }}
          style={{ fontSize: 11, color: HD.soft, fontWeight: 600, cursor: 'pointer' }}
        >
          Reset
        </span>
      </div>

      <Section title="Stops">
        <Check checked={state.directOnly} label="Direct only" count={directCount} onClick={state.toggleDirectOnly} />
        <Check checked={!state.directOnly} label="1 stop" count={stopCount} onClick={state.toggleDirectOnly} />
      </Section>

      <Section title="Airlines" action="Show all">
        {AIRLINE_ROWS.map((row) => (
          <label key={row.code} onClick={() => state.toggleAirline(row.code)} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '6px 0', cursor: 'pointer' }}>
            <span style={{ width: 17, height: 17, borderRadius: 5, background: state.airlineFilter.has(row.code) ? HD.ink : HD.cream2, border: '1.5px solid ' + (state.airlineFilter.has(row.code) ? HD.ink : HD.rule), display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {state.airlineFilter.has(row.code) && <Icon name="check" size={11} color={HD.amber} stroke={3} />}
            </span>
            <AirlinePill code={row.code} size={22} />
            <span style={{ flex: 1, fontSize: 13, fontWeight: state.airlineFilter.has(row.code) ? 600 : 500 }}>{AIRLINES[row.code].name}</span>
            <span style={{ fontFamily: HD.mono, fontSize: 11, color: HD.soft }}>{row.count}</span>
          </label>
        ))}
      </Section>

      <Section title="Departure window">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {WINDOWS.map((w) => {
            const on = state.window === w.key;
            return (
              <div
                key={w.key}
                onClick={() => state.setWindow(on ? null : w.key)}
                style={{ padding: '10px 11px', borderRadius: 10, cursor: 'pointer', background: on ? HD.ink : HD.cream, color: on ? HD.cream2 : HD.ink, border: '1px solid ' + (on ? HD.ink : HD.rule) }}
              >
                <div style={{ fontSize: 12, fontWeight: 700 }}>{w.label}</div>
                <div style={{ fontFamily: HD.mono, fontSize: 10, opacity: 0.7, marginTop: 2 }}>{w.t}</div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section title="Price · ₦">
        <div style={{ height: 44, position: 'relative', marginBottom: 6 }}>
          <svg width="100%" height="44" viewBox="0 0 220 44" preserveAspectRatio="none">
            {[6, 9, 12, 18, 22, 28, 24, 18, 14, 10, 7, 5, 4, 3].map((h, i) => (
              <rect key={i} x={i * 16} y={44 - h * 1.4} width="12" height={h * 1.4} fill={i >= 2 && i <= 9 ? HD.amber : HD.rule} rx="1.5" />
            ))}
          </svg>
          <div style={{ position: 'absolute', left: '14%', right: '36%', top: 0, bottom: 0, border: '1.5px solid ' + HD.ink, borderRadius: 6, pointerEvents: 'none' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: HD.mono, fontSize: 11, fontWeight: 700 }}>
          <span>₦55k</span><span style={{ color: HD.soft }}>—</span><span>₦92k</span>
        </div>
      </Section>

      <Section title="Duration">
        <div style={{ position: 'relative', height: 6, background: HD.rule, borderRadius: 99, marginBottom: 8 }}>
          <div style={{ position: 'absolute', left: 0, right: '28%', top: 0, bottom: 0, background: HD.ink, borderRadius: 99 }} />
          <div style={{ position: 'absolute', left: 'calc(72% - 8px)', top: -5, width: 16, height: 16, background: HD.amber, borderRadius: 99, border: '2px solid ' + HD.ink }} />
        </div>
        <div style={{ fontFamily: HD.mono, fontSize: 11, color: HD.soft }}>Up to <b style={{ color: HD.ink }}>1h 25m</b></div>
      </Section>

      <Section title="Bag policy">
        <Check checked label="Includes carry-on" count={11} onClick={() => {}} />
        <Check checked={false} label="Includes 15kg checked" count={6} onClick={() => {}} />
        <Check checked={false} label="Free changes" count={4} onClick={() => {}} />
      </Section>
    </div>
  );
}

// ── Center results ───────────────────────────────────────────────
function DPredictionStrip({ tracking, onTrack }: { tracking: boolean; onTrack: () => void }) {
  return (
    <div style={{ background: HD.ink, color: HD.cream2, borderRadius: 16, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', right: -30, top: -40, width: 120, height: 120, borderRadius: 99, background: HD.amber, opacity: 0.18 }} />
      <div style={{ width: 42, height: 42, borderRadius: 12, background: HD.amber, color: HD.ink, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon name="tr-dn" size={22} stroke={2.2} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: HD.display, fontWeight: 800, fontSize: 18, letterSpacing: -0.4 }}>
          We say <span style={{ color: HD.amber }}>WAIT</span> — fares likely to drop ₦7–12k by Tuesday
        </div>
        <div style={{ fontSize: 12, color: 'rgba(255,248,235,0.6)', marginTop: 3 }}>
          Last 11 days falling · 78% confidence · cheapest historical day is Saturday
        </div>
      </div>
      <button
        onClick={onTrack}
        style={{ padding: '9px 16px', border: '1px solid ' + HD.amber, color: tracking ? HD.ink : HD.amber, background: tracking ? HD.amber : 'transparent', borderRadius: 99, fontSize: 13, fontWeight: 600, fontFamily: HD.font, cursor: 'pointer' }}
      >
        {tracking ? 'Tracking route' : 'Track this route'}
      </button>
      <Link href="/alerts" style={{ padding: '9px 16px', border: 'none', background: HD.amber, color: HD.ink, borderRadius: 99, fontSize: 13, fontWeight: 700, fontFamily: HD.font, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
        <Icon name="wa" size={14} color={HD.ink} /> WhatsApp me
      </Link>
    </div>
  );
}

function DFlightCard({ f, top }: { f: FlightDto; top: boolean }) {
  const router = useRouter();
  const A = f.airline;
  return (
    <div style={{ position: 'relative' }}>
      {top && (
        <div style={{ position: 'absolute', top: -10, left: 20, zIndex: 2, background: HD.ink, color: HD.amber, padding: '4px 10px', borderRadius: 99, fontSize: 10, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase' }}>
          ★ {f.deal || 'Top pick'}
        </div>
      )}
      <div
        onClick={() => router.push(`/flights/${f.id}`)}
        role="button"
        tabIndex={0}
        style={{
          background: top ? HD.amber : HD.cream2,
          border: top ? 'none' : '1px solid ' + HD.cream3,
          borderRadius: 16, padding: '16px 20px', cursor: 'pointer',
          display: 'grid', gridTemplateColumns: '170px 1fr 120px 130px 120px',
          alignItems: 'center', gap: 16,
          boxShadow: top ? '0 10px 24px rgba(244,163,56,0.32)' : 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <AirlinePill code={f.airline.code as AirlineCode} size={36} />
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 600, fontSize: 13, whiteSpace: 'nowrap' }}>{A.name}</div>
            <div style={{ fontFamily: HD.mono, fontSize: 10, color: top ? HD.ink2 : HD.soft, whiteSpace: 'nowrap' }}>{f.flightNumber}</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div>
            <div style={{ fontFamily: HD.display, fontWeight: 800, fontSize: 26, letterSpacing: -0.6, lineHeight: 1 }}>{f.departureTime}</div>
            <div style={{ fontFamily: HD.mono, fontSize: 10, color: top ? HD.ink2 : HD.soft, marginTop: 4, whiteSpace: 'nowrap' }}>{f.origin.code} · {f.origin.name}</div>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontFamily: HD.mono, fontSize: 10, color: top ? HD.ink2 : HD.soft, marginBottom: 4 }}>{f.duration} · {f.stops === 0 ? 'DIRECT' : f.stops + ' STOP'}</div>
            <div style={{ width: '100%', height: 1, borderTop: '1.5px dotted ' + (top ? HD.ink2 : HD.rule), position: 'relative' }}>
              <Icon name="takeoff" size={14} color={top ? HD.ink : HD.amber} style={{ position: 'absolute', top: -7, left: '50%', transform: 'translateX(-50%)', background: top ? HD.amber : HD.cream2, padding: '0 4px' }} />
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: HD.display, fontWeight: 800, fontSize: 26, letterSpacing: -0.6, lineHeight: 1 }}>{f.arrivalTime}</div>
            <div style={{ fontFamily: HD.mono, fontSize: 10, color: top ? HD.ink2 : HD.soft, marginTop: 4, whiteSpace: 'nowrap' }}>{f.destination.code} · {f.destination.name}</div>
          </div>
        </div>
        <div style={{ fontSize: 11, lineHeight: 1.5, color: top ? HD.ink2 : HD.mid }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Icon name="briefcase" size={11} /> 7kg carry-on</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 3 }}><Icon name="check" size={11} /> {f.score >= 90 ? 'Free changes' : '₦8k change fee'}</div>
        </div>
        <div>
          <div style={{ fontFamily: HD.mono, fontSize: 9, color: top ? HD.ink2 : HD.soft, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 4 }}>Fare score</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
            <span style={{ fontFamily: HD.display, fontWeight: 800, fontSize: 22, letterSpacing: -0.5, color: top ? HD.ink : (f.score >= 90 ? HD.ok : f.score >= 80 ? HD.amber : HD.soft) }}>{f.score}</span>
            <span style={{ fontFamily: HD.mono, fontSize: 11, color: top ? HD.ink2 : HD.soft }}>/100</span>
          </div>
          <div style={{ height: 4, background: top ? 'rgba(10,22,40,0.18)' : HD.rule, borderRadius: 99, marginTop: 5, overflow: 'hidden' }}>
            <div style={{ width: f.score + '%', height: '100%', background: top ? HD.ink : HD.amber }} />
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          {f.wasPrice !== f.price && <div style={{ fontSize: 11, color: top ? HD.ink2 : HD.soft, textDecoration: 'line-through' }}>{naira(f.wasPrice)}</div>}
          <div style={{ fontFamily: HD.display, fontWeight: 800, fontSize: 24, letterSpacing: -0.6, lineHeight: 1 }}>{naira(f.price)}</div>
          <button
            onClick={(e) => { e.stopPropagation(); router.push(`/flights/${f.id}`); }}
            style={{ marginTop: 6, padding: '7px 14px', border: 'none', borderRadius: 10, background: HD.ink, color: HD.cream2, fontSize: 12, fontWeight: 700, fontFamily: HD.font, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            Lock-in <Icon name="arr-r" size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

const DAY_STRIP: { dn: string; num: string; p: string; low?: boolean }[] = [
  { dn: 'Sun', num: '12', p: '67k' }, { dn: 'Mon', num: '13', p: '62k' }, { dn: 'Tue', num: '14', p: '58.4k' },
  { dn: 'Wed', num: '15', p: '61k' }, { dn: 'Thu', num: '16', p: '71k' }, { dn: 'Fri', num: '17', p: '88k' },
  { dn: 'Sat', num: '18', p: '53k', low: true },
];

function DResults({ flights, sort, setSort, tracking, onTrack }: {
  flights: FlightDto[]; sort: SortKey; setSort: (s: SortKey) => void; tracking: boolean; onTrack: () => void;
}) {
  const [selectedDay, setSelectedDay] = useState(2);
  return (
    <div style={{ flex: 1, padding: '20px 24px', overflow: 'auto', background: HD.cream }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 11, color: HD.soft, fontWeight: 600, letterSpacing: 0.6, textTransform: 'uppercase' }}>{flights.length} flights · updated 2m ago</div>
          <div style={{ fontFamily: HD.display, fontWeight: 800, fontSize: 28, letterSpacing: -0.7, lineHeight: 1, marginTop: 4 }}>
            Lagos → Abuja · <span style={{ color: HD.amber, fontStyle: 'italic', whiteSpace: 'nowrap' }}>Tue 14 Apr</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 4, background: HD.cream2, border: '1px solid ' + HD.cream3, borderRadius: 99, padding: 3 }}>
          {(Object.keys(SORT_LABELS) as SortKey[]).map((s) => (
            <span
              key={s}
              onClick={() => setSort(s)}
              style={{ padding: '6px 12px', borderRadius: 99, fontSize: 12, fontWeight: 600, background: sort === s ? HD.ink : 'transparent', color: sort === s ? HD.cream2 : HD.mid, cursor: 'pointer', whiteSpace: 'nowrap' }}
            >
              {SORT_LABELS[s]}
            </span>
          ))}
        </div>
      </div>

      <div style={{ background: HD.cream2, border: '1px solid ' + HD.cream3, borderRadius: 14, padding: '10px 12px', marginBottom: 14, display: 'flex', alignItems: 'stretch', gap: 4, overflow: 'hidden' }}>
        {DAY_STRIP.map((d, i) => {
          const on = i === selectedDay;
          return (
            <div
              key={i}
              onClick={() => setSelectedDay(i)}
              style={{ flex: 1, padding: '10px 8px', borderRadius: 10, cursor: 'pointer', background: on ? HD.ink : d.low ? HD.amber : 'transparent', color: on ? HD.cream2 : HD.ink, position: 'relative' }}
            >
              <div style={{ fontFamily: HD.mono, fontSize: 10, opacity: 0.65, fontWeight: 600 }}>{d.dn}</div>
              <div style={{ fontFamily: HD.display, fontWeight: 800, fontSize: 18, letterSpacing: -0.3, marginTop: 2, lineHeight: 1 }}>{d.num}</div>
              <div style={{ fontFamily: HD.mono, fontSize: 11, fontWeight: 700, marginTop: 4, color: on ? HD.amber : d.low ? HD.ink : HD.mid }}>₦{d.p}</div>
              {d.low && <span style={{ position: 'absolute', top: 6, right: 6, fontSize: 9, fontWeight: 800 }}>★</span>}
            </div>
          );
        })}
      </div>

      <DPredictionStrip tracking={tracking} onTrack={onTrack} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {flights.length === 0 && (
          <div style={{ padding: '40px 0', textAlign: 'center', color: HD.soft, fontSize: 13 }}>No flights match these filters.</div>
        )}
        {flights.map((f, i) => <DFlightCard key={f.id} f={f} top={i === 0} />)}
      </div>
    </div>
  );
}

// ── Right rail ───────────────────────────────────────────────────
function DPriceChart() {
  const data = PRICE_HISTORY;
  const minV = Math.min(...data), maxV = Math.max(...data);
  const w = 280, hh = 110;
  const path = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = hh - ((v - minV) / (maxV - minV)) * hh;
    return (i ? 'L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1);
  }).join(' ');
  const minIdx = data.indexOf(minV);
  const minX = (minIdx / (data.length - 1)) * w;
  const lastX = w, lastY = hh - ((data[data.length - 1] - minV) / (maxV - minV)) * hh;

  return (
    <div style={{ background: HD.cream2, border: '1px solid ' + HD.cream3, borderRadius: 16, padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
        <div style={{ fontFamily: HD.display, fontWeight: 700, fontSize: 14, letterSpacing: -0.2 }}>30-day history</div>
        <Badge tone="ok" style={{ padding: '3px 8px', fontSize: 10 }}>78% conf</Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
        <span style={{ fontFamily: HD.display, fontWeight: 800, fontSize: 28, letterSpacing: -0.8 }}>{naira(58400)}</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: HD.ok }}>↓ 29% vs avg</span>
      </div>
      <svg width="100%" viewBox={`0 0 ${w} ${hh + 22}`} style={{ display: 'block', marginTop: 6 }}>
        <defs>
          <linearGradient id="hd-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={HD.amber} stopOpacity="0.32" />
            <stop offset="1" stopColor={HD.amber} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={path + ` L${w},${hh} L0,${hh} Z`} fill="url(#hd-grad)" />
        <path d={path} stroke={HD.ink} strokeWidth="2" fill="none" strokeLinejoin="round" />
        <circle cx={minX} cy={hh} r="4" fill={HD.amber} stroke={HD.ink} strokeWidth="1.5" />
        <circle cx={lastX - 2} cy={lastY} r="4" fill={HD.ink} />
        <text x="0" y={hh + 16} fontSize="9" fontFamily={HD.mono} fill={HD.soft}>−30d</text>
        <text x={w} y={hh + 16} fontSize="9" fontFamily={HD.mono} fill={HD.soft} textAnchor="end">today</text>
      </svg>
    </div>
  );
}

function DCalendarMini() {
  const cells = CAL_PRICES;
  const valid = cells.filter((v): v is number => v != null);
  const lo = Math.min(...valid), hi = Math.max(...valid);
  const dayNum = (i: number) => { const n = i - 1; return n >= 1 && n <= 30 ? n : null; };
  return (
    <div style={{ background: HD.cream2, border: '1px solid ' + HD.cream3, borderRadius: 16, padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <div style={{ fontFamily: HD.display, fontWeight: 700, fontSize: 14, letterSpacing: -0.2 }}>Cheapest days · April</div>
        <div style={{ display: 'flex', gap: 4 }}>
          <button style={{ width: 22, height: 22, borderRadius: 6, background: HD.cream, border: '1px solid ' + HD.rule, color: HD.ink, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Icon name="chev-l" size={11} /></button>
          <button style={{ width: 22, height: 22, borderRadius: 6, background: HD.cream, border: '1px solid ' + HD.rule, color: HD.ink, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Icon name="chev-r" size={11} /></button>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 3, marginBottom: 4 }}>
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <div key={i} style={{ textAlign: 'center', fontFamily: HD.mono, fontSize: 9, color: HD.soft, fontWeight: 700, letterSpacing: 0.3 }}>{d}</div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 3 }}>
        {cells.map((v, i) => {
          const dn = dayNum(i);
          if (v == null || dn == null) return <div key={i} style={{ height: 32 }} />;
          const t = (v - lo) / (hi - lo);
          const isMin = v === lo;
          const isToday = dn === 12;
          let bg = '#E1F0DB', fg = '#155233';
          if (t > 0.66) { bg = '#F4D9D2'; fg = '#7A2415'; } else if (t > 0.33) { bg = '#FBE8C9'; fg = '#7A4715'; }
          return (
            <div key={i} style={{ height: 32, borderRadius: 6, background: isMin ? HD.amber : bg, color: isMin ? HD.ink : fg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: isToday ? '1.5px solid ' + HD.ink : 'none', position: 'relative', fontFamily: HD.mono }}>
              <div style={{ fontSize: 8, opacity: 0.7, lineHeight: 1, fontWeight: 600 }}>{dn}</div>
              <div style={{ fontSize: 10, fontWeight: 700, lineHeight: 1.1 }}>{v}k</div>
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 10, fontSize: 9, color: HD.soft, fontFamily: HD.mono }}>
        <span>Low</span>
        <div style={{ flex: 1, height: 5, borderRadius: 3, background: 'linear-gradient(to right, #B8DAA8, #F2C97D, #E5896E)' }} />
        <span>High</span>
      </div>
    </div>
  );
}

function DTrackedRail() {
  return (
    <div style={{ background: HD.ink, color: HD.cream2, borderRadius: 16, padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div style={{ fontFamily: HD.display, fontWeight: 700, fontSize: 14, letterSpacing: -0.2 }}>Tracked</div>
        <Link href="/tracker" style={{ fontSize: 11, color: HD.amber, fontWeight: 600, cursor: 'pointer' }}>+ Add route</Link>
      </div>
      {SAVED.map((s, i) => {
        const onTarget = s.current <= s.target;
        return (
          <div key={i} style={{ padding: '12px 0', borderTop: i ? '1px solid rgba(255,248,235,0.1)' : 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: HD.mono, fontSize: 11, fontWeight: 600, color: 'rgba(255,248,235,0.9)' }}>{s.from} → {s.to}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 3 }}>
                <span style={{ fontFamily: HD.display, fontWeight: 800, fontSize: 17, color: onTarget ? HD.amber : HD.cream2 }}>{naira(s.current)}</span>
                <span style={{ fontFamily: HD.mono, fontSize: 9, color: 'rgba(255,248,235,0.5)' }}>tgt {nairaK(s.target)}</span>
              </div>
            </div>
            <div style={{ width: 60, height: 24 }}>
              <svg width="60" height="24" viewBox="0 0 60 24">
                <polyline
                  points={Array.from({ length: 10 }, (_, k) => {
                    const r = (s.trend === 'down' ? 1 - k / 9 : k / 9) * 0.7 + Math.sin(k + i) * 0.15 + 0.15;
                    return (k * 6.5) + ',' + ((1 - r) * 20 + 2);
                  }).join(' ')}
                  fill="none" stroke={s.trend === 'down' ? HD.amber : HD.bad} strokeWidth="1.5" strokeLinecap="round"
                />
              </svg>
            </div>
            {s.alerts > 0 && <span style={{ fontFamily: HD.mono, fontSize: 9, fontWeight: 700, padding: '2px 6px', background: HD.amber, color: HD.ink, borderRadius: 99 }}>{s.alerts}</span>}
          </div>
        );
      })}
      <div style={{ width: '100%', marginTop: 10, padding: '10px', border: '1px solid rgba(255,248,235,0.16)', background: 'transparent', color: HD.cream2, borderRadius: 10, fontSize: 12, fontWeight: 600, fontFamily: HD.font, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
        <Icon name="wa" size={13} color="#25D366" /> WhatsApp alerts on
      </div>
    </div>
  );
}

function DLoyaltyMini() {
  return (
    <div style={{ background: HD.cream2, border: '1px solid ' + HD.cream3, borderRadius: 16, padding: 16, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', right: -30, bottom: -30, width: 110, height: 110, borderRadius: 99, border: '20px solid ' + HD.amber, opacity: 0.16 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ fontSize: 11, color: HD.soft, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase' }}>Aero Points</div>
        <Badge>Eko tier</Badge>
      </div>
      <div style={{ fontFamily: HD.display, fontWeight: 800, fontSize: 30, letterSpacing: -0.8, marginTop: 4 }}>14,820</div>
      <div style={{ height: 5, background: HD.rule, borderRadius: 99, overflow: 'hidden', marginTop: 10 }}>
        <div style={{ width: '62%', height: '100%', background: HD.amber }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5, fontSize: 11, color: HD.soft }}>
        <span>9,180 to <b style={{ color: HD.ink }}>Naija Sky</b></span>
        <span style={{ fontFamily: HD.mono }}>62%</span>
      </div>
    </div>
  );
}

function DRightRail() {
  return (
    <div style={{ width: 320, padding: '20px 22px', background: HD.cream, borderLeft: '1px solid ' + HD.rule, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <DPriceChart />
      <DCalendarMini />
      <DTrackedRail />
      <DLoyaltyMini />
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────
export function ResultsDesktop({ flights }: { flights: FlightDto[] }) {
  const [sort, setSort] = useState<SortKey>('cheapest');
  const [directOnly, setDirectOnly] = useState(true);
  const [airlineFilter, setAirlineFilter] = useState<Set<AirlineCode>>(new Set(['GA', 'IB', 'UN']));
  const [window_, setWindow] = useState<DepartureWindow | null>('morning');
  const [tracking, setTracking] = useState(false);
  const [route, setRoute] = useState<{ from: string; to: string }>({ from: 'Lagos', to: 'Abuja' });

  const toggleAirline = (c: AirlineCode) => setAirlineFilter((prev) => {
    const next = new Set(prev);
    if (next.has(c)) next.delete(c); else next.add(c);
    return next;
  });

  const filtersState: FiltersState = {
    directOnly,
    toggleDirectOnly: () => setDirectOnly((v) => !v),
    airlineFilter,
    toggleAirline,
    window: window_,
    setWindow,
  };

  const visibleFlights = useMemo(() => {
    const filtered = flights.filter((f) => {
      if (directOnly && f.stops !== 0) return false;
      if (airlineFilter.size > 0 && !airlineFilter.has(f.airline.code as AirlineCode)) return false;
      if (window_ && departureWindow(f.departureTime) !== window_) return false;
      return true;
    });
    return sortFlights(filtered, sort);
  }, [flights, sort, directOnly, airlineFilter, window_]);

  const directCount = flights.filter((f) => f.stops === 0).length;
  const stopCount = flights.filter((f) => f.stops !== 0).length;

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: HD.cream, color: HD.ink, fontFamily: HD.font, WebkitFontSmoothing: 'antialiased', display: 'flex', flexDirection: 'column' }}>
      <DTopBar />
      <DSearchBar from={route.from} to={route.to} onSwap={() => setRoute((r) => ({ from: r.to, to: r.from }))} />
      <div style={{ flex: 1, display: 'flex', minHeight: 0, marginTop: 18, maxWidth: W + 200, width: '100%', margin: '18px auto 0' }}>
        <DFiltersRail state={filtersState} directCount={directCount} stopCount={stopCount} />
        <DResults flights={visibleFlights} sort={sort} setSort={setSort} tracking={tracking} onTrack={() => setTracking((v) => !v)} />
        <DRightRail />
      </div>
    </div>
  );
}
