import { Login } from "@/components/login";
import { useAuth } from "@/providers/auth-provider";

const App = () => {
  const { user } = useAuth();

  if (!user) return <Login />;

  return <pre>{JSON.stringify(user, null, 2)}</pre>;
};

export default App;
