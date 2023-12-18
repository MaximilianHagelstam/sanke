import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/data/user";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { ChevronLeft, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

type LoginFormInput = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const mutation = useMutation({
    mutationFn: ({ username, password }: LoginFormInput) =>
      login(username, password),
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      username: { value: string };
      password: { value: string };
    };

    mutation.mutate({
      username: target.username.value,
      password: target.password.value,
    });
  };

  return (
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
        Sign In
      </Button>
    </form>
  );
};

export const Login = () => {
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
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-slate-500">
            Enter your username to sign in to your account
          </p>
        </div>
        <LoginForm />
        <Link
          to="/register"
          className="text-center text-sm text-slate-500 underline underline-offset-4 hover:text-slate-600 dark:hover:text-slate-400"
        >
          Don&apos;t have an account? Sign Up
        </Link>
      </div>
    </div>
  );
};
