import { db } from "@/db";

import { SkillTable } from "./_components/skill-table";
import { AddSkillDialog } from "./_components/add-skill-dialog";
import { AddCategoryDialog } from "./_components/add-category-dialog";
import { CategoryTable } from "./_components/category-table";

export default async function SkillsPage() {
    const [allSkills, categories] = await Promise.all([
        db.query.skills.findMany({
            with: {
                category: true,
            },
        }),
        db.query.skillCategories.findMany(),
    ]);

    return (
        <div className="space-y-8">
            {/* Categories Section */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Categories
                        </h1>

                        <p className="text-muted-foreground">
                            Manage skill categories
                        </p>
                    </div>

                    <AddCategoryDialog />
                </div>

                <CategoryTable categories={categories} />
            </div>

            {/* Skills Section */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Skills
                        </h1>

                        <p className="text-muted-foreground">
                            Manage your skills
                        </p>
                    </div>

                    <AddSkillDialog categories={categories} />
                </div>

                <SkillTable skills={allSkills} categories={categories} />
            </div>
        </div>
    );
}