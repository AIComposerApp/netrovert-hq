"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function ScrollTextSection() {
  const containerRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=3000",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    const layers = containerRef.current?.querySelectorAll('.text-layer');
    const colors = ["#f8f9fa", "#e3f2fd", "#fff3e0"]; 
    const bgImg = containerRef.current?.querySelector('.bg-layer-img');
    
    if (!layers) return;
    
    // Set initial state
    if (bgImg) {
      gsap.set(bgImg, { scale: 1, opacity: 0 });
    }
    
    layers.forEach((layer, i) => {
      const words = layer.querySelectorAll('span');

      tl.to(containerRef.current, {
        backgroundColor: colors[i],
        duration: 0.5,
        ease: "power2.inOut"
      }, i === 0 ? 0 : "<");

      tl.fromTo(words, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, stagger: 0.05, duration: 1 },
        i === 0 ? "<+=0.2" : "+=0.5" 
      );

      if (i < layers.length - 1) {
        tl.to(words, { opacity: 0, y: -20, stagger: 0.02, duration: 0.8 }, "+=1");
      }
    });

    // Make the background image scale continuously across the whole scroll duration
    if (bgImg) {
      // Fade in at start with lower opacity
      tl.to(bgImg, { opacity: 0.4, duration: 0.8 }, 0);
      // Scale up steadily over the timeline's progression
      tl.to(bgImg, { scale: 5, ease: "none", duration: tl.duration() }, 0);
      // Fade out exactly at the end
      tl.to(bgImg, { opacity: 0, duration: 1 }, tl.duration() - 0.5);
    }
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[80vh] md:h-[100vh] flex justify-center items-center overflow-hidden text-center z-30 font-[family-name:var(--font-serif-comp)] text-[#222] bg-[#f8f9fa]"
      style={{
        fontSize: "clamp(2rem, 5vw + 1rem, 4rem)",
        fontFamily: "'Serrif Compressed', serif",
        lineHeight: 1.2
      }}
    >
      {/* Background Image Layer */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center items-center z-[1]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="https://res.cloudinary.com/divndlntm/image/upload/v1777547244/ChatGPT_Image_Apr_30_2026_12_06_55_PM_as322x.png" 
          alt="Background decoration"
          className="bg-layer-img w-[95%] max-w-[900px] h-auto object-contain"
        />
      </div>

      {/* Layer 1: Comparison Text */}
      <div className="text-layer layer-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[800px] z-[2]">
        {"Most Web3 teams ship faster than they can explain. Threads feel random, docs are dense, and your “story” lives in 15 different Notion pages.".split(" ").map((word, i) => (
          <span key={i} className="inline-block relative mr-[0.2em] will-change-transform will-change-opacity opacity-0">{word}</span>
        ))}
      </div>

      {/* Layer 2: Main Value Prop */}
      <div className="text-layer layer-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[800px] z-[2]">
        {"I plug into your protocol or founder brand as a Web3 content strategist — turning technical work into a clear, repeatable narrative across X, docs, and ecosystem campaigns.".split(" ").map((word, i) => (
          <span key={i} className="inline-block relative mr-[0.2em] will-change-transform will-change-opacity opacity-0">{word}</span>
        ))}
      </div>

      {/* Layer 3: Features */}
      <div className="text-layer layer-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[800px] z-[2]">
        {"Instead of ad‑hoc posts, you get a content system: high‑signal threads, launch narratives, and research pieces that compound trust and make the right people show up.".split(" ").map((word, i) => (
          <span key={i} className="inline-block relative mr-[0.2em] will-change-transform will-change-opacity opacity-0">{word}</span>
        ))}
      </div>
    </section>
  );
}
