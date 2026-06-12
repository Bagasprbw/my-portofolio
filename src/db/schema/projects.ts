import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),

  title: varchar("title", { length: 255 })
    .notNull(),

  slug: varchar("slug", { length: 255 })
    .notNull()
    .unique(),

  description: text("description")
    .notNull(),

  thumbnail: text("thumbnail"),

  url: text("url"),

  featured: boolean("featured")
    .default(false)
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});