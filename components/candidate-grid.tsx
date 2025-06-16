"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface Candidate {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
}

const dummyCandidates: Candidate[] = [
  { id: "hb1", name: "John Doe", role: "Head Boy", imageUrl: "/next.svg" },
  { id: "hb2", name: "Jane Smith", role: "Head Boy", imageUrl: "/next.svg" },
  { id: "hb3", name: "Peter Jones", role: "Head Boy", imageUrl: "/next.svg" },
  { id: "hb4", name: "Alice Brown", role: "Head Boy", imageUrl: "/next.svg" },
  { id: "hg1", name: "Emily White", role: "Head Girl", imageUrl: "/next.svg" },
  { id: "hg2", name: "David Green", role: "Head Girl", imageUrl: "/next.svg" },
  { id: "hg3", name: "Sarah Black", role: "Head Girl", imageUrl: "/next.svg" },
  { id: "hg4", name: "Michael Blue", role: "Head Girl", imageUrl: "/next.svg" },
  { id: "d1", name: "Olivia Red", role: "Deputy", imageUrl: "/next.svg" },
  { id: "d2", name: "William Yellow", role: "Deputy", imageUrl: "/next.svg" },
  { id: "d3", name: "Sophia Purple", role: "Deputy", imageUrl: "/next.svg" },
  { id: "d4", name: "James Orange", role: "Deputy", imageUrl: "/next.svg" },
];

const CandidateGrid = () => {
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
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-foreground">
          Meet This Year's Candidates
        </h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {dummyCandidates.map((candidate) => (
            <motion.div key={candidate.id} variants={itemVariants}>
              <Card className="h-full flex flex-col items-center text-center p-6 bg-card text-card-foreground border border-border shadow-md hover:shadow-xl transition-shadow duration-300">
                <Image
                  src={candidate.imageUrl}
                  alt={candidate.name}
                  width={150}
                  height={150}
                  className="rounded-full mb-4 object-cover w-36 h-36 border-4 border-primary shadow-lg"
                />
                <CardHeader className="p-0 pb-2">
                  <CardTitle className="text-2xl font-semibold text-foreground">{candidate.name}</CardTitle>
                  <CardDescription className="text-lg text-primary font-medium">{candidate.role}</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  {/* Additional candidate info can go here */}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CandidateGrid;
