import { Card } from "~/components/ui/card";

export function ResumeGeneratorSkeleton() {
  return (
    <div className="flex h-full flex-col lg:flex-row gap-6">
      {/* Left Pane Skeleton */}
      <div className="w-full lg:w-[420px] lg:border-r p-6 flex flex-col gap-4">
        <div className="space-y-2 shrink-0">
          <div className="h-8 w-48 bg-muted rounded animate-pulse" />
          <div className="h-4 w-64 bg-muted rounded animate-pulse" />
        </div>

        {/* Upload Card Skeleton */}
        <Card className="p-4">
          <div className="h-32 bg-muted rounded animate-pulse" />
        </Card>

        {/* Job Description Card Skeleton */}
        <Card className="flex-1">
          <div className="h-48 bg-muted rounded animate-pulse" />
        </Card>

        {/* Button Skeleton */}
        <div className="h-10 w-full bg-muted rounded animate-pulse" />
      </div>

      {/* Right Pane Skeleton */}
      <div className="flex-1 p-6">
        <div className="h-full bg-muted rounded-lg animate-pulse" />
      </div>
    </div>
  );
}
