"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import dynamic from "next/dynamic";
import React, { useState } from "react"; // Import useState
import Link from "next/link"; // Import Link (only one needed)

const CountdownTimer = dynamic(() => import("@/components/countdown-timer"), { ssr: false });
import { cn } from "@/lib/utils";
import AboutSection from "@/components/about-section";
import HowItWorksSection from "@/components/how-it-works-section";
import { AnimatedTestimonials } from "@/components/animated-testimonials";
import { AnimatedTooltip } from "@/components/animated-tooltip";
import FAQAccordion from "@/components/faq-accordion";
import CTASection from "@/components/cta-section";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

interface Candidate {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
}

const dummyCandidates: Candidate[] = [
  { id: "hb1", name: "John Doe", role: "Head Boy", imageUrl: "/14-200x300.jpg" },
  { id: "hb2", name: "Jane Smith", role: "Head Boy", imageUrl: "/100-200x300.jpg" },
  { id: "hb3", name: "Peter Jones", role: "Head Boy", imageUrl: "/193-200x300.jpg" },
  { id: "hb4", name: "Alice Brown", role: "Head Boy", imageUrl: "/343-200x300.jpg" },
  { id: "hg1", name: "Emily White", role: "Head Girl", imageUrl: "/418-200x300.jpg" },
  { id: "hg2", name: "David Green", role: "Head Girl", imageUrl: "/454-200x300.jpg" },
  { id: "hg3", name: "Sarah Black", role: "Head Girl", imageUrl: "/477-200x300.jpg" },
  { id: "hg4", name: "Michael Blue", role: "Head Girl", imageUrl: "/599-200x300.jpg" },
  { id: "d1", name: "Olivia Red", role: "Deputy", imageUrl: "/652-200x300.jpg" },
  { id: "d2", name: "William Yellow", role: "Deputy", imageUrl: "/798-200x300.jpg" },
  { id: "d3", name: "Sophia Purple", role: "Deputy", imageUrl: "/910-200x300.jpg" },
  { id: "d4", name: "James Orange", role: "Deputy", imageUrl: "/1035-200x300.jpg" },
];

export default function Home() {
  const [isTimeUp, setIsTimeUp] = useState(false); // State to track if countdown is over

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleTimeEnd = (timeUp: boolean) => {
    setIsTimeUp(timeUp);
  };

  const leadingCandidates = dummyCandidates.filter(
    (c) => c.role === "Head Boy" || c.role === "Head Girl"
  ).map((c) => ({
    quote: `"${c.name} is a dedicated leader with a clear vision for the future."`,
    name: c.name,
    designation: c.role,
    src: c.imageUrl,
    colorClass: c.role === "Head Boy" ? "text-blue-500" : "text-pink-500",
  }));

  const deputyCandidates = dummyCandidates.filter(
    (c) => c.role === "Deputy"
  ).map((c) => ({
    id: parseInt(c.id.replace('d', '')), // Convert id to number for AnimatedTooltip
    name: c.name,
    designation: c.role,
    image: c.imageUrl,
  }));

  return (
    <>
      <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center text-center overflow-hidden bg-gradient-to-br from-background to-muted animate-gradient-move [background-size:200%_200%]"> {/* Added gradient animation */}
        {/* Dot Background */}
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:20px_20px]",
            "[background-image:radial-gradient(#333333_1px,transparent_1px)]", // Darker gray/black for light theme
            "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]", // Slightly darker gray for dark theme
          )}
        />
        {/* Radial gradient for the container to give a faded look */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-gradient-to-br from-background to-muted animate-gradient-move [background-size:200%_200%] [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]"></div> {/* Increased transparent area and added gradient animation */}

        <motion.div
            className="relative z-20 flex flex-col items-center justify-center p-4 sm:p-8 lg:p-12 max-w-4xl mx-auto text-foreground dark:text-white"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-4 leading-tight drop-shadow-lg"
              variants={itemVariants}
            >
              Your <ContainerTextFlip words={["vote", "voice", "legacy", "choice"]} />
            </motion.h1>
            <motion.div
              className="text-lg sm:text-xl md:text-2xl text-foreground/90 dark:text-white/90 mb-8 max-w-xl px-4 sm:px-8" // Changed max-w-sm to max-w-xl, adjusted px
              variants={itemVariants}
            >
              <TextGenerateEffect words={"won't just decide who leads, it will define how we grow as one."}></TextGenerateEffect>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Link href={isTimeUp ? "/results" : "/vote"} passHref>
                <Button
                  size="lg"
                  className="shadow-lg transition-all duration-300 min-w-[200px] py-3 px-8 text-xl
                             bg-black text-white hover:bg-gray-800
                             dark:bg-white dark:text-black dark:hover:bg-gray-200"
                >
                  {isTimeUp ? "View Results" : "Cast Your Vote Now!"}
                </Button>
              </Link>
            </motion.div>
            <motion.div variants={itemVariants}>
              <CountdownTimer targetDate="2025-06-21T12:08:20" onTimeEnd={handleTimeEnd} />
            </motion.div>
          </motion.div>
      </section>
      <AboutSection />
      <HowItWorksSection />

      {/* Meet This Year's Candidates Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6 sm:px-10 lg:px-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-foreground">
            Meet This Year's Candidates
          </h2>

          {/* Leading Position Candidates */}
          <h3 className="text-3xl font-bold text-center mb-8 text-foreground">
            Leading Position Candidates
          </h3>
          <AnimatedTestimonials testimonials={leadingCandidates} autoplay={true} />

          {/* Deputies Candidates */}
          <h3 className="text-3xl font-bold text-center mt-16 mb-8 text-foreground">
            Deputies Candidates
          </h3>
          <div className="flex flex-wrap justify-center gap-8">
            <AnimatedTooltip items={deputyCandidates} />
          </div>
        </div>
      </section>

      <FAQAccordion />
      <CTASection />
    </>
  );
}
