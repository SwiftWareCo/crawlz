import { pgEnum } from "drizzle-orm/pg-core";

export const jobTypeEnum = pgEnum("job_type", [
  "full_time",
  "part_time",
  "contract",
  "internship",
  "temporary",
  "freelance",
  "other",
]);

export const experienceLevelEnum = pgEnum("experience_level", [
  "intern",
  "entry",
  "mid",
  "senior",
  "lead",
]);

export const savedJobStatusEnum = pgEnum("saved_job_status", [
  "saved",
  "applied",
  "interviewing",
  "offer",
  "accepted",
  "rejected",
]);

export type JobType = (typeof jobTypeEnum.enumValues)[number];
export type ExperienceLevel = (typeof experienceLevelEnum.enumValues)[number];
export type SavedJobStatus = (typeof savedJobStatusEnum.enumValues)[number];
