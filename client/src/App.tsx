import { LandingPage } from "@/components/landing-page";
import { Layout } from "@/components/layout";
import { useAuth } from "@/providers/auth-provider";

const App = () => {
  const { user } = useAuth();

  if (!user)
    return (
      <Layout>
        <LandingPage />
      </Layout>
    );

  return <pre>{JSON.stringify(user, null, 2)}</pre>;
};

export default App;
