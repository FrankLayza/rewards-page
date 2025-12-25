import { useState, useEffect, useRef } from "react";
import { Bell, X } from "lucide-react";
import { RiMenuFill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { useOutletContext } from "react-router-dom";
import EarnRewardsView from "./earn-points";
import RedeemRewardsView from "./redeem-rewards";

interface LayoutContext {
  isMobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export default function Rewards() {
  const [activeTab, setActiveTab] = useState<"earn" | "redeem">("earn");
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const { isMobileOpen, setMobileOpen } = useOutletContext<LayoutContext>() || {
    isMobileOpen: false,
    setMobileOpen: () => {},
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications]);

  return (
    <>
      <div>
        <div className="sticky top-0 bg-white backdrop-blur-sm z-10 pb-4 pt-6 px-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileOpen(!isMobileOpen)}
                className="md:hidden p-1 hover:bg-gray-100 rounded transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileOpen ? (
                  <IoClose className="w-6 h-6 text-black" />
                ) : (
                  <RiMenuFill className="w-6 h-6 text-black" />
                )}
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Rewards Hub</h1>
            </div>
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
                aria-label="View notifications"
              >
                <Bell className="w-5 h-5 text-gray-700" />
              </button>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-80 md:w-96 bg-white rounded-2xl shadow-xl border border-gray-200 z-50 overflow-hidden">
                  {/* Gradient Header */}
                  <div className="bg-linear-to-r from-purple-600 to-pink-500 p-4 flex items-center justify-between">
                    <h2 className="text-white font-bold text-lg">
                      Notifications
                    </h2>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          // TODO: Implement mark all as read functionality
                        }}
                        className="text-white text-sm hover:bg-white/20 rounded px-2 py-1 transition-colors"
                      >
                        Mark all as read
                      </button>
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
                        aria-label="Close notifications"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-8 flex flex-col items-center justify-center min-h-75">
                    {/* Large Bell Icon */}
                    <div className="mb-6">
                      <Bell className="w-20 h-20 text-orange-300 fill-orange-200" />
                    </div>

                    {/* No Notifications Text */}
                    <h3 className="text-gray-700 font-semibold text-lg mb-2">
                      No notifications
                    </h3>
                    <p className="text-gray-400 text-sm">
                      You're all caught up!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <p className="text-sm text-gray-600 ml-0 md:ml-0">
            Earn points, unlock rewards, and celebrate your progress!
          </p>
        </div>

        <div className="p-4 md:p-8 overflow-x-hidden">
          <div className="flex">
            <button
              onClick={() => setActiveTab("earn")}
              className={`relative py-3 px-3 text-base md:text-lg font-medium tracking-wide mr-6 cursor-pointer transition-all duration-300 ${
                activeTab === "earn"
                  ? "text-purple-600 rounded-t-md bg-purple-200"
                  : "text-gray-500 hover:text-gray-700 hover:bg-purple-200 rounded-t-md"
              }`}
            >
              Earn Points
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-purple-600 transition-all duration-300 ease-out ${
                  activeTab === "earn" ? "w-full" : "w-0"
                }`}
              ></span>
            </button>
            <button
              onClick={() => setActiveTab("redeem")}
              className={`relative py-3 px-3 text-base md:text-lg font-medium tracking-wide cursor-pointer transition-all duration-300 ${
                activeTab === "redeem"
                  ? "text-purple-600 rounded-t-md bg-purple-200"
                  : "text-gray-500 hover:text-gray-700 hover:bg-purple-200 rounded-t-md"
              }`}
            >
              Redeem Rewards
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-purple-600 transition-all duration-300 ease-out ${
                  activeTab === "redeem" ? "w-full" : "w-0"
                }`}
              ></span>
            </button>
          </div>
          <div className="mt-6 transition-opacity duration-300">
            {activeTab === "earn" ? <EarnRewardsView /> : <RedeemRewardsView />}
          </div>
        </div>
      </div>
    </>
  );
}
