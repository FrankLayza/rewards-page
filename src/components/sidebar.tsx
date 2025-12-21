import {
  Home,
  Compass,
  Library,
  Layers,
  CreditCard,
  Gem,
  Settings,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function Sidebar() {
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
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0">
      {/* Logo Area */}
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
          F
        </div>
        <span className="text-xl font-bold text-gray-800">Flowva</span>
      </div>

      {/* Navv links */}
      <nav className="flex-1 px-4 space-y-2 mt-4">
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

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>FA</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Frank</p>
            <p className="text-xs text-gray-500 truncate">
              anthony@example.com
            </p>
          </div>
          <LogOut size={16} className="text-gray-400 hover:text-red-500" />
        </div>
      </div>
    </aside>
  );
}
