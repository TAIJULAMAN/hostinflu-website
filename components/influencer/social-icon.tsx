"use client";

import { Facebook, Instagram, Linkedin, Twitter, Youtube, Users } from "lucide-react";
import { FaTiktok } from "react-icons/fa";

interface SocialIconProps {
    platform: string;
    className?: string;
}

export const SocialIcon = ({ platform, className = "w-3.5 h-3.5 text-gray-400 hover:text-current transition-colors" }: SocialIconProps) => {
    switch (platform.toLowerCase()) {
        case 'facebook':
            return <Facebook className={`${className} hover:text-[#1877F2]`} />;
        case 'instagram':
            return <Instagram className={`${className} hover:text-[#E4405F]`} />;
        case 'twitter':
        case 'x':
            return <Twitter className={`${className} hover:text-[#1DA1F2]`} />;
        case 'linkedin':
            return <Linkedin className={`${className} hover:text-[#0A66C2]`} />;
        case 'youtube':
            return <Youtube className={`${className} hover:text-[#FF0000]`} />;
        case 'tiktok':
            return <FaTiktok className={`${className} hover:text-[#FF0000]`} />;
        default:
            return <Users className={className} />;
    }
};
