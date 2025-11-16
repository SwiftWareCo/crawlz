import { JobCardStack } from "~/components/JobCardStack";

export default function HomePage() {
  return (
    <div className="container max-w-lg md:max-w-2xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Inbox</h1>
        <p className="text-muted-foreground">
          Swipe right to save, left to dismiss
        </p>
      </div>
      <JobCardStack />
    </div>
  );
}
