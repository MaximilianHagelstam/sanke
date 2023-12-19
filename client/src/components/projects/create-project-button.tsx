import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createProject } from "@/data/project";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";

type CreateProjectButtonProps = {
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost";
};

export const CreateProjectButton = ({ variant }: CreateProjectButtonProps) => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: ({ title }: { title: string }) => createProject(title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setIsOpen(false);
    },
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      title: { value: string };
    };

    mutation.mutate({
      title: target.title.value,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={variant}>
          <Plus className="mr-2 h-4 w-4" />
          New project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create project</DialogTitle>
          <DialogDescription>
            Enter a name and create the project.
          </DialogDescription>
        </DialogHeader>
        <form
          id="createProjectForm"
          className="grid gap-4 py-4"
          onSubmit={onSubmit}
        >
          <div className="grid gap-2">
            <Label htmlFor="title">Project Name</Label>
            <Input id="title" type="text" maxLength={30} required />
            {mutation.isError && (
              <p className="text-xs text-red-600">{mutation.error.message}</p>
            )}
          </div>
        </form>
        <DialogFooter>
          <Button form="createProjectForm" type="submit">
            {mutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Create Project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
