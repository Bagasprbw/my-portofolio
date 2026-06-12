import {
  pgTable,
  uuid,
  primaryKey,
} from "drizzle-orm/pg-core";

import { projects } from "./projects";
import { skills } from "./skills";

export const projectSkills = pgTable(
  "project_skills",
  {
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, {
        onDelete: "cascade",
      }),

    skillId: uuid("skill_id")
      .notNull()
      .references(() => skills.id, {
        onDelete: "cascade",
      }),
  },
  (table) => ({
    pk: primaryKey({
      columns: [
        table.projectId,
        table.skillId,
      ],
    }),
  })
);