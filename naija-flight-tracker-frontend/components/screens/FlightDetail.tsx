'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@/components/icons/Icon';
import { Badge } from '@/components/ui/Badge';
import { AirlinePill } from '@/components/ui/AirlinePill';
import { MobileScreen } from '@/components/layout/MobileScreen';
import { PRICE_HISTORY, naira, type AirlineCode } from '@/lib/data';
import { theme as H } from '@/lib/theme';
import type { FlightDto } from '@/lib/api';

const iconBtn = {
  width: 36, height: 36, borderRadius: 12, border: '1px solid ' + H.cream3,
  background: H.cream2, color: H.ink, display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer',
};

export function FlightDetail({ flight }: { flight: FlightDto }) {
  const router = useRouter();
  const airline = flight.airline;

  const [saved, setSaved] = useState(false);
  const [alertOn, setAlertOn] = useState(false);
  const [locked, setLocked] = useState(false);

  const data = PRICE_HISTORY;
  const minV = Math.min(...data), maxV = Math.max(...data);
  const w = 320, hh = 90;
  const path = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = hh - ((v - minV) / (maxV - minV)) * hh;
    return (i ? 'L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1);
  }).join(' ');
  const minIdx = data.indexOf(minV);
  const minX = (minIdx / (data.length - 1)) * w;
  const minY = hh - ((minV - minV) / (maxV - minV)) * hh;
  const lastY = hh - ((data[data.length - 1] - minV) / (maxV - minV)) * hh;

  // fl-01 is the flagship deal surfaced from Home/Results — keep its
  // narrative WAIT prediction exactly as designed. Other flights fall
  // back to a simple heuristic: already-discounted fares (was > price)
  // keep falling; unchanged fares are treated as near their floor.
  const verdict: 'WAIT' | 'BOOK' = flight.id === 'fl-01' || flight.wasPrice > flight.price ? 'WAIT' : 'BOOK';
  const verdictColor = verdict === 'BOOK' ? H.bad : H.ok;
  const potentialDrop = Math.max(4, Math.round((flight.wasPrice - flight.price) / 1000) || Math.round(flight.price * 0.12 / 1000));

  return (
    <MobileScreen>
      <div style={{ padding: '56px 0 150px' }}>
        <div style={{ padding: '0 18px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={() => router.back()} style={{ ...iconBtn, width: 36, height: 36 }}>
            <Icon name="arr-l" size={16} />
          </button>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setSaved((v) => !v)} style={{ ...iconBtn, width: 36, height: 36, color: saved ? H.bad : H.ink }}>
              <Icon name="heart" size={16} color={saved ? H.bad : H.ink} stroke={saved ? 2.4 : 1.75} />
            </button>
            <button onClick={() => setAlertOn((v) => !v)} style={{ ...iconBtn, width: 36, height: 36, color: alertOn ? H.amber : H.ink, borderColor: alertOn ? H.amber : H.cream3 }}>
              <Icon name="bell" size={16} />
            </button>
          </div>
        </div>

        {/* Hero card */}
        <div style={{ margin: '0 18px', background: H.ink, color: H.cream2, borderRadius: 22, padding: 20, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: -40, top: -40, width: 140, height: 140, borderRadius: 99, background: H.amber, opacity: 0.18 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <AirlinePill code={flight.airline.code as AirlineCode} size={28} />
            <div style={{ fontSize: 12, fontWeight: 600 }}>{airline.name}</div>
            <div style={{ fontFamily: H.mono, fontSize: 11, color: 'rgba(255,248,235,0.5)' }}>{flight.flightNumber}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14 }}>
            <div>
              <div style={{ fontFamily: H.display, fontWeight: 800, fontSize: 42, lineHeight: 0.95, letterSpacing: -1.5 }}>{flight.departureTime}</div>
              <div style={{ fontFamily: H.mono, fontSize: 11, marginTop: 2, color: 'rgba(255,248,235,0.55)' }}>{flight.origin.code} · Tue 14 Apr</div>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: 8 }}>
              <div style={{ fontFamily: H.mono, fontSize: 10, color: H.amber, marginBottom: 4 }}>{flight.duration} · {flight.stops === 0 ? 'DIRECT' : flight.stops + ' STOP'}</div>
              <div style={{ width: '100%', height: 1, background: 'rgba(255,248,235,0.2)', position: 'relative' }}>
                <Icon name="takeoff" size={14} color={H.amber} style={{ position: 'absolute', top: -7, left: '50%', transform: 'translateX(-50%)', background: H.ink, padding: '0 4px' }} />
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: H.display, fontWeight: 800, fontSize: 42, lineHeight: 0.95, letterSpacing: -1.5 }}>{flight.arrivalTime}</div>
              <div style={{ fontFamily: H.mono, fontSize: 11, marginTop: 2, color: 'rgba(255,248,235,0.55)' }}>{flight.destination.code}</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
            <Badge tone="amber"><Icon name="briefcase" size={11} /> 7kg carry-on</Badge>
            <Badge tone="amber" style={{ background: 'rgba(244,163,56,0.18)', color: H.amber }}>15kg checked +₦8k</Badge>
            <Badge tone="amber" style={{ background: 'rgba(244,163,56,0.18)', color: H.amber }}><Icon name="check" size={11} /> Free changes</Badge>
          </div>
        </div>

        {/* Prediction */}
        <div style={{ margin: '14px 18px 0', background: H.cream2, border: '1px solid ' + H.cream3, borderRadius: 22, padding: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: H.soft, letterSpacing: 0.6, textTransform: 'uppercase' }}>Price prediction</div>
            <Badge tone="ok">78% confident</Badge>
          </div>
          <div style={{ fontFamily: H.display, fontWeight: 800, fontSize: 26, letterSpacing: -0.8, lineHeight: 1.05, marginBottom: 4 }}>
            We say <span style={{ color: verdictColor }}>{verdict}</span>
            {verdict === 'WAIT'
              ? <> — could drop another <span style={{ color: H.amber, fontStyle: 'italic' }}>₦{potentialDrop}k</span> by Tue</>
              : <> — this fare score rarely goes lower</>}
          </div>
          <div style={{ fontSize: 12, color: H.mid, lineHeight: 1.4, marginBottom: 14 }}>
            This route&apos;s been falling for 11 days. Last 3 Tuesdays bottomed around ₦{minV}k.
          </div>

          <div style={{ position: 'relative' }}>
            <svg width="100%" viewBox={`0 0 ${w} ${hh + 24}`} style={{ display: 'block' }}>
              <defs>
                <linearGradient id="hgrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor={H.amber} stopOpacity="0.32" />
                  <stop offset="1" stopColor={H.amber} stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={path + ` L${w},${hh} L0,${hh} Z`} fill="url(#hgrad)" />
              <path d={path} stroke={H.ink} strokeWidth="2" fill="none" strokeLinejoin="round" />
              <circle cx={minX} cy={minY} r="5" fill={H.amber} stroke={H.ink} strokeWidth="2" />
              <circle cx={w - 4} cy={lastY} r="4" fill={H.ink} />
              <text x={minX} y={minY - 9} fontSize="10" fontFamily={H.mono} fill={H.ink} textAnchor="middle" fontWeight="700">low ₦{minV}k</text>
              <text x="0" y={hh + 18} fontSize="9" fontFamily={H.mono} fill={H.soft}>30 days ago</text>
              <text x={w} y={hh + 18} fontSize="9" fontFamily={H.mono} fill={H.soft} textAnchor="end">today {naira(flight.price)}</text>
            </svg>
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '14px 18px 28px', background: 'linear-gradient(to top, ' + H.cream + ' 70%, transparent)', display: 'flex', gap: 10, alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: H.soft, fontWeight: 600 }}>Total · 1 adult</div>
          <div style={{ fontFamily: H.display, fontWeight: 800, fontSize: 24, letterSpacing: -0.6, lineHeight: 1 }}>{naira(flight.price)}</div>
        </div>
        <button
          onClick={() => setLocked(true)}
          disabled={locked}
          style={{
            flex: 1, padding: '14px', border: 'none', borderRadius: 16, cursor: locked ? 'default' : 'pointer',
            background: locked ? H.ok : H.amber, color: locked ? '#fff' : H.ink, fontWeight: 700, fontSize: 14,
            fontFamily: H.font, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}
        >
          <Icon name={locked ? 'check' : 'lock'} size={14} /> {locked ? 'Locked in!' : 'Lock-in'}
        </button>
      </div>
    </MobileScreen>
  );
}
