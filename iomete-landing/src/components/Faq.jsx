import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import NextUp from './NextUp.jsx';
import { FAQ, SOURCES } from '../data/content.js';

export default function Faq() {
  return (
    <section id="faq" className="focusable scroll-mt-28 border-t py-14 md:py-20" aria-labelledby="faq-title">
      <div className="wrap">
        <span className="eyebrow">Before a demo</span>
        <h2 id="faq-title" className="mt-3 max-w-3xl text-3xl md:text-4xl">The questions buyers ask first, in IOMETE’s words</h2>
        <Accordion type="single" collapsible className="mt-6 max-w-3xl">
          {FAQ.slice(0, 6).map((f, i) => (
            <AccordionItem key={f.q} value={`q${i}`}>
              <AccordionTrigger className="text-left font-medium">{f.q}</AccordionTrigger>
              <AccordionContent className="text-[0.95rem] text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <p className="mt-3 text-xs text-muted-foreground">Full list: <a href={SOURCES.faq} target="_blank" rel="noreferrer" className="underline underline-offset-2">iomete.com/faq</a></p>
        <NextUp id="faq" />
      </div>
    </section>
  );
}
