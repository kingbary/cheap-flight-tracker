// Harmattan design tokens — navy ink + amber + cream, editorial display.
// Ported 1:1 from project/direction1.jsx / project/harmattan-desktop.jsx (H / HD palettes).
import type { CSSProperties } from 'react';

export const theme = {
  ink: '#0A1628',
  ink2: '#16243F',
  amber: '#F4A338',
  amber2: '#F2C97D',
  cream: '#FAF3E4',
  cream2: '#FFF8EB',
  cream3: '#EFE6CD',
  rule: '#E2D5B0',
  mid: '#5C5039',
  soft: '#8A7B5E',
  ok: '#1F8A5B',
  bad: '#C8442A',
  font: 'var(--font-plex-sans), system-ui, sans-serif',
  display: 'var(--font-bricolage), var(--font-plex-sans), sans-serif',
  mono: 'var(--font-plex-mono), ui-monospace, monospace',
} as const;

export const iconBtnStyle: CSSProperties = {
  width: 38,
  height: 38,
  borderRadius: 12,
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  cursor: 'pointer',
};
