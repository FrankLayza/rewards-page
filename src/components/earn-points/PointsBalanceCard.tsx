import { memo, useMemo } from "react";
import { Trophy } from "lucide-react";
import { LiaStarSolid } from "react-icons/lia";

interface PointsBalanceCardProps {
  points: number;
}

function PointsBalanceCard({ points }: PointsBalanceCardProps) {
  const progressPercentage = useMemo(
    () => `${(points / 5000) * 100}%`,
    [points]
  );
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-full transform transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-lg">
      <div className="flex items-center gap-2 text-purple-700 font-semibold mb-4 p-4 bg-[#eef2ff] border-b-0 rounded-t-xl">
        <Trophy size={20} />
        <span>Points Balance</span>
      </div>

      <div className="flex items-center justify-between mb-2 p-6">
        <span className="text-5xl font-bold text-purple-600">{points}</span>
        <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center shadow-sm">
          <LiaStarSolid className="size-6 text-[#ff8800]" />
        </div>
      </div>

      <div className="mt-auto p-6">
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>Progress to $5 Gift Card</span>
          <span className="font-semibold">{points}/5000</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all duration-500"
            style={{
              width: progressPercentage,
            }}
          ></div>
        </div>
        <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
          🚀 Just getting started — keep earning points!
        </p>
      </div>
    </div>
  );
}

export default memo(PointsBalanceCard);
