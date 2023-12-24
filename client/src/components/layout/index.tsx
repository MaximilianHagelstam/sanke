import { Outlet } from "react-router-dom";
import { Navbar } from "./navbar";

export const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <Navbar />
      <div className="container grid flex-1 gap-12">
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
