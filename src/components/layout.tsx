import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar';

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      {/* ml-64 pushes content to the right to account for the fixed sidebar */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          {/* <Outlet /> renders the child route (the Rewards Page) */}
          <Outlet /> 
        </div>
      </main>
    </div>
  );
}