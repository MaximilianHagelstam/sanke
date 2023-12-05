import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

const App = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="h-screen bg-white dark:bg-zinc-950">
        <ThemeToggle />
      </div>
    </ThemeProvider>
  );
};

export default App;
