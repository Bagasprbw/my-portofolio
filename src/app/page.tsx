import { db } from "@/db";
import { projects, experiences, educations } from "@/db/schema";
import { Navbar } from "./_components/navbar";
import { HeroSection } from "./_components/hero-section";
import { AboutSection } from "./_components/about-section";
import { SkillsSection } from "./_components/skills-section";
import { ProjectsSection } from "./_components/projects-section";
import { ExperiencesSection } from "./_components/experiences-section";
import { EducationSection } from "./_components/education-section";
import { Footer } from "./_components/footer";
import { desc } from "drizzle-orm";

export const metadata = {
  title: "Bagas Prabowo – Full Stack Developer",
  description:
    "Portfolio of Bagas Prabowo, a passionate Full Stack Developer specializing in building beautiful and performant web applications.",
};

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [allSkillCategories, allProjects, allExperiences, allEducations] = await Promise.all([
    db.query.skillCategories.findMany({
      with: {
        skills: true,
      },
    }),
    db.query.projects.findMany({
      with: {
        projectSkills: {
          with: { skill: true },
        },
      },
      orderBy: [desc(projects.createdAt)],
    }),
    db.query.experiences.findMany({
      with: {
        experienceSkills: {
          with: { skill: true },
        },
      },
      orderBy: [desc(experiences.startDate)],
    }),
    db.query.educations.findMany({
      orderBy: [desc(educations.startDate)],
    }),
  ]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection categories={allSkillCategories} />
        <ProjectsSection projects={allProjects} />
        <ExperiencesSection experiences={allExperiences} />
        <EducationSection educations={allEducations} />
      </main>
      <Footer />
    </div>
  );
}
