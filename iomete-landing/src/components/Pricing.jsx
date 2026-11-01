import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import NextUp from './NextUp.jsx';
import { PLANS, SUPPORT, SOURCES } from '../data/content.js';
import { cn } from '@/lib/utils';

const fmt = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

/** Derived strictly from the published price list: free to 100 vCPUs, then $500/vCPU/yr with a $100,000 minimum. */
function estimate(v) {
  if (v <= 100) return { plan: 'Free plan', total: 0, note: 'Core features, community support. Up to 100 vCPUs, free forever.' };
  const raw = v * 500;
  const total = Math.max(raw, 100000);
  return {
    plan: 'Enterprise plan',
    total,
    note: total > raw ? 'Below the $100,000 (200 vCPU) minimum commitment, so the minimum applies.' : 'Infrastructure is billed separately by your own provider.',
  };
}

/** One viewport: the three plans. The estimator and support plans open on demand. */
export default function Pricing({ pathNext }) {
  const [v, setV] = useState(400);
  const e = estimate(v);
  return (
    <section id="pricing" className="focusable scroll-mt-28 border-t py-14 md:py-20" aria-labelledby="pricing-title">
      <div className="wrap">
        <span className="eyebrow">Transparent pricing</span>
        <h2 id="pricing-title" className="mt-3 max-w-3xl text-3xl md:text-4xl">Three plans. One unit of measure: the vCPU.</h2>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {PLANS.map((p) => (
            <Card key={p.name} className={cn(p.featured && 'border-navy ring-1 ring-navy')}>
              <CardHeader>
                <CardTitle className="font-heading text-2xl font-light">{p.name}</CardTitle>
                <CardDescription>{p.tag}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div>
                  <div className="font-heading text-4xl font-light leading-none">{p.price}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{p.unit}</div>
                </div>
                <dl className="grid gap-2">
                  {p.rows.map(([k, val]) => (
                    <div key={k} className="grid grid-cols-[6rem_1fr] gap-2 border-t pt-2 text-sm">
                      <dt className="pt-0.5 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-muted-foreground">{k}</dt>
                      <dd>{val}</dd>
                    </div>
                  ))}
                </dl>
                {p.foot && <p className="text-xs text-muted-foreground">{p.foot}</p>}
              </CardContent>
              <CardFooter className="mt-auto">
                <Button asChild className="w-full" variant={p.featured ? 'default' : 'outline'}>
                  <a href={p.href} target="_blank" rel="noreferrer">{p.cta}</a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Accordion type="single" collapsible className="mt-6">
          <AccordionItem value="calc">
            <AccordionTrigger className="font-medium">Estimate your license for a given number of vCPUs</AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardContent className="grid items-center gap-6 md:grid-cols-[1.2fr_1fr]" role="group" aria-labelledby="calc-title">
                  <div>
                    <label htmlFor="vcpu-n" id="calc-title" className="font-medium">How many vCPUs would you license?</label>
                    <Slider className="mt-4" min={50} max={5000} step={50} value={[v]} onValueChange={([n]) => setV(n)} aria-label="vCPUs" />
                    <div className="mt-4 flex items-center gap-3">
                      <Input id="vcpu-n" type="number" min={1} max={100000} value={v} onChange={(ev) => setV(Math.max(1, Number(ev.target.value) || 1))} className="w-32" />
                      <span className="text-sm text-muted-foreground">vCPUs</span>
                    </div>
                  </div>
                  <div className="grid gap-1 tabular-nums" aria-live="polite">
                    <span className="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-lime-text">{e.plan}</span>
                    <span className="font-heading text-4xl font-light">{e.total === 0 ? '$0' : fmt(e.total)} <span className="text-base text-muted-foreground">/ year license</span></span>
                    <small className="text-xs text-muted-foreground">{e.note}</small>
                    <small className="text-xs text-muted-foreground">Business Critical (hybrid, multi-region, dedicated engineers) is custom, from $250,000 per year. Uses only the published price list.</small>
                  </div>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="support">
            <AccordionTrigger className="font-medium">Enterprise support plans and SLA response times</AccordionTrigger>
            <AccordionContent>
              <Card className="gap-0 overflow-hidden py-0">
                <div className="overflow-x-auto">
                  <Table className="min-w-[40rem]">
                    <TableHeader className="bg-secondary">
                      <TableRow className="hover:bg-transparent">
                        {['Plan', 'Scope', 'Tickets', 'Sev 1', 'Sev 2', 'Sev 3', 'Sev 4'].map((h) => <TableHead key={h} className="font-mono text-[0.7rem] uppercase tracking-[0.08em]">{h}</TableHead>)}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {SUPPORT.map((s) => (
                        <TableRow key={s.name}>
                          <TableCell className="font-medium">{s.name}</TableCell><TableCell className="whitespace-normal">{s.scope}</TableCell><TableCell className="whitespace-normal">{s.tickets}</TableCell>
                          <TableCell>{s.sev1}</TableCell><TableCell>{s.sev2}</TableCell><TableCell>{s.sev3}</TableCell><TableCell>{s.sev4}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Card>
              <p className="mt-3 text-sm text-muted-foreground">Sev 1 is covered 24x7x365 on all plans; Sev 2–4 are 9am–6pm local, Monday to Friday. Updates and patches are included. Onboarding is scoped separately.</p>
              <p className="mt-1 text-xs text-muted-foreground">Source: <a href={SOURCES.pricing} target="_blank" rel="noreferrer" className="underline underline-offset-2">iomete.com/pricing</a></p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <NextUp id="pricing" pathNext={pathNext} />
      </div>
    </section>
  );
}
