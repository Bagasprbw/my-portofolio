import {
  BriefcaseBusiness,
  Code2,
  FolderGit2,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div>
      <h2 className="mb-6 text-3xl font-bold">
        Dashboard
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Skills
              </p>

              <h3 className="text-3xl font-bold">
                0
              </h3>
            </div>

            <Code2 />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Projects
              </p>

              <h3 className="text-3xl font-bold">
                0
              </h3>
            </div>

            <FolderGit2 />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Experiences
              </p>

              <h3 className="text-3xl font-bold">
                0
              </h3>
            </div>

            <BriefcaseBusiness />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}