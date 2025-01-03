'use client';

import { useAccount } from 'wagmi';

import { useCompletedCourses } from '@/hooks/use-completed-course';
import { useLeaderboard } from '@/hooks/use-leader-board';
import { useStudentInfo } from '@/hooks/use-student-info';
import { DashboardSkeleton } from './dashboard-skeleton';
import { LeaderboardSection } from './leaderboard/leader-board-section';

export function StudentDashboard() {
  const { address } = useAccount();
  const { studentInfo, loading: loadingInfo } = useStudentInfo(address);
  const { completedCourses, loading: loadingCourses } =
    useCompletedCourses(address);
  const { leaderboard, loading: loadingLeaderboard } = useLeaderboard(10);

  if (loadingInfo || loadingCourses || loadingLeaderboard) {
    return <DashboardSkeleton />;
  }
  console.log(completedCourses);

  if (!studentInfo) {
    return <div>No student information found</div>;
  }

  return (
    <LeaderboardSection leaderboard={leaderboard} currentAddress={address} />
  );
}
