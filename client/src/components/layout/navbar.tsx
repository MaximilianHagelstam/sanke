import { KanbanSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { UserAvatar } from "./user-avatar";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex gap-6 md:gap-10">
          <Link to="/" className="flex items-center space-x-2">
            <KanbanSquare />
            <span className="inline-block font-bold">Sanke</span>
          </Link>
        </div>
        <UserAvatar />
      </div>
    </header>
  );
};
