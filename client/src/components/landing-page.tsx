import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";
import { Link, Navigate } from "react-router-dom";

export const LandingPage = () => {
  const { user } = useAuth();

  if (user) return <Navigate to="/projects" />;

  return (
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          Software project management simplified.
        </h1>
        <p className="max-w-[42rem] leading-normal text-gray-500 sm:text-xl sm:leading-8 dark:text-gray-400">
          Simplify project management with a straightforward tool. No-nonsense
          efficiency for achieving your goals effortlessly.
        </p>
        <div className="space-x-4">
          <Link to="/login" className={cn(buttonVariants({ size: "lg" }))}>
            Get Started
          </Link>
          <Link
            to="https://github.com/MaximilianHagelstam/sanke"
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            GitHub
          </Link>
        </div>
      </div>
    </section>
  );
};
