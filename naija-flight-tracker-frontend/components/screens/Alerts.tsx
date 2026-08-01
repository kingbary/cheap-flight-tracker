'use client';

import { useRouter } from 'next/navigation';
import { Icon } from '@/components/icons/Icon';
import { MobileScreen } from '@/components/layout/MobileScreen';
import { naira } from '@/lib/data';
import { theme as H } from '@/lib/theme';
import type { AlertDto } from '@/lib/api';

function timeAgo(iso: string): string {
  const minutes = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  const hours = Math.round(minutes / 60);
  return `${hours} hour${hours === 1 ? '' : 's'} ago`;
}

export function Alerts({ alerts }: { alerts: AlertDto[] }) {
  const router = useRouter();
  const latest = alerts[0];

  return (
    <MobileScreen background={H.ink}>
      <div style={{ padding: '56px 0 130px', color: H.cream2 }}>
        <div style={{ padding: '0 18px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={() => router.push('/')}
            style={{ width: 36, height: 36, borderRadius: 12, background: 'rgba(255,248,235,0.06)', border: '1px solid rgba(255,248,235,0.12)', color: H.cream2, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <Icon name="x" size={16} />
          </button>
          <div style={{ flex: 1, fontSize: 13, fontWeight: 600 }}>Alerts</div>
        </div>

        {latest && (
          <>
            <div style={{ padding: '20px 22px 0' }}>
              <div style={{ fontSize: 11, color: H.amber, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 8 }}>{timeAgo(latest.createdAt)}</div>
              <div style={{ fontFamily: H.display, fontWeight: 800, fontSize: 34, letterSpacing: -1.2, lineHeight: 1 }}>
                {latest.origin.name} → {latest.destination.name} just hit your target.
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,248,235,0.6)', marginTop: 10, lineHeight: 1.5 }}>
                {latest.flight.airline.name} dropped to <b style={{ color: H.amber }}>{naira(latest.flight.price)}</b>, {naira(latest.targetPrice - latest.flight.price)} below your alert.
                We saved a hold for 25 minutes.
              </div>
            </div>

            <div style={{ margin: '24px 22px 0', background: '#0F2F23', border: '1px solid #1F4839', borderRadius: 18, padding: '14px 14px 12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: 99, background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="wa" size={16} color="#fff" />
                </div>
                <div style={{ flex: 1, color: H.cream2, fontWeight: 600, fontSize: 12 }}>FlightFare · WhatsApp</div>
                <div style={{ fontFamily: H.mono, fontSize: 10, color: 'rgba(255,248,235,0.4)' }}>
                  {new Date(latest.createdAt).toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              <div style={{ background: '#1AA85C', color: '#fff', borderRadius: '14px 14px 14px 4px', padding: '10px 12px', fontSize: 13, lineHeight: 1.45 }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>✈️ Price alert</div>
                {latest.origin.code} → {latest.destination.code} is now <b>{naira(latest.flight.price)}</b> on {latest.flight.airline.name} {latest.flight.flightNumber} ({latest.flight.departureTime}).
                <br />That&apos;s <b>↓ {Math.round((1 - latest.flight.price / latest.flight.wasPrice) * 100)}%</b> from the previous fare.
                <br /><br />Reply <b>BOOK</b> to lock-in or <b>WAIT</b> to keep watching.
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                {['BOOK', 'WAIT', 'STOP'].map((c) => (
                  <span key={c} style={{ flex: 1, textAlign: 'center', padding: '8px', borderRadius: 10, background: 'rgba(255,248,235,0.04)', color: H.cream2, fontFamily: H.mono, fontSize: 11, fontWeight: 700, border: '1px solid rgba(255,248,235,0.08)' }}>{c}</span>
                ))}
              </div>
            </div>
          </>
        )}

        <div style={{ margin: '20px 22px 0' }}>
          <div style={{ fontSize: 11, color: 'rgba(255,248,235,0.5)', fontWeight: 600, letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 10 }}>Earlier</div>
          <div style={{ background: 'rgba(255,248,235,0.04)', border: '1px dashed rgba(255,248,235,0.14)', borderRadius: 14, padding: 18, textAlign: 'center' }}>
            <div style={{ width: 38, height: 38, borderRadius: 99, background: 'rgba(244,163,56,0.12)', color: H.amber, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
              <Icon name="bell" size={18} />
            </div>
            <div style={{ fontSize: 13, color: H.cream2, fontWeight: 600, marginBottom: 2 }}>You&apos;re all caught up</div>
            <div style={{ fontSize: 11, color: 'rgba(255,248,235,0.45)' }}>We&apos;ll buzz you the second a tracked route drops.</div>
          </div>
        </div>
      </div>

      {latest && (
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '14px 22px 28px', background: 'linear-gradient(to top, ' + H.ink + ' 70%, transparent)', display: 'flex', gap: 10 }}>
          <button
            onClick={() => router.back()}
            style={{ flex: 1, padding: '14px', border: '1px solid rgba(255,248,235,0.16)', borderRadius: 16, background: 'transparent', color: H.cream2, fontWeight: 600, fontSize: 14, fontFamily: H.font, cursor: 'pointer' }}
          >
            Keep watching
          </button>
          <button
            onClick={() => router.push(`/flights/${latest.flight.id}`)}
            style={{ flex: 1, padding: '14px', border: 'none', borderRadius: 16, background: H.amber, color: H.ink, fontWeight: 700, fontSize: 14, fontFamily: H.font, cursor: 'pointer' }}
          >
            Lock-in {naira(latest.flight.price)}
          </button>
        </div>
      )}
    </MobileScreen>
  );
}
