import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";
import { UseMutationResult } from "@tanstack/react-query";
import { ChevronLeft, Loader2 } from "lucide-react";
import { Link, Navigate, To } from "react-router-dom";

type AuthLayoutProps = {
  title: string;
  description: string;
  submitButtonText: string;
  bottomText: string;
  bottomLink: To;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  mutation: UseMutationResult<
    void,
    Error,
    {
      username: string;
      password: string;
    },
    unknown
  >;
};

export const AuthLayout = ({
  title,
  description,
  submitButtonText,
  bottomText,
  bottomLink,
  onSubmit,
  mutation,
}: AuthLayoutProps) => {
  const { user } = useAuth();

  if (user) return <Navigate to="/projects" />;

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        to="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        <span>Back</span>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
        <form onSubmit={onSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              disabled={mutation.isPending}
              required
            />
            {mutation.isError && (
              <p className="text-xs text-red-600">{mutation.error.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              disabled={mutation.isPending}
              required
            />
            {mutation.isError && (
              <p className="text-xs text-red-600">{mutation.error.message}</p>
            )}
          </div>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {submitButtonText}
          </Button>
        </form>
        <Link
          to={bottomLink}
          className="text-center text-sm text-gray-500 underline underline-offset-4 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          {bottomText}
        </Link>
      </div>
    </div>
  );
};
