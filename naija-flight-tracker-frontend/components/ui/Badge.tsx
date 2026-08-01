import type { CSSProperties, ReactNode } from 'react';
import { theme as H } from '@/lib/theme';

export type BadgeTone = 'amber' | 'ink' | 'ok' | 'bad' | 'cream';

const TONES: Record<BadgeTone, { bg: string; fg: string; ring?: string }> = {
  amber: { bg: H.amber, fg: H.ink },
  ink: { bg: H.ink, fg: H.cream2 },
  ok: { bg: '#D4EFDF', fg: '#155233' },
  bad: { bg: '#F4D9D2', fg: '#7A2415' },
  cream: { bg: H.cream2, fg: H.ink, ring: '1px solid ' + H.cream3 },
};

export function Badge({ tone = 'amber', children, style }: { tone?: BadgeTone; children: ReactNode; style?: CSSProperties }) {
  const t = TONES[tone];
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 4,
        padding: '4px 9px', borderRadius: 999, background: t.bg, color: t.fg,
        fontSize: 11, fontWeight: 600, letterSpacing: 0.2,
        border: t.ring || 'none', ...style,
      }}
    >
      {children}
    </span>
  );
}
