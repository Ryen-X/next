"use client";
import React from 'react';
import Image from 'next/image';
import { Card, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Leader {
  name: string;
  imageUrl: string;
  position: string;
  classSection: string;
}

interface Tenure {
  year: string;
  headBoy: Leader;
  headGirl: Leader;
  deputies: Leader[];
}

const pastLeadersData: Tenure[] = [
  {
    year: "2025-26",
    headBoy: { name: "John Doe", imageUrl: "/14-200x300.jpg", position: "Head Boy", classSection: "12 - PCM" },
    headGirl: { name: "Jane Smith", imageUrl: "/418-200x300.jpg", position: "Head Girl", classSection: "12 - PCB" },
    deputies: [
      { name: "Alice Johnson", imageUrl: "/652-200x300.jpg", position: "Deputy", classSection: "11 - COMMERCE" },
      { name: "Bob Williams", imageUrl: "/798-200x300.jpg", position: "Deputy", classSection: "11 - ARTS" },
    ],
  },
  {
    year: "2024-25",
    headBoy: { name: "Michael Brown", imageUrl: "/100-200x300.jpg", position: "Head Boy", classSection: "12 - PCMB" },
    headGirl: { name: "Emily Davis", imageUrl: "/454-200x300.jpg", position: "Head Girl", classSection: "12 - PCM" },
    deputies: [
      { name: "David Wilson", imageUrl: "/910-200x300.jpg", position: "Deputy", classSection: "11 - PCB" },
      { name: "Sarah Miller", imageUrl: "/1035-200x300.jpg", position: "Deputy", classSection: "11 - PCM" },
    ],
  },
  {
    year: "2023-24",
    headBoy: { name: "Chris Green", imageUrl: "/193-200x300.jpg", position: "Head Boy", classSection: "12 - COMMERCE" },
    headGirl: { name: "Olivia White", imageUrl: "/477-200x300.jpg", position: "Head Girl", classSection: "12 - ARTS" },
    deputies: [
      { name: "James Black", imageUrl: "/14-200x300.jpg", position: "Deputy", classSection: "11 - PCMB" },
      { name: "Sophia Blue", imageUrl: "/418-200x300.jpg", position: "Deputy", classSection: "11 - COMMERCE" },
    ],
  },
  {
    year: "2022-23",
    headBoy: { name: "Daniel Red", imageUrl: "/343-200x300.jpg", position: "Head Boy", classSection: "12 - ARTS" },
    headGirl: { name: "Ava Yellow", imageUrl: "/599-200x300.jpg", position: "Head Girl", classSection: "12 - COMMERCE" },
    deputies: [
      { name: "Ethan Purple", imageUrl: "/652-200x300.jpg", position: "Deputy", classSection: "11 - ARTS" },
      { name: "Mia Orange", imageUrl: "/798-200x300.jpg", position: "Deputy", classSection: "11 - PCB" },
    ],
  },
];

const LeaderCard: React.FC<{ leader: Leader }> = ({ leader }) => (
  <Card className="flex flex-col items-center p-6 text-center rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out bg-card/70 border border-border/50">
    <Image
      src={leader.imageUrl}
      alt={leader.name}
      width={100}
      height={100}
      className="rounded-full object-cover w-24 h-24 mb-4 border-4 border-primary/50 shadow-md"
    />
    <CardTitle className="text-xl font-semibold text-foreground mb-1">{leader.name}</CardTitle>
    <p className="text-sm text-muted-foreground">{leader.position}</p>
    <p className="text-sm text-muted-foreground">{leader.classSection}</p>
  </Card>
);

const PastLeadersPage = () => {
  const [selectedYear, setSelectedYear] = React.useState(pastLeadersData[0].year);

  const filteredLeaders = pastLeadersData.find(
    (tenure) => tenure.year === selectedYear
  );

  return (
    <div className={cn(
      "min-h-screen py-12 px-4 sm:px-6 lg:px-8",
      "bg-background",
      "[background-size:20px_20px]",
      "[background-image:radial-gradient(#333333_1px,transparent_1px)]",
      "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
    )}>
      <div className="max-w-6xl mx-auto space-y-12">
        <h1 className="text-4xl font-extrabold text-center text-foreground mb-10">
          Our Legacy: Past Leaders Gallery
        </h1>

        {/* Timeline Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 p-2 rounded-full bg-secondary/50 backdrop-blur-sm shadow-inner">
          {pastLeadersData.map((tenure) => (
            <button
              key={tenure.year}
              onClick={() => setSelectedYear(tenure.year)}
              className={cn(
                "px-5 py-2 rounded-full text-base font-medium transition-all duration-300 ease-in-out",
                "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                selectedYear === tenure.year
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              {tenure.year}
            </button>
          ))}
        </div>

        {/* Display Leaders for Selected Year */}
        {filteredLeaders ? (
          <motion.section
            key={filteredLeaders.year} // Key for re-animating on year change
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 p-6 rounded-2xl shadow-xl bg-card/80 backdrop-blur-sm border border-border/50"
          >
            <h2 className="text-3xl font-bold text-center text-primary mb-8">{filteredLeaders.year}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
              {/* Head Boy & Head Girl */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-center text-blue-500">Head Boy</h3>
                <LeaderCard leader={filteredLeaders.headBoy} />
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-center text-pink-500">Head Girl</h3>
                <LeaderCard leader={filteredLeaders.headGirl} />
              </div>
            </div>

            {/* Deputies */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-center text-purple-500">Deputy Leaders</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                {filteredLeaders.deputies.map((deputy) => (
                  <LeaderCard key={deputy.name} leader={deputy} />
                ))}
              </div>
            </div>
          </motion.section>
        ) : (
          <p className="text-center text-xl text-muted-foreground py-10">No leader data available for this year.</p>
        )}
      </div>
    </div>
  );
};

export default PastLeadersPage;
