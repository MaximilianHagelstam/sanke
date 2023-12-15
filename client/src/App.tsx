import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "./providers/auth-provider";

const App = () => {
  const { user } = useAuth();

  if (!user) return "Landing page";

  return (
    <>
      <ThemeToggle />
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
};

export default App;
