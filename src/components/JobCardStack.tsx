"use client";

import { useState } from "react";
import { motion, useMotionValue, useTransform, type PanInfo } from "motion/react";
import { JobCard, type Job } from "~/components/JobCard";

// Mock data for demonstration
const MOCK_JOBS: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "Tech Corp",
    description:
      "We're looking for an experienced frontend developer to join our team. You'll work on exciting projects using React, TypeScript, and modern web technologies.",
    location: "Remote",
    postedTime: "2 days ago",
  },
  {
    id: "2",
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    description:
      "Join our growing team as a full stack engineer. You'll build features end-to-end using Next.js, Node.js, and PostgreSQL.",
    location: "San Francisco, CA",
    postedTime: "1 week ago",
  },
  {
    id: "3",
    title: "React Developer",
    company: "Digital Agency",
    description:
      "Work on client projects building modern web applications with React, Next.js, and Tailwind CSS. Great work-life balance.",
    location: "New York, NY",
    postedTime: "3 days ago",
  },
  {
    id: "4",
    title: "Software Engineer",
    company: "BigTech Inc",
    description:
      "Join our platform team and help build scalable solutions for millions of users. Experience with TypeScript and cloud technologies required.",
    location: "Seattle, WA",
    postedTime: "5 days ago",
  },
  {
    id: "5",
    title: "UI/UX Developer",
    company: "Design Studio",
    description:
      "Bridge the gap between design and development. Create beautiful, accessible interfaces using modern CSS and JavaScript frameworks.",
    location: "Remote",
    postedTime: "1 day ago",
  },
];

export function JobCardStack() {
  const [jobs] = useState<Job[]>(MOCK_JOBS);
  const [currentIndex, setCurrentIndex] = useState(0);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const handleSave = (id: string) => {
    console.log("Saved job:", id);
    removeCard();
  };

  const handleDismiss = (id: string) => {
    console.log("Dismissed job:", id);
    removeCard();
  };

  const removeCard = () => {
    setCurrentIndex((prev) => prev + 1);
    x.set(0); // Reset position for next card
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100;
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    // Check if card should be dismissed
    if (Math.abs(offset) > threshold || Math.abs(velocity) > 500) {
      const currentJob = jobs[currentIndex];
      if (currentJob) {
        if (offset > 0) {
          // Swiped right - Save
          x.set(300);
          setTimeout(() => handleSave(currentJob.id), 200);
        } else {
          // Swiped left - Dismiss
          x.set(-300);
          setTimeout(() => handleDismiss(currentJob.id), 200);
        }
      }
    } else {
      // Snap back to center
      x.set(0);
    }
  };

  const visibleJobs = jobs.slice(currentIndex, currentIndex + 3);

  if (currentIndex >= jobs.length) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">All Done!</h2>
          <p className="text-muted-foreground">
            You&apos;ve reviewed all available jobs.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[500px] w-full">
      {visibleJobs.map((job, index) => {
        const isTop = index === 0;
        const scale = 1 - index * 0.05;
        const yOffset = index * 10;

        return (
          <motion.div
            key={job.id}
            className="absolute inset-0"
            style={{
              x: isTop ? x : 0,
              rotate: isTop ? rotate : 0,
              opacity: isTop ? opacity : 1,
              scale,
              y: yOffset,
              cursor: isTop ? "grab" : "default",
              zIndex: visibleJobs.length - index,
            }}
            drag={isTop ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={isTop ? handleDragEnd : undefined}
          >
            <JobCard
              job={job}
              variant="swipe"
              onSave={handleSave}
              onDismiss={handleDismiss}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
