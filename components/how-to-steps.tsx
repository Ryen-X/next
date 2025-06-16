"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const steps = [
  {
    id: 1,
    title: "Fill the details",
    description: "In the voting form, enter your name, class, and admission number.",
  },
  {
    id: 2,
    title: "Browse Candidates",
    description: "View profiles of all candidates for different roles.",
  },
  {
    id: 3,
    title: "Cast Your Vote",
    description: "Select your preferred candidates for each category.",
  },
  {
    id: 4,
    title: "Confirm & Submit",
    description: "Review your selections and submit your vote securely.",
  },
];

const HowToSteps = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-foreground">
          How It Works
        </h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {steps.map((step) => (
            <motion.div key={step.id} variants={itemVariants}>
              <Card className="h-full flex flex-col bg-card text-card-foreground border border-border shadow-xl p-6">
                <CardHeader className="p-0 pb-4">
                  <CardTitle className="text-primary text-4xl font-extrabold mb-2">{step.id}. {step.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow p-0">
                  <CardDescription className="text-lg text-muted-foreground">{step.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowToSteps;
