"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Import motion

interface CountdownTimerProps {
  targetDate: string; // ISO 8601 string, e.g., "2025-12-31T23:59:59"
  onTimeEnd?: (isTimeUp: boolean) => void; // Callback to notify parent when time is up
}

const calculateTimeLeft = (targetDate: string) => {
  const difference = +new Date(targetDate) - +new Date();
  let timeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  let isTimeUp = true;

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
    isTimeUp = false;
  }

  return { timeLeft, isTimeUp };
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, onTimeEnd }) => {
  const [{ timeLeft, isTimeUp }, setTimeData] = useState(() => calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setTimeout(() => {
      const newTimeData = calculateTimeLeft(targetDate);
      setTimeData(newTimeData);
      if (onTimeEnd) {
        onTimeEnd(newTimeData.isTimeUp);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [targetDate, onTimeEnd, timeLeft]); // Added timeLeft to dependency array to re-run effect

  // Initial call to onTimeEnd if time is already up on mount
  useEffect(() => {
    if (onTimeEnd) {
      onTimeEnd(isTimeUp);
    }
  }, [isTimeUp, onTimeEnd]);

  const timerComponents: JSX.Element[] = [];

  const timeUnits = [
    { unit: 'days', label: 'Days' },
    { unit: 'hours', label: 'Hours' },
    { unit: 'minutes', label: 'Minutes' },
    { unit: 'seconds', label: 'Seconds' },
  ];

  timeUnits.forEach(({ unit, label }) => {
    const value = timeLeft[unit as keyof typeof timeLeft];
    if (value !== undefined) {
      timerComponents.push(
        <div key={unit} className="flex flex-col items-center">
          <motion.span
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-mono text-foreground dark:text-white drop-shadow-lg text-center" // Removed fixed width
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            key={value} // Key for animation on value change
          >
            {String(value).padStart(2, '0')}
          </motion.span>
          <span className="text-sm sm:text-base md:text-lg text-muted-foreground dark:text-gray-400 uppercase tracking-wider mt-1">
            {label}
          </span>
        </div>
      );
    }
  });

  return (
    <div className="mt-8 px-4 py-4 bg-background/50 backdrop-blur rounded-xl shadow-2xl text-foreground border border-border/50 mx-auto"> {/* Removed max-w-md */}
      {!isTimeUp ? (
        <div className="flex justify-center items-center gap-x-2 sm:gap-x-4">
          {timerComponents.map((component, index) => (
            <React.Fragment key={index}>
              {component}
              {index < timerComponents.length - 1 && (
                <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-mono text-foreground dark:text-white relative top-[-0.2em]">
                  :
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      ) : (
        <motion.span
          className="text-3xl md:text-5xl font-extrabold text-primary dark:text-primary-400 text-center block py-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Voting has ended!
        </motion.span>
      )}
    </div>
  );
};

export default CountdownTimer;
