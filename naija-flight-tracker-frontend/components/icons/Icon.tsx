// Ported 1:1 from project/shared.jsx — lucide-style stroke icon set.
import type { CSSProperties } from 'react';

export type IconName =
  | 'search' | 'plane' | 'takeoff' | 'arr-r' | 'arr-l' | 'arr-up' | 'arr-dn'
  | 'swap' | 'cal' | 'bell' | 'map' | 'user' | 'home' | 'star' | 'star-fill'
  | 'heart' | 'filter' | 'wa' | 'check' | 'sparkle' | 'tr-dn' | 'tr-up'
  | 'clock' | 'menu' | 'x' | 'plus' | 'minus' | 'wifi' | 'briefcase' | 'pin'
  | 'lock' | 'bolt' | 'trophy' | 'spinner' | 'flag' | 'compass' | 'chev-r'
  | 'chev-l' | 'chev-dn' | 'dot';

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  stroke?: number;
  style?: CSSProperties;
}

export function Icon({ name, size = 20, color = 'currentColor', stroke = 1.75, style }: IconProps) {
  const p = {
    width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
    stroke: color, strokeWidth: stroke, strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const, style,
  };
  switch (name) {
    case 'search': return <svg {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>;
    case 'plane': return <svg {...p}><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" /></svg>;
    case 'takeoff': return <svg {...p}><path d="M2 22h20" /><path d="M3.5 13l3.5 1 4-3.5L7 4l1.5-.5 5 5 6-1.5a2 2 0 1 1 1 4l-9 2.5-3.5 3.5-3 1z" /></svg>;
    case 'arr-r': return <svg {...p}><path d="M5 12h14M13 5l7 7-7 7" /></svg>;
    case 'arr-l': return <svg {...p}><path d="M19 12H5M12 5l-7 7 7 7" /></svg>;
    case 'arr-up': return <svg {...p}><path d="M12 19V5M5 12l7-7 7 7" /></svg>;
    case 'arr-dn': return <svg {...p}><path d="M12 5v14M5 12l7 7 7-7" /></svg>;
    case 'swap': return <svg {...p}><path d="M16 3l4 4-4 4M20 7H4M8 21l-4-4 4-4M4 17h16" /></svg>;
    case 'cal': return <svg {...p}><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>;
    case 'bell': return <svg {...p}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>;
    case 'map': return <svg {...p}><path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z" /><path d="M9 4v16M15 6v16" /></svg>;
    case 'user': return <svg {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-7 8-7s8 3 8 7" /></svg>;
    case 'home': return <svg {...p}><path d="M3 11l9-7 9 7v9a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2z" /></svg>;
    case 'star': return <svg {...p}><path d="m12 2 3 7 7 .8-5.3 4.7 1.6 6.9L12 17.7l-6.3 3.7 1.6-6.9L2 9.8 9 9z" /></svg>;
    case 'star-fill': return <svg viewBox="0 0 24 24" width={size} height={size} fill={color} style={style}><path d="m12 2 3 7 7 .8-5.3 4.7 1.6 6.9L12 17.7l-6.3 3.7 1.6-6.9L2 9.8 9 9z" /></svg>;
    case 'heart': return <svg {...p}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21l8.84-8.61a5.5 5.5 0 0 0 0-7.78z" /></svg>;
    case 'filter': return <svg {...p}><path d="M3 6h18M6 12h12M10 18h4" /></svg>;
    case 'wa': return <svg viewBox="0 0 24 24" width={size} height={size} fill={color} style={style}><path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.5-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .1.2 2 3.1 4.9 4.3 2.9 1.1 2.9.8 3.4.7.5-.1 1.6-.7 1.9-1.3.2-.6.2-1.2.2-1.3 0-.1-.2-.2-.5-.4zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.1-1.3c1.4.8 3.1 1.3 4.9 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2z" /></svg>;
    case 'check': return <svg {...p}><path d="m5 12 5 5L20 7" /></svg>;
    case 'sparkle': return <svg {...p}><path d="M12 3l1.7 4.8L18.5 9.5l-4.8 1.7L12 16l-1.7-4.8L5.5 9.5l4.8-1.7z" /><path d="M19 14l.7 1.8L21.5 17l-1.8.7L19 19l-.7-1.3L16.5 17l1.8-1.2z" /></svg>;
    case 'tr-dn': return <svg {...p}><path d="M22 17l-8.5-8.5-5 5L2 7" /><path d="M16 17h6v-6" /></svg>;
    case 'tr-up': return <svg {...p}><path d="M22 7l-8.5 8.5-5-5L2 17" /><path d="M16 7h6v6" /></svg>;
    case 'clock': return <svg {...p}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>;
    case 'menu': return <svg {...p}><path d="M3 6h18M3 12h18M3 18h18" /></svg>;
    case 'x': return <svg {...p}><path d="M18 6L6 18M6 6l12 12" /></svg>;
    case 'plus': return <svg {...p}><path d="M12 5v14M5 12h14" /></svg>;
    case 'minus': return <svg {...p}><path d="M5 12h14" /></svg>;
    case 'wifi': return <svg {...p}><path d="M5 13a10 10 0 0 1 14 0M8.5 16.5a5 5 0 0 1 7 0" /><circle cx="12" cy="20" r="1" fill={color} /></svg>;
    case 'briefcase': return <svg {...p}><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>;
    case 'pin': return <svg {...p}><path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>;
    case 'lock': return <svg {...p}><rect x="4" y="11" width="16" height="11" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>;
    case 'bolt': return <svg viewBox="0 0 24 24" width={size} height={size} fill={color} style={style}><path d="M13 2L4 14h6l-1 8 9-12h-6z" /></svg>;
    case 'trophy': return <svg {...p}><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z" /><path d="M17 5h3a2 2 0 0 1 0 4h-3M7 5H4a2 2 0 0 0 0 4h3" /></svg>;
    case 'spinner': return <svg {...p}><path d="M12 2a10 10 0 1 1-7.07 2.93" /></svg>;
    case 'flag': return <svg {...p}><path d="M4 21V4h13l-2 4 2 4H4" /></svg>;
    case 'compass': return <svg {...p}><circle cx="12" cy="12" r="10" /><path d="M16 8l-2 6-6 2 2-6z" /></svg>;
    case 'chev-r': return <svg {...p}><path d="M9 6l6 6-6 6" /></svg>;
    case 'chev-l': return <svg {...p}><path d="M15 6l-6 6 6 6" /></svg>;
    case 'chev-dn': return <svg {...p}><path d="M6 9l6 6 6-6" /></svg>;
    case 'dot': return <svg viewBox="0 0 24 24" width={size} height={size} fill={color} style={style}><circle cx="12" cy="12" r="4" /></svg>;
    default: return null;
  }
}
