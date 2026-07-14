"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Shield, Users, Heart, Award, Scale, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDemo } from "@/lib/demo-context";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const slides = [
  {
    image: "/images/slider_1.jpg",
    title: "Honoring Service, Protecting Rights",
    description: "Dedicated to representing the brave officers of the Metropolitan Police, advocating for fair benefits, safety, and legal security.",
    tagline: "COMMUNITY REPRESENTATION",
  },
  {
    image: "/images/slider_2.jpg",
    title: "Unwavering Legal Protection 24/7",
    description: "Our legal defense fund ensures that every active member has elite representation standing by in critical incidents.",
    tagline: "CRITICAL INCIDENT DEFENSE",
  },
  {
    image: "/images/slider_3.jpg",
    title: "Empowering Officers and Families",
    description: "Supporting officer well-being, mental health programs, and offering tuition scholarships for dependents.",
    tagline: "WELFARE & MEMBER BENEFITS",
  },
  {
    image: "/images/slider_4.jpg",
    title: "Strategic Operations Briefings",
    description: "Delivering timely administrative support, policy directives, and tactical guidelines to all divisions.",
    tagline: "OPERATIONAL EXCELLENCE",
  },
  {
    image: "/images/slider_5.jpg",
    title: "Fostering Neighborhood Trust",
    description: "Building strong bridges of trust and collaboration in our neighborhoods through community-led programs.",
    tagline: "COMMUNITY PARTNERSHIP",
  },
];

export default function Home() {
  const { notices } = useDemo();
  const [currentSlide, setCurrentSlide] = React.useState(0);

  // Auto-play Image Slider
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="flex flex-col w-full overflow-hidden bg-background">
      
      {/* Notices Ticker Banner */}
      <div className="w-full bg-[#0a0f1d] border-b border-accent/20 text-white h-10 flex items-center overflow-hidden relative z-20">
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
          .animate-marquee {
            display: inline-block;
            white-space: nowrap;
            animation: marquee 35s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>
        <div className="px-4 bg-[#05070e] h-full flex items-center border-r border-accent/30 z-10 shrink-0 text-3xs font-extrabold text-accent uppercase tracking-wider gap-1.5 shadow-[2px_0_5px_rgba(0,0,0,0.5)]">
          <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          <span>Active Bulletins</span>
        </div>
        <div className="flex-1 overflow-hidden relative">
          <div className="animate-marquee cursor-pointer flex gap-12 text-3xs font-bold text-white/80">
            {notices.map((notice) => (
              <span key={notice.id} className="hover:text-accent transition-colors flex items-center gap-1.5">
                <span>•</span>
                <span>[{notice.category}]</span>
                <span>{notice.title} ({notice.date})</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Image Slider Section */}
      <section className="relative flex min-h-[75vh] md:min-h-[80vh] items-center justify-start py-20 px-4 sm:px-6 lg:px-8 border-b border-border overflow-hidden bg-slate-950">
        {/* Slide backgrounds */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
            >
              {/* Dark Gradient Overlay for optimal accessibility text contrast */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-slate-900/40" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide Content Overlay */}
        <div className="container relative z-10 mx-auto max-w-6xl text-left text-white px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-6 max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/15 text-accent text-3xs font-extrabold tracking-widest uppercase">
                <Sparkles className="h-3 w-3 fill-current animate-pulse" />
                <span>{slides[currentSlide].tagline}</span>
              </div>

              <h1 className="text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl text-white leading-tight">
                {slides[currentSlide].title}
              </h1>

              <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-xl">
                {slides[currentSlide].description}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <Link href="/dashboard" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto rounded-xl px-8 h-12 bg-accent hover:bg-accent/90 text-accent-foreground font-extrabold text-xs shadow-xl shadow-accent/20">
                    Access Members Portal
                  </Button>
                </Link>
                <Link href="/about" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-xl px-8 h-12 border-white/20 text-white text-xs font-bold hover:bg-white/10">
                    About Our Association
                  </Button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Manual Slider Navigation buttons */}
        <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrev}
            className="h-10 w-10 rounded-full border-white/20 text-white bg-black/30 hover:bg-black/60 hover:text-white"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            className="h-10 w-10 rounded-full border-white/20 text-white bg-black/30 hover:bg-black/60 hover:text-white"
            aria-label="Next Slide"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Indicator dots */}
        <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === idx ? "w-6 bg-accent" : "w-2 bg-white/40"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-border bg-card/30 relative">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { number: "5,200+", label: "Active Members", icon: Users, desc: "Officers & retired staff" },
              { number: "35+", label: "Years of Service", icon: Shield, desc: "Dedicated advocacy" },
              { number: "$2.4M+", label: "Raised for Charity", icon: Heart, desc: "Support for families" },
              { number: "100%", label: "Legal Coverage", icon: Scale, desc: "Full legal protection" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="flex flex-col p-6 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-all group hover:-translate-y-1 duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight group-hover:text-primary transition-colors">
                    {stat.number}
                  </span>
                  <div className="p-2 rounded-xl bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <stat.icon className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="text-xs font-bold text-foreground tracking-wide uppercase">{stat.label}</h3>
                <p className="text-2xs text-muted-foreground mt-1">{stat.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background border-b border-border">
        <div className="container mx-auto max-w-7xl space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-accent">Core Pillars</h2>
            <p className="text-3xl font-extrabold sm:text-4xl tracking-tight">Our Mission & Values</p>
            <p className="text-sm text-muted-foreground">
              We stand firm on key values that define our leadership, community outreach, and advocacy.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Professional Representation",
                icon: Shield,
                desc: "Advocating for fair wages, safe working conditions, comprehensive benefits, and strong legal support for all member officers.",
              },
              {
                title: "Community Partnerships",
                icon: Heart,
                desc: "Fostering mutual respect through police-youth athletic programs, neighborhood resource drives, and community-led events.",
              },
              {
                title: "Honor & Remembrance",
                icon: Award,
                desc: "Providing lifetime support to families of fallen officers and establishing educational scholarship programs for their children.",
              },
            ].map((pillar, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="relative overflow-hidden p-8 rounded-3xl border border-border bg-card shadow-sm hover:shadow-lg transition-all group duration-300"
              >
                <div className="absolute top-0 right-0 -mt-6 -mr-6 h-24 w-24 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300" />
                <div className="inline-flex p-3 rounded-2xl bg-muted text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 mb-6 shadow-inner">
                  <pillar.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">{pillar.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Interactive FAQ & News Banner CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-card/20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent blur-2xl pointer-events-none" />
        <div className="container mx-auto max-w-5xl rounded-3xl border border-border bg-card p-8 sm:p-12 lg:p-16 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4 text-left">
              <span className="text-2xs font-bold uppercase tracking-wider text-accent bg-accent/10 px-2.5 py-1 rounded-md border border-accent/20">
                Join the Network
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Are you a Metropolitan Officer?
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Unlock full access to member directory, contract downloads, legal representation request tools, and updates on executive board meetings.
              </p>
            </div>
            
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 w-full">
              <Link href="/dashboard" className="w-full">
                <Button className="w-full rounded-xl h-11 bg-primary hover:bg-primary/95 text-primary-foreground font-semibold text-xs shadow-md">
                  Register For Access
                </Button>
              </Link>
              <Link href="/news" className="w-full">
                <Button variant="outline" className="w-full rounded-xl h-11 border-border text-xs font-semibold flex items-center justify-center gap-1.5">
                  Read Association FAQs
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
