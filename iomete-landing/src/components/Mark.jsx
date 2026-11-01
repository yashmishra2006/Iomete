import { Check, X, Minus, CircleDashed } from 'lucide-react';
import { cn } from '@/lib/utils';

const KIND = {
  yes: { Icon: Check, label: 'Yes', cls: 'bg-ok-bg text-ok' },
  no: { Icon: X, label: 'No', cls: 'bg-bad-bg text-bad' },
  partial: { Icon: Minus, label: 'Partly', cls: 'bg-warn-bg text-warn' },
  na: { Icon: CircleDashed, label: 'Not stated', cls: 'bg-muted text-muted-foreground' },
};

/** Yes / No / Partly / Not stated, as an icon chip plus word. */
export default function Mark({ v, text, className }) {
  const k = KIND[v] || KIND.na;
  return (
    <span className={cn('inline-flex items-center gap-1.5 text-[0.8rem] font-medium whitespace-nowrap', className)}>
      <span className={cn('inline-grid size-[18px] place-items-center rounded-full', k.cls)} aria-hidden="true">
        <k.Icon className="size-3" strokeWidth={2.5} />
      </span>
      {text || k.label}
    </span>
  );
}
