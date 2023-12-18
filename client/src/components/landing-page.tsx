import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export const LandingPage = () => {
  return (
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Welcome to Sanke
        </h1>
        <p className="max-w-[42rem] leading-normal text-slate-500 sm:text-xl sm:leading-8">
          I'm building a project management tool and open sourcing everything.
          Follow along as we figure this out together.
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
