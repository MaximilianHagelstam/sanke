import { Sprout } from "lucide-react";
import { CreateProjectButton } from "./create-project-button";

export const NoProjectsPlaceHolder = () => {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed border-gray-200 p-8 text-center animate-in fade-in-50 dark:border-gray-800">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
          <Sprout className="h-10 w-10" />
        </div>
        <h2 className="mt-6 text-xl font-semibold">No projects created</h2>
        <p className="mb-8 mt-2 text-center text-sm font-normal leading-6 text-gray-500 dark:text-gray-400">
          You haven't started any projects. Begin planning now.
        </p>
        <CreateProjectButton variant="outline" />
      </div>
    </div>
  );
};
