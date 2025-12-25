import {
  Home,
  Compass,
  Library,
  Layers,
  CreditCard,
  Gem,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAuth } from "../contexts/AuthContext";

interface SidebarProps {
  isMobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export default function Sidebar({ isMobileOpen, setMobileOpen }: SidebarProps) {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  const menuItems = [
    { icon: Home, label: "Home", active: false },
    { icon: Compass, label: "Discover", active: false },
    { icon: Library, label: "Library", active: false },
    { icon: Layers, label: "Tech Stack", active: false },
    { icon: CreditCard, label: "Subscriptions", active: false },
    { icon: Gem, label: "Rewards Hub", active: true },
    { icon: Settings, label: "Settings", active: false },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside
        className={`${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out fixed flex w-64 bg-white border-r border-gray-200 flex-col h-screen left-0 top-0 z-50`}
      >
        {/* Logo Area */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
              F
            </div>
            <span className="text-xl font-bold text-gray-800">Flowva</span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden p-1 hover:bg-gray-100 rounded transition-colors"
            aria-label="Close menu"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Navv links */}
        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                item.active
                  ? "bg-purple-50 text-purple-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* User Account Section - Fixed at bottom */}
        <div className="mt-auto p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>FA</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                Frank
              </p>
              <p className="text-xs text-gray-500 truncate">
                anthony@example.com
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              aria-label="Logout"
            >
              <LogOut size={16} className="text-gray-400 hover:text-red-500" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
