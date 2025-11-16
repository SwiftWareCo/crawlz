import { uniqueIndex } from "drizzle-orm/pg-core";

import { jobTypeEnum } from "./enums";
import { createTable } from "./table";

export const allJobs = createTable(
  "job",
  (t) => ({
    id: t
      .uuid()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    title: t.varchar({ length: 512 }).notNull(),
    company: t.varchar({ length: 512 }).notNull(),
    location: t.varchar({ length: 512 }),
    url: t.varchar({ length: 2048 }).notNull(),
    description: t.text(),
    salary: t.varchar({ length: 256 }),
    jobType: jobTypeEnum("job_type").notNull().default("other"),
    source: t.varchar({ length: 128 }),
    timestamp: t.timestamp({ withTimezone: true }).defaultNow().notNull(),
    createdAt: t.timestamp({ withTimezone: true }).defaultNow().notNull(),
  }),
  (table) => [uniqueIndex("jobs_url_unique").on(table.url)],
);

export type Job = typeof allJobs.$inferSelect;
export type NewJob = typeof allJobs.$inferInsert;
