import type { CSSProperties, ReactNode } from 'react';
import { theme as H } from '@/lib/theme';

export function IconButton({
  children, size = 36, onClick, style,
}: { children: ReactNode; size?: number; onClick?: () => void; style?: CSSProperties }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: size, height: size, borderRadius: 12, border: '1px solid ' + H.cream3,
        background: H.cream2, color: H.ink, display: 'flex', alignItems: 'center',
        justifyContent: 'center', position: 'relative', cursor: 'pointer', ...style,
      }}
    >
      {children}
    </button>
  );
}
