import {
  Check,
  Flame,
  Trophy,
  Calendar,
  Star,
  Share2,
  Users,
  Copy,
  CheckIcon,
  X,
  Layers,
  Upload,
} from "lucide-react";
import { FaFacebook, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { LiaStarSolid } from "react-icons/lia";
import { HiUserAdd } from "react-icons/hi";
import { FaXTwitter, FaGift } from "react-icons/fa6";
import { useState } from "react";
import { useRewardsData } from "@/contexts/RewardsContext";
import supabase from "@/utils/supbaseClient";

export default function EarnRewardsView() {
  const {
    points,
    claimedToday,
    streak,
    weeklyClaims,
    referralCode,
    referralsStats,
    refresh,
  } = useRewardsData();
  const [copied, setCopied] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isClaimed, setClaiming] = useState(false);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [claimEmail, setClaimEmail] = useState("");
  const [claimFile, setClaimFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const realReferralLink =
    typeof window !== "undefined"
      ? `${window.location.origin}/signup?ref=${referralCode || "..."}`
      : "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(realReferralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const shareText =
    "Join Flowva and start earning rewards! Use my referral link:";
  const encodedLink = encodeURIComponent(realReferralLink);
  const encodedText = encodeURIComponent(`${shareText} ${realReferralLink}`);

  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`;
    window.open(url, "_blank", "width=600,height=400");
  };

  const handleShareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodedText}`;
    window.open(url, "_blank", "width=600,height=400");
  };

  const handleShareLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedLink}`;
    window.open(url, "_blank", "width=600,height=400");
  };

  const handleShareWhatsApp = () => {
    const url = `https://wa.me/?text=${encodedText}`;
    window.open(url, "_blank");
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
        await refresh();
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
                <LiaStarSolid className="size-6 text-[#ff8800]" />
              </div>
            </div>

            <div className="mt-auto p-6">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>Progress to $5 Gift Card</span>
                <span className="font-semibold">
                  {points}/{`5000`}
                </span>
              </div>
              {/* Progress Bar Container */}
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${(points / 5000) * 100}%`,
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
              {streak > 3 && (
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

            <div className="flex justify-between p-4 border-gray-200 border-t">
              <a
                href="https://reclaim.ai/?pscd=go.reclaim.ai&ps_partner_key=MTZlZThkOWRhMTI4&ps_xid=ziN5XjFJJ8niE4&gsxid=ziN5XjFJJ8niE4&gspk=MTZlZThkOWRhMTI4"
                target="_blank"
              >
                <button className="flex items-center gap-2 bg-purple-600 rounded-full px-3 py-2 cursor-pointer">
                  <HiUserAdd className="text-white size-5" />
                  <span className="text-white text-sm font-semibold">
                    Sign up
                  </span>
                </button>
              </a>
              <button
                onClick={() => setShowClaimModal(true)}
                className="flex items-center gap-2 bg-linear-to-r from-[#a124ec] to-[#ea709d] rounded-full px-2.5 py-2 cursor-pointer"
              >
                <FaGift className="text-white" />
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
              <button
                onClick={() => setShowShareModal(true)}
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

      {/** Third row */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-6 bg-purple-600 rounded-full"></div>
          <h2 className="text-xl font-bold text-gray-900">Refer & Earn</h2>
        </div>
        <div className="bg-white rounded-t-2xl">
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
                <p className="font-semibold text-purple-400 text-3xl">
                  {referralsStats?.count}
                </p>
                <p className="text-sm">Referrals</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-purple-400 text-3xl">
                  {referralsStats?.earnings}
                </p>
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
                  value={referralCode ? realReferralLink : "Loading..."}
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
                <button
                  onClick={handleShareFacebook}
                  className="outline-none border-none cursor-pointer transform transition-transform duration-300 ease-out hover:-translate-y-2"
                  aria-label="Share on Facebook"
                >
                  <FaFacebook className="text-blue-500 size-8" />
                </button>
                <button
                  onClick={handleShareTwitter}
                  className="rounded-full bg-black p-1.5 cursor-pointer transform transition-transform duration-300 ease-out hover:-translate-y-2 outline-none border-none"
                  aria-label="Share on Twitter"
                >
                  <FaXTwitter className="size-5 text-white" />
                </button>
                <button
                  onClick={handleShareLinkedIn}
                  className="rounded-full bg-blue-500 p-1.5 cursor-pointer transform transition-transform duration-300 ease-out hover:-translate-y-2 outline-none border-none"
                  aria-label="Share on LinkedIn"
                >
                  <FaLinkedinIn className="size-5 text-white" />
                </button>
                <button
                  onClick={handleShareWhatsApp}
                  className="rounded-full bg-green-400 p-1.5 cursor-pointer transform transition-transform duration-300 ease-out hover:-translate-y-2 outline-none border-none"
                  aria-label="Share on WhatsApp"
                >
                  <FaWhatsapp className="size-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Your Stack Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={20} className="text-gray-500" />
            </button>

            {/* Modal Content */}
            <div className="flex flex-col items-center text-center">
              {/* Title */}
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Share Your Stack
              </h2>

              {/* Icon */}
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Layers className="w-8 h-8 text-purple-600" />
              </div>

              {/* Message */}
              <p className="text-gray-600 text-sm mb-6">
                You have no stack created yet, go to Tech Stack to create one.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Claim 50 Points Modal */}
      {showClaimModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-5 relative">
            {/* Close Button */}
            <button
              onClick={() => {
                setShowClaimModal(false);
                setClaimEmail("");
                setClaimFile(null);
              }}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={20} className="text-gray-500" />
            </button>

            {/* Modal Content */}
            <div className="mt-1">
              {/* Title */}
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Claim Your 50 Points
              </h2>

              {/* Instructions */}
              <div className="mb-4">
                <p className="text-sm text-gray-700 mb-3">
                  Sign up for Reclaim (free, no payment needed), then fill the
                  form below:
                </p>
                <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                  <li>Enter your Reclaim sign-up email.</li>
                  <li>
                    Upload a screenshot of your Reclaim profile showing your
                    email.
                  </li>
                </ol>
                <p className="text-sm text-gray-700 mt-3">
                  After verification, you'll get 50 Flowva Points! 🎉😊
                </p>
              </div>

              {/* Form */}
              <div className="space-y-3">
                {/* Email Input */}
                <div>
                  <label
                    htmlFor="claim-email"
                    className="block text-xs font-medium text-gray-700 mb-1.5"
                  >
                    Email used on Reclaim
                  </label>
                  <input
                    id="claim-email"
                    type="email"
                    value={claimEmail}
                    onChange={(e) => setClaimEmail(e.target.value)}
                    placeholder="user@example.com"
                    className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label
                    htmlFor="claim-screenshot"
                    className="block text-xs font-medium text-gray-700 mb-1.5"
                  >
                    Upload screenshot (mandatory)
                  </label>
                  <label
                    htmlFor="claim-screenshot"
                    className="flex flex-row items-center justify-center w-full h-12 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors px-4"
                  >
                    <Upload className="w-5 h-5 mr-2 text-gray-400" />
                    <p className="text-xs text-gray-500">
                      {claimFile ? claimFile.name : "Choose file"}
                    </p>
                    <input
                      id="claim-screenshot"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setClaimFile(file);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => {
                    setShowClaimModal(false);
                    setClaimEmail("");
                    setClaimFile(null);
                  }}
                  className="px-4 py-1.5 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    if (!claimEmail || !claimFile) {
                      alert("Please fill in all fields");
                      return;
                    }
                    setIsSubmitting(true);
                    try {
                      // TODO: Implement actual submission logic with Supabase
                      // For now, just show success message
                      alert(
                        "Claim submitted! Your points will be added after verification."
                      );
                      setShowClaimModal(false);
                      setClaimEmail("");
                      setClaimFile(null);
                    } catch (error) {
                      console.error("Error submitting claim:", error);
                      alert("Failed to submit claim. Please try again.");
                    } finally {
                      setIsSubmitting(false);
                    }
                  }}
                  disabled={isSubmitting}
                  className="px-4 py-1.5 text-sm text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit Claim"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
