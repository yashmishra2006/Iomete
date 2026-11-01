import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import LogoMarquee from './components/LogoMarquee.jsx';
import Guide from './components/Guide.jsx';
import PathRail from './components/PathRail.jsx';
import Zone from './components/Zone.jsx';
import Compare from './components/Compare.jsx';
import Pricing from './components/Pricing.jsx';
import Proof from './components/Proof.jsx';
import Faq from './components/Faq.jsx';
import Footer from './components/Footer.jsx';
import Chapters from './components/Chapters.jsx';
import { ZONES } from './data/content.js';
import { usePreferences, useActiveSection, useToast } from './hooks.js';

const ZONE_IDS = ZONES.map((z) => z.id);
const SECTION_IDS = ['overview', 'guide', ...ZONE_IDS, 'compare', 'pricing', 'proof', 'faq', 'contact'];
const CHAPTERS = ['overview', 'guide', 'zones', 'compare', 'pricing', 'proof', 'faq', 'contact'];

export default function App() {
  const prefs = usePreferences();
  const [path, setPath] = useState(null);
  const active = useActiveSection(SECTION_IDS);
  const [toastMsg, toast] = useToast();

  // Zones in the visitor's order: the chosen ones first, the rest after, nothing hidden.
  const orderedZones = useMemo(() => {
    if (!path) return ZONES;
    const first = path.map((p) => ZONES.find((z) => z.id === p.id)).filter(Boolean);
    const rest = ZONES.filter((z) => !first.includes(z));
    return [...first, ...rest];
  }, [path]);

  const nextOnPath = (id) => {
    if (!path) return null;
    const i = path.findIndex((p) => p.id === id);
    return i >= 0 && i < path.length - 1 ? path[i + 1] : null;
  };

  // Focus mode: only the section in view is at full brightness.
  useEffect(() => {
    document.body.dataset.focus = 'on';
    document.querySelectorAll('.focusable').forEach((el) => {
      el.classList.toggle('in-focus', el.id === active);
    });
  }, [active, orderedZones]);

  const chapterActive = ZONE_IDS.includes(active) ? 'zones' : active;

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-ink-foreground">Skip to content</a>
      <div id="top" />
      <Header active={chapterActive} prefs={prefs} />
      <PathRail path={path} active={active} onReset={() => setPath(null)} />
      <Chapters ids={CHAPTERS} active={chapterActive} />
      <main id="main">
        <Hero />
        <LogoMarquee />
        <Guide path={path} onPath={setPath} />
        <div id="zones" className="scroll-mt-28" aria-label="Sections by audience">
          {orderedZones.map((z, i) => <Zone key={z.id} zone={z} pathNext={nextOnPath(z.id)} band={i % 2 === 0} />)}
        </div>
        <Compare pathNext={nextOnPath('compare')} />
        <Pricing pathNext={nextOnPath('pricing')} />
        <Proof />
        <Faq />
        <Footer toast={toast} />
      </main>
      {toastMsg && (
        <div role="status" className="fixed bottom-6 left-1/2 z-[70] -translate-x-1/2 rounded-md bg-ink px-4 py-2 text-sm text-ink-foreground shadow-lg">{toastMsg}</div>
      )}
    </>
  );
}
