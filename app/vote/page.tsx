"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // New Aceternity UI Input
import { Label } from "@/components/ui/label"; // New Aceternity UI Label
import { cn } from "@/lib/utils";
import { motion } from "framer-motion"; // For potential animations
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Import Card components
import Image from "next/image"; // Import Image component for optimized images

const groupedClassSections = {
  "9th": ["9 - A", "9 - B"],
  "10th": ["10 - A", "10 - B"],
  "11th": ["11 - PCM", "11 - PCMB", "11 - PCB", "11 - COMMERCE", "11 - ARTS"],
  "12th": ["12 - PCM", "12 - PCMB", "12 - PCB", "12 - COMMERCE", "12 - ARTS"],
};

const VotePage = () => {
  const [fullName, setFullName] = useState("");
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [classSection, setClassSection] = useState("");
  const PAGE_STUDENT_INFO = 'studentInfo';
  const PAGE_VOTING_FORM = 'votingForm';
  const PAGE_CONFIRMATION = 'confirmation';
  const PAGE_LOADING = 'loading';
  const PAGE_THANK_YOU = 'thankYou';

  const [currentPage, setCurrentPage] = useState(PAGE_STUDENT_INFO); // Manage current page
  const [showLoading, setShowLoading] = useState(false); // New state for loading animation
  const [showThankYou, setShowThankYou] = useState(false); // New state for thank you card

  // Voting form states
  const [headBoyVote, setHeadBoyVote] = useState<string | null>(null);
  const [headGirlVote, setHeadGirlVote] = useState<string | null>(null);
  const [deputyVotes, setDeputyVotes] = useState<string[]>([]);
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  console.log("Current classSection state:", classSection);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !admissionNumber || !classSection) {
      alert("Please fill in all required fields (Full Name, Admission Number, and Class/Section) to submit.");
      return;
    }

    console.log({
      fullName,
      admissionNumber,
      classSection,
    });
    setSubmissionMessage(null); // Clear previous messages
    setIsError(false);
    setCurrentPage(PAGE_VOTING_FORM); // Show the voting form
  };

  const handleDeputyVoteChange = (candidateId: string) => {
    setDeputyVotes((prev) => {
      if (prev.includes(candidateId)) {
        return prev.filter((c) => c !== candidateId);
      } else {
        if (prev.length < 2) {
          return [...prev, candidateId];
        } else {
          alert("You can only select up to 2 Deputy Candidates.");
          return prev;
        }
      }
    });
  };

  const handleSubmitVoting = (e: React.FormEvent) => {
    e.preventDefault();

    if (!headBoyVote || !headGirlVote || deputyVotes.length !== 2) {
      alert("Please select one Head Boy, one Head Girl, and two Deputy Candidates.");
      return;
    }

    console.log({
      headBoyVote,
      headGirlVote,
      deputyVotes,
    });
    setSubmissionMessage(null); // Clear previous messages
    setIsError(false);
    setCurrentPage(PAGE_CONFIRMATION); // Show the confirmation screen
  };

  const handleConfirmVote = async () => {
    setShowLoading(true); // Show loading dialog
    setSubmissionMessage(null); // Clear previous messages
    setIsError(false);

    const voteData = {
      studentId: admissionNumber.toString(), // Ensure studentId is a string
      headBoy: headBoyVote,
      headGirl: headGirlVote,
      deputyBoy: deputyVotes[0],
      deputyGirl: deputyVotes[1],
    };

    try {
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(voteData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmissionMessage(result.message || "Vote submitted successfully!");
        setIsError(false);
      } else {
        setSubmissionMessage(result.message || "An unknown error occurred.");
        setIsError(true);
      }
    } catch (error) {
      console.error("Network or unexpected error:", error);
      setSubmissionMessage("Failed to connect to the server. Please try again.");
      setIsError(true);
    } finally {
      setShowLoading(false); // Hide loading dialog
      setCurrentPage(PAGE_THANK_YOU); // Show thank you/error card

      setTimeout(() => {
        // Reset all states to go back to the initial form after message
        setFullName("");
        setAdmissionNumber("");
        setClassSection("");
        setHeadBoyVote(null);
        setHeadGirlVote(null);
        setDeputyVotes([]);
        setCurrentPage(PAGE_STUDENT_INFO); // Go back to initial form
        setShowThankYou(false); // Hide thank you/error card
        setSubmissionMessage(null); // Clear message
        setIsError(false);
      }, 4000); // Show message for 3 seconds (1s loading + 3s message)
    }
  };

  const handleGoBackToVoting = () => {
    setCurrentPage(PAGE_VOTING_FORM); // Go back to voting form
    setSubmissionMessage(null); // Clear messages on back
    setIsError(false);
  };

  const handleGoBackToStudentInfo = () => {
    setCurrentPage(PAGE_STUDENT_INFO); // Go back to student info form
    setSubmissionMessage(null); // Clear messages on back
    setIsError(false);
  };

  // Candidate data with image URLs and IDs (IDs should match your database)
  const headBoyCandidates = [
    { id: "HB1", name: "Candidate HB1", imageUrl: "/14-200x300.jpg" },
    { id: "HB2", name: "Candidate HB2", imageUrl: "/100-200x300.jpg" },
    { id: "HB3", name: "Candidate HB3", imageUrl: "/193-200x300.jpg" },
    { id: "HB4", name: "Candidate HB4", imageUrl: "/343-200x300.jpg" },
  ];
  const headGirlCandidates = [
    { id: "HG1", name: "Candidate HG1", imageUrl: "/418-200x300.jpg" },
    { id: "HG2", name: "Candidate HG2", imageUrl: "/454-200x300.jpg" },
    { id: "HG3", name: "Candidate HG3", imageUrl: "/477-200x300.jpg" },
    { id: "HG4", name: "Candidate HG4", imageUrl: "/599-200x300.jpg" },
  ];
  const deputyCandidates = [
    { id: "D1", name: "Candidate D1", imageUrl: "/652-200x300.jpg" },
    { id: "D2", name: "Candidate D2", imageUrl: "/798-200x300.jpg" },
    { id: "D3", name: "Candidate D3", imageUrl: "/910-200x300.jpg" },
    { id: "D4", name: "Candidate D4", imageUrl: "/1035-200x300.jpg" },
  ];

  return (
    <div className={cn(
      "min-h-screen grid place-items-center py-12 px-4 sm:px-6 lg:px-8", // Changed centering strategy to grid
      "bg-background", // Base background color
      "[background-size:20px_20px]",
      "[background-image:radial-gradient(#333333_1px,transparent_1px)]", // Dot background for light theme
      "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]" // Dot background for dark theme
    )}>
      {/* Main container for all forms */}
      {/* Main container for all forms */}
      {(currentPage === PAGE_STUDENT_INFO || currentPage === PAGE_VOTING_FORM || currentPage === PAGE_CONFIRMATION) ? (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={cn(
            "max-w-2xl w-full space-y-8 p-8 rounded-3xl shadow-2xl",
            "backdrop-blur bg-background/80",
            "border border-border/50",
            "transition-all duration-300 ease-in-out"
          )}
        >
          {currentPage === PAGE_STUDENT_INFO && (
            <>
              <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
                  Student Information
                </h2>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  Please fill in your details to proceed with voting.
                </p>
              </div>
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      required
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="admissionNumber">Admission Number</Label>
                    <Input
                      id="admissionNumber"
                      name="admissionNumber"
                      type="number"
                      autoComplete="off"
                      required
                      placeholder="Enter your admission number"
                      value={admissionNumber}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAdmissionNumber(e.target.value)}
                    />
                  </div>
                  <div className="space-y-4">
                    <Label>Class/Section</Label>
                    {Object.entries(groupedClassSections).map(([className, sections]) => (
                      <div key={className} className="space-y-2">
                        <h3 className="text-lg font-semibold text-foreground">{`Class ${className}`}</h3>
                        <div className="flex flex-wrap gap-2">
                          {sections.map((section) => (
                            section === "9 - A" ? (
                              <button
                                key={section}
                                type="button"
                                onClick={() => {
                                  setClassSection(section);
                                  console.log("HTML button clicked, setting classSection to:", section);
                                }}
                                className={cn(
                                  "px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                                  classSection === section
                                    ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                                    : "border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
                                )}
                              >
                                {section}
                              </button>
                            ) : (
                              <Button
                                key={section}
                                type="button"
                                variant={classSection === section ? "ghost" : "outline"}
                                onClick={() => {
                                  setClassSection(section);
                                  console.log("Button clicked, setting classSection to:", section);
                                }}
                                className={cn(
                                  "px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                                  classSection === section
                                    ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                                    : "border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
                                )}
                              >
                                {section}
                              </Button>
                            )
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg"
                    disabled={!fullName || !admissionNumber || !classSection}
                  >
                    Next - Cast Your Vote
                  </Button>
                </div>
              </form>
            </>
          )}

          {currentPage === PAGE_VOTING_FORM && (
            <>
              <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
                  Cast Your Vote
                </h2>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  Select your preferred candidates for each position.
                </p>
              </div>
              <form className="mt-8 space-y-6" onSubmit={handleSubmitVoting}>
                <div className="space-y-4">
                  {/* Head Boy Candidates */}
                  <div>
                  <Label><span className="text-blue-500">Head Boy</span> (Select 1)</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
                      {headBoyCandidates.map((candidate) => (
                        <Card
                          key={candidate.id}
                          onClick={() => setHeadBoyVote(candidate.id)}
                          className={cn(
                            "cursor-pointer transition-all duration-200 ease-in-out",
                            "hover:shadow-lg hover:scale-105",
                            headBoyVote === candidate.id
                              ? "border-4 border-green-500 shadow-xl"
                              : "border border-border/50"
                          )}
                        >
                          <CardContent className="flex flex-col items-center p-4">
                            <Image
                              src={candidate.imageUrl}
                              alt={candidate.name}
                              width={100}
                              height={100}
                              className="rounded-full object-cover w-24 h-24 mb-2"
                            />
                            <CardTitle className="text-center text-sm font-semibold">
                              {candidate.name}
                            </CardTitle>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Head Girl Candidates */}
                  <div>
                  <Label><span className="text-pink-500">Head Girl</span> (Select 1)</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
                      {headGirlCandidates.map((candidate) => (
                        <Card
                          key={candidate.id}
                          onClick={() => setHeadGirlVote(candidate.id)}
                          className={cn(
                            "cursor-pointer transition-all duration-200 ease-in-out",
                            "hover:shadow-lg hover:scale-105",
                            headGirlVote === candidate.id
                              ? "border-4 border-green-500 shadow-xl"
                              : "border border-border/50"
                          )}
                        >
                          <CardContent className="flex flex-col items-center p-4">
                            <Image
                              src={candidate.imageUrl}
                              alt={candidate.name}
                              width={100}
                              height={100}
                              className="rounded-full object-cover w-24 h-24 mb-2"
                            />
                            <CardTitle className="text-center text-sm font-semibold">
                              {candidate.name}
                            </CardTitle>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Deputy Candidates */}
                  <div>
                    <Label>Deputy Candidates (Select 2)</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
                      {deputyCandidates.map((candidate) => (
                        <Card
                          key={candidate.id}
                          onClick={() => handleDeputyVoteChange(candidate.id)}
                          className={cn(
                            "cursor-pointer transition-all duration-200 ease-in-out",
                            "hover:shadow-lg hover:scale-105",
                            deputyVotes.includes(candidate.id)
                              ? "border-4 border-green-500 shadow-xl"
                              : "border border-border/50"
                          )}
                        >
                          <CardContent className="flex flex-col items-center p-4">
                            <Image
                              src={candidate.imageUrl}
                              alt={candidate.name}
                              width={100}
                              height={100}
                              className="rounded-full object-cover w-24 h-24 mb-2"
                            />
                            <CardTitle className="text-center text-sm font-semibold">
                              {candidate.name}
                            </CardTitle>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    type="button"
                    onClick={handleGoBackToStudentInfo}
                    className="flex-1 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 shadow-lg"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg"
                    disabled={!headBoyVote || !headGirlVote || deputyVotes.length !== 2}
                  >
                    Next - Confirm Votes
                  </Button>
                </div>
              </form>
            </>
          )}

          {currentPage === PAGE_CONFIRMATION && (
            <>
              <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
                  Confirm Your Vote
                </h2>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  Please review your details and selections before confirming.
                </p>
              </div>

              <Card className="p-6 space-y-4 border-2 border-blue-500 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-center">Your Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-foreground">
                  <p><strong>Full Name:</strong> {fullName}</p>
                  <p><strong>Admission Number:</strong> {admissionNumber}</p>
                  <p><strong>Class/Section:</strong> {classSection}</p>
                </CardContent>
              </Card>

              <Card className="p-6 space-y-4 border-2 border-green-500 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-center">Your Selections</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-foreground">
                  <div className="flex items-center gap-4">
                    <p className="font-bold"><span className="text-blue-500">Head Boy</span>:</p>
                    {headBoyVote && (
                      <div className="flex items-center gap-2">
                        <Image
                          src={headBoyCandidates.find(c => c.id === headBoyVote)?.imageUrl || ""}
                          alt={headBoyCandidates.find(c => c.id === headBoyVote)?.name || ""}
                          width={50}
                          height={50}
                          className="rounded-full object-cover w-12 h-12"
                        />
                        <span>{headBoyCandidates.find(c => c.id === headBoyVote)?.name}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-bold"><span className="text-pink-500">Head Girl</span>:</p>
                    {headGirlVote && (
                      <div className="flex items-center gap-2">
                        <Image
                          src={headGirlCandidates.find(c => c.id === headGirlVote)?.imageUrl || ""}
                          alt={headGirlCandidates.find(c => c.id === headGirlVote)?.name || ""}
                          width={50}
                          height={50}
                          className="rounded-full object-cover w-12 h-12"
                        />
                        <span>{headGirlCandidates.find(c => c.id === headGirlVote)?.name}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold">Deputy Candidates:</p>
                    {deputyVotes.map((candidateId) => {
                      const candidate = deputyCandidates.find(c => c.id === candidateId);
                      return candidate ? (
                        <div key={candidate.id} className="flex items-center gap-2">
                          <Image
                            src={candidate.imageUrl}
                            alt={candidate.name}
                            width={50}
                            height={50}
                            className="rounded-full object-cover w-12 h-12"
                          />
                          <span>{candidate.name}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col sm:flex-row gap-4"> {/* Changed to flex-col for small screens, then flex-row */}
                <Button
                  type="button"
                  onClick={handleGoBackToVoting}
                  className="flex-1 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 shadow-lg"
                >
                  Go Back
                </Button>
                <Button
                  type="button"
                  onClick={handleConfirmVote}
                  className="flex-1 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg"
                >
                  Confirm Votes
                </Button>
              </div>
            </>
          )}
        </motion.div>
      ) : currentPage === PAGE_LOADING ? (
        // Loading Screen
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "max-w-md w-full space-y-8 p-8 rounded-3xl shadow-2xl",
            "backdrop-blur bg-background/80",
            "border border-border/50",
            "flex flex-col items-center justify-center text-center"
          )}
        >
          <Image
            src="/file.svg" // Placeholder for a loading GIF
            alt="Loading"
            width={100}
            height={100}
            className="animate-pulse"
          />
          <h2 className="mt-6 text-xl font-extrabold text-foreground">
            Please wait while we process your vote...
          </h2>
        </motion.div>
      ) : currentPage === PAGE_THANK_YOU && (
        // Submission Result Card (Thank You or Error)
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={cn(
            "max-w-md w-full space-y-8 p-8 rounded-3xl shadow-2xl",
            "backdrop-blur bg-background/80",
            "border border-border/50",
            "flex flex-col items-center justify-center text-center"
          )}
        >
          <Card className={cn(
            "p-6 space-y-4 border-2 shadow-xl",
            isError ? "border-red-500" : "border-green-500"
          )}>
            <CardHeader>
              <CardTitle className={cn(
                "text-3xl font-bold text-center",
                isError ? "text-red-600" : "text-green-600"
              )}>
                {isError ? "Submission Failed!" : "Thank You for Voting!"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-foreground">
              <p className="text-lg">{submissionMessage}</p>
              {!isError && (
                <p className="text-sm text-muted-foreground">
                  We appreciate your participation in the election.
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default VotePage;
