import { memo } from "react";
import { Users, Copy, CheckIcon } from "lucide-react";
import { FaFacebook, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

interface ReferAndEarnSectionProps {
  referralCode: string | null;
  referralLink: string;
  referralsStats: { count: number; earnings: number };
  copied: boolean;
  onCopy: () => void;
  onShareFacebook: () => void;
  onShareTwitter: () => void;
  onShareLinkedIn: () => void;
  onShareWhatsApp: () => void;
}

function ReferAndEarnSection({
  referralCode,
  referralLink,
  referralsStats,
  copied,
  onCopy,
  onShareFacebook,
  onShareTwitter,
  onShareLinkedIn,
  onShareWhatsApp,
}: ReferAndEarnSectionProps) {
  return (
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
                value={referralCode ? referralLink : "Loading..."}
                readOnly
                className="border border-gray-300 w-full bg-white rounded-md p-2 pr-10"
              />
              <button
                onClick={onCopy}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 cursor-pointer rounded transition-colors"
                title={copied ? "Copied!" : "Copy link"}
              >
                {copied ? (
                  <CheckIcon className="text-green-500" />
                ) : (
                  <Copy className="w-6 h-6 text-purple-600" />
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <div className="flex items-center gap-4">
              <button
                onClick={onShareFacebook}
                className="outline-none border-none cursor-pointer transform transition-transform duration-300 ease-out hover:-translate-y-2"
                aria-label="Share on Facebook"
              >
                <FaFacebook className="text-blue-500 size-8" />
              </button>
              <button
                onClick={onShareTwitter}
                className="rounded-full bg-black p-1.5 cursor-pointer transform transition-transform duration-300 ease-out hover:-translate-y-2 outline-none border-none"
                aria-label="Share on Twitter"
              >
                <FaXTwitter className="size-5 text-white" />
              </button>
              <button
                onClick={onShareLinkedIn}
                className="rounded-full bg-blue-500 p-1.5 cursor-pointer transform transition-transform duration-300 ease-out hover:-translate-y-2 outline-none border-none"
                aria-label="Share on LinkedIn"
              >
                <FaLinkedinIn className="size-5 text-white" />
              </button>
              <button
                onClick={onShareWhatsApp}
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
  );
}

export default memo(ReferAndEarnSection);
