"use client";

import { useState } from "react";
import { JobCard, type Job } from "~/components/JobCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

// Mock saved jobs data
const MOCK_SAVED_JOBS: Job[] = [
  {
    id: "s1",
    title: "Senior Frontend Developer",
    company: "Tech Corp",
    description:
      "We're looking for an experienced frontend developer to join our team. You'll work on exciting projects using React, TypeScript, and modern web technologies.",
    location: "Remote",
    postedTime: "2 days ago",
    url: "https://example.com/apply/1",
  },
  {
    id: "s2",
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    description:
      "Join our growing team as a full stack engineer. You'll build features end-to-end using Next.js, Node.js, and PostgreSQL.",
    location: "San Francisco, CA",
    postedTime: "1 week ago",
    url: "https://example.com/apply/2",
  },
  {
    id: "s3",
    title: "React Developer",
    company: "Digital Agency",
    description:
      "Work on client projects building modern web applications with React, Next.js, and Tailwind CSS. Great work-life balance.",
    location: "New York, NY",
    postedTime: "3 days ago",
    url: "https://example.com/apply/3",
  },
];

const MOCK_APPLIED_JOBS: Job[] = [
  {
    id: "a1",
    title: "UI/UX Developer",
    company: "Design Studio",
    description:
      "Bridge the gap between design and development. Create beautiful, accessible interfaces using modern CSS and JavaScript frameworks.",
    location: "Remote",
    postedTime: "1 day ago",
    url: "https://example.com/apply/4",
  },
];

export default function SavedPage() {
  const [toApplyJobs, setToApplyJobs] = useState<Job[]>(MOCK_SAVED_JOBS);
  const [appliedJobs, setAppliedJobs] = useState<Job[]>(MOCK_APPLIED_JOBS);

  const handleRemove = (id: string) => {
    setToApplyJobs((jobs) => jobs.filter((job) => job.id !== id));
    console.log("Removed job:", id);
  };

  const handleApply = (id: string) => {
    const job = toApplyJobs.find((j) => j.id === id);
    if (job) {
      // Move from "To Apply" to "Applied"
      setToApplyJobs((jobs) => jobs.filter((j) => j.id !== id));
      setAppliedJobs((jobs) => [...jobs, job]);
      console.log("Applied to job:", id);
      // In a real app, you would open the job URL here
      if (job.url) {
        window.open(job.url, "_blank");
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Saved Jobs</h1>
        <p className="text-muted-foreground">
          Manage your saved job applications
        </p>
      </div>

      <Tabs defaultValue="to-apply" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="to-apply">
            To Apply ({toApplyJobs.length})
          </TabsTrigger>
          <TabsTrigger value="applied">Applied ({appliedJobs.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="to-apply" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {toApplyJobs.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">
                  No saved jobs yet. Start swiping in the Inbox!
                </p>
              </div>
            ) : (
              toApplyJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  variant="saved"
                  onRemove={handleRemove}
                  onApply={handleApply}
                />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="applied" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {appliedJobs.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">
                  No applications yet. Apply to some jobs from the &quot;To
                  Apply&quot; tab!
                </p>
              </div>
            ) : (
              appliedJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  variant="saved"
                  onRemove={(id) => {
                    setAppliedJobs((jobs) => jobs.filter((j) => j.id !== id));
                  }}
                  onApply={() => {
                    console.log("Already applied to:", job.id);
                  }}
                />
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
