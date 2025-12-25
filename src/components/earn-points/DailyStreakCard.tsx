import { memo, useMemo } from "react";
import { Check, Flame, Calendar } from "lucide-react";

interface DailyStreakCardProps {
  streak: number;
  weeklyClaims: number[];
  claimedToday: boolean;
  isClaiming: boolean;
  onClaim: () => void;
}

function DailyStreakCard({
  streak,
  weeklyClaims,
  claimedToday,
  isClaiming,
  onClaim,
}: DailyStreakCardProps) {
  const weekDays = useMemo(() => ["M", "T", "W", "T", "F", "S", "S"], []);
  const currentDayIndex = useMemo(() => {
    const today = new Date().getDay();
    return today === 0 ? 6 : today - 1;
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col h-full transform transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-lg">
      <div className="flex items-center gap-2 text-blue-500 font-semibold mb-4 p-4 bg-[#eef2ff] border-b-0 rounded-t-xl">
        <Calendar size={20} />
        <span className="text-[#374151]">Daily Streak</span>
      </div>

      <div className="flex items-end gap-2 mb-6 px-4">
        <span className="text-4xl font-bold text-purple-600">
          {streak} day{streak !== 1 ? "s" : ""}
        </span>
        {streak > 3 && (
          <Flame className="text-orange-500 mb-1" fill="currentColor" />
        )}
      </div>

      {/* Week Circles */}
      <div className="flex justify-between mb-6 px-4">
        {weekDays.map((dayLabel, index) => {
          const isClaimedInDB = weeklyClaims.includes(index);
          const isToday = index === currentDayIndex;

          return (
            <div key={index} className="flex flex-col items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                  isToday
                    ? isClaimedInDB
                      ? "bg-purple-600 text-white"
                      : "bg-white text-purple-600 ring-2 ring-purple-600"
                    : isClaimedInDB
                    ? "bg-purple-100 text-purple-600 border border-purple-200"
                    : "bg-gray-50 text-gray-300"
                }`}
              >
                {isClaimedInDB ? <Check size={14} /> : dayLabel}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-gray-500 px-4">Check in daily to earn +5 points</p>

      <button
        disabled={claimedToday || isClaiming}
        onClick={onClaim}
        className={`mx-4 w-[calc(100%-2rem)] py-3 mb-5 rounded-full font-medium flex items-center justify-center gap-2 transition-colors mt-auto cursor-pointer ${
          claimedToday
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-purple-600 text-white hover:bg-purple-700 shadow-md hover:shadow-lg"
        }`}
      >
        {isClaiming ? (
          "Claiming..."
        ) : claimedToday ? (
          <>
            <Flame size={18} /> Claimed Today
          </>
        ) : (
          "Claim Daily Points"
        )}
      </button>
    </div>
  );
}

export default memo(DailyStreakCard);
