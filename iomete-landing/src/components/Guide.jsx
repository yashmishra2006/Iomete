import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GUIDE_CHIPS } from '../data/content.js';
import { scrollToId } from '../hooks.js';
import { planPath } from '../guidePlan.js';

/** One viewport, one job: say what you need and the page reorders itself. */
export default function Guide({ path, onPath }) {
  const [text, setText] = useState('');
  const [thread, setThread] = useState([]);
  const inputRef = useRef(null);

  const submit = (q) => {
    const query = (q ?? text).trim();
    if (!query) return;
    const picks = planPath(query);
    setThread([{ role: 'you', text: query }, { role: 'bot', picks }]);
    setText('');
    if (picks) {
      onPath(picks);
      setTimeout(() => scrollToId(picks[0].id), 350);
    }
  };

  return (
    <section id="guide" className="focusable py-12 md:py-20" aria-labelledby="guide-title">
      <div className="wrap">
        <div className="relative overflow-clip rounded-xl bg-navy p-6 text-navy-foreground md:p-10">
          <div className="pointer-events-none absolute -right-[10%] -bottom-[40%] aspect-square w-1/2 bg-[radial-gradient(circle,rgba(211,245,44,0.22),transparent_65%)]" aria-hidden="true" />
          <span className="eyebrow text-navy-foreground/70">Tell us what you need</span>
          <h2 id="guide-title" className="mt-3 text-3xl md:text-4xl">What brought you here?</h2>
          <p className="mt-2 max-w-xl text-navy-foreground/80">One sentence, or a chip. The sections that answer it move to the top of the page.</p>

          <form className="mt-6 flex flex-wrap gap-2" onSubmit={(e) => { e.preventDefault(); submit(); }}>
            <label htmlFor="guide-input" className="sr-only">Describe what you are looking for</label>
            <Input
              id="guide-input"
              ref={inputRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g. We run OpenShift on-prem and our Databricks bill doubled"
              autoComplete="off"
              className="h-11 flex-[1_1_18rem] border-navy-foreground/30 bg-navy-foreground/10 text-base text-navy-foreground placeholder:text-navy-foreground/50"
            />
            <Button type="submit" size="lg" className="h-11">Show me my path</Button>
          </form>

          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Common starting points">
            {GUIDE_CHIPS.map((c) => (
              <Button
                key={c.label}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => submit(c.q)}
                className="rounded-full border-navy-foreground/30 bg-transparent text-navy-foreground hover:border-primary hover:bg-primary/15 hover:text-navy-foreground dark:bg-transparent dark:hover:bg-primary/15"
              >
                {c.label}
              </Button>
            ))}
          </div>

          <div className="mt-5 grid gap-2.5" aria-live="polite">
            {thread.map((m, i) =>
              m.role === 'you' ? (
                <div key={i} className="max-w-[46rem] justify-self-end rounded-xl bg-navy-foreground/15 px-4 py-3 text-[0.95rem]">{m.text}</div>
              ) : (
                <div key={i} className="max-w-[46rem] rounded-xl border border-primary/40 bg-primary/15 px-4 py-3 text-[0.95rem]">
                  {m.picks ? (
                    <>
                      Your path, in order:
                      <ol className="mt-2 list-decimal pl-5">
                        {m.picks.map((p) => (
                          <li key={p.id} className="mt-1"><a href={`#${p.id}`} className="underline underline-offset-4" onClick={(e) => { e.preventDefault(); scrollToId(p.id); }}>{p.label}</a></li>
                        ))}
                      </ol>
                    </>
                  ) : (
                    <>No match yet. Try words like <em>on-prem</em>, <em>GDPR</em>, <em>Snowflake cost</em>, <em>GPU</em>, <em>Kafka</em> or <em>bank</em>.</>
                  )}
                </div>
              ),
            )}
          </div>

          {path && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-4 border-navy-foreground/40 bg-transparent text-navy-foreground hover:bg-navy-foreground/10 hover:text-navy-foreground dark:bg-transparent"
              onClick={() => { onPath(null); setThread([]); inputRef.current?.focus(); }}
            >
              Reset to full page
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
