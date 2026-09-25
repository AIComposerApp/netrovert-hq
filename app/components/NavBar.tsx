"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";

// Custom cubic-bezier for "heavy" smooth physics
const smoothEase = [0.76, 0, 0.24, 1] as const;

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const desktopNavRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const desktopNavWidth = useTransform(scrollY, [0, 100], ["max(900px, calc(100% - 4rem))", "900px"]);
  const desktopNavOpacity = useTransform(scrollY, [0, 100], [1, 0.9]);
  
  const desktopLogoWidth = useTransform(scrollY, [0, 80], ["260px", "40px"]);
  const desktopLogoOpacity = useTransform(scrollY, [0, 80], [1, 0]);
  const desktopLogoBlur = useTransform(scrollY, [0, 80], ["blur(0px)", "blur(10px)"]);
  const desktopLogoX = useTransform(scrollY, [0, 80], ["0px", "-20px"]);

  const desktopMaskOpacity = useTransform(scrollY, [20, 100], [0, 1]);
  const desktopMaskBlur = useTransform(scrollY, [20, 100], ["blur(10px)", "blur(0px)"]);
  const desktopMaskX = useTransform(scrollY, [20, 100], ["20px", "0px"]);

  // Mobile Contact Button Reveal
  const mobileContactOpacity = useTransform(scrollY, [200, 400], [0, 1]);
  const mobileContactY = useTransform(scrollY, [200, 400], [20, 0]);
  // Workaround for `pointerEvents` type issue with useTransform, we will cast it.
  const mobileContactPointerEvents = useTransform(scrollY, [200, 400], ["none", "auto"]);

  useEffect(() => {
    let ticking = false;
    
    const handleScrollAndColor = () => {
      setIsScrolled(window.scrollY > 50);

      const targetRef = window.innerWidth >= 768 ? desktopNavRef.current : navContainerRef.current;

      if (!targetRef) {
        ticking = false;
        return;
      }
      
      if (isOpen && window.innerWidth < 768) {
         if (navContainerRef.current) navContainerRef.current.style.color = "#000000";
         ticking = false;
         return;
      }

      const rect = targetRef.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      
      const sections = document.querySelectorAll('.hero_home_inner, section');
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i] as HTMLElement;
        const secRect = section.getBoundingClientRect();
        if (secRect.top <= centerY && secRect.bottom >= centerY) {
          let isLightText = true;
          let colorToSet = "#ffffff";

          if (section.classList.contains('hero_home_inner') || section.style.backgroundColor === "rgb(0, 0, 0)") {
            colorToSet = "#ffffff";
            isLightText = true;
          } else {
            colorToSet = window.getComputedStyle(section).color;
            const rgbMatch = colorToSet.match(/\d+/g);
            if (rgbMatch && rgbMatch.length >= 3) {
              const [r, g, b] = rgbMatch.map(Number);
              const brightness = (r * 299 + g * 587 + b * 114) / 1000;
              isLightText = brightness > 128;
            } else {
              if (colorToSet === "#ffffff") { isLightText = true; }
            }
          }
          
          if (navContainerRef.current) navContainerRef.current.style.color = colorToSet;
          if (desktopNavRef.current) desktopNavRef.current.style.color = colorToSet;
          
          break;
        }
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScrollAndColor);
        ticking = true;
      }
    };

    handleScrollAndColor();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isOpen]);

  const menuItems = ["Projects", "Services", "Process", "About", "Insights"];

  return (
    <>
    {/* Mobile Floating Contact Button (Bottom Center) */}
    <motion.div 
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] md:hidden flex"
      style={{
        opacity: mobileContactOpacity,
        y: mobileContactY,
        pointerEvents: mobileContactPointerEvents as any
      }}
    >
      <motion.button
         whileHover="hover"
         initial="rest"
         animate="rest"
         className="button_main_wrap pl-6 pr-5 py-3.5 flex items-center justify-center overflow-hidden gap-2 shadow-2xl"
      >
         <div className="h-[20px] overflow-hidden">
             <motion.div
                variants={{ rest: { y: 0 }, hover: { y: -20 } }}
                transition={{ duration: 0.4, ease: smoothEase }}
                className="flex flex-col font-medium text-[15px]"
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
    </motion.div>

    {/* Mobile Top Navbar Container */}
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-[460px] md:hidden flex flex-col items-end">
      <div 
        className="nav_bar_inner w-full py-[10px] pl-[18px] pr-2 flex items-center justify-between shadow-xl"
        ref={navContainerRef}
        style={{ transition: "color 0.4s ease", color: "#ffffff" }}
      >
          {/* Logo Container for Mobile */}
          <div className="relative h-[32px] w-[200px] flex items-center overflow-hidden shrink-0">
             {/* Large Logo */}
             <motion.div 
               className="absolute left-0 w-[200px] h-full flex items-center"
               style={{ opacity: desktopLogoOpacity, filter: desktopLogoBlur, x: desktopLogoX }}
             >
                <img src="https://res.cloudinary.com/divndlntm/image/upload/v1777630820/Logo_orange_spgmvt.png" className="h-[24px] object-contain object-left max-w-none" alt="Netrovert Logo"/>
             </motion.div>
             {/* Mask Logo */}
             <motion.div 
               className="absolute left-0 w-8 h-8"
               style={{ opacity: desktopMaskOpacity, filter: desktopMaskBlur, x: desktopMaskX }}
             >
                <div className="w-full h-full bg-current scale-[1.2]"
                    style={{
                      WebkitMaskImage: `url(https://res.cloudinary.com/divndlntm/image/upload/v1777547244/ChatGPT_Image_Apr_30_2026_12_06_55_PM_as322x.png)`,
                      WebkitMaskSize: "contain",
                      WebkitMaskPosition: "center",
                      WebkitMaskRepeat: "no-repeat",
                      maskImage: `url(https://res.cloudinary.com/divndlntm/image/upload/v1777547244/ChatGPT_Image_Apr_30_2026_12_06_55_PM_as322x.png)`,
                      maskSize: "contain",
                      maskPosition: "center",
                      maskRepeat: "no-repeat",
                    }}
                />
             </motion.div>
          </div>

          <button 
             onClick={() => setIsOpen(!isOpen)}
             className="flex items-center gap-3 group h-[36px] px-3 rounded-full hover:bg-white/10 transition-colors"
          >
             <span className="nav_menu_label font-medium text-[14px] tracking-wide">Menu</span>
             <div className="relative flex flex-col justify-center items-center w-[16px] h-[16px]">
                 <span 
                    className="absolute w-full h-[1.5px] rounded-full bg-current transition-transform duration-300" 
                    style={{ transform: isOpen ? 'translateY(0) rotate(45deg)' : 'translateY(-3px)' }}
                 />
                 <span 
                    className="absolute w-full h-[1.5px] rounded-full bg-current transition-transform duration-300" 
                    style={{ transform: isOpen ? 'translateY(0) rotate(-45deg)' : 'translateY(3px)' }}
                 />
             </div>
          </button>
      </div>

      <AnimatePresence>
        {isOpen && (
           <motion.div
             initial="closed"
             animate="open"
             exit="closed"
             variants={{
                closed: {
                   scaleY: 0,
                   scaleX: 0.95,
                   opacity: 0,
                   y: -10,
                   transformOrigin: "top right",
                   transition: { duration: 0.4, ease: smoothEase }
                },
                open: {
                   scaleY: 1,
                   scaleX: 1,
                   opacity: 1,
                   y: 0,
                   transformOrigin: "top right",
                   transition: { duration: 0.5, ease: smoothEase }
                }
             }}
             className="absolute top-[calc(100%+8px)] right-0 w-[240px] bg-[#f2f0e6] rounded-[24px] p-5 text-[#1d1d1d] flex flex-col z-[-1]"
           >
               <motion.div 
                  className="flex flex-col pb-4 border-b border-[#1d1d1d]/15 items-start px-2"
                  variants={{
                      closed: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
                      open: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } }
                  }}
               >
                   {["Projects", "Services", "Process"].map((item) => (
                       <motion.a 
                          onClick={() => setIsOpen(false)}
                          key={item}
                          href={`#${item.toLowerCase()}`}
                          className="text-[20px] font-medium py-2.5 w-full text-left border-b border-[#1d1d1d]/5 last:border-0 hover:opacity-60 transition-opacity tracking-tight"
                          variants={{
                              closed: { x: 10, opacity: 0 },
                              open: { x: 0, opacity: 1, transition: { duration: 0.4, ease: smoothEase } }
                          }}
                       >
                           {item}
                       </motion.a>
                   ))}
               </motion.div>
               
               <motion.div 
                  className="flex items-center gap-4 pt-4 px-2"
                  variants={{
                      closed: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
                      open: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } }
                  }}
               >
                   {["About", "Insights"].map((item) => (
                       <motion.a 
                          onClick={() => setIsOpen(false)}
                          key={item}
                          href={`#${item.toLowerCase()}`}
                          className="text-[13px] font-medium text-[#1d1d1d]/70 hover:text-[#1d1d1d] transition-colors"
                          variants={{
                              closed: { x: 5, opacity: 0 },
                              open: { x: 0, opacity: 1, transition: { duration: 0.4, ease: smoothEase } }
                          }}
                       >
                           {item}
                       </motion.a>
                   ))}
               </motion.div>
           </motion.div>
        )}
      </AnimatePresence>
    </div>

    {/* Desktop Navbar */}
    <div className={`nav_bar hidden md:flex fixed top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-7xl px-8 items-end justify-end font-sans transition-all duration-500`}>
      <div 
        className="relative w-full flex items-center justify-center"
        style={{ transition: "color 0.4s ease", color: "#ffffff" }}
        ref={desktopNavRef}
      >
        <motion.div 
           className="flex nav_bar_inner p-2 pl-4 lg:pl-6 items-center justify-between mx-auto shadow-2xl overflow-hidden"
           style={{
             width: desktopNavWidth,
             maxWidth: "100%",
             opacity: desktopNavOpacity,
           }}
        >
            <div className="flex items-center shrink-0">
              {/* The mutating Desktop Logo */}
              <motion.div 
                 className="relative h-[40px] flex items-center overflow-hidden cursor-pointer shrink-0"
                 style={{ width: desktopLogoWidth }}
              >
                {/* Initial orange logo */}
                <motion.div 
                  className="absolute left-0 w-[260px] h-full flex items-center"
                  style={{ opacity: desktopLogoOpacity, filter: desktopLogoBlur, x: desktopLogoX }}
                >
                  <img src="https://res.cloudinary.com/divndlntm/image/upload/v1777630820/Logo_orange_spgmvt.png" className="h-[28px] md:h-[32px] lg:h-[34px] object-contain object-left max-w-none" alt="Logo Orange"/>
                </motion.div>
                {/* Scrolled transitioning mask logo */}
                <motion.div 
                  className="absolute left-0 w-10 h-10"
                  style={{ opacity: desktopMaskOpacity, filter: desktopMaskBlur, x: desktopMaskX }}
                >
                  <div className="w-full h-full bg-current scale-[1.3]"
                    style={{
                      WebkitMaskImage: `url(https://res.cloudinary.com/divndlntm/image/upload/v1777547244/ChatGPT_Image_Apr_30_2026_12_06_55_PM_as322x.png)`,
                      WebkitMaskSize: "contain",
                      WebkitMaskPosition: "center",
                      WebkitMaskRepeat: "no-repeat",
                      maskImage: `url(https://res.cloudinary.com/divndlntm/image/upload/v1777547244/ChatGPT_Image_Apr_30_2026_12_06_55_PM_as322x.png)`,
                      maskSize: "contain",
                      maskPosition: "center",
                      maskRepeat: "no-repeat",
                    }}
                  />
                </motion.div>
              </motion.div>
            </div>

            <div className="flex flex-1 items-center justify-end gap-3 lg:gap-6 overflow-hidden">
               {menuItems.map(item => (
                 <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium hover:opacity-70 transition-opacity whitespace-nowrap">
                   {item}
                 </a>
               ))}
               
               <motion.button
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                  className="button_main_wrap pl-4 pr-3 lg:pl-6 lg:pr-5 py-3 flex items-center justify-center overflow-hidden gap-2 shrink-0"
               >
                  <div className="h-[20px] overflow-hidden">
                      <motion.div
                         variants={{ rest: { y: 0 }, hover: { y: -20 } }}
                         transition={{ duration: 0.4, ease: smoothEase }}
                         className="flex flex-col font-medium"
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
            </div>
        </motion.div>
      </div>
    </div>
    </>
  );
}
