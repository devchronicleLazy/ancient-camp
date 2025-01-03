"use client";

import { contractABI } from "@/contracts/abi";
import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";

export interface LeaderboardEntry {
  student: string;
  level: number;
  exp: number;
  completedCourses: number;
}

export function useLeaderboard(limit: number = 10) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { data, isLoading, isError } = useReadContract({
    address: "0xb41dD39a91D438CdC95169Ee6eC20aE88b780e73",
    abi: contractABI,
    functionName: "getLeaderboard",
    args: [BigInt(limit)],
  });

  useEffect(() => {
    if (data) {
      try {
        const entries = (data as any[]).map((entry) => ({
          student: entry.student,
          level: Number(entry.level),
          exp: Number(entry.exp),
          completedCourses: Number(entry.completedCourses),
        }));
        setLeaderboard(entries);
        setError(null);
      } catch (err) {
        console.error("Error parsing leaderboard:", err);
        setError("Failed to load leaderboard");
      }
    }
    setLoading(isLoading);
  }, [data, isLoading]);

  return { leaderboard, loading, error, isError };
}
