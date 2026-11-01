import { LOGOS } from '../data/content.js';

/** The organisations whose logos appear on iomete.com, scrolling continuously. Pauses on hover. */
export default function LogoMarquee() {
  const items = [...LOGOS, ...LOGOS];
  return (
    <div className="border-y bg-band py-6">
      <div className="wrap">
        <p className="mb-4 text-center font-mono text-[0.68rem] uppercase tracking-[0.1em] text-muted-foreground">Organisations whose logos appear on iomete.com</p>
      </div>
      <div className="marquee overflow-hidden" aria-label="Organisation logos">
        <ul className="marquee-track flex w-max items-center gap-14 pr-14">
          {items.map((l, i) => (
            <li key={`${l.file}-${i}`} className="shrink-0" aria-hidden={i >= LOGOS.length ? 'true' : undefined}>
              <img
                src={`/logos/${l.file}`}
                alt={i < LOGOS.length ? l.name : ''}
                height="28"
                loading="lazy"
                className="h-7 w-auto max-w-[10rem] object-contain opacity-70 grayscale transition-opacity hover:opacity-100 dark:invert"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
