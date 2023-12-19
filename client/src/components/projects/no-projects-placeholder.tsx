import { Sprout } from "lucide-react";
import { CreateProjectButton } from "./create-project-button";

export const NoProjectsPlaceHolder = () => {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed border-slate-200 p-8 text-center animate-in fade-in-50 dark:border-slate-800">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
          <Sprout className="h-10 w-10" />
        </div>
        <h2 className="mt-6 text-xl font-semibold">No projects created</h2>
        <p className="mb-8 mt-2 text-center text-sm font-normal leading-6 text-slate-500 dark:text-slate-400">
          You haven't started any projects. Begin planning now.
        </p>
        <CreateProjectButton variant="outline" />
      </div>
    </div>
  );
};
