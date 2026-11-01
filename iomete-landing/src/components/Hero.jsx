import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { HERO, SCENES } from '../data/content.js';
import { cn } from '@/lib/utils';

const SCENE_MS = 3750;

const state = (step, i) => (step === i ? 'lit' : step > i ? 'on' : 'dim');

function Box({ label, sub }) {
  return (
    <div className="dg-box">
      {label}
      {sub && <span className="dg-sub">{sub}</span>}
    </div>
  );
}

/** HTML diagram: every box sizes to its text, so labels never overflow. */
function Diagram({ step }) {
  return (
    <div className="grid gap-3 lg:grid-cols-[1fr_auto]" role="img" aria-label="A dashed perimeter, your trust perimeter, contains your infrastructure, the IOMETE platform on Kubernetes, and your tools. IOMETE Inc. sits outside it with no data plane; licensing is per vCPU plus your own infrastructure rates.">
      <div className={cn('rounded-lg border border-dashed p-3 transition-colors duration-300', step === 3 ? 'border-lime-text' : 'border-input')}>
        <p className="dg-lbl mb-2 text-lime-text">Your trust perimeter</p>

        <div className="dg-layer" data-state={state(step, 0)}>
          <p className="dg-lbl mb-1.5">Your infrastructure</p>
          <div className="flex flex-wrap gap-1.5">
            {['On-premises', 'AWS EKS', 'Azure AKS', 'Google GKE', 'OpenShift / Tanzu'].map((l) => <Box key={l} label={l} />)}
          </div>
        </div>
        <div className="dg-flow" data-on={step >= 1} />

        <div className="dg-layer rounded-md border p-2.5" data-state={state(step, 1)}>
          <p className="dg-lbl mb-1.5">Kubernetes · IOMETE platform</p>
          <div className="flex flex-wrap gap-1.5">
            <Box label="Spark compute" sub="Lakehouses per team" />
            <Box label="Iceberg tables" sub="Your object storage" />
            <Box label="Catalog + access" sub="Row · column · tag" />
          </div>
          <p className="dg-lbl mt-2">SQL editor · Spark jobs · Streaming · Notebooks · Orchestration</p>
        </div>
        <div className="dg-flow" data-on={step >= 2} />

        <div className="dg-layer" data-state={state(step, 2)}>
          <p className="dg-lbl mb-1.5">Your tools connect · JDBC/ODBC · Spark Connect · Arrow Flight</p>
          <div className="flex flex-wrap gap-1.5">
            {['Tableau · Power BI', 'Jupyter', 'dbt · Airflow', 'AI agents (MCP, beta)'].map((l) => <Box key={l} label={l} />)}
          </div>
        </div>
      </div>

      <div className="dg-layer grid gap-3 lg:w-40 lg:grid-rows-[auto_auto]" data-state={step === 3 ? 'lit' : 'dim'}>
        <div className="dg-box">
          IOMETE Inc.
          <span className="dg-sub">OUTSIDE</span>
          <ul className="mt-1.5 grid gap-0.5 text-[0.72rem] text-muted-foreground">
            <li>No data plane</li><li>No data access</li><li>License only</li>
          </ul>
        </div>
        <div className="dg-box">
          Your bill
          <ul className="mt-1.5 grid gap-0.5 text-[0.72rem] text-muted-foreground">
            <li>$500 / vCPU / yr</li><li>+ your infra rates</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/** One viewport, one idea: what IOMETE is, and the picture of how it sits in your environment. */
export default function Hero() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [p, setP] = useState(0);
  const start = useRef(0);

  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !playing) return;
    start.current = performance.now();
    let raf;
    const tick = (now) => {
      const el = now - start.current;
      setP(Math.min(1, el / SCENE_MS));
      if (el >= SCENE_MS) {
        setStep((s) => (s + 1) % SCENES.length);
        start.current = now;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, step]);

  const go = (v) => {
    if (v === '') return;
    setStep(Number(v));
    setP(0);
    start.current = performance.now();
  };

  return (
    <section id="overview" className="focusable py-12 md:py-20" aria-labelledby="hero-title">
      <div className="wrap grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
        <div>
          <span className="eyebrow">{HERO.eyebrow}</span>
          <h1 id="hero-title" className="mt-4 text-4xl leading-[1.08] md:text-5xl xl:text-6xl">{HERO.title}</h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">{HERO.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg"><a href="#guide">Find my path</a></Button>
            <Button asChild size="lg" variant="outline"><a href="#compare">Compare with Snowflake &amp; Databricks</a></Button>
          </div>
        </div>

        <Card className="gap-3 py-4 shadow-[0_24px_60px_-20px_rgba(55,58,99,0.25)]">
          <CardHeader className="flex flex-wrap items-center justify-between gap-3 px-4">
            <span className="eyebrow before:hidden">How it fits in your environment</span>
            <div className="flex items-center gap-2">
              <ToggleGroup type="single" value={String(step)} onValueChange={go} variant="outline" size="sm" aria-label="Steps">
                {SCENES.map((s, i) => (
                  <ToggleGroupItem key={s.id} value={String(i)} aria-label={`Step ${i + 1}: ${s.title}`} className="font-mono data-[state=on]:bg-navy data-[state=on]:text-navy-foreground">
                    {i + 1}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
              <Button variant="outline" size="icon-sm" onClick={() => setPlaying((v) => !v)} aria-pressed={playing} aria-label={playing ? 'Pause' : 'Play'}>
                {playing ? <Pause /> : <Play />}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="px-4">
            <Diagram step={step} />
            <div className="mt-4 grid min-h-[5rem] grid-cols-[auto_1fr] gap-3" aria-live="polite">
              <span className="grid size-8 place-items-center rounded-full bg-primary font-mono text-xs text-primary-foreground" aria-hidden="true">{step + 1}</span>
              <div>
                <h3 className="text-[1.05rem] font-normal">{SCENES[step].title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{SCENES[step].caption}</p>
              </div>
            </div>
            <div className="mt-3 h-0.5 overflow-hidden rounded bg-border" aria-hidden="true">
              <div className="h-full bg-primary transition-[width] duration-200" style={{ width: `${p * 100}%` }} />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
