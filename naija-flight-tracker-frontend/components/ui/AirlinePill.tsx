import { AIRLINES, type AirlineCode } from '@/lib/data';
import { theme as H } from '@/lib/theme';

export function AirlinePill({ code, size = 32 }: { code: AirlineCode; size?: number }) {
  const a = AIRLINES[code];
  return (
    <div
      style={{
        width: size, height: size, borderRadius: 9,
        background: a.bg, color: a.fg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: H.display, fontWeight: 800, fontSize: size * 0.42,
        letterSpacing: -0.5, flexShrink: 0,
      }}
    >
      {a.mark}
    </div>
  );
}
