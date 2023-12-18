import { LandingPage } from "@/components/landing-page";
import { Layout } from "@/components/layout";
import "@/index.css";
import { AuthProvider } from "@/providers/auth-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RootRoute,
  Route,
  Router,
  RouterProvider,
} from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";
import { Login } from "./components/login";

const queryClient = new QueryClient();

const rootRoute = new RootRoute();
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Layout>
      <LandingPage />
    </Layout>
  ),
});
const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "login",
  component: () => <Login />,
});
const registerRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "register",
  component: () => <h1>Register</h1>,
});
const projectsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "projects",
  component: () => <h1>Projects</h1>,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
  projectsRoute,
]);

const notFoundRoute = new Route({
  getParentRoute: () => rootRoute,
  id: "notFound",
  component: () => <h1>404 - Not Found</h1>,
});
const router = new Router({ routeTree, notFoundRoute });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <div className="min-h-screen w-full bg-white font-sans text-gray-950 antialiased dark:bg-gray-950 dark:text-gray-50">
            <RouterProvider router={router} />
          </div>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
