"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TextReveal({ text, className, delay = 0 }: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.p
      ref={ref}
      className={cn(className)}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay,
        ease: "easeOut",
      }}
    >
      {text}
    </motion.p>
  );
}

interface AnimatedHeadingProps {
  children: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export function AnimatedHeading({
  children,
  className,
  delay = 0,
  as: Component = "h2",
}: AnimatedHeadingProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay,
        ease: "easeOut",
      }}
    >
      <Component className={cn(className)}>{children}</Component>
    </motion.div>
  );
}

interface TypewriterProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export function Typewriter({ text, className, delay = 0 }: TypewriterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      className={cn(className)}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{
        duration: 0.5,
        delay,
      }}
    >
      {text}
    </motion.span>
  );
}
