"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import NavBar from "./components/NavBar";
import ScrollTextSection from "./components/ScrollTextSection";
import LogoMarquee from "./components/LogoMarquee";

const smoothEase = [0.76, 0, 0.24, 1] as const;

export default function Home() {
  const { scrollY } = useScroll();
  const [windowHeight, setWindowHeight] = useState(800);
  const [activeStat1, setActiveStat1] = useState(0);
  const [activeStat2, setActiveStat2] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setWindowHeight(window.innerHeight);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval1 = setInterval(() => {
      setActiveStat1((prev) => (prev + 1) % 2);
    }, 4000);
    const interval2 = setInterval(() => {
      setActiveStat2((prev) => (prev + 1) % 2);
    }, 5500);
    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, []);
  
  // Parallax configurations: image moves up slower
  const imageY = useTransform(scrollY, [0, windowHeight], [0, -100]);
  
  return (
    <main className="relative w-full overflow-x-hidden">
      <div className="hero_home_inner">
        <motion.div style={{ y: imageY }} className="hero_home_visual_wrap z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://res.cloudinary.com/divndlntm/image/upload/v1777521229/give_me_only_the_background_202604300453_iho8vx.jpg" 
            alt="Hero Background" 
            className="hero-img w-full h-full object-cover object-bottom opacity-[0.85]" 
          />
        </motion.div>
        
        <div className="hero_home_overlay hidden"></div>
        
        <div className="hero_home_contain relative z-10 w-full flex flex-col md:flex-row justify-between items-start md:items-center min-h-[80vh] md:px-8">
          {/* Left Side: Copy */}
          <div className="flex flex-col text-left max-w-[800px] text-[#f2f0e6] md:mr-auto justify-center h-full pt-[5vh] md:pt-[2vh] pb-[10vh] md:pb-0 gap-6 md:gap-8">
            <span className="text-sm font-semibold tracking-wider text-[#f2f0e6] uppercase">web 3 content strategist and writer</span>
            <h1 className="hero_home_text text-[80px] md:text-[120px] font-bold leading-[0.9] tracking-tight mt-2">
              Make your protocol impossible to ignore.
            </h1>
            <p className="text-xs md:text-sm opacity-60 max-w-xl font-sans font-medium leading-relaxed mt-1">
              Netrovert (Ramadan) helps Web3 founders turn complex products into clear narratives — threads, articles, and campaigns that bring the right users in.
            </p>
            <div className="flex flex-wrap gap-4 font-sans items-center mt-2">
               <motion.button
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                  className="bg-[#ff4d00] text-[#f2f0e6] pl-8 pr-6 py-4 rounded-full flex items-center justify-center overflow-hidden gap-2 shadow-lg hover:bg-[#e64500] transition-colors"
               >
                  <div className="h-[20px] overflow-hidden">
                      <motion.div
                         variants={{ rest: { y: 0 }, hover: { y: -20 } }}
                         transition={{ duration: 0.4, ease: smoothEase }}
                         className="flex flex-col font-semibold"
                      >
                          <span className="h-[20px] flex items-center justify-center">Contact</span>
                          <span className="h-[20px] flex items-center justify-center">Contact</span>
                      </motion.div>
                  </div>
                  <motion.div variants={{ rest: { x: 0, y: 0 }, hover: { x: 2, y: -2 } }} transition={{ duration: 0.4, ease: smoothEase }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="19" x2="19" y2="5"></line>
                          <polyline points="9 5 19 5 19 15"></polyline>
                      </svg>
                  </motion.div>
               </motion.button>
               
               <motion.button
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                  className="bg-white/10 backdrop-blur-sm text-[#f2f0e6] pl-8 pr-6 py-4 rounded-full flex items-center justify-center overflow-hidden gap-2 border border-white/20 hover:border-white/40 hover:bg-white/20 transition-colors"
               >
                  <div className="h-[20px] overflow-hidden">
                      <motion.div
                         variants={{ rest: { y: 0 }, hover: { y: -20 } }}
                         transition={{ duration: 0.4, ease: smoothEase }}
                         className="flex flex-col font-semibold"
                      >
                          <span className="h-[20px] flex items-center justify-center">See Campaigns</span>
                          <span className="h-[20px] flex items-center justify-center">See Campaigns</span>
                      </motion.div>
                  </div>
                  <motion.div variants={{ rest: { x: 0, y: 0 }, hover: { x: 2, y: -2 } }} transition={{ duration: 0.4, ease: smoothEase }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="19" x2="19" y2="5"></line>
                          <polyline points="9 5 19 5 19 15"></polyline>
                      </svg>
                  </motion.div>
               </motion.button>
            </div>
          </div>

          {/* Right Side: Animated Stats */}
          <div className="flex flex-row md:flex-row justify-between md:justify-end gap-6 md:gap-12 w-full md:w-auto items-end mt-8 md:mt-0 pb-16 md:pb-0 z-10 md:ml-auto">
            
            {/* Stat Box 1 */}
            <div className="text-[#f2f0e6] text-gradient-fade relative h-[60px] w-[140px] md:w-[180px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeStat1 === 0 ? "s1a" : "s1b"}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 10, opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                  className="absolute inset-0 flex flex-col items-start justify-center"
                >
                  <span className="text-4xl md:text-5xl font-bold tracking-tighter mb-1 inline-block">{activeStat1 === 0 ? "5+" : "10+"}</span>
                  <span className="text-[10px] md:text-xs font-bold tracking-widest opacity-70 whitespace-nowrap inline-block font-sans">{activeStat1 === 0 ? "Years in Web3" : "Protocols"}</span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Stat Box 2 */}
            <div className="text-[#f2f0e6] text-gradient-fade relative h-[60px] w-[140px] md:w-[180px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeStat2 === 0 ? "s2a" : "s2b"}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 10, opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                  className="absolute inset-0 flex flex-col items-end md:items-start justify-center text-right md:text-left"
                >
                  <span className="text-4xl md:text-5xl font-bold tracking-tighter mb-1 inline-block">{activeStat2 === 0 ? "450+" : "40M+"}</span>
                  <span className="text-[10px] md:text-xs font-bold tracking-widest opacity-70 whitespace-nowrap inline-block font-sans">{activeStat2 === 0 ? "Pieces Shipped" : "Impressions"}</span>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>

      <LogoMarquee />
      <ScrollTextSection />
      
      <NavBar />
    </main>
  );
}
