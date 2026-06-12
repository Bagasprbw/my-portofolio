import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { skillCategories } from "./skill-categories";

export const skills = pgTable("skills", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: varchar("name", { length: 100 })
    .notNull()
    .unique(),

  icon: text("icon"),

  categoryId: uuid("category_id")
    .notNull()
    .references(() => skillCategories.id, {
      onDelete: "cascade",
    }),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});