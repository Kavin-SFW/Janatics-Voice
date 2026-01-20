import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export function CTA() {
  return (
    <section className="py-24">
      <div className="container px-4">
        <div className="relative overflow-hidden rounded-3xl card-gradient border border-border p-12 md:p-16">
          {/* Glow effects */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          
          <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary">AI-Powered Transcription</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Meetings?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Start speaking and get instant transcription with AI-powered summaries.
            </p>
            
            <Button variant="hero" size="xl" asChild>
              <Link to="/meeting/new">
                Start Meeting
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
