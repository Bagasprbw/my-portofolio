import { relations } from "drizzle-orm";

import { skillCategories } from "./skill-categories";
import { skills } from "./skills";

import { projects } from "./projects";
import { projectSkills } from "./project-skills";

import { experiences } from "./experiences";
import { experienceSkills } from "./experience-skills";

export const skillCategoryRelations = relations(
  skillCategories,
  ({ many }) => ({
    skills: many(skills),
  })
);

export const skillRelations = relations(
  skills,
  ({ one, many }) => ({
    category: one(skillCategories, {
      fields: [skills.categoryId],
      references: [skillCategories.id],
    }),

    projectSkills: many(projectSkills),

    experienceSkills: many(
      experienceSkills
    ),
  })
);

export const projectRelations = relations(
  projects,
  ({ many }) => ({
    projectSkills: many(projectSkills),
  })
);

export const projectSkillRelations =
  relations(projectSkills, ({ one }) => ({
    project: one(projects, {
      fields: [projectSkills.projectId],
      references: [projects.id],
    }),

    skill: one(skills, {
      fields: [projectSkills.skillId],
      references: [skills.id],
    }),
  }));

export const experienceRelations =
  relations(experiences, ({ many }) => ({
    experienceSkills: many(
      experienceSkills
    ),
  }));

export const experienceSkillRelations =
  relations(
    experienceSkills,
    ({ one }) => ({
      experience: one(experiences, {
        fields: [
          experienceSkills.experienceId,
        ],
        references: [experiences.id],
      }),

      skill: one(skills, {
        fields: [experienceSkills.skillId],
        references: [skills.id],
      }),
    })
  );