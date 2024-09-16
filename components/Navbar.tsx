'use client';
import React, { useState } from "react";
import { MapPin, Upload, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface NavbarProps {
  isScrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleLocationSearch = () => {
    router.push("/locationSearch");
  };

  const handleUploadImage = () => {
    router.push("/upload");
  };

  return (
    <nav
      className={`p-4 shadow-md sticky top-0 z-50 transition-colors duration-300 ${
        isScrolled ? "bg-black" : "bg-transparent backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={() => router.push("/")} className="flex items-center">
            <span className="text-2xl font-bold text-white">Zumato</span>
          </button>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={handleLocationSearch}
            className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-full transition-colors duration-200 flex items-center space-x-2"
          >
            <MapPin className="h-5 w-5" />
            <span>Use My Location</span>
          </button>
          <button
            onClick={handleUploadImage}
            className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-full transition-colors duration-200 flex items-center space-x-2"
          >
            <Upload className="h-5 w-5" />
            <span>Search With Image</span>
          </button>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="mt-4 md:hidden">
          <div className="grid grid-cols-2 space-x-1">
            <button
              onClick={handleLocationSearch}
              className="w-full bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-full transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <MapPin className="h-5 w-5" />
              <span>Use My Location</span>
            </button>
            <button
              onClick={handleUploadImage}
              className="w-full mt-2 bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-full transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Upload className="h-5 w-5" />
              <span>Upload Image</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
