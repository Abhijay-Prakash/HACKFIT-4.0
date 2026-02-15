import { Sparkles } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../ui/accordion";

export type FAQItem = {
  question: string;
  answer: string;
};

const FAQ = ({ faqItems }: { faqItems: FAQItem[] }) => {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(50,107,210,0.15), transparent 45%), radial-gradient(circle at 80% 0%, rgba(147,110,45,0.18), transparent 40%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 space-y-4 text-center sm:mb-16">
          <div className="mx-auto flex max-w-xl items-center justify-center gap-3 text-[var(--chart-3)] mt-4 sm:mt-0 px-4">
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" aria-hidden="true" />
            <p className="text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.5em] text-[var(--chart-3)] whitespace-nowrap">
              FAQ MATRIX
            </p>
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" aria-hidden="true" />
          </div>
          <h2 className="font-[progress] text-3xl uppercase text-[var(--chart-1)] sm:text-4xl lg:text-5xl">
            HackFit Intel Briefing
          </h2>
          <p className="text-base text-muted-foreground sm:text-lg">
            Everything teams keep pinging us about the sprint, power, and prize
            stack—decoded in one signal burst.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr,1.1fr] ">
          {/* <div className="rounded-2xl border border-[#84cc167a] bg-black/60 p-6 shadow-[0_0_40px_rgba(147,205,45,0.15)] backdrop-blur">
            <div className="space-y-5">
              {highlightCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-xl border border-white/5 bg-white/5 p-4 shadow-[0_0_25px_rgba(34,211,238,0.08)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60">
                      {card.icon}
                    </div>
                    <p className="text-xs tracking-[0.35em] text-[var(--chart-3)]">
                      SIGNAL
                    </p>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-[var(--chart-1)]">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{card.body}</p>
                </div>
              ))}
            </div>
          </div> */}

          <div className="rounded-2xl border border-[#22d3ee7a] bg-black/70 p-4 shadow-[0_0_40px_rgba(34,211,238,0.18)] backdrop-blur">
            <Accordion
              type="single"
              collapsible
              className="w-full divide-y  divide-white/5 "
              defaultValue="item-1"
            >
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={item.question}
                  value={`item-${index + 1}`}
                  className="border-0 "
                >
                  <AccordionTrigger className="py-5 text-left text-base font-semibold uppercase tracking-wide text-[var(--chart-1)] bg-[#191b1c] px-4 rounded-lg mb-1">
                    <span className="text-[var(--chart-1)] ">
                      {item.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
