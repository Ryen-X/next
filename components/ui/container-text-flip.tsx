"use client";

import React, { useState, useEffect, useId, useMemo } from "react";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Define a mapping of words to background colors with gradients
const wordBackgroundColors: { [key: string]: string } = {
  vote: "bg-gradient-to-br from-red-500 to-red-700",
  voice: "bg-gradient-to-br from-yellow-500 to-yellow-700",
  legacy: "bg-gradient-to-br from-blue-500 to-blue-700",
  choice: "bg-gradient-to-br from-green-700 to-green-900",
};

export interface ContainerTextFlipProps {
  /** Array of words to cycle through in the animation */
  words?: string[];
  /** Time in milliseconds between word transitions */
  interval?: number;
  /** Additional CSS classes to apply to the container */
  className?: string;
  /** Additional CSS classes to apply to the text */
  textClassName?: string;
  /** Duration of the transition animation in milliseconds */
  animationDuration?: number;
}

export function ContainerTextFlip({
  words = ["vote", "voice", "legacy", "future"],
  interval = 3000,
  className,
  textClassName,
  animationDuration = 700,
}: ContainerTextFlipProps) {
  const id = useId();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [width, setWidth] = useState(100);
  const textRef = React.useRef(null);

  const currentWord = words[currentWordIndex];
  const backgroundColorClass = useMemo(() => {
    return wordBackgroundColors[currentWord.toLowerCase()] || "bg-gray-500"; // Default or fallback color
  }, [currentWord]);

  const updateWidthForWord = () => {
    if (textRef.current) {
      // Add some padding to the text width (30px on each side)
      // @ts-expect-error TS2339: Property 'scrollWidth' does not exist on type 'never'.
      const textWidth = textRef.current.scrollWidth + 30;
      setWidth(textWidth);
    }
  };

  useEffect(() => {
    // Update width whenever the word changes
    updateWidthForWord();
  }, [currentWordIndex]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      // Width will be updated in the effect that depends on currentWordIndex
    }, interval);

    return () => clearInterval(intervalId);
  }, [words, interval]);

  return (
    <motion.div
      layout
      layoutId={`words-here-${id}`}
      animate={{ width }}
      transition={{ duration: animationDuration / 2000 }}
      className={cn(
        "relative inline-block rounded-lg pt-2 pb-3 text-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white",
        backgroundColorClass, // Apply dynamic background color
        "shadow-[inset_0_-1px_#d1d5db,inset_0_0_0_1px_#d1d5db,_0_4px_8px_#d1d5db]",
        "dark:shadow-[inset_0_-1px_#10171e,inset_0_0_0_1px_hsla(205,89%,46%,.24),_0_4px_8px_#00000052]",
        className,
      )}
      key={currentWord}
    >
      <motion.div
        transition={{
          duration: animationDuration / 1000,
          ease: "easeInOut",
        }}
        className={cn("inline-block", textClassName)}
        ref={textRef}
        layoutId={`word-div-${currentWord}-${id}`}
      >
        <motion.div className="inline-block">
          {currentWord.split("").map((letter, index) => (
            <motion.span
              key={index}
              initial={{
                opacity: 0,
                filter: "blur(10px)",
              }}
              animate={{
                opacity: 1,
                filter: "blur(0px)",
              }}
              transition={{
                delay: index * 0.02,
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
