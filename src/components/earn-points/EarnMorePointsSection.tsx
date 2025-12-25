import { memo } from "react";
import { Star, Share2 } from "lucide-react";

interface EarnMorePointsSectionProps {
  onShareClick: () => void;
}

function EarnMorePointsSection({ onShareClick }: EarnMorePointsSectionProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-6 bg-purple-600 rounded-full"></div>
        <h2 className="text-xl font-bold text-gray-900">Earn More Points</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#f9fafb] border-black shadow-md rounded-xl transform transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-lg hover:border hover:border-purple-400">
          <div className="flex items-center gap-3 bg-white border-b-0 rounded-t-xl p-4">
            <div className="bg-purple-200 p-2 rounded-md">
              <Star className="text-[#9013fe]" />
            </div>
            <h2 className="font-semibold text-sm">
              Refer and win 10,000 points!
            </h2>
          </div>
          <p className="my-3 font-semibold text-sm px-6 py-2">
            Invite 3 friends by Nov 20 and earn a chance to be one of 5 winners
            of <span className="text-purple-400">10,000 points.</span> Friends
            must complete onboarding to qualify.
          </p>
        </div>
        <div className="bg-[#f9fafb] border-black shadow-md rounded-xl transform transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-lg hover:border hover:border-purple-400">
          <div className="flex items-center gap-3 bg-white border-b-0 rounded-t-xl p-4">
            <div className="bg-purple-200 p-2 rounded-md">
              <Share2 className="text-[#9013fe]" />
            </div>
            <div>
              <h2 className="font-semibold text-sm">Share Your Stack</h2>
              <p className="text-sm text-gray-400">Earn +25 pts</p>
            </div>
          </div>
          <div className="flex justify-between items-center px-6">
            <p className="my-3 font-semibold text-sm py-2">
              Share your tool stack
            </p>
            <button
              onClick={onShareClick}
              className="group flex items-center gap-2 rounded-full bg-[#eef2ff] px-3 py-1.5 cursor-pointer transition-colors hover:bg-purple-600"
            >
              <Share2 className="text-[#9013fe] transition-colors group-hover:text-white" />
              <p className="text-[#9013fe] font-semibold text-sm transition-colors group-hover:text-white">
                Share
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(EarnMorePointsSection);
