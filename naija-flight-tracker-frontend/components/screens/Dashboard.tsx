'use client';

import { useRouter } from 'next/navigation';
import { Icon } from '@/components/icons/Icon';
import { Badge } from '@/components/ui/Badge';
import { BottomNav } from '@/components/nav/BottomNav';
import { MobileScreen } from '@/components/layout/MobileScreen';
import { SAVED, naira } from '@/lib/data';
import { theme as H } from '@/lib/theme';

const iconBtn = {
  width: 36, height: 36, borderRadius: 12, border: '1px solid ' + H.cream3,
  background: H.cream2, color: H.ink, display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer',
};

const RECENT: [string, string, string][] = [
  ['LOS', 'PHC', 'Apr 22 · 1 adult'],
  ['ABV', 'KAN', 'May 03 · 2 adults'],
  ['LOS', 'ENU', 'Apr 30 · 1 adult'],
];

export function Dashboard() {
  const router = useRouter();
  return (
    <MobileScreen>
      <div style={{ padding: '56px 0 110px' }}>
        <div style={{ padding: '0 18px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: H.display, fontWeight: 800, fontSize: 26, letterSpacing: -0.7 }}>Mine</div>
          <button style={{ ...iconBtn, width: 36, height: 36 }}>
            <Icon name="user" size={16} />
          </button>
        </div>

        {/* Loyalty card */}
        <div style={{ margin: '0 18px', background: H.ink, color: H.cream2, borderRadius: 22, padding: 18, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: -50, bottom: -50, width: 180, height: 180, borderRadius: 99, border: '40px solid ' + H.amber, opacity: 0.18 }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,248,235,0.55)', letterSpacing: 0.6, textTransform: 'uppercase' }}>Aero Points</div>
              <div style={{ fontFamily: H.display, fontWeight: 800, fontSize: 36, letterSpacing: -1, lineHeight: 1, marginTop: 6 }}>14,820</div>
            </div>
            <Badge tone="amber">Tier · Eko</Badge>
          </div>
          <div style={{ height: 6, background: 'rgba(255,248,235,0.16)', borderRadius: 99, overflow: 'hidden', marginTop: 14 }}>
            <div style={{ width: '62%', height: '100%', background: H.amber }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 11, color: 'rgba(255,248,235,0.65)' }}>
            <span>9,180 to <b style={{ color: H.amber }}>Naija Sky</b></span>
            <span style={{ fontFamily: H.mono }}>62%</span>
          </div>
        </div>

        {/* Saved trips */}
        <div style={{ padding: '20px 18px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ fontFamily: H.display, fontWeight: 700, fontSize: 16, letterSpacing: -0.3 }}>Tracked trips</div>
          <button onClick={() => router.push('/tracker')} style={{ fontSize: 12, color: H.amber, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>+ Add</button>
        </div>
        <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {SAVED.map((s, i) => {
            const onTarget = s.current <= s.target;
            return (
              <button
                key={i}
                onClick={() => router.push('/results')}
                style={{ background: H.cream2, border: '1px solid ' + H.cream3, borderRadius: 16, padding: 14, textAlign: 'left', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ flex: 1, fontFamily: H.mono, fontSize: 12, fontWeight: 600, letterSpacing: 0.4, color: H.ink }}>
                    {s.from} <span style={{ color: H.soft }}>→</span> {s.to}
                  </div>
                  <Icon name={s.trend === 'down' ? 'tr-dn' : 'tr-up'} size={14} color={s.trend === 'down' ? H.ok : H.bad} stroke={2.2} />
                  {s.alerts > 0 && <Badge tone="amber" style={{ padding: '2px 7px', fontSize: 10 }}>{s.alerts} alerts</Badge>}
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: H.display, fontWeight: 800, fontSize: 22, letterSpacing: -0.5, color: onTarget ? H.ok : H.ink, lineHeight: 1 }}>{naira(s.current)}</div>
                    <div style={{ fontSize: 10, color: H.soft, marginTop: 4 }}>target {naira(s.target)}</div>
                  </div>
                  <div style={{ width: 80, height: 32 }}>
                    <svg width="80" height="32" viewBox="0 0 80 32">
                      <polyline
                        points={Array.from({ length: 10 }, (_, k) => {
                          const r = (s.trend === 'down' ? 1 - k / 9 : k / 9) * 0.7 + Math.sin(k + i) * 0.15 + 0.15;
                          return (k * 9) + ',' + ((1 - r) * 28 + 2);
                        }).join(' ')}
                        fill="none" stroke={s.trend === 'down' ? H.ok : H.bad} strokeWidth="2" strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  {onTarget && <Badge tone="ok"><Icon name="check" size={11} /> Target</Badge>}
                </div>
              </button>
            );
          })}
        </div>

        {/* Recent searches */}
        <div style={{ padding: '20px 18px 8px' }}>
          <div style={{ fontFamily: H.display, fontWeight: 700, fontSize: 16, letterSpacing: -0.3 }}>Recent searches</div>
        </div>
        <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {RECENT.map((r, i) => (
            <button
              key={i}
              onClick={() => router.push('/results')}
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i < RECENT.length - 1 ? '1px solid ' + H.rule : 'none', background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
            >
              <Icon name="clock" size={16} color={H.soft} />
              <div style={{ flex: 1, fontFamily: H.mono, fontSize: 13, fontWeight: 600, color: H.ink }}>
                {r[0]} <span style={{ color: H.soft }}>→</span> {r[1]}
                <div style={{ fontFamily: H.font, fontSize: 11, color: H.soft, fontWeight: 400, marginTop: 2 }}>{r[2]}</div>
              </div>
              <Icon name="chev-r" size={14} color={H.soft} />
            </button>
          ))}
        </div>
      </div>
      <BottomNav />
    </MobileScreen>
  );
}
