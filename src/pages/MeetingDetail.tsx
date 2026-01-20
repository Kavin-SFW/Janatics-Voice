import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Users, Download, Mail, Share2, CheckCircle2, AlertCircle, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const meetingData = {
  id: "1",
  title: "Q4 Product Roadmap Review",
  date: "January 20, 2024",
  time: "2:00 PM - 2:45 PM",
  duration: "45 min",
  participants: ["John Doe", "Sarah Smith", "Mike Johnson", "Emily Brown", "David Wilson", "Lisa Chen"],
  summary: "The team reviewed the Q4 product roadmap with a focus on improving customer retention and scaling the platform. Key decisions were made regarding feature prioritization and resource allocation. The team agreed to prioritize the new onboarding flow and analytics dashboard before end of quarter.",
  decisions: [
    "Prioritize new onboarding flow for Q4",
    "Allocate 2 additional engineers to the retention team",
    "Launch analytics dashboard beta by November 15th",
    "Delay internationalization to Q1 next year",
  ],
  actionItems: [
    { task: "Create detailed spec for onboarding flow", owner: "Sarah Smith", deadline: "Jan 25", status: "pending" },
    { task: "Set up retention metrics dashboard", owner: "Mike Johnson", deadline: "Jan 22", status: "completed" },
    { task: "Schedule user research sessions", owner: "Emily Brown", deadline: "Jan 28", status: "pending" },
    { task: "Draft engineering resource plan", owner: "John Doe", deadline: "Jan 23", status: "pending" },
    { task: "Review analytics API requirements", owner: "David Wilson", deadline: "Jan 26", status: "pending" },
  ],
  openQuestions: [
    "What's the budget for user research incentives?",
    "Should we consider a phased rollout for the new onboarding?",
    "Who will be the PM for the analytics dashboard?",
  ],
  risks: [
    "Tight timeline for Q4 deliverables",
    "Dependency on external API integration",
  ],
  transcript: [
    { speaker: "John Doe", text: "Let's start by reviewing the key objectives for this quarter.", timestamp: "0:00" },
    { speaker: "Sarah Smith", text: "I think we should focus on improving our customer retention rates first. The data shows we're losing users in the first week.", timestamp: "0:15" },
    { speaker: "John Doe", text: "That's a great point. What metrics are we currently tracking?", timestamp: "0:28" },
    { speaker: "Mike Johnson", text: "We're looking at monthly active users, churn rate, and NPS scores. The churn rate has increased by 5% over the last quarter.", timestamp: "0:42" },
    { speaker: "Emily Brown", text: "I've been doing some user research and the main feedback is around the onboarding experience. Users find it confusing.", timestamp: "1:05" },
    { speaker: "David Wilson", text: "We could prioritize the new onboarding flow. I have some designs ready for review.", timestamp: "1:22" },
    { speaker: "Lisa Chen", text: "From an engineering perspective, we'd need about 3 weeks to implement the new onboarding if we start immediately.", timestamp: "1:40" },
  ],
};

export default function MeetingDetail() {
  const { id: _id } = useParams();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container px-4 py-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <Button variant="ghost" size="icon" asChild className="mt-1">
                <Link to="/dashboard">
                  <ArrowLeft className="w-5 h-5" />
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold mb-2">{meetingData.title}</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {meetingData.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {meetingData.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {meetingData.participants.length} participants
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
              <Button variant="outline" size="sm">
                <Mail className="w-4 h-4 mr-2" />
                Email Summary
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container px-4 py-8">
        <Tabs defaultValue="summary" className="space-y-6">
          <TabsList className="bg-secondary">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="actions">Action Items</TabsTrigger>
            <TabsTrigger value="transcript">Transcript</TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main summary */}
              <div className="lg:col-span-2 space-y-6">
                <div className="p-6 rounded-xl card-gradient border border-border">
                  <h3 className="font-semibold mb-3">Executive Summary</h3>
                  <p className="text-muted-foreground leading-relaxed">{meetingData.summary}</p>
                </div>

                <div className="p-6 rounded-xl card-gradient border border-border">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    Key Decisions
                  </h3>
                  <ul className="space-y-2">
                    {meetingData.decisions.map((decision, i) => (
                      <li key={i} className="flex items-start gap-2 text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-success mt-2 flex-shrink-0" />
                        {decision}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-xl card-gradient border border-border">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-primary" />
                      Open Questions
                    </h3>
                    <ul className="space-y-2">
                      {meetingData.openQuestions.map((question, i) => (
                        <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          {question}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-6 rounded-xl card-gradient border border-border">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-warning" />
                      Risks & Concerns
                    </h3>
                    <ul className="space-y-2">
                      {meetingData.risks.map((risk, i) => (
                        <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-warning mt-1.5 flex-shrink-0" />
                          {risk}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="p-6 rounded-xl card-gradient border border-border">
                  <h3 className="font-semibold mb-3">Participants</h3>
                  <div className="space-y-2">
                    {meetingData.participants.map((participant) => (
                      <div key={participant} className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                          <span className="text-xs font-medium">
                            {participant.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="text-sm">{participant}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="actions">
            <div className="rounded-xl card-gradient border border-border overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-medium text-muted-foreground">Task</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Owner</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Deadline</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {meetingData.actionItems.map((item, i) => (
                    <tr key={i} className="border-b border-border last:border-0">
                      <td className="p-4">{item.task}</td>
                      <td className="p-4 text-muted-foreground">{item.owner}</td>
                      <td className="p-4 text-muted-foreground">{item.deadline}</td>
                      <td className="p-4">
                        <Badge
                          variant="secondary"
                          className={
                            item.status === "completed"
                              ? "bg-success/10 text-success border-success/20"
                              : "bg-warning/10 text-warning border-warning/20"
                          }
                        >
                          {item.status === "completed" ? "Completed" : "Pending"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="transcript">
            <div className="p-6 rounded-xl card-gradient border border-border">
              <div className="space-y-4 max-w-3xl">
                {meetingData.transcript.map((entry, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium">
                        {entry.speaker.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{entry.speaker}</span>
                        <span className="text-xs text-muted-foreground">{entry.timestamp}</span>
                      </div>
                      <p className="text-muted-foreground">{entry.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
