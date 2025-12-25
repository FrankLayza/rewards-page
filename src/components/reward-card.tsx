import { Star, CreditCard, Wallet, Gift } from "lucide-react";
import { ReactNode } from "react";

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
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col h-full transform transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-lg">
      {/* Icon */}
      <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">{title}</h3>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 flex-grow text-center">{description}</p>

      {/* Cost */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
        <span className="text-purple-600 font-semibold">{points.toLocaleString()} pts</span>
      </div>

      {/* Status Button */}
      <button
        onClick={onRedeem}
        disabled={isLocked || isComingSoon}
        className={`w-full py-2.5 rounded-lg font-medium transition-colors ${
          isLocked || isComingSoon
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-purple-600 text-white hover:bg-purple-700"
        }`}
      >
        {isLocked
          ? "Locked"
          : isComingSoon
          ? "Coming Soon"
          : "Redeem"}
      </button>
    </div>
  );
}

