import { index } from "drizzle-orm/pg-core";

import { createTable } from "./table";

export const leads = createTable(
  "lead",
  (t) => ({
    id: t
      .uuid()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    clerkUserId: t.varchar({ length: 255 }).notNull(),
    companyName: t.varchar({ length: 512 }).notNull(),
    contactPerson: t.varchar({ length: 256 }),
    email: t.varchar({ length: 256 }),
    phone: t.varchar({ length: 64 }),
    website: t.varchar({ length: 2048 }),
    notes: t.text(),
    timestamp: t.timestamp({ withTimezone: true }).defaultNow().notNull(),
    createdAt: t.timestamp({ withTimezone: true }).defaultNow().notNull(),
    updatedAt: t
      .timestamp({ withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  }),
  (table) => [index("leads_clerk_user_idx").on(table.clerkUserId)],
);

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
