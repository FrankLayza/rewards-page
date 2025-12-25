import { useEffect, useState } from "react";
import supabase from "@/utils/supbaseClient";

export interface Transaction {
  id: string;
  amount: number;
  type: "earned" | "redeemed";
}
export interface RewardState {
  points: number;
  transactions: Transaction[];
  streak: number;
  claimedToday: boolean;
  loading: boolean;
  error: string | null;
}

export const useRewardData = () => {
  const [points, setPoints] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [claimed, setClaimed] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) throw new Error("No user logged in");

        //fetch profile
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("points_balance, streak_count, last_claimed_at")
          .eq("id", user.id)
          .single();

        if (profileError) throw profileError;

        //fetch transactions

        const { data: history, error: historyError } = await supabase
          .from("transactions")
          .select("*")
          .eq("id", user.id)
          .order("created_at", { ascending: false });

        if (historyError) throw historyError;

        const lastClaimDate = profile?.last_claimed_at
          ? new Date(profile?.last_claimed_at)
          : null;
        const isClaimToday = lastClaimDate
          ? lastClaimDate.toDateString() === new Date().toDateString()
          : false;
        setPoints(profile?.points_balance || 0);
        setTransactions(history || []);
        setClaimed(isClaimToday)
      } catch (error) {
        setError("Error");
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return { points, transactions, loading, error, claimed };
};
