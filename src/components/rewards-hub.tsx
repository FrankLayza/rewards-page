import { useState } from "react";
import { Bell } from "lucide-react";
import EarnRewardsView from "./earn-points";
import RedeemRewardsView from "./redeem-rewards";

export default function Rewards() {
  const [activeTab, setActiveTab] = useState<"earn" | "redeem">("earn");
  return (
    <>
      <div>
        <div className="sticky top-0 bg-[#f9fafb] backdrop-blur-sm z-10 pb-4 pt-6 px-6 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-4">Rewards Hub</h1>
              <p className="text-gray-600">
                Earn points, unlock rewards and celebrate your progress!
              </p>
            </div>
            <div className="relative">
              <Bell className="w-6 h-6 text-gray-700 cursor-pointer hover:text-purple-600 transition-colors" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="flex">
            <button
              onClick={() => setActiveTab("earn")}
              className={`relative py-3 px-3 text-lg font-medium tracking-wide mr-6 cursor-pointer transition-all duration-300 ${
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
              className={`relative py-3 px-3 text-lg font-medium tracking-wide cursor-pointer transition-all duration-300 ${
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
