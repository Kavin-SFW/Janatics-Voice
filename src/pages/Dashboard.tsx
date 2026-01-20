import { useQuery } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { MeetingCard } from "@/components/dashboard/MeetingCard";
import { Mic, Clock, ListChecks, Calendar } from "lucide-react";
import { api } from "@/lib/api";
import { formatDistanceToNow } from "date-fns";

export default function Dashboard() {
  const { data: meetings = [], isLoading } = useQuery({
    queryKey: ["meetings"],
    queryFn: () => api.getMeetings(),
  });

  const { data: allActionItems = [] } = useQuery({
    queryKey: ["actionItems"],
    queryFn: async () => {
      const allItems = await Promise.all(
        meetings.map((meeting: any) => api.getActionItems(meeting.id))
      );
      return allItems.flat();
    },
    enabled: meetings.length > 0,
  });

  // Calculate stats
  const totalMeetings = meetings.length;
  const completedMeetings = meetings.filter((m: any) => m.status === "completed").length;
  const totalHours = meetings.reduce((acc: number, m: any) => {
    return acc + (m.duration_seconds || 0) / 3600;
  }, 0);
  const pendingActionItems = allActionItems.filter((item: any) => item.status === "pending").length;
  const thisWeekMeetings = meetings.filter((m: any) => {
    if (!m.created_at) return false;
    const meetingDate = new Date(m.created_at);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return meetingDate >= weekAgo;
  }).length;

  const stats = [
    {
      icon: Mic,
      label: "Total Meetings",
      value: totalMeetings.toString(),
      change: `${completedMeetings} completed`,
      positive: true,
    },
    {
      icon: Clock,
      label: "Hours Recorded",
      value: totalHours.toFixed(1),
      change: `${thisWeekMeetings} this week`,
      positive: true,
    },
    {
      icon: ListChecks,
      label: "Action Items",
      value: allActionItems.length.toString(),
      change: `${pendingActionItems} pending`,
    },
    {
      icon: Calendar,
      label: "This Week",
      value: thisWeekMeetings.toString(),
      change: `${meetings.filter((m: any) => m.status === "scheduled").length} scheduled`,
    },
  ];

  const recentMeetings = meetings.slice(0, 4).map((meeting: any) => {
    const date = meeting.created_at
      ? formatDistanceToNow(new Date(meeting.created_at), { addSuffix: true })
      : "Unknown";
    const duration = meeting.duration_seconds
      ? `${Math.floor(meeting.duration_seconds / 60)} min`
      : "N/A";

    return {
      id: meeting.id,
      title: meeting.title,
      date,
      duration,
      participants: 0, // Will be fetched separately if needed
      actionItems: 0, // Will be calculated
      status: meeting.status || "completed",
    };
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold mb-1">Welcome</h1>
          <p className="text-muted-foreground">Here's what's happening with your meetings.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StatsCard key={stat.label} {...stat} />
          ))}
        </div>

        {/* Recent Meetings */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Recent Meetings</h2>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">Loading meetings...</div>
          ) : recentMeetings.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No meetings yet. Start your first meeting!
            </div>
          ) : (
            <div className="grid gap-4">
              {recentMeetings.map((meeting) => (
                <MeetingCard key={meeting.id} {...meeting} />
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
