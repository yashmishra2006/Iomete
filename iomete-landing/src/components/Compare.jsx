import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Mark from './Mark.jsx';
import NextUp from './NextUp.jsx';
import { COMPARE, TCO_PROFILES, SOURCES } from '../data/content.js';
import { cn } from '@/lib/utils';

/** One viewport: one topic of the comparison at a time. Everything else is a tab or an expander. */
export default function Compare({ pathNext }) {
  const [filter, setFilter] = useState(COMPARE.groups[0].name);
  const groups = filter === 'all' ? COMPARE.groups : COMPARE.groups.filter((g) => g.name === filter);

  return (
    <section id="compare" className="focusable scroll-mt-28 border-t py-14 md:py-20" aria-labelledby="compare-title">
      <div className="wrap">
        <span className="eyebrow">Compare without leaving</span>
        <h2 id="compare-title" className="mt-3 max-w-3xl text-3xl md:text-4xl">IOMETE next to Databricks, Snowflake and doing it yourself</h2>

        <Tabs value={filter} onValueChange={setFilter} className="mt-6">
          <TabsList className="flex-wrap">
            {COMPARE.groups.map((g) => <TabsTrigger key={g.name} value={g.name}>{g.name}</TabsTrigger>)}
            <TabsTrigger value="all">Everything</TabsTrigger>
          </TabsList>
        </Tabs>

        <Card className="mt-4 gap-0 overflow-hidden py-0">
          <div className="overflow-x-auto">
            <Table className="min-w-[56rem]">
              <TableHeader className="bg-secondary">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-mono text-[0.7rem] uppercase tracking-[0.08em]">Requirement</TableHead>
                  {COMPARE.columns.map((c) => <TableHead key={c} className="font-mono text-[0.7rem] uppercase tracking-[0.08em]">{c}</TableHead>)}
                </TableRow>
              </TableHeader>
              <TableBody>
                {groups.map((g) => (
                  <GroupRows key={g.name} group={g} showGroup={filter === 'all'} />
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
        <p className="mt-2 text-xs text-muted-foreground">
          Every cell repeats a statement IOMETE has published on iomete.com, including where a competitor is ahead. “Not stated” means the site says nothing.
        </p>

        <Accordion type="single" collapsible className="mt-6">
          <AccordionItem value="tco">
            <AccordionTrigger className="font-medium">Published cost estimates for three workload profiles</AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-4 md:grid-cols-3">
                {TCO_PROFILES.map((t) => (
                  <Card key={t.name} className="gap-3">
                    <CardHeader>
                      <CardTitle className="font-heading text-xl font-normal">{t.name}</CardTitle>
                      <CardDescription>{t.spec}</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-1 text-sm tabular-nums">
                      <div className="flex justify-between border-b py-1.5"><span className="text-muted-foreground">Snowflake</span><span>{t.snowflake}</span></div>
                      <div className="flex justify-between border-b py-1.5"><span className="text-muted-foreground">Databricks</span><span>{t.databricks}</span></div>
                      <div className="flex justify-between py-1.5 font-semibold"><span>IOMETE</span><span>{t.iomete}</span></div>
                      <p className="text-xs text-muted-foreground">{t.note}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Annual totals. Source: <a href={SOURCES.tco} target="_blank" rel="noreferrer" className="underline underline-offset-2">IOMETE, “How Fortune 500 Companies Cut Data Platform Costs 40-60%”</a>. IOMETE calls these conservative; they are estimates, not quotes.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="notfit">
            <AccordionTrigger className="font-medium">When IOMETE says you should stay on SaaS</AccordionTrigger>
            <AccordionContent>
              <ul className="grid gap-2 text-[0.95rem] text-muted-foreground">
                {COMPARE.notFit.map((n) => <li key={n} className="border-l-2 border-warn pl-3">{n}</li>)}
              </ul>
              <p className="mt-3 text-xs text-muted-foreground">Source: <a href={COMPARE.notFitSrc} target="_blank" rel="noreferrer" className="underline underline-offset-2">IOMETE, “When Self-Hosted Makes Sense (And When It Doesn’t)”</a></p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <NextUp id="compare" pathNext={pathNext} />
      </div>
    </section>
  );
}

function GroupRows({ group, showGroup }) {
  return (
    <>
      {showGroup && (
        <TableRow className="bg-secondary/60 hover:bg-secondary/60">
          <TableCell colSpan={5} className="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted-foreground">{group.name}</TableCell>
        </TableRow>
      )}
      {group.rows.map((r) => (
        <TableRow key={r.f}>
          <TableCell className="min-w-56 py-3 font-medium whitespace-normal">
            {r.f}{' '}
            <a href={r.src} target="_blank" rel="noreferrer" aria-label={`Source for ${r.f}`} className="inline-block align-middle text-muted-foreground"><ExternalLink className="size-3" /></a>
          </TableCell>
          {r.v.map(([v, note], i) => (
            <TableCell key={i} className={cn('py-3 align-top whitespace-normal', i === 0 && 'bg-primary/10')}>
              <div className="grid gap-1">
                <Mark v={v} />
                {note && <small className="text-xs leading-snug text-muted-foreground">{note}</small>}
              </div>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
