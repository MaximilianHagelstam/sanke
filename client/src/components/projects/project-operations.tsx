import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { deleteProject } from "@/data/project";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, MoreVertical, Trash } from "lucide-react";
import { useState } from "react";

type ProjectOperationsProps = {
  projectId: string;
};

export const ProjectOperations = ({ projectId }: ProjectOperationsProps) => {
  const queryClient = useQueryClient();
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: () => deleteProject(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast({ title: "Deleted project" });
    },
    onError: (error) => {
      toast({ title: error.message });
    },
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 transition-colors hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-900">
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex cursor-pointer items-center text-red-600 focus:text-red-600 dark:focus:text-red-600"
            onSelect={() => setShowDeleteAlert(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this project?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => mutation.mutate()}
              className={cn(buttonVariants({ variant: "destructive" }))}
            >
              {mutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash className="mr-2 h-4 w-4" />
              )}
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
