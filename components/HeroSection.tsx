'use client'
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

const HeroSection: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 100); // Adjust 100 for when to switch background
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* Video Background */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/videos/a.mp4" // Path relative to the public directory
          autoPlay
          muted
          loop
        />
      </div>

      {/* Navbar */}
      <div
        className={`fixed w-full top-0 z-10 transition-colors duration-300 ${
          isScrolled ? "bg-black" : "bg-transparent backdrop-blur-md"
        }`}
      >
        <Navbar isScrolled={isScrolled} />
      </div>

      {/* Content Overlay */}
      <div className="absolute top-[50vh] left-0 w-full h-[50vh] flex items-center justify-center">
        <h1 className="text-white text-5xl font-bold">Welcome to Our Page</h1>
      </div>
    </div>
  );
};

export default HeroSection;
