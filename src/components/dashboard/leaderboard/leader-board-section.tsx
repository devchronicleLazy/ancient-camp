import React from "react";
import {
    Crown,
    Trophy,
    Medal,
    Sparkles,
    Users,
    Star
} from "lucide-react";

interface LeaderboardEntry {
    student: string;
    exp: number;
    completedCourses: number;
    level: number;
}

interface LeaderboardSectionProps {
    leaderboard: LeaderboardEntry[];
    currentAddress?: string;
}

export function LeaderboardSection({
    leaderboard,
    currentAddress
}: LeaderboardSectionProps) {
    return (
        <div className="px-56">
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-2xl overflow-hidden border border-blue-100">
                {/* Header */}
                <div className="p-6 bg-white/70 backdrop-blur-md border-b border-blue-100">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-3 rounded-2xl shadow-md">
                                <Trophy className="w-7 h-7 text-orange-600" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                                    Top Learners
                                </h2>
                                <p className="text-sm text-gray-500">
                                    Champions of the week
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-xl">
                            <Users className="w-5 h-5 text-blue-500" />
                            <span className="text-sm font-semibold text-blue-700">
                                {leaderboard.length} Students
                            </span>
                        </div>
                    </div>
                </div>

                {/* Leaderboard List */}
                <div className="divide-y divide-blue-100/50">
                    {leaderboard.map((student, index) => {
                        const position = index + 1;
                        const badges = {
                            1: { icon: Crown, color: "text-yellow-500", bg: "bg-yellow-50" },
                            2: { icon: Trophy, color: "text-blue-500", bg: "bg-blue-50" },
                            3: { icon: Medal, color: "text-orange-500", bg: "bg-orange-50" },
                        } as const;

                        const Badge = position <= 3 ? badges[position as 1 | 2 | 3].icon : undefined;
                        const badgeColor = position <= 3 ? badges[position as 1 | 2 | 3].color : "";
                        const badgeBg = position <= 3 ? badges[position as 1 | 2 | 3].bg : "";

                        return (
                            <div
                                key={student.student}
                                className={`
                relative p-5 transition-all duration-300 
                hover:bg-blue-50/30 
                ${student.student === currentAddress
                                        ? "bg-blue-100/30"
                                        : ""}
              `}
                            >
                                <div className="flex items-center space-x-5">
                                    {/* Position */}
                                    <div className="w-14 h-14 flex-shrink-0">
                                        {Badge ? (
                                            <div
                                                className={`
                        w-full h-full rounded-2xl 
                        ${badgeBg} shadow-md
                        flex items-center justify-center
                      `}
                                            >
                                                <Badge className={`w-7 h-7 ${badgeColor}`} />
                                            </div>
                                        ) : (
                                            <div className="w-full h-full rounded-2xl bg-gray-100 shadow-sm flex items-center justify-center">
                                                <span className="text-xl font-bold text-gray-500">#{position}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Student Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center space-x-2">
                                            <p
                                                className={`
                        font-semibold truncate 
                        ${student.student === currentAddress
                                                        ? "text-blue-700"
                                                        : "text-gray-900"}
                      `}
                                            >
                                                {student.student}
                                            </p>
                                            {position <= 3 && (
                                                <Sparkles
                                                    className={`w-5 h-5 ${badgeColor} animate-pulse`}
                                                />
                                            )}
                                        </div>

                                        <div className="flex items-center space-x-3 mt-1.5">
                                            <div className="flex items-center space-x-2">
                                                <div
                                                    className={`
                          w-2.5 h-2.5 rounded-full 
                          ${position <= 3
                                                            ? "bg-yellow-400 animate-pulse"
                                                            : "bg-gray-300"}
                        `}
                                                />
                                                <span className="text-sm text-gray-600">
                                                    Level {student.level}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Star className="w-5 h-5 text-yellow-400" />
                                                <span className="text-sm text-gray-600">
                                                    {student.exp.toLocaleString()} XP
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Courses Badge */}
                                    <div>
                                        <span
                                            className={`
                      px-3.5 py-1.5 rounded-xl text-sm font-semibold 
                      ${position <= 3
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-gray-100 text-gray-600"}
                    `}
                                        >
                                            {student.completedCourses} courses
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>

    );
}

export default LeaderboardSection;