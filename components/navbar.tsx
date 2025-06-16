"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ClientThemeToggleWrapper } from "@/components/client-theme-toggle-wrapper";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const MenuIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const XIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { href: "/vote", label: "Vote" },
    { href: "/past-leaders", label: "Past Leaders" },
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className={cn(
        "max-w-screen-xl mx-auto px-6 py-3 h-16",
        "rounded-2xl shadow-xl",
        "backdrop-blur bg-background/80",
        "border border-border/50",
        "flex items-center justify-between",
        "mt-4" // Add margin top to keep it visually similar to previous fixed-top-4
      )}>
        <Link href="/" className="text-2xl font-bold text-foreground hover:text-primary">
          N.E.X.T
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} passHref>
              <Button variant="ghost" className="text-foreground hover:bg-accent/20">
                {link.label}
              </Button>
            </Link>
          ))}
          <ClientThemeToggleWrapper />
        </div>

        {/* Mobile Hamburger Menu Button */}
        <div className="md:hidden flex items-center">
          <ClientThemeToggleWrapper />
          <Button
            variant="ghost"
            className="ml-2 text-foreground hover:bg-accent/20"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <XIcon /> : <MenuIcon />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 z-40 flex flex-col items-center justify-center",
        "bg-background/80 backdrop-blur-xl", // Increased blur for stronger glassmorphism
        "md:hidden",
        "transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <Button
          variant="ghost"
          className="absolute top-6 right-6 text-foreground hover:bg-accent/20"
          onClick={() => setIsOpen(false)}
        >
          <XIcon />
        </Button>
        <div className="flex flex-col space-y-6 text-center">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} passHref>
              <Button
                variant="ghost"
                className="text-foreground text-3xl font-bold hover:bg-accent/20"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
