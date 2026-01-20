import { Button } from "@/components/ui/button";
import { Mic, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
      {/* Glow effect */}
      <div className="absolute inset-0 hero-glow" />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container relative z-10 px-4 py-20">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border mb-8 animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">AI-Powered Meeting Intelligence</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up animate-delay-100">
            Transform Your Meetings Into{" "}
            <span className="text-gradient">Actionable Insights</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 animate-fade-in-up animate-delay-200 text-balance">
            Real-time transcription, AI summaries, action items, and semantic search. 
            Never miss a detail from your meetings again.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animate-delay-300">
            <Button variant="hero" size="xl" asChild>
              <Link to="/meeting/new">
                <Mic className="w-5 h-5" />
                Start Meeting
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <Link to="#features">
                See How It Works
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 flex flex-col items-center gap-4 animate-fade-in-up animate-delay-300">
            <p className="text-sm text-muted-foreground">Trusted by teams at</p>
            <div className="flex items-center gap-8 opacity-50">
              {['Acme Corp', 'TechFlow', 'DataSync', 'CloudBase'].map((company) => (
                <span key={company} className="text-lg font-semibold text-muted-foreground">
                  {company}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute bottom-20 left-10 w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 animate-float" />
      <div className="absolute top-40 right-20 w-16 h-16 rounded-xl bg-primary/5 border border-primary/10 animate-float" style={{ animationDelay: '1s' }} />
    </section>
  );
}
