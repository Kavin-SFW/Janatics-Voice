import { Mic, Brain, Search, FileText, Users, Zap } from "lucide-react";

const features = [
  {
    icon: Mic,
    title: "Live Transcription",
    description: "Real-time speech-to-text with speaker identification and timestamps.",
  },
  {
    icon: Brain,
    title: "AI Summaries",
    description: "Automatic executive summaries, key decisions, and action items extraction.",
  },
  {
    icon: Search,
    title: "Semantic Search",
    description: "Ask questions about your meetings in natural language and get instant answers.",
  },
  {
    icon: FileText,
    title: "Export & Share",
    description: "Export summaries as PDF or send directly to Slack and email.",
  },
  {
    icon: Users,
    title: "Team Workspaces",
    description: "Collaborate with your team with role-based access control.",
  },
  {
    icon: Zap,
    title: "Instant Insights",
    description: "Get AI-generated insights within 30 seconds of ending a meeting.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="text-gradient">Master Your Meetings</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Powerful features designed for professionals who want to get more from every conversation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl card-gradient border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
