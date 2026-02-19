"use client";

import { cn } from "@/lib/utils";

export function WaveDivider({
  className,
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <svg
        className={cn("w-full h-auto", flip && "rotate-180")}
        viewBox="0 0 1440 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0,50 C150,100 350,0 500,50 C650,100 800,20 1000,50 C1200,80 1350,20 1440,50 L1440,100 L0,100 Z"
          fill="currentColor"
          className="text-sand"
        />
      </svg>
    </div>
  );
}

export function AnimatedWaves({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none",
        className
      )}
    >
      <svg
        className="w-full h-24"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0,50 C150,100 350,0 500,50 C650,100 800,20 1000,50 C1200,80 1350,20 1440,50 L1440,100 L0,100 Z"
          fill="rgba(5, 191, 219, 0.1)"
        />
        <path
          d="M0,60 C200,20 300,80 500,40 C700,0 850,80 1000,60 C1150,40 1300,90 1440,40 L1440,100 L0,100 Z"
          fill="rgba(8, 131, 149, 0.1)"
        />
      </svg>
    </div>
  );
}

export function FloatingBubbles({ className }: { className?: string }) {
  return null;
}
