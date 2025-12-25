import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import supabase from "../utils/supbaseClient";

interface Transaction {
  id: string;
  amount: number;
  description?: string;
  type: "earned" | "redeemed" | "bonus";
  created_at: string;
}

interface RewardsContextType {
  points: number;
  streak: number;
  transactions: Transaction[];
  claimedToday: boolean;
  weeklyClaims: number[];
  referralCode: string | null;
  referralsStats: { count: number; earnings: number };
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const RewardsContext = createContext<RewardsContextType | undefined>(undefined);

// 2. The Provider Component (Holds the State)
export function RewardsProvider({ children }: { children: ReactNode }) {
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [claimedToday, setClaimedToday] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [weeklyClaims, setWeeklyClaims] = useState<number[]>([]);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [referralsStats, setReferralsStats] = useState({ count: 0, earnings: 0 });

  const getStartOfWeek = () => {
    const date = new Date();
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(date.setDate(diff));
    monday.setHours(0, 0, 0, 0);
    return monday;
  };

  const fetchData = useCallback(async () => {
    try {
      if (points === 0) setLoading(true); 
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const startOfWeekISO = getStartOfWeek().toISOString();

      // Parallel Fetching for speed
      const [profileResult, historyResult, weekClaimsResult] = await Promise.all([
        supabase.from("profiles").select("points_balance, streak_count, last_claimed_at, referral_code, total_referrals, referral_earnings").eq("id", user.id).single(),
        supabase.from("transactions").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
        supabase.from("transactions").select("created_at").eq("user_id", user.id).eq("type", "bonus").gte("created_at", startOfWeekISO)
      ]);

      if (profileResult.error) throw profileResult.error;
      if (historyResult.error) throw historyResult.error;
      if (weekClaimsResult.error) throw weekClaimsResult.error;

      const profile = profileResult.data;

      const claimedIndices = (weekClaimsResult.data || []).map((t) => {
        const date = new Date(t.created_at);
        const day = date.getDay();
        return day === 0 ? 6 : day - 1;
      });

      const lastClaimDate = profile?.last_claimed_at ? new Date(profile.last_claimed_at) : null;
      const isClaimedToday = lastClaimDate ? lastClaimDate.toDateString() === new Date().toDateString() : false;

      setPoints(profile?.points_balance || 0);
      setStreak(profile?.streak_count || 0);
      setReferralCode(profile?.referral_code || null);
      setReferralsStats({ count: profile?.total_referrals || 0, earnings: profile?.referral_earnings || 0 });
      setTransactions(historyResult.data || []);
      setClaimedToday(isClaimedToday);
      setWeeklyClaims(claimedIndices);

    } catch (err) {
      console.error("Error fetching data", err);
      setError('Error');
    } finally {
      setLoading(false);
    }
  }, []); 

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <RewardsContext.Provider value={{ 
      points, streak, transactions, claimedToday, weeklyClaims, 
      referralCode, referralsStats, loading, error, refresh: fetchData 
    }}>
      {children}
    </RewardsContext.Provider>
  );
}

// 3. The Hook (Now just consumes the Context)
export const useRewardsData = () => {
  const context = useContext(RewardsContext);
  if (context === undefined) {
    throw new Error("useRewardsData must be used within a RewardsProvider");
  }
  return context;
};