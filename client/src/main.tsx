import App from "@/App";
import "@/index.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <div className="h-screen bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
          <App />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
