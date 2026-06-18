"use client";

interface FollowerCountProps {
    count: number;
}

export const FollowerCount = ({ count }: FollowerCountProps) => {
    const formatFollowers = (count: number | string) => {
        const num = Number(count);
        if (isNaN(num)) return count;
        if (num >= 1_000_000_000) {
            return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
        }
        if (num >= 1_000_000) {
            return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        }
        return num.toString();
    };

    return <span>{formatFollowers(count)}</span>;
};
