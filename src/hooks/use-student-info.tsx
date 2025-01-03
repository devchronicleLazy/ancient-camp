// hooks/useStudentInfo.ts
'use client';

import { contractABI } from '@/contracts/abi';
import { useEffect, useState } from 'react';

import { useReadContract } from 'wagmi';

export interface StudentInfo {
    level: number;
    exp: number;
    completedCoursesCount: number;
}

export function useStudentInfo(address: string | undefined) {
    const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { data, isLoading, isError } = useReadContract({
        address: '0xb41dD39a91D438CdC95169Ee6eC20aE88b780e73',
        abi: contractABI,
        functionName: 'studentInfo',
        args: address ? [address] : undefined,

    });

    useEffect(() => {
        if (data) {
            try {
                // Based on the contract output format where data is an array of 3 values
                const [level, exp, completedCount] = data as [bigint, bigint, bigint];

                setStudentInfo({
                    level: Number(level),
                    exp: Number(exp),
                    completedCoursesCount: Number(completedCount)
                });
                setError(null);
            } catch (err) {
                console.error('Error parsing student info:', err);
                setError('Failed to load student information');
            }
        }
        setLoading(isLoading);
    }, [data, isLoading]);

    return {
        studentInfo,
        loading,
        error,
        isError
    };
}
