import { useState, useEffect } from "react";
import { DollarSign, CreditCard, Gift, ArrowRight } from "lucide-react";
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
    // Small delay to ensure the component is rendered before animation starts
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // Custom dollar bill icon component
  const DollarBillIcon = () => (
    <div className="relative">
      <div className="w-10 h-6 bg-green-500 rounded-sm flex items-center justify-center relative">
        <span className="text-white text-xs font-bold">10</span>
        <ArrowRight className="w-3 h-3 text-green-700 absolute -right-1 top-1/2 -translate-y-1/2" />
      </div>
    </div>
  );

  // Custom gift box icon component
  const GiftBoxIcon = () => (
    <div className="relative">
      <Gift className="w-8 h-8 text-yellow-600" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full"></div>
    </div>
  );

  // Mock data for rewards
  const rewards: Reward[] = [
    {
      id: "1",
      icon: <DollarBillIcon />,
      title: "$5 Bank Transfer",
      description: "The $5 equivalent will be transferred to your bank account.",
      points: 5000,
      status: "locked",
    },
    {
      id: "2",
      icon: <DollarBillIcon />,
      title: "$5 PayPal International",
      description:
        "Receive a $5 PayPal balance transfer directly to your PayPal account email.",
      points: 5000,
      status: "locked",
    },
    {
      id: "3",
      icon: <GiftBoxIcon />,
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
      icon: <DollarSign className="w-8 h-8 text-green-600" />,
      title: "$50 Bank Transfer",
      description: "The $50 equivalent will be transferred to your bank account.",
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
  ];

  // Calculate counts for each filter
  const filterCounts = {
    all: rewards.length,
    unlocked: rewards.filter((r) => r.status === "unlocked").length,
    locked: rewards.filter((r) => r.status === "locked").length,
    "coming-soon": rewards.filter((r) => r.status === "coming-soon").length,
  };

  // Filter rewards based on active filter
  const filteredRewards =
    activeFilter === "all"
      ? rewards
      : rewards.filter((reward) => reward.status === activeFilter);

  const handleRedeem = (rewardId: string) => {
    console.log("Redeeming reward:", rewardId);
    // TODO: Implement redemption logic
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1 h-6 bg-purple-600 rounded-full"></div>
          <h2 className="text-xl font-bold text-gray-900">Redeem Your Points</h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex mb-6">
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
              className={`relative py-3 px-3 text-sm font-medium tracking-wide mr-6 cursor-pointer flex items-center gap-2 transition-all duration-300 ${
                activeFilter === filter.key
                  ? "text-purple-600 rounded-t-md bg-purple-200"
                  : "text-gray-500 hover:text-gray-700 hover:bg-purple-200 rounded-t-md"
              }`}
            >
              {filter.label}
              <span
                className={`px-2 py-0.5 rounded-full text-xs transition-all duration-300 ${
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

