import { sql } from "drizzle-orm";
import { integer, text, timestamp } from "drizzle-orm/pg-core";
import { uniqueIndex } from "drizzle-orm/pg-core";

import { experienceLevelEnum, jobTypeEnum } from "./enums";
import { createTable } from "./table";

const emptyTextArray = sql`ARRAY[]::text[]`;
const emptyJobTypeArray = sql`ARRAY[]::job_type[]`;

export const preferences = createTable(
  "preference",
  (t) => ({
    id: t
      .uuid()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    clerkUserId: t.varchar({ length: 255 }).notNull(),
    keywords: text("keywords").array().notNull().default(emptyTextArray),
    locations: text("locations").array().notNull().default(emptyTextArray),
    jobTypes: jobTypeEnum("job_type_array")
      .array()
      .notNull()
      .default(emptyJobTypeArray),
    minSalary: integer("min_salary"),
    maxSalary: integer("max_salary"),
    experienceLevel: experienceLevelEnum("experience_level")
      .notNull()
      .default("mid"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  }),
  (table) => [
    uniqueIndex("preferences_clerk_user_id_key").on(table.clerkUserId),
  ],
);

export type Preference = typeof preferences.$inferSelect;
export type NewPreference = typeof preferences.$inferInsert;
