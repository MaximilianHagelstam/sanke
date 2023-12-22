import { Project } from "@/interfaces/Project";
import { formatDate } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ProjectOperations } from "./project-operations";

type ProjectItemProps = {
  project: Project;
};

export const ProjectItem = ({ project }: ProjectItemProps) => {
  return (
    <div className="flex items-center justify-between rounded-md border border-gray-200 p-4 dark:border-gray-800">
      <div className="grid gap-1">
        <Link
          to={`/boards/${project.id}`}
          className="truncate font-semibold hover:underline"
        >
          {project.title}
        </Link>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {formatDate(project.createdAt)}
          </p>
        </div>
      </div>
      <ProjectOperations projectId={project.id} />
    </div>
  );
};
