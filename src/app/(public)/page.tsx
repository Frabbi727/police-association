"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Shield, Users, Heart, Award, Scale, Sparkles, ChevronLeft, ChevronRight, Bell, FileText, ChevronDown, ChevronUp } from "lucide-react";
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

export default function Home() {
  const { notices, t, language } = useDemo();
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [activeFacilityTab, setActiveFacilityTab] = React.useState<"library" | "gym" | "hostel" | "welfare" | "legal" | "sports" | "scholarship">("library");
  const [noticeFilter, setNoticeFilter] = React.useState<"all" | "notice" | "statement" | "congratulations">("all");
  const [expandedNoticeId, setExpandedNoticeId] = React.useState<string | null>(null);

  const slides = [
    {
      image: "/images/slider_1.jpg",
      title: t("Honoring Service, Protecting Rights", "Honoring Service, Protecting Rights"),
      description: t(
        "Dedicated to representing the brave officers of the Metropolitan Police, advocating for fair benefits, safety, and legal security.",
        "Dedicated to representing the brave officers of the Metropolitan Police, advocating for fair benefits, safety, and legal security."
      ),
      tagline: t("COMMUNITY REPRESENTATION", "COMMUNITY REPRESENTATION"),
    },
    {
      image: "/images/slider_2.jpg",
      title: t("Unwavering Legal Protection 24/7", "Unwavering Legal Protection 24/7"),
      description: t(
        "Our legal defense fund ensures that every active member has elite representation standing by in critical incidents.",
        "Our legal defense fund ensures that every active member has elite representation standing by in critical incidents."
      ),
      tagline: t("CRITICAL INCIDENT DEFENSE", "CRITICAL INCIDENT DEFENSE"),
    },
    {
      image: "/images/slider_3.jpg",
      title: t("Empowering Officers and Families", "Empowering Officers and Families"),
      description: t(
        "Supporting officer well-being, mental health programs, and offering tuition scholarships for dependents.",
        "Supporting officer well-being, mental health programs, and offering tuition scholarships for dependents."
      ),
      tagline: t("WELFARE & MEMBER BENEFITS", "WELFARE & MEMBER BENEFITS"),
    },
    {
      image: "/images/slider_4.jpg",
      title: t("Strategic Operations Briefings", "Strategic Operations Briefings"),
      description: t(
        "Delivering timely administrative support, policy directives, and tactical guidelines to all divisions.",
        "Delivering timely administrative support, policy directives, and tactical guidelines to all divisions."
      ),
      tagline: t("OPERATIONAL EXCELLENCE", "OPERATIONAL EXCELLENCE"),
    },
    {
      image: "/images/slider_5.jpg",
      title: t("Fostering Neighborhood Trust", "Fostering Neighborhood Trust"),
      description: t(
        "Building strong bridges of trust and collaboration in our neighborhoods through community-led programs.",
        "Building strong bridges of trust and collaboration in our neighborhoods through community-led programs."
      ),
      tagline: t("COMMUNITY PARTNERSHIP", "COMMUNITY PARTNERSHIP"),
    },
  ];

  // Auto-play Image Slider
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

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
          <span>{t("Active Bulletins", "Active Bulletins")}</span>
        </div>
        <div className="flex-1 overflow-hidden relative">
          <div className="animate-marquee cursor-pointer flex gap-12 text-3xs font-bold text-white/80">
            {notices.map((notice) => (
              <span key={notice.id} className="hover:text-accent transition-colors flex items-center gap-1.5">
                <span>•</span>
                <span>[{t(notice.category, notice.category)}]</span>
                <span>{t(notice.title, notice.title)} ({notice.date})</span>
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
                    {t("Access Members Portal", "Access Members Portal")}
                  </Button>
                </Link>
                <Link href="/about" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-xl px-8 h-12 border-white/20 text-white text-xs font-bold hover:bg-white/10">
                    {t("About Our Association", "About Our Association")}
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

      {/* Newly Elected Central Committee Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/10 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto max-w-7xl space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-2xs font-medium bg-accent/10 text-accent border border-accent/20">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              {t("Newly Elected Committee", "Newly Elected Committee")}
            </span>
            <h2 className="text-3xl font-extrabold sm:text-4xl tracking-tight text-foreground bg-gradient-to-r from-foreground via-foreground to-accent bg-clip-text">
              {t("Newly Elected Committee of Bangladesh Police Service Association", "Newly Elected Committee of Bangladesh Police Service Association")}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t("The central executive committee for the term of 2026-2027.", "The central executive committee for the term of 2026-2027.")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Leadership Portrait Card */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 rounded-3xl border border-border bg-card/60 backdrop-blur-md overflow-hidden shadow-xl hover:shadow-2xl hover:border-primary/50 transition-all duration-500 group"
            >
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden border-b border-border">
                <img 
                  src="/images/1.jpeg" 
                  alt={t("President & Secretary", "President & Secretary")}
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-6 right-6 flex justify-between items-end">
                  <span className="text-2xs font-semibold uppercase tracking-wider text-accent-foreground bg-accent px-2.5 py-1 rounded-md shadow-sm">
                    {t("President & Secretary", "President & Secretary")}
                  </span>
                </div>
              </div>
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-border">
                  {/* President Profile */}
                  <div className="space-y-3 pr-0 sm:pr-4">
                    <div>
                      <span className="text-3xs uppercase tracking-widest text-accent font-bold">
                        {t("President, Bangladesh Police Service Association", "President, Bangladesh Police Service Association")}
                      </span>
                      <h3 className="text-lg font-bold text-foreground mt-1">
                        {t("Mosleh Uddin Ahmed", "Mosleh Uddin Ahmed")}
                      </h3>
                      <p className="text-xs text-muted-foreground font-medium mt-0.5">
                        {t("Additional IG, CID", "Additional IG, CID")}
                      </p>
                    </div>
                    <p className="text-2xs text-muted-foreground leading-relaxed">
                      {t("Directing the association's strategic policy, welfare initiatives, and representation of BPSA members nationwide.", "Directing the association's strategic policy, welfare initiatives, and representation of BPSA members nationwide.")}
                    </p>
                  </div>
                  {/* Secretary Profile */}
                  <div className="space-y-3 pt-6 sm:pt-0 pl-0 sm:pl-6">
                    <div>
                      <span className="text-3xs uppercase tracking-widest text-accent font-bold">
                        {t("General Secretary, Bangladesh Police Service Association", "General Secretary, Bangladesh Police Service Association")}
                      </span>
                      <h3 className="text-lg font-bold text-foreground mt-1">
                        {t("Shamima Parveen", "Shamima Parveen")}
                      </h3>
                      <p className="text-xs text-muted-foreground font-medium mt-0.5">
                        {t("Superintendent of Police", "Superintendent of Police")}
                      </p>
                    </div>
                    <p className="text-2xs text-muted-foreground leading-relaxed">
                      {t("Coordinating administration, membership communications, regional committee alignments, and structural operations.", "Coordinating administration, membership communications, regional committee alignments, and structural operations.")}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Gallery Cards */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-5 flex flex-col gap-6"
            >
              {/* Photo 2 */}
              <div className="rounded-3xl border border-border bg-card/40 backdrop-blur-sm overflow-hidden group hover:border-primary/40 transition-all duration-300">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <img 
                    src="/images/2.jpeg" 
                    alt={t("Committees Celebration Gallery", "Committees Celebration Gallery")}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-90" />
                  <div className="absolute bottom-4 left-6 right-6">
                    <p className="text-xs font-bold text-white">
                      {t("Reception ceremony with flower bouquets at BPSA central office.", "Reception ceremony with flower bouquets at BPSA central office.")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Photo 3 */}
              <div className="rounded-3xl border border-border bg-card/40 backdrop-blur-sm overflow-hidden group hover:border-primary/40 transition-all duration-300">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <img 
                    src="/images/3.jpeg" 
                    alt={t("Committees Celebration Gallery", "Committees Celebration Gallery")}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-90" />
                  <div className="absolute bottom-4 left-6 right-6">
                    <p className="text-xs font-bold text-white">
                      {t("Formal reception and discussion at the executive office.", "Formal reception and discussion at the executive office.")}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
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
                    {t(stat.number, stat.number)}
                  </span>
                  <div className="p-2 rounded-xl bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <stat.icon className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="text-xs font-bold text-foreground tracking-wide uppercase">{t(stat.label, stat.label)}</h3>
                <p className="text-2xs text-muted-foreground mt-1">{t(stat.desc, stat.desc)}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Facilities & Operations Showcase Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-card/10 border-b border-border">
        <div className="container mx-auto max-w-7xl space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-accent">{t("Showcase", "Showcase")}</h2>
            <p className="text-3xl font-extrabold sm:text-4xl tracking-tight">{t("Our Facilities & Member Services", "Our Facilities & Member Services")}</p>
            <p className="text-sm text-muted-foreground">
              {t("Explore the premium facilities and operations made available to our members through the online booking system.", "Explore the premium facilities and operations made available to our members through the online booking system.")}
            </p>
          </div>

          {/* Tabs header */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-5xl mx-auto">
            {[
              { id: "library", label: t("Police Library", "Police Library") },
              { id: "gym", label: t("Physical Fitness Gym", "Physical Fitness Gym") },
              { id: "hostel", label: t("Transit Hostel", "Transit Hostel") },
              { id: "welfare", label: t("Welfare & Consulting", "Welfare & Consulting") },
              { id: "legal", label: t("Legal Defense", "Legal Defense") },
              { id: "sports", label: t("Community Sports", "Community Sports") },
              { id: "scholarship", label: t("Education Grants", "Education Grants") },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFacilityTab(tab.id as any)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 border ${
                  activeFacilityTab === tab.id
                    ? "bg-primary border-primary text-primary-foreground shadow-md shadow-primary/15"
                    : "border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Showcase Display Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-card rounded-3xl border border-border p-6 sm:p-8 lg:p-12 shadow-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

            {/* Left Side: Animated Image container */}
            <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-border shadow-md aspect-4/3 group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFacilityTab}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35 }}
                  className="w-full h-full relative"
                >
                  <img
                    src={
                      activeFacilityTab === "library" ? "/images/facilities_library.jpg" :
                      activeFacilityTab === "gym" ? "/images/facilities_gym.jpg" :
                      activeFacilityTab === "hostel" ? "/images/facilities_hostel.jpg" :
                      activeFacilityTab === "welfare" ? "/images/facilities_welfare.jpg" :
                      activeFacilityTab === "legal" ? "/images/facilities_legal.jpg" :
                      activeFacilityTab === "sports" ? "/images/facilities_sports.jpg" :
                      "/images/facilities_scholarships.jpg"
                    }
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={activeFacilityTab}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Side: Showcase text details */}
            <div className="lg:col-span-6 space-y-6 text-left relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFacilityTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Tab Title & Header */}
                  <div>
                    <span className="text-3xs font-extrabold uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
                      {activeFacilityTab === "library" ? t("Library Resources", "Library Resources") :
                       activeFacilityTab === "gym" ? t("Wellness & Training", "Wellness & Training") :
                       activeFacilityTab === "hostel" ? t("Guest Suites & Lodging", "Guest Suites & Lodging") :
                       activeFacilityTab === "welfare" ? t("Welfare Support Office", "Welfare Support Office") :
                       activeFacilityTab === "legal" ? t("24/7 Legal Shield", "24/7 Legal Shield") :
                       activeFacilityTab === "sports" ? t("Youth & Outreach", "Youth & Outreach") :
                       t("Academic Scholarships", "Academic Scholarships")}
                    </span>
                    <h3 className="text-2xl font-extrabold text-foreground mt-3">
                      {activeFacilityTab === "library" ? t("BPA Central Library", "BPA Central Library") :
                       activeFacilityTab === "gym" ? t("Rajarbagh Police Gym", "Rajarbagh Police Gym") :
                       activeFacilityTab === "hostel" ? t("Police Transit Hostel", "Police Transit Hostel") :
                       activeFacilityTab === "welfare" ? t("Member Welfare Operations", "Member Welfare Operations") :
                       activeFacilityTab === "legal" ? t("BPSA Legal Defense Fund", "BPSA Legal Defense Fund") :
                       activeFacilityTab === "sports" ? t("Police-Youth Athletic League", "Police-Youth Athletic League") :
                       t("BDPA Educational Awards", "BDPA Educational Awards")}
                    </h3>
                  </div>

                  {/* Descriptions */}
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {activeFacilityTab === "library" ?
                      t("Features over 5,000 reference volumes, penal codes, legal reviews, and historical archives. Members can search, review checkout statuses, and borrow volumes dynamically using their online library account.", "Features over 5,000 reference volumes, penal codes, legal reviews, and historical archives. Members can search, review checkout statuses, and borrow volumes dynamically using their online library account.") :
                     activeFacilityTab === "gym" ?
                      t("State-of-the-art cardiovascular and strength conditioning equipment open 24/7 at Rajarbagh. Active members can view current trainer availability and reserve personal slots to avoid overcrowding.", "State-of-the-art cardiovascular and strength conditioning equipment open 24/7 at Rajarbagh. Active members can view current trainer availability and reserve personal slots to avoid overcrowding.") :
                     activeFacilityTab === "hostel" ?
                      t("Provides high-quality premium guest suites for officers on official transit or family visits. Features fully automated reservation systems, check-in details, and real-time ledger billing via the payments portal.", "Provides high-quality premium guest suites for officers on official transit or family visits. Features fully automated reservation systems, check-in details, and real-time ledger billing via the payments portal.") :
                     activeFacilityTab === "welfare" ?
                      t("A dedicated counseling center offering family assistance grants, scholarship applications, and retired officer welfare resources. Claims can be submitted online with live tracker status updates.", "A dedicated counseling center offering family assistance grants, scholarship applications, and retired officer welfare resources. Claims can be submitted online with live tracker status updates.") :
                     activeFacilityTab === "legal" ?
                      t("Provides immediate, comprehensive legal representation for all active members. Our legal defense fund offers 24/7 coverage for incidents, disciplinary review hearings, and administrative inquiries.", "Provides immediate, comprehensive legal representation for all active members. Our legal defense fund offers 24/7 coverage for incidents, disciplinary review hearings, and administrative inquiries.") :
                     activeFacilityTab === "sports" ?
                      t("Engaging local youth through organized basketball and football leagues, community resource drives, and neighborhood safety campaigns to build mutual trust and positive community partnerships.", "Engaging local youth through organized basketball and football leagues, community resource drives, and neighborhood safety campaigns to build mutual trust and positive community partnerships.") :
                      t("Empowering the children of our brave officers by offering merit-based higher education scholarships, tuition support grants, and school achievement congratulations recognitions.", "Empowering the children of our brave officers by offering merit-based higher education scholarships, tuition support grants, and school achievement congratulations recognitions.")}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-4 border-t border-border pt-6">
                    <div>
                      <h4 className="text-3xs font-extrabold uppercase text-muted-foreground tracking-wider">
                        {activeFacilityTab === "library" ? t("Borrowing Limit", "Borrowing Limit") :
                         activeFacilityTab === "gym" ? t("Availability", "Availability") :
                         activeFacilityTab === "hostel" ? t("Room Capacities", "Room Capacities") :
                         activeFacilityTab === "welfare" ? t("Processing Speed", "Processing Speed") :
                         activeFacilityTab === "legal" ? t("Hourly Coverage", "Hourly Coverage") :
                         activeFacilityTab === "sports" ? t("Annual Outreach", "Annual Outreach") :
                         t("Scholarship Grant", "Scholarship Grant")}
                      </h4>
                      <p className="text-xs font-bold text-foreground mt-1">
                        {activeFacilityTab === "library" ? t("3 Books / 14 Days", "3 Books / 14 Days") :
                         activeFacilityTab === "gym" ? t("24/7 Access Card", "24/7 Access Card") :
                         activeFacilityTab === "hostel" ? t("6 Suites (Rajarbagh)", "6 Suites (Rajarbagh)") :
                         activeFacilityTab === "welfare" ? t("24-48 Hours Review", "24-48 Hours Review") :
                         activeFacilityTab === "legal" ? t("24/7 Emergency Line", "24/7 Emergency Line") :
                         activeFacilityTab === "sports" ? t("5,000+ Youths Reached", "5,000+ Youths Reached") :
                         t("৳১০,০০০ - ৳৫০,০০০", "৳১০,০০০ - ৳৫০,০০০")}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-3xs font-extrabold uppercase text-muted-foreground tracking-wider">
                        {activeFacilityTab === "library" ? t("Search Roster", "Search Roster") :
                         activeFacilityTab === "gym" ? t("Daily Reservation", "Daily Reservation") :
                         activeFacilityTab === "hostel" ? t("Booking Fee", "Booking Fee") :
                         activeFacilityTab === "welfare" ? t("Emergency Hotline", "Emergency Hotline") :
                         activeFacilityTab === "legal" ? t("Representation Cost", "Representation Cost") :
                         activeFacilityTab === "sports" ? t("Complex Location", "Complex Location") :
                         t("Scholarships Awarded", "Scholarships Awarded")}
                      </h4>
                      <p className="text-xs font-bold text-foreground mt-1 text-primary">
                        {activeFacilityTab === "library" ? t("Digital OPAC System", "Digital OPAC System") :
                         activeFacilityTab === "gym" ? t("Up to 2 Hours / Day", "Up to 2 Hours / Day") :
                         activeFacilityTab === "hostel" ? t("৳৫০০ - ৳১,০০০ / Night", "৳৫০০ - ৳১,০০০ / Night") :
                         activeFacilityTab === "welfare" ? t("+880 1320-001299", "+880 1320-001299") :
                         activeFacilityTab === "legal" ? t("৳০ (100% Free for Members)", "৳০ (100% Free for Members)") :
                         activeFacilityTab === "sports" ? t("Sector 4 Sports Arena", "Sector 4 Sports Arena") :
                         t("1,200+ Students / Year", "1,200+ Students / Year")}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background border-b border-border">
        <div className="container mx-auto max-w-7xl space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-accent">{t("Core Pillars", "Core Pillars")}</h2>
            <p className="text-3xl font-extrabold sm:text-4xl tracking-tight">{t("Our Mission & Values", "Our Mission & Values")}</p>
            <p className="text-sm text-muted-foreground">
              {t("We stand firm on key values that define our leadership, community outreach, and advocacy.", "We stand firm on key values that define our leadership, community outreach, and advocacy.")}
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
                <h3 className="text-lg font-bold text-foreground mb-3">{t(pillar.title, pillar.title)}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{t(pillar.desc, pillar.desc)}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Official Notice Board Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background border-b border-border">
        <div className="container mx-auto max-w-7xl space-y-12">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-accent">{t("Official Notice Board & Media Hub", "Official Notice Board & Media Hub")}</h2>
            <p className="text-3xl font-extrabold sm:text-4xl tracking-tight">
              {t("Official Notice Board & Media Hub", "Official Notice Board & Media Hub")}
            </p>
            <p className="text-sm text-muted-foreground">
              {t("Stay updated with official announcements, press statements, and congratulations greetings.", "Stay updated with official announcements, press statements, and congratulations greetings.")}
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
            {[
              { id: "all", label: t("All", "All") },
              { id: "notice", label: t("Notices", "Notices") },
              { id: "statement", label: t("Press Statements", "Press Statements") },
              { id: "congratulations", label: t("Congratulations", "Congratulations") },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => {
                  setNoticeFilter(btn.id as any);
                  setExpandedNoticeId(null);
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 border ${
                  noticeFilter === btn.id
                    ? "bg-accent border-accent text-accent-foreground shadow-sm"
                    : "border-border bg-card hover:bg-muted text-muted-foreground"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Notice List */}
          <div className="max-w-4xl mx-auto space-y-4">
            {(() => {
              const filtered = notices.filter(
                (n) => noticeFilter === "all" || n.category === noticeFilter
              );

              if (filtered.length === 0) {
                return (
                  <div className="text-center py-12 text-sm text-muted-foreground border border-dashed border-border rounded-2xl">
                    {t("No notices matching the selected filter.", "No notices matching the selected filter.")}
                  </div>
                );
              }

              return filtered.map((item) => {
                const isExpanded = expandedNoticeId === item.id;
                return (
                  <div
                    key={item.id}
                    className={`border rounded-2xl transition-all duration-300 overflow-hidden bg-card/40 ${
                      isExpanded ? "border-accent/40 shadow-md ring-1 ring-accent/10" : "border-border hover:border-border-hover"
                    }`}
                  >
                    {/* Header Row */}
                    <div
                      onClick={() => setExpandedNoticeId(isExpanded ? null : item.id)}
                      className="p-5 sm:p-6 flex items-start gap-4 cursor-pointer select-none"
                    >
                      {/* Icon Indicator based on Category */}
                      <div className={`p-2.5 rounded-xl shrink-0 ${
                        item.category === "notice" ? "bg-blue-500/10 text-blue-500" :
                        item.category === "statement" ? "bg-amber-500/10 text-amber-500" :
                        "bg-emerald-500/10 text-emerald-500"
                      }`}>
                        {item.category === "notice" ? <Bell className="h-5 w-5" /> :
                         item.category === "statement" ? <FileText className="h-5 w-5" /> :
                         <Award className="h-5 w-5" />}
                      </div>

                      {/* Title & Metadata */}
                      <div className="flex-1 min-w-0 space-y-1.5 text-left">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-3xs font-extrabold uppercase tracking-wider text-muted-foreground bg-muted px-2 py-0.5 rounded border border-border/60">
                            {item.id}
                          </span>
                          <span className={`text-3xs font-extrabold uppercase tracking-wider px-2 py-0.5 rounded border ${
                            item.category === "notice" ? "bg-blue-500/5 text-blue-500 border-blue-500/10" :
                            item.category === "statement" ? "bg-amber-500/5 text-amber-500 border-amber-500/10" :
                            "bg-emerald-500/5 text-emerald-500 border-emerald-500/10"
                          }`}>
                            {t(item.category, item.category)}
                          </span>
                          <span className="text-3xs text-muted-foreground ml-auto sm:ml-0">
                            {t("Date Published", "Date Published")}: {t(item.date, item.date)}
                          </span>
                        </div>
                        <h3 className="font-bold text-sm sm:text-base text-foreground leading-snug">
                          {t(item.title, item.title)}
                        </h3>
                      </div>

                      {/* Expand Arrow */}
                      <div className="text-muted-foreground shrink-0 self-center">
                        {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                      </div>
                    </div>

                    {/* Expandable Details Body */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="border-t border-border bg-card/10 overflow-hidden"
                        >
                          <div className="p-6 text-left space-y-4">
                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                              {t(item.content, item.content)}
                            </p>

                            <div className="flex flex-wrap gap-x-8 gap-y-2 border-t border-border/60 pt-4 text-3xs text-muted-foreground">
                              <div>
                                <span className="font-semibold block text-foreground uppercase tracking-wider">{t("Signing Authority", "Signing Authority")}</span>
                                <span className="mt-0.5 block">
                                  {item.category === "statement" ? t("BPSA Spokesperson", "BPSA Spokesperson") :
                                   item.category === "congratulations" ? t("Executive Committee", "Executive Committee") :
                                   t("Office of General Secretary", "Office of General Secretary")}
                                </span>
                              </div>
                              <div>
                                <span className="font-semibold block text-foreground uppercase tracking-wider">{t("Date Published", "Date Published")}</span>
                                <span className="mt-0.5 block">{t(item.date, item.date)}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              });
            })()}
          </div>
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
                {t("Join the Network", "Join the Network")}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {t("Are you a Bangladesh Police Officer?", "Are you a Bangladesh Police Officer?")}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {t("Unlock full access to member directory, contract downloads, legal representation request tools, and updates on executive board meetings.", "Unlock full access to member directory, contract downloads, legal representation request tools, and updates on executive board meetings.")}
              </p>
            </div>
            
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 w-full">
              <Link href="/dashboard" className="w-full">
                <Button className="w-full rounded-xl h-11 bg-primary hover:bg-primary/95 text-primary-foreground font-semibold text-xs shadow-md">
                  {t("Register For Access", "Register For Access")}
                </Button>
              </Link>
              <Link href="/news" className="w-full">
                <Button variant="outline" className="w-full rounded-xl h-11 border-border text-xs font-semibold flex items-center justify-center gap-1.5">
                  {t("Read Association FAQs", "Read Association FAQs")}
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
