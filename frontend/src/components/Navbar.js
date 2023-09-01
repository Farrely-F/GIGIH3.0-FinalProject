import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navbarClasses = `w-full flex items-center justify-between min-h-[64px] px-8 md:px-16 fixed top-0 z-50 ${
    isScrolled ? "bg-slate-600/40 backdrop-blur-md shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] transition-all duration-300 ease-out" : "bg-transparent"
  }`;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Add smooth scrolling behavior
    });
  };

  return (
    <nav className={navbarClasses} onClick={scrollToTop}>
      <Link to={"/"}>
        <img src="https://www.anakbangsabisa.org/generasi-gigih/assets/gengigih-homepage-footer-logo.png" className="h-full w-20" />
      </Link>
      <div className="flex items-center gap-x-2">
        <p className="font-medium text-xs">siGIGIH</p>
        <img alt="Avatarimg" src="https://www.anakbangsabisa.org/generasi-gigih/assets/gengigih-homepage-elementgrafis-1.png" className="h-8 aspect-square bg-white rounded-full object-cover" />
      </div>
    </nav>
  );
};

export default Navbar;
