import { CircleDot, Wand2, ListChecks } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: CircleDot,
    title: "Start Recording",
    description: "Click to begin capturing your meeting audio directly from your browser. No downloads required.",
  },
  {
    number: "02",
    icon: Wand2,
    title: "AI Processes",
    description: "Our AI transcribes in real-time and generates insights instantly when you finish.",
  },
  {
    number: "03",
    icon: ListChecks,
    title: "Get Insights",
    description: "Access summaries, action items, and searchable transcripts immediately.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 hero-glow opacity-50" />
      
      <div className="container px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Three simple steps to transform your meeting experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-px bg-gradient-to-r from-primary/50 to-primary/10" />
              )}
              
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-2xl bg-secondary border border-border flex items-center justify-center">
                    <step.icon className="w-10 h-10 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
