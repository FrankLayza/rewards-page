import { useEffect, useState, useCallback } from "react";
import supabase from "../utils/supbaseClient"; // Ensure path is correct

export interface Transaction {
  id: string;
  amount: number;
  description?: string; // Added this based on your UI needs
  type: "earned" | "redeemed" | "bonus";
  created_at: string;
}

export const useRewardsData = () => {
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [claimedToday, setClaimedToday] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [weeklyClaims, setWeeklyClaims] = useState<number[]>([]);

  // Helper to get start of week
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
      setLoading(true);
      setError(null);

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("No user logged in");

      const startOfWeekISO = getStartOfWeek().toISOString();

      // A. Fetch Profile
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("points_balance, streak_count, last_claimed_at")
        .eq("id", user.id)
        .single();

      if (profileError) throw profileError;

      const { data: history, error: historyError } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (historyError) throw historyError;

      // C. Fetch Weekly Claims
      const { data: weekClaims, error: weekError } = await supabase
        .from("transactions")
        .select("created_at")
        .eq("user_id", user.id)
        .eq("type", "bonus")
        .gte("created_at", startOfWeekISO);

      if (weekError) throw weekError;

      // Process Weekly Claims
      const claimedIndices = (weekClaims || []).map((t) => {
        const date = new Date(t.created_at);
        const day = date.getDay();
        return day === 0 ? 6 : day - 1;
      });

      // Logic: Check if claimed today
      const lastClaimDate = profile?.last_claimed_at
        ? new Date(profile.last_claimed_at)
        : null;

      const isClaimedToday = lastClaimDate
        ? lastClaimDate.toDateString() === new Date().toDateString()
        : false;

      // Update State
      setPoints(profile?.points_balance || 0);
      setStreak(profile?.streak_count || 0);
      setTransactions(history || []);
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

  return {
    points,
    transactions,
    loading,
    error,
    claimedToday,
    streak,
    weeklyClaims,
    refresh: fetchData, 
  };
};
