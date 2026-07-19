import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  date,
  timestamp,
} from "drizzle-orm/pg-core";

export const educations = pgTable("educations", {
  id: uuid("id").defaultRandom().primaryKey(),

  institution: varchar("institution", { length: 255 })
    .notNull(),

  degree: varchar("degree", { length: 255 })
    .notNull(),

  fieldOfStudy: varchar("field_of_study", {
    length: 255,
  }),

  gpa: varchar("gpa", { length: 10 }),

  startDate: date("start_date")
    .notNull(),

  endDate: date("end_date"),

  isCurrent: boolean("is_current")
    .default(false)
    .notNull(),

  description: text("description"),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});
