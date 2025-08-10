"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Gift, Cake } from "lucide-react";

export default function Countdown({ onComplete }) {
  // 🎯 Set your target date/time here (future date)
  const targetDate = new Date(Date.now() + 2 * 60 * 1000); // 2 mins from now

  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    if (difference <= 0) {
      return null;
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (!timeLeft) {
      onComplete(); // 🎉 Trigger celebration when countdown ends
      return;
    }
    const timer = setInterval(() => {
      const newTime = calculateTimeLeft();
      setTimeLeft(newTime);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  if (!timeLeft) {
    return null; // ⏳ Don't render countdown if finished
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-900 to-pink-700 text-white">
      <motion.h1
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-6"
      >
        Countdown to Celebration
      </motion.h1>

      <div className="flex space-x-4 text-center text-2xl font-mono">
        <TimeBox label="Days" value={timeLeft.days} />
        <TimeBox label="Hours" value={timeLeft.hours} />
        <TimeBox label="Minutes" value={timeLeft.minutes} />
        <TimeBox label="Seconds" value={timeLeft.seconds} />
      </div>
    </div>
  );
}

function TimeBox({ label, value }) {
  return (
    <motion.div
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white/10 backdrop-blur-lg p-4 rounded-lg"
    >
      <div className="text-4xl font-bold">{value}</div>
      <div className="text-sm">{label}</div>
    </motion.div>
  );
}
