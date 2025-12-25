import { memo } from "react";
import { Calendar } from "lucide-react";
import { HiUserAdd } from "react-icons/hi";
import { FaGift } from "react-icons/fa6";

interface FeaturedSpotlightCardProps {
  onClaimClick: () => void;
}

function FeaturedSpotlightCard({ onClaimClick }: FeaturedSpotlightCardProps) {
  return (
    <div className="rounded-2xl flex flex-col h-full bg-white transform transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-lg">
      <div className="p-4 bg-linear-to-r from-[#8b2ffe] to-[#78a0fe] rounded-t-2xl">
        <div>
          <span className="text-white px-3 py-1 text-sm bg-[#a452fe] rounded-full">
            Featured
          </span>
          <h3 className="text-white my-4 font-bold text-xl">
            Top Tool Spotlight
          </h3>
          <p className="text-xl text-white font-semibold">Reclaim</p>
        </div>
      </div>
      <div className="flex justify-between p-4 gap-4">
        <Calendar className="w-24" />
        <div className="text-sm">
          <p className="font-bold">Automate and Optimize Your Schedule</p>
          <p className="my-2 leading-5">
            Reclaim.ai is an AI-powered calendar assistant that automatically
            schedules your task, meetings and breaks to boost productivity. Free
            to try - earn Flowva points when you sign up!
          </p>
        </div>
      </div>

      <div className="flex justify-between p-4 border-gray-200 border-t">
        <a
          href="https://reclaim.ai/?pscd=go.reclaim.ai&ps_partner_key=MTZlZThkOWRhMTI4&ps_xid=ziN5XjFJJ8niE4&gsxid=ziN5XjFJJ8niE4&gspk=MTZlZThkOWRhMTI4"
          target="_blank"
        >
          <button className="flex items-center gap-2 bg-purple-600 rounded-full px-3 py-2 cursor-pointer">
            <HiUserAdd className="text-white size-5" />
            <span className="text-white text-sm font-semibold">Sign up</span>
          </button>
        </a>
        <button
          onClick={onClaimClick}
          className="flex items-center gap-2 bg-linear-to-r from-[#a124ec] to-[#ea709d] rounded-full px-2.5 py-2 cursor-pointer"
        >
          <FaGift className="text-white" />
          <span className="text-white text-sm font-semibold">Claim 50 pts</span>
        </button>
      </div>
    </div>
  );
}

export default memo(FeaturedSpotlightCard);
