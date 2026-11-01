import { Menu, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { useScrollProgress } from '../hooks.js';
import { SOURCES } from '../data/content.js';
import { cn } from '@/lib/utils';

const LINKS = [
  ['overview', 'Overview'],
  ['guide', 'Find your path'],
  ['zones', 'Who it’s for'],
  ['compare', 'Compare'],
  ['pricing', 'Pricing'],
  ['proof', 'Proof'],
  ['faq', 'FAQ'],
];

export default function Header({ active, prefs }) {
  const progress = useScrollProgress();
  const { setTheme } = prefs;
  const toggleTheme = () => {
    const dark = document.documentElement.dataset.theme === 'dark';
    setTheme(dark ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/85 backdrop-blur-md">
      <div className="wrap flex min-h-16 items-center gap-3">
        <a href="#top" className="flex items-center gap-2.5 font-heading text-[1.05rem] tracking-[0.12em] no-underline" aria-label="IOMETE, back to top">
          <span className="grid size-[26px] place-items-center rounded-md bg-ink" aria-hidden="true">
            <span className="size-3 rounded-sm border-2 border-dashed border-primary" />
          </span>
          IOMETE
        </a>

        <nav className="ml-4 hidden items-center gap-1 lg:flex" aria-label="Page sections">
          {LINKS.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? 'true' : undefined}
              className={cn(
                'relative rounded-md px-2.5 py-2 text-sm text-muted-foreground no-underline transition-colors hover:bg-secondary hover:text-foreground',
                active === id && 'text-foreground after:absolute after:inset-x-2.5 after:bottom-1 after:h-0.5 after:bg-primary',
              )}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={toggleTheme} aria-label="Toggle light or dark theme">
            <Sun className="dark:hidden" />
            <Moon className="hidden dark:block" />
          </Button>

          <Button asChild size="sm">
            <a href={SOURCES.contact} target="_blank" rel="noreferrer">Book a demo</a>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="font-heading font-light">Sections</SheetTitle>
              <nav className="mt-4 flex flex-col" aria-label="Page sections">
                {LINKS.map(([id, label]) => (
                  <a key={id} href={`#${id}`} className="border-b py-3 text-base no-underline last:border-0">{label}</a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="absolute inset-x-0 -bottom-px h-0.5 bg-primary transition-[width] duration-100" style={{ width: `${progress * 100}%` }} aria-hidden="true" />
    </header>
  );
}
