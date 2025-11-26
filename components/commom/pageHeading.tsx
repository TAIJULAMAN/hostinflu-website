"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";

interface PageHeadingProps {
  title: string;
  className?: string;
}

export function PageHeading({ title, className = "" }: PageHeadingProps) {
  const router = useRouter();

  return (
    <div
      className={`top-0 bg-white flex items-center justify-between ${className}`}
    >
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="p-1.5 rounded-lg hover:bg-gray-100"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Button>
        <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
      </div>
    </div>
  );
}
