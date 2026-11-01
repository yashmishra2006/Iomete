import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { scrollToId } from '../hooks.js';
import { LABELS } from '../labels.js';
import { cn } from '@/lib/utils';

/** Chapter dots on wide screens: every part of the page reachable from anywhere. */
export default function Chapters({ ids, active }) {
  return (
    <nav className="fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 xl:block" aria-label="Chapters">
      <TooltipProvider delayDuration={150}>
        <ul className="grid gap-2.5">
          {ids.map((id) => (
            <li key={id} className="flex justify-end">
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={`#${id}`}
                    aria-current={active === id ? 'true' : undefined}
                    aria-label={LABELS[id] || id}
                    onClick={(e) => { e.preventDefault(); scrollToId(id); }}
                    className="grid size-4 place-items-center"
                  >
                    <span className={cn('block size-2 rounded-full bg-input transition-transform', active === id && 'scale-150 bg-primary')} />
                  </a>
                </TooltipTrigger>
                <TooltipContent side="left">{LABELS[id] || id}</TooltipContent>
              </Tooltip>
            </li>
          ))}
        </ul>
      </TooltipProvider>
    </nav>
  );
}
