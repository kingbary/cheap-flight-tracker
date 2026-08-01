'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@/components/icons/Icon';
import { BottomNav } from '@/components/nav/BottomNav';
import { MobileScreen } from '@/components/layout/MobileScreen';
import { naira, nairaK } from '@/lib/data';
import { theme as H } from '@/lib/theme';
import type { SavedTripDto, DailyFareDto } from '@/lib/api';

const iconBtn = {
  width: 36, height: 36, borderRadius: 12, border: '1px solid ' + H.cream3,
  background: H.cream2, color: H.ink, display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer',
};

export function Tracker({ savedTrip, dailyFares }: { savedTrip: SavedTripDto; dailyFares: DailyFareDto[] }) {
  const router = useRouter();
  const [swapped, setSwapped] = useState(false);
  const [alertOn, setAlertOn] = useState(true);

  // The calendar grid's weekday alignment (2 leading blanks, 4 trailing) is a fixed
  // display constant, same as the original mock — it isn't derived from real
  // calendar math, only the day values themselves come from the API.
  const cells: (number | null)[] = [
    null, null,
    ...dailyFares.map((f) => Math.round(f.price / 1000)),
    null, null, null, null,
  ];
  const valid = cells.filter((v): v is number => v != null);
  const lo = Math.min(...valid), hi = Math.max(...valid);
  const dayNum = (i: number) => { const n = i - 1; return n >= 1 && n <= 30 ? n : null; };
  const fromName = swapped ? savedTrip.destination.name : savedTrip.origin.name;
  const toName = swapped ? savedTrip.origin.name : savedTrip.destination.name;

  const cheapest = dailyFares.reduce((min, f) => (f.price < min.price ? f : min), dailyFares[0]);
  const cheapestDate = new Date(cheapest.date + 'T00:00:00');
  const maxPrice = Math.max(...dailyFares.map((f) => f.price));
  const savingsK = Math.round((maxPrice - cheapest.price) / 1000);
  const monthLabel = new Date(dailyFares[0].date + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <MobileScreen>
      <div style={{ padding: '56px 18px 110px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button onClick={() => router.back()} style={{ ...iconBtn, width: 36, height: 36 }}>
              <Icon name="arr-l" size={16} />
            </button>
            <div>
              <div style={{ fontSize: 11, color: H.soft, fontWeight: 500, letterSpacing: 0.4, textTransform: 'uppercase' }}>Cheapest days</div>
              <div style={{ fontFamily: H.display, fontWeight: 800, fontSize: 18, letterSpacing: -0.4, lineHeight: 1.1, marginTop: 2 }}>{fromName} → {toName}</div>
            </div>
          </div>
          <button onClick={() => setSwapped((v) => !v)} style={{ ...iconBtn, width: 36, height: 36 }}>
            <Icon name="swap" size={14} />
          </button>
        </div>

        {/* Cheapest callout */}
        <div style={{ background: H.ink, color: H.cream2, borderRadius: 18, padding: 16, marginBottom: 16, display: 'flex', gap: 14, alignItems: 'center' }}>
          <div style={{ width: 56, textAlign: 'center', background: H.amber, color: H.ink, borderRadius: 14, padding: '8px 0' }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase' }}>{cheapestDate.toLocaleDateString('en-US', { weekday: 'short' })}</div>
            <div style={{ fontFamily: H.display, fontWeight: 800, fontSize: 26, lineHeight: 1 }}>{cheapestDate.getDate()}</div>
            <div style={{ fontSize: 9, fontWeight: 600 }}>{cheapestDate.toLocaleDateString('en-US', { month: 'short' })}</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: 'rgba(255,248,235,0.55)', textTransform: 'uppercase', letterSpacing: 0.6, fontWeight: 600 }}>Cheapest day this month</div>
            <div style={{ fontFamily: H.display, fontWeight: 800, fontSize: 26, marginTop: 2, letterSpacing: -0.6 }}>{naira(cheapest.price)}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,248,235,0.65)', marginTop: 1 }}>Save up to ₦{savingsK}k vs priciest day</div>
          </div>
        </div>

        {/* Month calendar */}
        <div style={{ background: H.cream2, border: '1px solid ' + H.cream3, borderRadius: 18, padding: 14, marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ fontFamily: H.display, fontWeight: 700, fontSize: 16, letterSpacing: -0.3 }}>{monthLabel}</div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button style={{ ...iconBtn, width: 28, height: 28, borderRadius: 8 }}><Icon name="chev-l" size={12} /></button>
              <button style={{ ...iconBtn, width: 28, height: 28, borderRadius: 8 }}><Icon name="chev-r" size={12} /></button>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4, marginBottom: 6 }}>
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
              <div key={i} style={{ textAlign: 'center', fontFamily: H.mono, fontSize: 10, color: H.soft, fontWeight: 600 }}>{d}</div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4 }}>
            {cells.map((v, i) => {
              const dn = dayNum(i);
              if (v == null || dn == null) return <div key={i} style={{ height: 44 }} />;
              const t = (v - lo) / (hi - lo);
              const isMin = v === lo;
              const isToday = dn === 12;
              let bg = '#E1F0DB', fg = '#155233';
              if (t > 0.66) { bg = '#F4D9D2'; fg = '#7A2415'; } else if (t > 0.33) { bg = '#FBE8C9'; fg = '#7A4715'; }
              return (
                <div key={i} style={{ height: 44, borderRadius: 9, background: isMin ? H.amber : bg, color: isMin ? H.ink : fg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: isToday ? '1.5px solid ' + H.ink : 'none', position: 'relative' }}>
                  <div style={{ fontSize: 9, fontWeight: 600, opacity: 0.7, lineHeight: 1 }}>{dn}</div>
                  <div style={{ fontFamily: H.mono, fontWeight: 700, fontSize: 11, lineHeight: 1.1 }}>{v}k</div>
                  {isMin && <div style={{ position: 'absolute', top: 2, right: 3, fontSize: 8, fontWeight: 800 }}>★</div>}
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, fontSize: 10, color: H.soft, fontFamily: H.mono }}>
            <span>Cheap</span>
            <div style={{ flex: 1, height: 6, borderRadius: 3, background: 'linear-gradient(to right, #B8DAA8, #F2C97D, #E5896E)' }} />
            <span>Pricey</span>
          </div>
        </div>

        {/* WhatsApp alert toggle */}
        <div style={{ background: H.cream2, border: '1px solid ' + H.cream3, borderRadius: 18, padding: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: '#25D366', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="wa" size={22} color="#fff" />
          </div>
          <div style={{ flex: 1, lineHeight: 1.25 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: H.ink }}>WhatsApp me when it drops</div>
            <div style={{ fontSize: 11, color: H.mid }}>+234 ••• 4421 · alert under {nairaK(savedTrip.targetPrice)}</div>
          </div>
          <button
            onClick={() => setAlertOn((v) => !v)}
            aria-label="Toggle WhatsApp alerts"
            style={{ width: 44, height: 26, background: alertOn ? H.amber : H.rule, borderRadius: 99, position: 'relative', border: 'none', cursor: 'pointer' }}
          >
            <div style={{ position: 'absolute', top: 3, left: alertOn ? 21 : 3, width: 20, height: 20, background: '#fff', borderRadius: 99, boxShadow: '0 1px 2px rgba(0,0,0,0.2)', transition: 'left 0.15s ease' }} />
          </button>
        </div>
      </div>
      <BottomNav />
    </MobileScreen>
  );
}
