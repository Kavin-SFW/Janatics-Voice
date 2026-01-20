import { Link } from "react-router-dom";
import { Calendar, Clock, Users, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MeetingCardProps {
  id: string;
  title: string;
  date: string;
  duration: string;
  participants: number;
  actionItems: number;
  status: "completed" | "processing" | "live";
}

export function MeetingCard({
  id,
  title,
  date,
  duration,
  participants,
  actionItems,
  status,
}: MeetingCardProps) {
  return (
    <Link
      to={`/meeting/${id}`}
      className="group block p-4 rounded-xl card-gradient border border-border hover:border-primary/50 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {duration}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {participants}
            </span>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>

      <div className="flex items-center gap-2">
        {status === "completed" && (
          <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
            Completed
          </Badge>
        )}
        {status === "processing" && (
          <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">
            Processing
          </Badge>
        )}
        {status === "live" && (
          <Badge variant="secondary" className="bg-destructive/10 text-destructive border-destructive/20">
            <span className="recording-dot mr-1.5" />
            Live
          </Badge>
        )}
        {actionItems > 0 && (
          <Badge variant="secondary">
            {actionItems} action items
          </Badge>
        )}
      </div>
    </Link>
  );
}
