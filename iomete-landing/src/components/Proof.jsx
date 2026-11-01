import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import NextUp from './NextUp.jsx';
import { PROOF, CASES, HERO, SOURCES, COMPANY } from '../data/content.js';

/** One viewport: four published figures and the names on the homepage. Detail opens on demand. */
export default function Proof() {
  return (
    <section id="proof" className="focusable scroll-mt-28 border-t py-14 md:py-20" aria-labelledby="proof-title">
      <div className="wrap">
        <span className="eyebrow">Proof, not promises</span>
        <h2 id="proof-title" className="mt-3 max-w-3xl text-3xl md:text-4xl">What IOMETE has put its name to</h2>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Key facts">
          {PROOF.map((p) => (
            <li key={p.l} className="border-t-2 border-primary pt-3">
              <b className="block font-heading text-4xl font-light leading-none">{p.k}</b>
              <p className="mt-2 text-sm text-muted-foreground">{p.l} · <a href={p.src} target="_blank" rel="noreferrer" className="underline underline-offset-2">source</a></p>
            </li>
          ))}
        </ul>

        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Certifications and recognition">
          {[...HERO.badges, '2025 Gartner® Market Guide for Data Lakehouse Platforms'].map((b) => (
            <li key={b}><Badge variant="outline" className="gap-2 rounded-full px-3 py-1 text-[0.8rem] font-normal"><span className="size-2 rounded-full bg-primary" aria-hidden="true" />{b}</Badge></li>
          ))}
        </ul>

        <Accordion type="single" collapsible className="mt-6">
          <AccordionItem value="cases">
            <AccordionTrigger className="font-medium">Three published migrations</AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-4 md:grid-cols-3">
                {CASES.map((c) => (
                  <Card key={c.who} className="gap-3">
                    <CardHeader><CardTitle className="font-heading text-lg font-normal">{c.who}</CardTitle></CardHeader>
                    <CardContent className="grid gap-2 text-sm">
                      <div><span className="block font-mono text-[0.68rem] uppercase tracking-[0.08em] text-muted-foreground">Before</span>{c.from}</div>
                      <div><span className="block font-mono text-[0.68rem] uppercase tracking-[0.08em] text-muted-foreground">After</span>{c.to}</div>
                      <div className="font-medium"><span className="block font-mono text-[0.68rem] font-normal uppercase tracking-[0.08em] text-muted-foreground">Outcome</span>{c.result}</div>
                      <a href={c.src} target="_blank" rel="noreferrer" className="text-xs text-muted-foreground underline underline-offset-2">source</a>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">Anonymised examples from IOMETE’s cost analysis. They show where cost was the driver and where it wasn’t.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="team">
            <AccordionTrigger className="font-medium">Who builds it</AccordionTrigger>
            <AccordionContent className="grid gap-3 text-[0.95rem] text-muted-foreground">
              <p>{COMPANY.team}</p>
              <p>Founders Vusal Dadalov and Piet Jan de Bruin met in Amsterdam, started IOMETE in 2021 and went through Y Combinator in early 2022. {COMPANY.fde}</p>
              <p className="text-xs">
                <a href={SOURCES.about} target="_blank" rel="noreferrer" className="underline underline-offset-2">About</a> · <a href={SOURCES.university} target="_blank" rel="noreferrer" className="underline underline-offset-2">IOMETE University</a> · <a href={SOURCES.docs} target="_blank" rel="noreferrer" className="underline underline-offset-2">Documentation</a>
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <NextUp id="proof" />
      </div>
    </section>
  );
}
