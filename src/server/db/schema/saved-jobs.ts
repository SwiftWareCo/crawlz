import { index, uniqueIndex } from "drizzle-orm/pg-core";

import { savedJobStatusEnum } from "./enums";
import { allJobs } from "./all-jobs";
import { createTable } from "./table";

export const savedJobs = createTable(
  "saved_job",
  (t) => ({
    id: t
      .uuid()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    clerkUserId: t.varchar({ length: 255 }).notNull(),
    jobId: t
      .uuid()
      .notNull()
      .references(() => allJobs.id, { onDelete: "cascade" }),
    dateAdded: t.timestamp({ withTimezone: true }).defaultNow().notNull(),
    notes: t.text(),
    status: savedJobStatusEnum("status").default("saved").notNull(),
    createdAt: t.timestamp({ withTimezone: true }).defaultNow().notNull(),
    updatedAt: t
      .timestamp({ withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  }),
  (table) => [
    index("saved_jobs_clerk_user_idx").on(table.clerkUserId),
    index("saved_jobs_job_idx").on(table.jobId),
    uniqueIndex("saved_jobs_clerk_user_job_key").on(
      table.clerkUserId,
      table.jobId,
    ),
  ],
);

export type SavedJob = typeof savedJobs.$inferSelect;
export type NewSavedJob = typeof savedJobs.$inferInsert;
