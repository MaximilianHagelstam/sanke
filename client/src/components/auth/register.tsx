import { register } from "@/data/user";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "./auth-layout";

export const Register = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => register(username, password),
    onSuccess: () => {
      navigate("/login");
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
      title="Create an account"
      description="Enter a username to create your account"
      submitButtonText="Sign Up"
      bottomText="Already have an account? Login"
      bottomLink="/login"
      mutation={mutation}
      onSubmit={onSubmit}
    />
  );
};
