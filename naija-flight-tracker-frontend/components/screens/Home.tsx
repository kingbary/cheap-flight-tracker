'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@/components/icons/Icon';
import { BottomNav } from '@/components/nav/BottomNav';
import { MobileScreen } from '@/components/layout/MobileScreen';
import { CITIES, naira, type CityCode } from '@/lib/data';
import { theme as H } from '@/lib/theme';
import type { TrendingDto } from '@/lib/api';

const iconBtn = {
  width: 38, height: 38, borderRadius: 12, border: 'none',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  position: 'relative' as const, cursor: 'pointer',
};

export function Home({ trending }: { trending: TrendingDto[] }) {
  const router = useRouter();
  const [from, setFrom] = useState<CityCode>('LOS');
  const [to, setTo] = useState<CityCode>('ABV');

  const swap = () => { setFrom(to); setTo(from); };

  return (
    <MobileScreen>
      <div style={{ padding: '56px 18px 130px' }}>
        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
          <div>
            <div style={{ fontSize: 12, color: H.soft, fontWeight: 500, letterSpacing: 0.4, textTransform: 'uppercase' }}>Sannu, Adaeze</div>
            <div style={{ fontSize: 13, color: H.mid, marginTop: 2 }}>Where to today?</div>
          </div>
          <button
            onClick={() => router.push('/alerts')}
            style={{ ...iconBtn, background: H.cream2, color: H.ink, border: '1px solid ' + H.cream3 }}
          >
            <Icon name="bell" size={18} />
            <span style={{ position: 'absolute', top: 8, right: 8, width: 8, height: 8, background: H.amber, borderRadius: 99, border: '1.5px solid ' + H.cream2 }} />
          </button>
        </div>

        {/* Display heading */}
        <div style={{ fontFamily: H.display, fontWeight: 800, fontSize: 38, lineHeight: 0.95, letterSpacing: -1.5, marginBottom: 22 }}>
          Cheap flights<br />across <span style={{ color: H.amber, fontStyle: 'italic' }}>9ja</span> —<br />before they go.
        </div>

        {/* Search card */}
        <div style={{ background: H.ink, color: H.cream2, borderRadius: 22, padding: 16, position: 'relative', boxShadow: '0 16px 40px rgba(10,22,40,0.18)' }}>
          <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
            {['Round trip', 'One-way', 'Multi-city'].map((t, i) => (
              <span
                key={t}
                style={{
                  padding: '5px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600,
                  background: i === 0 ? H.amber : 'transparent',
                  color: i === 0 ? H.ink : 'rgba(255,248,235,0.6)',
                  border: i === 0 ? 'none' : '1px solid rgba(255,248,235,0.16)',
                }}
              >
                {t}
              </span>
            ))}
          </div>

          <div style={{ background: H.ink2, borderRadius: 14, padding: 14, position: 'relative' }}>
            <div>
              <div style={{ fontSize: 10, color: 'rgba(255,248,235,0.5)', letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 3 }}>From</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontFamily: H.display, fontWeight: 800, fontSize: 24, letterSpacing: -0.5 }}>{CITIES[from].name}</span>
                <span style={{ fontSize: 12, color: 'rgba(255,248,235,0.5)', fontFamily: H.mono }}>{from}</span>
              </div>
            </div>
            <div style={{ height: 1, background: 'rgba(255,248,235,0.08)', margin: '12px 0' }} />
            <div>
              <div style={{ fontSize: 10, color: 'rgba(255,248,235,0.5)', letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 3 }}>To</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontFamily: H.display, fontWeight: 800, fontSize: 24, letterSpacing: -0.5 }}>{CITIES[to].name}</span>
                <span style={{ fontSize: 12, color: 'rgba(255,248,235,0.5)', fontFamily: H.mono }}>{to}</span>
              </div>
            </div>
            <button
              onClick={swap}
              aria-label="Swap origin and destination"
              style={{
                position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                width: 38, height: 38, borderRadius: 99, border: '1px solid rgba(255,248,235,0.16)',
                background: H.ink, color: H.amber, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              }}
            >
              <Icon name="swap" size={16} />
            </button>
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <div style={{ flex: 1, background: H.ink2, borderRadius: 14, padding: '10px 12px' }}>
              <div style={{ fontSize: 10, color: 'rgba(255,248,235,0.5)', letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 3 }}>Depart</div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Tue, 14 Apr</div>
            </div>
            <div style={{ flex: 1, background: H.ink2, borderRadius: 14, padding: '10px 12px' }}>
              <div style={{ fontSize: 10, color: 'rgba(255,248,235,0.5)', letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 3 }}>Return</div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Fri, 17 Apr</div>
            </div>
          </div>

          <button
            onClick={() => router.push('/results')}
            style={{
              width: '100%', marginTop: 12, padding: '14px', border: 'none', borderRadius: 14,
              background: H.amber, color: H.ink, fontWeight: 700, fontSize: 15,
              fontFamily: H.font, letterSpacing: 0.2, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            <Icon name="search" size={17} stroke={2.2} /> Find flights
          </button>
        </div>

        {/* Hot drop banner */}
        <button
          onClick={() => router.push('/results')}
          style={{
            marginTop: 18, padding: '14px 16px', background: H.amber, color: H.ink, borderRadius: 18,
            display: 'flex', alignItems: 'center', gap: 12, width: '100%', border: 'none', cursor: 'pointer', textAlign: 'left',
          }}
        >
          <div style={{ width: 44, height: 44, borderRadius: 12, background: H.ink, color: H.amber, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon name="bolt" size={24} color={H.amber} />
          </div>
          <div style={{ flex: 1, lineHeight: 1.2 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.6, opacity: 0.7 }}>Tracked drop</div>
            <div style={{ fontFamily: H.display, fontWeight: 700, fontSize: 16, marginTop: 1 }}>LOS → ABV down 18%</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: H.display, fontWeight: 800, fontSize: 18 }}>{naira(55400)}</div>
            <div style={{ fontSize: 11, color: H.ink, opacity: 0.6, textDecoration: 'line-through' }}>{naira(67800)}</div>
          </div>
        </button>

        {/* Trending today */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 22, marginBottom: 10 }}>
          <div style={{ fontFamily: H.display, fontWeight: 700, fontSize: 18, letterSpacing: -0.4 }}>Trending today</div>
          <button onClick={() => router.push('/results')} style={{ fontSize: 12, color: H.amber, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>See all →</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {trending.slice(0, 4).map((t) => (
            <button
              key={t.id}
              onClick={() => router.push('/results')}
              style={{
                background: H.cream2, border: '1px solid ' + H.cream3, borderRadius: 16,
                padding: '12px 13px', textAlign: 'left', cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: H.mono, fontSize: 11, color: H.soft, marginBottom: 6 }}>
                <span style={{ fontWeight: 600, color: H.ink }}>{t.from.code}</span>
                <Icon name="arr-r" size={11} color={H.soft} />
                <span style={{ fontWeight: 600, color: H.ink }}>{t.to.code}</span>
              </div>
              <div style={{ fontFamily: H.display, fontWeight: 800, fontSize: 19, letterSpacing: -0.4 }}>{naira(t.price)}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 4, fontSize: 11, fontWeight: 600, color: t.drop < 0 ? H.ok : H.bad }}>
                <Icon name={t.drop < 0 ? 'tr-dn' : 'tr-up'} size={12} color={t.drop < 0 ? H.ok : H.bad} stroke={2.2} />
                {Math.abs(t.drop)}% this wk
              </div>
            </button>
          ))}
        </div>
      </div>
      <BottomNav />
    </MobileScreen>
  );
}
