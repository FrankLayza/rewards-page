import { Star } from "lucide-react";
import type { ReactNode } from "react";

interface RewardCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  points: number;
  status: "locked" | "unlocked" | "coming-soon";
  onRedeem?: () => void;
}

export default function RewardCard({
  icon,
  title,
  description,
  points,
  status,
  onRedeem,
}: RewardCardProps) {
  const isLocked = status === "locked";
  const isComingSoon = status === "coming-soon";

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 md:p-6 flex flex-col h-full w-full min-w-0 transform transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-lg">
      {/* Icon */}
      <div className="w-14 h-14 md:w-16 md:h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-3 md:mb-4 mx-auto">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-base md:text-lg font-semibold text-gray-500 mb-2 text-center">
        {title}
      </h3>

      {/* Description */}
      <p className="text-xs md:text-sm text-gray-500 mb-3 md:mb-4 grow text-center">
        {description}
      </p>

      {/* Cost */}
      <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
        <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-yellow-400" />
        <span className="text-purple-600 font-semibold text-xs md:text-sm">
          {points.toLocaleString()} pts
        </span>
      </div>

      {/* Status Button */}
      <button
        onClick={onRedeem}
        disabled={isLocked || isComingSoon}
        className={`w-full py-2 md:py-2.5 rounded-lg font-medium text-sm md:text-base transition-colors ${
          isLocked || isComingSoon
            ? "bg-[#e1e8f1] text-white cursor-not-allowed"
            : "bg-purple-600 text-white hover:bg-purple-700"
        }`}
      >
        {isLocked ? "Locked" : isComingSoon ? "Coming Soon" : "Redeem"}
      </button>
    </div>
  );
}
