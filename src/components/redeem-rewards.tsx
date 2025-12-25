import { useState, useEffect, useMemo, useCallback } from "react";
import { CreditCard, Gift } from "lucide-react";
import { FaMoneyBill1Wave, FaGift } from "react-icons/fa6";
import RewardCard from "./reward-card";

type FilterType = "all" | "unlocked" | "locked" | "coming-soon";

interface Reward {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  points: number;
  status: "locked" | "unlocked" | "coming-soon";
}

export default function RedeemRewardsView() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [isMounted, setIsMounted] = useState(false);

  // Trigger animation when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // Mock data for rewards - memoized to prevent recreation on every render
  const rewards: Reward[] = useMemo(
    () => [
      {
        id: "1",
        icon: <FaMoneyBill1Wave className="size-8 text-green-500" />,
        title: "$5 Bank Transfer",
        description:
          "The $5 equivalent will be transferred to your bank account.",
        points: 5000,
        status: "locked",
      },
      {
        id: "2",
        icon: <FaMoneyBill1Wave className="size-8 text-green-500" />,
        title: "$5 PayPal International",
        description:
          "Receive a $5 PayPal balance transfer directly to your PayPal account email.",
        points: 5000,
        status: "locked",
      },
      {
        id: "3",
        icon: <FaGift className="w-8 h-8 text-pink-600" />,
        title: "$5 Virtual Visa Card",
        description:
          "Use your $5 prepaid card to shop anywhere Visa is accepted online.",
        points: 5000,
        status: "locked",
      },
      {
        id: "4",
        icon: <CreditCard className="w-8 h-8 text-blue-600" />,
        title: "$10 Amazon Gift Card",
        description: "Redeem for a $10 Amazon gift card code.",
        points: 10000,
        status: "locked",
      },
      {
        id: "5",
        icon: <Gift className="w-8 h-8 text-purple-600" />,
        title: "$25 Starbucks Gift Card",
        description: "Get your caffeine fix with a $25 Starbucks gift card.",
        points: 25000,
        status: "locked",
      },
      {
        id: "6",
        icon: <FaMoneyBill1Wave className="w-8 h-8 text-green-600" />,
        title: "$50 Bank Transfer",
        description:
          "The $50 equivalent will be transferred to your bank account.",
        points: 50000,
        status: "locked",
      },
      {
        id: "7",
        icon: <CreditCard className="w-8 h-8 text-indigo-600" />,
        title: "$100 PayPal Transfer",
        description: "Receive $100 directly to your PayPal account.",
        points: 100000,
        status: "locked",
      },
      {
        id: "8",
        icon: <Gift className="w-8 h-8 text-pink-600" />,
        title: "Premium Subscription",
        description: "Get 3 months of premium features free.",
        points: 75000,
        status: "coming-soon",
      },
    ],
    []
  );

  // Calculate counts for each filter - memoized
  const filterCounts = useMemo(
    () => ({
      all: rewards.length,
      unlocked: rewards.filter((r) => r.status === "unlocked").length,
      locked: rewards.filter((r) => r.status === "locked").length,
      "coming-soon": rewards.filter((r) => r.status === "coming-soon").length,
    }),
    [rewards]
  );

  // Memoize filtered rewards to prevent unnecessary recalculations
  const filteredRewards = useMemo(
    () =>
      activeFilter === "all"
        ? rewards
        : rewards.filter((reward: Reward) => reward.status === activeFilter),
    [activeFilter, rewards]
  );

  const handleRedeem = useCallback((rewardId: string) => {
    console.log("Redeeming reward:", rewardId);
    // TODO: Implement redemption logic
  }, []);

  return (
    <div className="space-y-6 md:space-y-8 w-full">
      {/* Section Header */}
      <div className="w-full">
        <div className="flex items-center gap-2 mb-4 md:mb-6">
          <div className="w-1 h-5 md:h-6 bg-purple-600 rounded-full"></div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900">
            Redeem Your Points
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex overflow-x-auto mb-4 md:mb-6 pb-2 scrollbar-hide w-full">
          {(
            [
              { key: "all", label: "All Rewards" },
              { key: "unlocked", label: "Unlocked" },
              { key: "locked", label: "Locked" },
              { key: "coming-soon", label: "Coming Soon" },
            ] as const
          ).map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`relative py-2 md:py-3 px-3 text-xs md:text-sm font-medium tracking-wide mr-3 md:mr-6 cursor-pointer flex items-center gap-1.5 md:gap-2 transition-all duration-300 whitespace-nowrap shrink-0 ${
                activeFilter === filter.key
                  ? "text-purple-600 rounded-t-md bg-purple-200"
                  : "text-gray-500 hover:text-gray-700 hover:bg-purple-200 rounded-t-md"
              }`}
            >
              <span className="hidden sm:inline">{filter.label}</span>
              <span className="sm:hidden">
                {filter.key === "all"
                  ? "All"
                  : filter.key === "unlocked"
                  ? "Unlocked"
                  : filter.key === "locked"
                  ? "Locked"
                  : "Soon"}
              </span>
              <span
                className={`px-1.5 md:px-2 py-0.5 rounded-full text-xs transition-all duration-300 ${
                  activeFilter === filter.key
                    ? "bg-purple-600 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {filterCounts[filter.key]}
              </span>
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-purple-600 transition-all duration-300 ease-out ${
                  activeFilter === filter.key && isMounted ? "w-full" : "w-0"
                }`}
              ></span>
            </button>
          ))}
        </div>

        {/* Reward Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full">
          {filteredRewards.map((reward) => (
            <RewardCard
              key={reward.id}
              icon={reward.icon}
              title={reward.title}
              description={reward.description}
              points={reward.points}
              status={reward.status}
              onRedeem={() => handleRedeem(reward.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
