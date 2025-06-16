"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-background text-foreground text-center relative overflow-hidden">
      {/* Subtle background pattern/gradient to match overall theme */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at center, var(--tw-gradient-stops))`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          '--tw-gradient-stops': 'var(--tw-gradient-from) 0%, var(--tw-gradient-to) 100%',
          '--tw-gradient-from': 'rgba(var(--background-rgb), 0.1)',
          '--tw-gradient-to': 'rgba(var(--background-rgb), 0.0)',
        } as React.CSSProperties}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          Ready to Make a Difference?
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto text-foreground/90 dark:text-white/90"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Your voice matters. Cast your vote today and shape the future of our school.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link href="/vote" passHref>
            <Button
              size="lg"
              className="shadow-lg transition-all duration-300 min-w-[200px] py-3 px-8 text-xl
                         bg-black text-white hover:bg-gray-800
                         dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              Vote Now!
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
