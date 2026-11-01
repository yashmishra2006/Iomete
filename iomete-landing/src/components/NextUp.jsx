import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BRIDGES } from '../data/content.js';
import { scrollToId } from '../hooks.js';

/**
 * One-line hand-off at the end of a section: the question that opens the next
 * concept, one primary step, two quieter alternatives. Identical shape everywhere.
 * When the visitor has a path, the next stop on it takes precedence.
 */
export default function NextUp({ id, pathNext }) {
  const b = BRIDGES[id];
  if (!b) return null;
  const primary = pathNext ? [pathNext.id, pathNext.label] : b.primary;
  const alts = b.alts.filter(([aid]) => aid !== primary[0]).slice(0, 2);
  const go = (e, target) => { e.preventDefault(); scrollToId(target); };

  return (
    <nav className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-t pt-6" aria-label="Where to go next">
      <p className="font-heading text-lg font-light text-foreground md:text-xl">{pathNext ? 'Next on your path' : b.hook}</p>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <Button asChild className="bg-navy text-navy-foreground hover:bg-navy/85">
          <a href={`#${primary[0]}`} onClick={(e) => go(e, primary[0])}>{primary[1]} <ArrowRight /></a>
        </Button>
        {alts.length > 0 && (
          <span className="flex items-center gap-3 text-sm text-muted-foreground">
            or
            {alts.map(([aid, label]) => (
              <a key={aid} href={`#${aid}`} onClick={(e) => go(e, aid)} className="text-foreground underline-offset-4 hover:underline">{label}</a>
            ))}
          </span>
        )}
      </div>
    </nav>
  );
}
