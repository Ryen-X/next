"use client";

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "Who is eligible to vote?",
    answer: "All enrolled students with a valid admission number are eligible to vote.",
  },
  {
    question: "How many candidates can I vote for?",
    answer: <>You can vote for one candidate in each category: <span className="text-blue-500">Head Boy</span>, <span className="text-pink-500">Head Girl</span>, and <span className="text-black">Deputy</span>.</>,
  },
  {
    question: "Can I change my vote after submitting?",
    answer: "No, once your vote is submitted, it cannot be changed.",
  },
  {
    question: "How is duplicate voting prevented?",
    answer: "We prevent duplicate voting by checking your admission number, IP address, and local device storage. Each student can only vote once.",
  },
  {
    question: "When will the results be announced?",
    answer: "The results will be announced shortly after the voting period ends. Please check the website for updates.",
  },
];

const FAQAccordion = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-foreground">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto border border-border rounded-lg shadow-md">
          {faqItems.map((item, index) => (
            <AccordionItem value={`item-${index + 1}`} key={index} className="border-b last:border-b-0">
              <AccordionTrigger className="text-lg md:text-xl font-semibold text-primary hover:no-underline px-6 py-4">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-base md:text-lg text-muted-foreground px-6 pb-4">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQAccordion;
