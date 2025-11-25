import { Suspense } from "react";
import { ResumeGeneratorClient } from "~/components/resume-generator/ResumeGeneratorClient";
import { ResumeGeneratorSkeleton } from "~/components/resume-generator/ResumeGeneratorSkeleton";

export const metadata = {
  title: "Documents - Resume Generator",
  description: "Generate tailored resumes for job applications",
};

export default function DocumentsPage() {
  return (
    <main className="h-screen flex flex-col overflow-hidden bg-linear-to-br from-background via-background to-muted/30">
      <Suspense fallback={<ResumeGeneratorSkeleton />}>
        <ResumeGeneratorClient />
      </Suspense>
    </main>
  );
}
