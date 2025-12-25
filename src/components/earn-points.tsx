import {
  Check,
  Flame,
  Trophy,
  Calendar,
  Star,
  Share2,
  Users,
  Facebook,
  Twitter,
  Linkedin,
  Gift,
  UserPlus2,
  Copy,
  CheckIcon,
} from "lucide-react";
import { useState } from "react";
import { useRewardsData } from "@/hooks/useRewardsData";
import supabase from "@/utils/supbaseClient";

export default function EarnRewardsView() {
  // Mock data for UI development (We will replace this with Supabase data later)
  const userData = {
    points: 5,
    goal: 5000,
    streak: 1,
    claimedToday: true,
  };
  const { points, claimedToday, streak, weeklyClaims } = useRewardsData();
  const [referralLink] = useState("https://flowvahub.com/ref/abc123");
  const [copied, setCopied] = useState(false);
  const [isClaimed, setClaiming] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleClaim = async () => {
    if (claimedToday) return;
    setClaiming(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase.rpc("claim_daily_bonus", {
        user_id: user.id,
      });
      if (error) throw error;

      if (data.success) {
        window.location.reload();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error claiming bonus", error);
    } finally {
      setClaiming(false);
    }
  };
  const weekDays = ["M", "T", "W", "T", "F", "S", "S"];
  const today = new Date().getDay();
  const currentDayIndex = today === 0 ? 6 : today - 1;

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-6 bg-purple-600 rounded-full"></div>
          <h2 className="text-xl font-bold text-gray-900">
            Your Rewards Journey
          </h2>
        </div>

        {/* 3-Column Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Points Balance */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-full transform transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-lg">
            <div className="flex items-center gap-2 text-purple-700 font-semibold mb-4 p-4 bg-[#eef2ff] border-b-0 rounded-t-xl">
              <Trophy size={20} />
              <span>Points Balance</span>
            </div>

            <div className="flex items-center justify-between mb-2 p-6">
              <span className="text-5xl font-bold text-purple-600">
                {points}
              </span>
              <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center shadow-sm">
                <span className="text-yellow-100 text-xl">★</span>{" "}
                {/* Simple Star Icon */}
              </div>
            </div>

            <div className="mt-auto p-6">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>Progress to $5 Gift Card</span>
                <span>
                  {points}/{userData.goal}
                </span>
              </div>
              {/* Progress Bar Container */}
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${(userData.points / userData.goal) * 100}%`,
                  }}
                ></div>
              </div>
              <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                🚀 Just getting started — keep earning points!
              </p>
            </div>
          </div>

          {/* Card 2: Daily Streak */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col h-full transform transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-lg">
            <div className="flex items-center gap-2 text-blue-500 font-semibold mb-4 p-4 bg-[#eef2ff] border-b-0 rounded-t-xl">
              <Calendar size={20} />
              <span className="text-[#374151]">Daily Streak</span>
            </div>

            <div className="flex items-end gap-2 mb-6 px-4">
              <span className="text-4xl font-bold text-purple-600">
                {streak} day{streak !== 1 ? "s" : ""}
              </span>
              {userData.streak > 3 && (
                <Flame className="text-orange-500 mb-1" fill="currentColor" />
              )}
            </div>

            {/* Week Circles */}
            <div className="flex justify-between mb-6 px-4">
              {weekDays.map((dayLabel, index) => {
                // Is this day found in our DB history?
                const isClaimedInDB = weeklyClaims.includes(index);

                // Is this strictly today?
                const isToday = index === currentDayIndex;

                return (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors
                        ${
                          // CASE A: It is Today
                          isToday
                            ? isClaimedInDB
                              ? "bg-purple-600 text-white" // Today & Claimed
                              : "bg-white text-purple-600 ring-2 ring-purple-600" // Today & Waiting
                            : // CASE B: It was claimed in the past
                            isClaimedInDB
                            ? "bg-purple-100 text-purple-600 border border-purple-200"
                            : // CASE C: Default / Missed
                              "bg-gray-50 text-gray-300"
                        }`}
                    >
                      {/* Show Check if claimed (today or past), otherwise label */}
                      {isClaimedInDB ? <Check size={14} /> : dayLabel}
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-gray-500 px-4">
              Check in daily to earn +5 points
            </p>

            <button
              disabled={claimedToday || isClaimed}
              onClick={handleClaim}
              className={`mx-4 w-[calc(100%-2rem)] py-3 mb-5 rounded-full font-medium flex items-center justify-center gap-2 transition-colors mt-auto cursor-pointer
                ${
                  claimedToday
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-purple-600 text-white hover:bg-purple-700 shadow-md hover:shadow-lg"
                }`}
            >
              {isClaimed ? (
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

          {/* Card 3: Featured Spotlight (Purple Gradient) */}
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
                  Reclaim.ai is an AI-powered calendar assistant that
                  automatically schedules your task, meetings and breaks to
                  boost productivity. Free to try - earn Flowva points when you
                  sign up!
                </p>
              </div>
            </div>

            <div className="flex justify-between p-4">
              <a
                href="https://reclaim.ai/?pscd=go.reclaim.ai&ps_partner_key=MTZlZThkOWRhMTI4&ps_xid=ziN5XjFJJ8niE4&gsxid=ziN5XjFJJ8niE4&gspk=MTZlZThkOWRhMTI4"
                target="_blank"
              >
                <button className="flex items-center gap-2 bg-purple-600 rounded-full px-3 py-1.5 cursor-pointer">
                  <UserPlus2 className="text-white" />
                  <span className="text-white text-sm font-semibold">
                    Sign up
                  </span>
                </button>
              </a>
              <button className="flex items-center gap-2 bg-linear-to-r from-[#a124ec] to-[#ea709d] rounded-full px-1.5 py-1.5">
                <Gift className="text-white" />
                <span className="text-white text-sm font-semibold">
                  Claim 50 pts
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Second row */}
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
              Invite 3 friends by Nov 20 and earn a chance to be one of 5
              winners of <span className="text-purple-400">10,000 points.</span>
              Friends must complete onboarding to qualify.
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
              <button className="group flex items-center gap-2 rounded-full bg-[#eef2ff] px-3 py-1.5 cursor-pointer transition-colors hover:bg-purple-600">
                <Share2 className="text-[#9013fe] transition-colors group-hover:text-white" />
                <p className="text-[#9013fe] font-semibold text-sm transition-colors group-hover:text-white">
                  Share
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/** Third row */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-6 bg-purple-600 rounded-full"></div>
          <h2 className="text-xl font-bold text-gray-900">Refer & Earn</h2>
        </div>
        <div className="bg-white">
          <div className="flex items-center gap-3 bg-[#eef2ff] p-4 rounded-t-2xl">
            <Users className="text-purple-500" />
            <div className="">
              <h2 className="font-semibold">Share Your Link</h2>
              <p className="text-gray-400">
                Invite friends and earn 25 points when they join!
              </p>
            </div>
          </div>
          <div className="p-4">
            <div className="flex justify-evenly items-center">
              <div className="text-center">
                <p className="font-semibold text-purple-400 text-3xl">0</p>
                <p className="text-sm">Referrals</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-purple-400 text-3xl">0</p>
                <p className="text-sm">Points Earned</p>
              </div>
            </div>

            <div className="bg-[#faf5ff] my-5 p-3 rounded-md">
              <p className="text-gray-600 text-sm">
                Your personal referral link:
              </p>
              <div className="relative mt-3">
                <input
                  type="text"
                  value={referralLink}
                  readOnly
                  className="border border-gray-300 w-full bg-white rounded-md p-2 pr-10"
                />
                <button
                  onClick={handleCopy}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 cursor-pointer rounded transition-colors"
                  title={copied ? "Copied!" : "Copy link"}
                >
                  {copied ? (
                    <CheckIcon className="text-green-500" />
                  ) : (
                    <Copy className={`w-6 h-6 ${"text-purple-600"}`} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-center items-center">
              <div className="flex items-center gap-4">
                <div className="bg-blue-500 w-8 h-8 flex justify-center items-center rounded-full">
                  <Facebook className="text-white outline-none border-none" />
                </div>
                <Twitter />
                <Linkedin />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
