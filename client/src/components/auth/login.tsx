import { login } from "@/data/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "./auth-layout";

export const Login = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => login(username, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/projects");
    },
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
    <AuthLayout
      title="Welcome back"
      description="Enter your username to sign in to your account"
      submitButtonText="Sign In"
      bottomText="Don't have an account? Sign Up"
      bottomLink="/register"
      mutation={mutation}
      onSubmit={onSubmit}
    />
  );
};
