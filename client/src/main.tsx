import { LandingPage } from "@/components/landing-page";
import { Layout } from "@/components/layout";
import { Login } from "@/components/login";
import { Projects } from "@/components/projects";
import { Register } from "@/components/register";
import { RequireAuth } from "@/components/require-auth";
import { RequireGuest } from "@/components/require-guest";
import { Toaster } from "@/components/ui/toaster";
import "@/index.css";
import { AuthProvider } from "@/providers/auth-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireGuest>
        <Layout>
          <LandingPage />
        </Layout>
      </RequireGuest>
    ),
  },
  {
    path: "/login",
    element: (
      <RequireGuest>
        <Login />
      </RequireGuest>
    ),
  },
  {
    path: "/register",
    element: (
      <RequireGuest>
        <Register />
      </RequireGuest>
    ),
  },
  {
    path: "/projects",
    element: (
      <RequireAuth>
        <Layout>
          <Projects />
        </Layout>
      </RequireAuth>
    ),
  },
  {
    path: "*",
    element: <h1>404 - Not Found</h1>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <div className="min-h-screen w-full bg-white font-sans text-gray-950 antialiased dark:bg-gray-950 dark:text-gray-50">
            <RouterProvider router={router} />
            <Toaster />
          </div>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
