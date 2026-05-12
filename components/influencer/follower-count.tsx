"use client";

interface FollowerCountProps {
    count: number;
}

export const FollowerCount = ({ count }: FollowerCountProps) => {
    const formatFollowers = (num: number) => {
        if (!num) return '0';
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num.toString();
    };

    return <span>{formatFollowers(count)}</span>;
};
