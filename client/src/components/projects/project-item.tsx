import { Project } from "@/interfaces/Project";
import { formatDate } from "@/lib/utils";
import { ProjectOperations } from "./project-operations";

type ProjectItemProps = {
  project: Project;
};

export const ProjectItem = ({ project }: ProjectItemProps) => {
  return (
    <div className="flex items-center justify-between rounded-md border border-slate-200 p-4 dark:border-slate-800">
      <div className="grid gap-1">
        <h3 className="truncate font-semibold hover:underline">
          {project.title}
        </h3>
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {formatDate(project.createdAt)}
          </p>
        </div>
      </div>
      <ProjectOperations />
    </div>
  );
};
