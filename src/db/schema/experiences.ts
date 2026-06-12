import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  date,
  timestamp,
} from "drizzle-orm/pg-core";

export const experiences = pgTable("experiences", {
  id: uuid("id").defaultRandom().primaryKey(),

  company: varchar("company", { length: 255 })
    .notNull(),

  position: varchar("position", { length: 255 })
    .notNull(),

  employmentType: varchar("employment_type", {
    length: 50,
  }).notNull(),

  location: varchar("location", {
    length: 255,
  }),

  startDate: date("start_date")
    .notNull(),

  endDate: date("end_date"),

  isCurrent: boolean("is_current")
    .default(false)
    .notNull(),

  description: text("description")
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});