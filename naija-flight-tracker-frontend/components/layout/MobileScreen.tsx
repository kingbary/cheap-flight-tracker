import type { CSSProperties, ReactNode } from 'react';
import { theme as H } from '@/lib/theme';

// Wraps every mobile-first Harmattan screen in a responsive column: full-bleed
// on phones, centered as a card on wider viewports (no bespoke desktop design
// exists for these screens — only /results got one — so this keeps them at
// their intended mobile width rather than stretching the layout awkwardly).
export function MobileScreen({ children, background = H.cream }: { children: ReactNode; background?: string }) {
  return (
    <div
      style={{
        minHeight: '100dvh', width: '100%', display: 'flex', justifyContent: 'center',
        background: 'radial-gradient(ellipse at top, #FAF3E4 0%, #EFE6CD 100%)',
      }}
    >
      <div
        style={{
          width: '100%', maxWidth: 430, minHeight: '100dvh', position: 'relative',
          background, color: H.ink, fontFamily: H.font, overflow: 'hidden',
          WebkitFontSmoothing: 'antialiased',
          boxShadow: '0 24px 80px rgba(10,22,40,0.12)',
        } as CSSProperties}
      >
        {children}
      </div>
    </div>
  );
}
