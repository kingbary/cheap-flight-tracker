'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon, type IconName } from '@/components/icons/Icon';
import { theme as H } from '@/lib/theme';

const ITEMS: { key: string; icon: IconName; label: string; href: string }[] = [
  { key: 'home', icon: 'home', label: 'Home', href: '/' },
  { key: 'search', icon: 'search', label: 'Search', href: '/results' },
  { key: 'cal', icon: 'cal', label: 'Tracker', href: '/tracker' },
  { key: 'heart', icon: 'heart', label: 'Saved', href: '/dashboard' },
  { key: 'user', icon: 'user', label: 'Me', href: '/dashboard' },
];

export function BottomNav() {
  const pathname = usePathname();
  // "Saved" and "Me" both surface the dashboard (tracked trips + loyalty
  // live on one screen in this design) — only "Me" lights up for it, matching
  // the source prototype where no screen ever renders the heart tab active.
  const active = pathname === '/' ? 'home'
    : pathname === '/results' ? 'search'
    : pathname === '/tracker' ? 'cal'
    : pathname === '/dashboard' ? 'user'
    : null;

  return (
    <div
      style={{
        position: 'absolute', left: 12, right: 12, bottom: 26,
        background: H.ink, borderRadius: 28, padding: '10px 8px',
        display: 'flex', justifyContent: 'space-around',
        boxShadow: '0 12px 30px rgba(10,22,40,0.28)',
      }}
    >
      {ITEMS.map((item) => {
        const on = active === item.key;
        return (
          <Link
            key={item.key}
            href={item.href}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
              padding: '6px 12px', borderRadius: 18,
              background: on ? H.amber : 'transparent',
              color: on ? H.ink : 'rgba(255,248,235,0.7)',
              minWidth: 56,
            }}
          >
            <Icon name={item.icon} size={20} stroke={on ? 2.2 : 1.6} />
            <span style={{ fontSize: 10, fontWeight: on ? 700 : 500, letterSpacing: 0.3 }}>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
