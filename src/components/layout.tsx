import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

export default function Layout() {
  const [isMobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isMobileOpen={isMobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content Area */}
      {/* ml-64 pushes content to the right to account for the fixed sidebar */}
      <main className="flex-1 md:ml-64 w-full min-w-0 overflow-x-hidden">
        <div className="max-w-6xl mx-auto w-full">
          {/* <Outlet /> renders the child route (the Rewards Page) */}
          <Outlet context={{ isMobileOpen, setMobileOpen }} />
        </div>
      </main>
    </div>
  );
}
