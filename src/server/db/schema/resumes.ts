import { sql } from "drizzle-orm";
import { index, jsonb, varchar } from "drizzle-orm/pg-core";

import { createTable } from "~/server/db/schema/table";

export const resumes = createTable(
  "resume",
  (t) => ({
    id: t
      .uuid()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    clerkUserId: t.varchar({ length: 255 }).notNull(),
    content: jsonb().notNull(),
    template: varchar({ length: 50 }).notNull().default("technical"),
    createdAt: t.timestamp({ withTimezone: true }).defaultNow().notNull(),
    updatedAt: t
      .timestamp({ withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  }),
  (table) => [index("resume_clerk_user_idx").on(table.clerkUserId)],
);

export type Resume = typeof resumes.$inferSelect;
export type NewResume = typeof resumes.$inferInsert;

// Resume content type (matches what's stored in the jsonb 'content' field)
export type ResumeData = {
  personalInfo: {
    name: string;
    title: string;
    contact: {
      email: string;
      phone: string;
      linkedin: string;
      github: string;
      portfolio: string;
    };
  };
  summary: string;
  skills: string[];
  experience: {
    role: string;
    company: string;
    date: string;
    bullets: string[];
  }[];
  education: {
    degree: string;
    school: string;
    year: string;
  }[];
  projects: {
    name: string;
    techStack: string;
    description: string;
  }[];
  type: "CS" | "BUSINESS" | "SCIENCE";
};
