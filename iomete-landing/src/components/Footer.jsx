import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { COMPANY, SOURCES, ALSO } from '../data/content.js';

export default function Footer({ toast }) {
  const copy = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      toast(`${label} copied`);
    } catch {
      toast('Select the text to copy it');
    }
  };
  return (
    <>
      <section id="contact" className="focusable scroll-mt-28 py-14 md:py-20" aria-labelledby="cta-title">
        <div className="wrap">
          <div className="grid gap-6 rounded-xl bg-navy p-8 text-navy-foreground md:grid-cols-[1.2fr_1fr] md:items-center md:p-12">
            <div>
              <h2 id="cta-title" className="text-3xl md:text-4xl">Starting with IOMETE is simple.</h2>
              <p className="mt-2 text-navy-foreground/80">Book a personalised demo, or install the free plan on your own cluster and keep up to 100 vCPUs forever.</p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Button asChild size="lg"><a href={SOURCES.contact} target="_blank" rel="noreferrer">Book a demo</a></Button>
              <Button asChild size="lg" variant="outline" className="border-navy-foreground/40 bg-transparent text-navy-foreground hover:bg-navy-foreground/10 hover:text-navy-foreground dark:bg-transparent">
                <a href={SOURCES.freePlan} target="_blank" rel="noreferrer">Get the free plan</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t py-8 text-sm text-muted-foreground">
        <div className="wrap grid gap-6 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <h4 className="font-mono text-[0.68rem] uppercase tracking-[0.08em]">IOMETE Inc.</h4>
            <p className="mt-2 flex flex-wrap items-center gap-2">
              {COMPANY.address}
              <Button variant="outline" size="xs" onClick={() => copy(COMPANY.address, 'Address')}><Copy /> Copy</Button>
            </p>
          </div>
          <div>
            <h4 className="font-mono text-[0.68rem] uppercase tracking-[0.08em]">Not buying today?</h4>
            <ul className="mt-2 grid gap-1">
              {ALSO.map((a) => <li key={a.name}><a href={a.href} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">{a.name}: {a.cta}</a></li>)}
              <li>Careers: <span className="select-all text-foreground">{COMPANY.careers}</span></li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono text-[0.68rem] uppercase tracking-[0.08em]">About this page</h4>
            <ul className="mt-2 grid gap-1">
              <li>Every statement is taken from iomete.com as of 1 November 2026, with a source link where it appears.</li>
              <li>Competitor cells repeat IOMETE’s published comparisons; verify against vendor documentation before contract decisions.</li>
            </ul>
          </div>
        </div>
        <div className="wrap mt-8 flex flex-wrap justify-between gap-2 border-t pt-4">
          <span>{COMPANY.copyright}</span>
          <span><a href={`${SOURCES.home}policies/privacy-policy`} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">Privacy policy</a> · <a href={`${SOURCES.home}policies/cookie-policy`} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">Cookie policy</a></span>
        </div>
      </footer>
    </>
  );
}
