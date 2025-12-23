import { useState } from "react";
import EarnRewardsView from "./earn-points";

export default function Rewards() {
  const [activeTab, setActiveTab] = useState<"earn" | "redeem">("earn");
  return (
    <>
      <div>
        <div>
          <h1 className="text-2xl font-bold mb-4">Rewards Hub</h1>
          <p className="text-gray-600">
            Earn points, unlock rewards and celebrate your progress!
          </p>
        </div>

        <div className="flex pt-6">
          <button
            onClick={() => setActiveTab("earn")}
            className={`py-3 px-3 text-sm font-medium tracking-wide border-b-2 transition-colors mr-6 cursor-pointer ${
              activeTab === "earn"
                ? "border-purple-600 text-purple-600 rounded-t-md bg-purple-200"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-purple-200 rounded-t-md"
            }`}
          >
            Earn Points
          </button>
          <button
            onClick={() => setActiveTab("redeem")}
            className={`py-3 px-3 text-sm font-medium tracking-wide border-b-2 transition-colors cursor-pointer ${
              activeTab === "redeem"
                ? "border-purple-600 text-purple-600 rounded-t-md bg-purple-200"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-purple-200  rounded-t-md"
            }`}
          >
            Redeem Rewards
          </button>
        </div>
        <div className="mt-6">
          {activeTab === "earn" ? (
            <EarnRewardsView />
          ) : (
            <div className="text-center py-10 text-gray-500">
              Redeem Rewards Component Coming Soon...
            </div>
          )}
        </div>
      </div>
    </>
  );
}
