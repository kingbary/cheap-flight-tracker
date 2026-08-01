import { ResultsMobile } from './ResultsMobile';
import { ResultsDesktop } from './ResultsDesktop';
import type { FlightDto } from '@/lib/api';

// Only the results screen got a bespoke desktop design in the source bundle
// (harmattan-desktop.jsx) — everything else stays at its mobile width. We
// mount both trees and let CSS (.mobile-only / .desktop-only, see
// app/globals.css) pick one per viewport, avoiding SSR/matchMedia flicker.
export function Results({ flights }: { flights: FlightDto[] }) {
  return (
    <>
      <div className="mobile-only"><ResultsMobile flights={flights} /></div>
      <div className="desktop-only"><ResultsDesktop flights={flights} /></div>
    </>
  );
}
