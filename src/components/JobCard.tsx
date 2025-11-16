import { X, Bookmark, Trash2, ExternalLink } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";

export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  location: string;
  postedTime: string;
  url?: string;
}

interface JobCardProps {
  job: Job;
  variant?: "swipe" | "saved";
  onDismiss?: (id: string) => void;
  onSave?: (id: string) => void;
  onRemove?: (id: string) => void;
  onApply?: (id: string) => void;
  style?: React.CSSProperties;
  className?: string;
}

export function JobCard({
  job,
  variant = "swipe",
  onDismiss,
  onSave,
  onRemove,
  onApply,
  style,
  className,
}: JobCardProps) {
  return (
    <Card className={`flex flex-col md:min-h-96 ${className}`} style={style}>
      <CardHeader>
        <CardTitle>{job.title}</CardTitle>
        <CardDescription>{job.company}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground mb-4">
          {job.description}
        </p>
        <div className="flex gap-2">
          <Badge variant="secondary">{job.location}</Badge>
          <Badge variant="outline">{job.postedTime}</Badge>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        {variant === "swipe" && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDismiss?.(job.id)}
            >
              <X className="h-4 w-4" />
            </Button>
            <Button
              variant="default"
              size="icon"
              onClick={() => onSave?.(job.id)}
            >
              <Bookmark className="h-4 w-4" />
            </Button>
          </>
        )}
        {variant === "saved" && (
          <>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onRemove?.(job.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button
              variant="default"
              className="flex-1"
              onClick={() => onApply?.(job.id)}
            >
              Apply Now
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
