import { useState } from 'react';
import { Check } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Mark from './Mark.jsx';
import NextUp from './NextUp.jsx';
import { cn } from '@/lib/utils';

function host(u) {
  try { return new URL(u).pathname.replace(/^\/|\/$/g, '') || 'home'; } catch { return u; }
}

export function Sources({ srcs }) {
  return (
    <p className="text-xs text-muted-foreground">
      Source on iomete.com:{' '}
      {srcs.map((s, i) => (
        <span key={s}>{i > 0 && ', '}<a href={s} target="_blank" rel="noreferrer" className="underline underline-offset-2">{host(s)}</a></span>
      ))}
    </p>
  );
}

export function Points({ items, className }) {
  return (
    <ul className={cn('grid gap-2.5', className)}>
      {items.map((p) => (
        <li key={p} className="grid grid-cols-[1.1rem_1fr] items-start gap-2.5">
          <span className="mt-1 grid size-[1.1rem] place-items-center rounded-full bg-primary" aria-hidden="true">
            <Check className="size-3 text-primary-foreground" strokeWidth={3} />
          </span>
          <span>{p}</span>
        </li>
      ))}
    </ul>
  );
}

function MiniCompare({ rows }) {
  const [open, setOpen] = useState(null);
  return (
    <Card className="gap-0 overflow-hidden py-0">
      <Table>
        <TableHeader className="bg-secondary">
          <TableRow className="hover:bg-transparent">
            <TableHead className="font-mono text-[0.7rem] uppercase tracking-[0.08em]">Need</TableHead>
            <TableHead className="w-24 font-mono text-[0.7rem] uppercase tracking-[0.08em]">IOMETE</TableHead>
            <TableHead className="w-32 font-mono text-[0.7rem] uppercase tracking-[0.08em]">Snowflake / Databricks</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(([need, a, b, note], i) => (
            <TableRow key={need} className="cursor-pointer" onClick={() => setOpen(open === i ? null : i)}>
              <TableCell className="py-3 whitespace-normal">
                <button type="button" className="text-left underline decoration-dotted decoration-muted-foreground underline-offset-4" aria-expanded={open === i}>{need}</button>
                {open === i && <p className="mt-2 text-sm text-muted-foreground">{note}</p>}
              </TableCell>
              <TableCell className="py-3 align-top"><Mark v={a} /></TableCell>
              <TableCell className="py-3 align-top"><Mark v={b} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

/** One audience, one viewport: headline, three points, the comparison, a hand-off. */
export default function Zone({ zone, pathNext, band }) {
  const lead = zone.points ? zone.points.slice(0, 3) : [];
  const rest = zone.points ? zone.points.slice(3) : [];
  return (
    <section id={zone.id} className={cn('focusable scroll-mt-28 border-t py-14 md:py-20', band && 'bg-band')} aria-labelledby={`${zone.id}-title`}>
      <div className="wrap grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div>
          <span className="eyebrow">{zone.audience}</span>
          <h2 id={`${zone.id}-title`} className="mt-3 text-3xl md:text-4xl">{zone.title}</h2>
          <p className="mt-3 max-w-lg text-[1.05rem] text-muted-foreground">{zone.lead}</p>
          {lead.length > 0 && <Points items={lead} className="mt-5" />}
          {zone.cards && (
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Industries">
              {zone.cards.map((c) => <li key={c.name} className="rounded-full border bg-card px-3 py-1 text-sm">{c.name}</li>)}
            </ul>
          )}
          <Accordion type="single" collapsible className="mt-5">
            <AccordionItem value="more">
              <AccordionTrigger className="font-medium">Learn more</AccordionTrigger>
              <AccordionContent className="grid gap-3 text-[0.95rem] text-muted-foreground">
                {rest.length > 0 && <Points items={rest} className="text-foreground" />}
                {zone.cards && zone.cards.map((c) => <p key={c.name}><strong className="text-foreground">{c.name}.</strong> {c.text}</p>)}
                {zone.more.map((m) => <p key={m}>{m}</p>)}
                <Sources srcs={zone.srcs} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div>
          <MiniCompare rows={zone.compare} />
        </div>
      </div>
      <div className="wrap"><NextUp id={zone.id} pathNext={pathNext} /></div>
    </section>
  );
}
