"use client";

import { useEffect } from "react";
import Hero from "./_components/Home/Hero";
import Features from "./_components/Home/Features";
import UpcomingEvents from "./_components/Home/UpcomingEvents";
import CTA from "./_components/Home/CTA";
import FAQPage from "./_components/Home/FAQs";
import Footer from "./_components/Home/Footer";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray<HTMLElement>(".section").forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });
    });
  }, []);

  return (
    <>
      <div className="section">
        <Hero />
      </div>
      <div className="section">
        <Features />
      </div>
      <div className="section">
        <UpcomingEvents />
      </div>
      <div className="section">
        <CTA />
      </div>
      <div className="section">
        <FAQPage />
      </div>
      <div className="section">
        <Footer />
      </div>
    </>
  );
}
