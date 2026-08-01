'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@/components/icons/Icon';
import { AirlinePill } from '@/components/ui/AirlinePill';
import { BottomNav } from '@/components/nav/BottomNav';
import { MobileScreen } from '@/components/layout/MobileScreen';
import { naira, type AirlineCode } from '@/lib/data';
import { departureWindow, durationMinutes, sortFlights, SORT_LABELS, type SortKey } from '@/lib/filters';
import { theme as H } from '@/lib/theme';
import type { FlightDto } from '@/lib/api';

const iconBtn = {
  width: 36, height: 36, borderRadius: 12, border: '1px solid ' + H.cream3,
  background: H.cream2, color: H.ink, display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer',
};

const SORT_CYCLE: SortKey[] = ['cheapest', 'bestvalue', 'earliest', 'shortest'];

export function ResultsMobile({ flights }: { flights: FlightDto[] }) {
  const router = useRouter();
  const [sort, setSort] = useState<SortKey>('cheapest');
  const [directOnly, setDirectOnly] = useState(false);
  const [morningOnly, setMorningOnly] = useState(false);
  const [shortOnly, setShortOnly] = useState(false);
  const [airlineFilter, setAirlineFilter] = useState<Set<AirlineCode>>(new Set());
  const [tracking, setTracking] = useState(false);

  const toggleAirline = (code: AirlineCode) => {
    setAirlineFilter((prev) => {
      const next = new Set(prev);
      if (next.has(code)) next.delete(code); else next.add(code);
      return next;
    });
  };

  const cycleSort = () => setSort((s) => SORT_CYCLE[(SORT_CYCLE.indexOf(s) + 1) % SORT_CYCLE.length]);

  const visibleFlights = useMemo(() => {
    const filtered = flights.filter((f) => {
      if (directOnly && f.stops !== 0) return false;
      if (morningOnly && departureWindow(f.departureTime) !== 'morning') return false;
      if (shortOnly && durationMinutes(f.duration) > 75) return false;
      if (airlineFilter.size > 0 && !airlineFilter.has(f.airline.code as AirlineCode)) return false;
      return true;
    });
    return sortFlights(filtered, sort);
  }, [flights, sort, directOnly, morningOnly, shortOnly, airlineFilter]);

  const chips: { key: string; label: string; on: boolean; onClick: () => void }[] = [
    { key: 'direct', label: 'Direct only', on: directOnly, onClick: () => setDirectOnly((v) => !v) },
    { key: 'morning', label: 'Morning', on: morningOnly, onClick: () => setMorningOnly((v) => !v) },
    { key: 'short', label: '≤ 1h 15m', on: shortOnly, onClick: () => setShortOnly((v) => !v) },
    { key: 'ap', label: 'Air Peace', on: airlineFilter.has('AP'), onClick: () => toggleAirline('AP') },
    { key: 'ib', label: 'Ibom Air', on: airlineFilter.has('IB'), onClick: () => toggleAirline('IB') },
  ];

  return (
    <MobileScreen>
      <div style={{ paddingTop: 56, paddingBottom: 110 }}>
        {/* Top route bar */}
        <div style={{ padding: '8px 18px 14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button onClick={() => router.push('/')} style={{ ...iconBtn, width: 36, height: 36 }}>
              <Icon name="arr-l" size={16} />
            </button>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: H.display, fontWeight: 800, fontSize: 18, lineHeight: 1, letterSpacing: -0.4 }}>Lagos → Abuja</div>
              <div style={{ fontSize: 11, color: H.mid, marginTop: 4 }}>Tue 14 Apr · 1 adult · Economy</div>
            </div>
            <button onClick={() => router.push('/')} style={{ fontSize: 12, color: H.amber, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>Edit</button>
          </div>
        </div>

        {/* Prediction banner */}
        <div style={{ margin: '0 18px 14px', background: H.ink, color: H.cream2, borderRadius: 16, padding: 14, display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: H.amber, color: H.ink, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon name="tr-dn" size={20} stroke={2.2} />
          </div>
          <div style={{ flex: 1, lineHeight: 1.25 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Prices likely to drop ₦7–12k</div>
            <div style={{ fontSize: 11, color: 'rgba(255,248,235,0.55)' }}>Based on 30-day pattern · 78% confident</div>
          </div>
          <button
            onClick={() => setTracking((v) => !v)}
            style={{
              fontSize: 12, fontWeight: 700, padding: '6px 10px', borderRadius: 99, cursor: 'pointer',
              color: tracking ? H.ink : H.amber,
              background: tracking ? H.amber : 'transparent',
              border: '1px solid ' + (tracking ? H.amber : 'rgba(244,163,56,0.5)'),
            }}
          >
            {tracking ? 'Tracking' : 'Track'}
          </button>
        </div>

        {/* Filter chips */}
        <div style={{ display: 'flex', gap: 8, padding: '0 18px 12px', overflowX: 'auto' }}>
          <span
            onClick={cycleSort}
            style={{
              padding: '7px 12px', borderRadius: 99, fontSize: 12, fontWeight: 600,
              background: H.ink, color: H.cream2, whiteSpace: 'nowrap', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 5,
            }}
          >
            <Icon name="filter" size={12} color={H.cream2} />Sort: {SORT_LABELS[sort]}
          </span>
          {chips.map((c) => (
            <span
              key={c.key}
              onClick={c.onClick}
              style={{
                padding: '7px 12px', borderRadius: 99, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                background: c.on ? H.ink : H.cream2, color: c.on ? H.cream2 : H.ink,
                border: c.on ? 'none' : '1px solid ' + H.cream3, whiteSpace: 'nowrap',
              }}
            >
              {c.label}
            </span>
          ))}
        </div>

        {/* Count line */}
        <div style={{ padding: '4px 18px 10px', display: 'flex', justifyContent: 'space-between', fontSize: 11, color: H.soft }}>
          <span><b style={{ color: H.ink }}>{visibleFlights.length} flights</b> · {SORT_LABELS[sort].toLowerCase()} first</span>
          <span style={{ fontFamily: H.mono }}>updated 2 min ago</span>
        </div>

        {/* Cards */}
        <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {visibleFlights.length === 0 && (
            <div style={{ padding: '32px 0', textAlign: 'center', color: H.soft, fontSize: 13 }}>
              No flights match these filters.
            </div>
          )}
          {visibleFlights.map((f, i) => {
            const top = i === 0;
            return (
              <div
                key={f.id}
                onClick={() => router.push(`/flights/${f.id}`)}
                role="button"
                tabIndex={0}
                style={{
                  background: top ? H.amber : H.cream2,
                  border: top ? 'none' : '1px solid ' + H.cream3,
                  borderRadius: 18, padding: 14,
                  position: 'relative', cursor: 'pointer',
                  boxShadow: top ? '0 10px 24px rgba(244,163,56,0.32)' : 'none',
                }}
              >
                {top && (
                  <div style={{ position: 'absolute', top: -8, right: 14, background: H.ink, color: H.amber, padding: '3px 10px', borderRadius: 99, fontSize: 10, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase' }}>
                    ↓ {f.deal || 'Top pick'}
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <AirlinePill code={f.airline.code as AirlineCode} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13, color: H.ink }}>{f.airline.name}</div>
                    <div style={{ fontFamily: H.mono, fontSize: 11, color: top ? H.ink2 : H.soft }}>{f.flightNumber} · {f.stops === 0 ? 'Direct' : f.stops + ' stop'}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    {f.wasPrice !== f.price && <div style={{ fontSize: 11, color: top ? H.ink2 : H.soft, textDecoration: 'line-through' }}>{naira(f.wasPrice)}</div>}
                    <div style={{ fontFamily: H.display, fontWeight: 800, fontSize: 20, letterSpacing: -0.4 }}>{naira(f.price)}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div>
                    <div style={{ fontFamily: H.display, fontWeight: 700, fontSize: 17, lineHeight: 1 }}>{f.departureTime}</div>
                    <div style={{ fontFamily: H.mono, fontSize: 10, color: top ? H.ink2 : H.soft, marginTop: 3 }}>{f.origin.code}</div>
                  </div>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ flex: 1, borderTop: '1.5px dotted ' + (top ? H.ink2 : H.rule) }} />
                    <span style={{ fontSize: 10, fontFamily: H.mono, color: top ? H.ink2 : H.soft }}>{f.duration}</span>
                    <div style={{ flex: 1, borderTop: '1.5px dotted ' + (top ? H.ink2 : H.rule) }} />
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: H.display, fontWeight: 700, fontSize: 17, lineHeight: 1 }}>{f.arrivalTime}</div>
                    <div style={{ fontFamily: H.mono, fontSize: 10, color: top ? H.ink2 : H.soft, marginTop: 3 }}>{f.destination.code}</div>
                  </div>
                </div>
                {top && (
                  <button
                    onClick={(e) => { e.stopPropagation(); router.push(`/flights/${f.id}`); }}
                    style={{
                      width: '100%', marginTop: 12, padding: '10px', border: 'none', borderRadius: 12,
                      background: H.ink, color: H.cream2, fontWeight: 700, fontSize: 13, cursor: 'pointer',
                      fontFamily: H.font, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                    }}
                  >
                    <Icon name="lock" size={14} /> Lock-in {naira(f.price)}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <BottomNav />
    </MobileScreen>
  );
}
