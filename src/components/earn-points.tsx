import { useState, useMemo, useCallback } from "react";
import { useRewardsData } from "@/contexts/RewardsContext";
import supabase from "@/utils/supbaseClient";
import EarnPointsSkeleton from "./earn-points/EarnPointsSkeleton";
import EarnPointsError from "./earn-points/EarnPointsError";
import PointsBalanceCard from "./earn-points/PointsBalanceCard";
import DailyStreakCard from "./earn-points/DailyStreakCard";
import FeaturedSpotlightCard from "./earn-points/FeaturedSpotlightCard";
import EarnMorePointsSection from "./earn-points/EarnMorePointsSection";
import ReferAndEarnSection from "./earn-points/ReferAndEarnSection";
import ShareStackModal from "./earn-points/ShareStackModal";
import ClaimPointsModal from "./earn-points/ClaimPointsModal";

export default function EarnRewardsView() {
  const {
    points,
    claimedToday,
    streak,
    weeklyClaims,
    referralCode,
    referralsStats,
    refresh,
    loading,
    error,
  } = useRewardsData();

  const [copied, setCopied] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isClaiming, setClaiming] = useState(false);
  const [showClaimModal, setShowClaimModal] = useState(false);

  // Memoize computed values
  const realReferralLink = useMemo(
    () =>
      typeof window !== "undefined"
        ? `${window.location.origin}/signup?ref=${referralCode || "..."}`
        : "",
    [referralCode]
  );

  const shareText = useMemo(
    () => "Join Flowva and start earning rewards! Use my referral link:",
    []
  );

  const encodedLink = useMemo(
    () => encodeURIComponent(realReferralLink),
    [realReferralLink]
  );

  const encodedText = useMemo(
    () => encodeURIComponent(`${shareText} ${realReferralLink}`),
    [shareText, realReferralLink]
  );

  // Memoize event handlers
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(realReferralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [realReferralLink]);

  const handleShareFacebook = useCallback(() => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`;
    window.open(url, "_blank", "width=600,height=400");
  }, [encodedLink]);

  const handleShareTwitter = useCallback(() => {
    const url = `https://twitter.com/intent/tweet?text=${encodedText}`;
    window.open(url, "_blank", "width=600,height=400");
  }, [encodedText]);

  const handleShareLinkedIn = useCallback(() => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedLink}`;
    window.open(url, "_blank", "width=600,height=400");
  }, [encodedLink]);

  const handleShareWhatsApp = useCallback(() => {
    const url = `https://wa.me/?text=${encodedText}`;
    window.open(url, "_blank");
  }, [encodedText]);

  const handleClaim = useCallback(async () => {
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
  }, [claimedToday, refresh]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleClaimSubmit = useCallback(async (_email: string, _file: File) => {
    // TODO: Implement actual submission logic with Supabase
    // For now, just show success message
    alert("Claim submitted! Your points will be added after verification.");
  }, []);

  const handleShowClaimModal = useCallback(() => {
    setShowClaimModal(true);
  }, []);

  const handleShowShareModal = useCallback(() => {
    setShowShareModal(true);
  }, []);

  const handleCloseShareModal = useCallback(() => {
    setShowShareModal(false);
  }, []);

  const handleCloseClaimModal = useCallback(() => {
    setShowClaimModal(false);
  }, []);

  // Loading State
  if (loading) {
    return <EarnPointsSkeleton />;
  }

  // Error State
  if (error) {
    return <EarnPointsError error={error} onRetry={refresh} />;
  }

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
          <PointsBalanceCard points={points} />
          <DailyStreakCard
            streak={streak}
            weeklyClaims={weeklyClaims}
            claimedToday={claimedToday}
            isClaiming={isClaiming}
            onClaim={handleClaim}
          />
          <FeaturedSpotlightCard onClaimClick={handleShowClaimModal} />
        </div>
      </div>

      {/* Second row */}
      <EarnMorePointsSection onShareClick={handleShowShareModal} />

      {/* Third row */}
      <ReferAndEarnSection
        referralCode={referralCode}
        referralLink={realReferralLink}
        referralsStats={referralsStats}
        copied={copied}
        onCopy={handleCopy}
        onShareFacebook={handleShareFacebook}
        onShareTwitter={handleShareTwitter}
        onShareLinkedIn={handleShareLinkedIn}
        onShareWhatsApp={handleShareWhatsApp}
      />

      {/* Modals */}
      <ShareStackModal
        isOpen={showShareModal}
        onClose={handleCloseShareModal}
      />
      <ClaimPointsModal
        isOpen={showClaimModal}
        onClose={handleCloseClaimModal}
        onSubmit={handleClaimSubmit}
      />
    </div>
  );
}
