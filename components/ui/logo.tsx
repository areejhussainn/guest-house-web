"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "default" | "white" | "dark";
}

export function Logo({ className, variant = "default" }: LogoProps) {
  return (
    <Image
      src="/logo.svg"
      alt="Rasgrand"
      width={200}
      height={40}
      priority
      className={cn(
        "h-6 sm:h-7 md:h-8 w-auto object-contain transition-all duration-300",
        variant === "white" && "brightness-0 invert",
        className,
      )}
    />
  );
}
