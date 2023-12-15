import { ThemeToggle } from "@/components/theme-toggle";
import { getCurrentUser } from "@/data/user";
import { useQuery } from "@tanstack/react-query";

const App = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  if (isPending) return "Loading...";

  if (error) return error.message;

  return (
    <>
      <ThemeToggle />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

export default App;
