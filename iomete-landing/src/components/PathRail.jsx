import { Button } from '@/components/ui/button';
import { scrollToId } from '../hooks.js';
import { cn } from '@/lib/utils';

export default function PathRail({ path, active, onReset }) {
  if (!path) return null;
  return (
    <div className="sticky top-16 z-40 border-b bg-card" role="navigation" aria-label="Your path through this page">
      <div className="wrap flex min-h-[3.25rem] items-center gap-3">
        <span className="shrink-0 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-muted-foreground">Your path</span>
        <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto py-1.5 [scrollbar-width:none]">
          {path.map((p, i) => (
            <a
              key={p.id}
              href={`#${p.id}`}
              aria-current={active === p.id ? 'true' : undefined}
              onClick={(e) => { e.preventDefault(); scrollToId(p.id); }}
              className={cn(
                'inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-sm no-underline transition-colors',
                active === p.id ? 'border-primary bg-primary text-primary-foreground' : 'hover:bg-secondary',
              )}
            >
              <span className="font-mono text-[0.72rem] opacity-70">{i + 1}</span>
              {p.label}
            </a>
          ))}
        </div>
        <Button variant="outline" size="sm" className="shrink-0" onClick={onReset}>Show everything</Button>
      </div>
    </div>
  );
}
