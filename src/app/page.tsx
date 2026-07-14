"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Shield, Users, Heart, Award, ChevronRight, Scale, Landmark, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  return (
    <div className="flex flex-col w-full overflow-hidden bg-background">
      {/* Hero Section */}
      <section className="relative flex min-h-[85vh] items-center justify-center py-20 px-4 sm:px-6 lg:px-8 border-b border-border">
        {/* Abstract futuristic background decorations */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent blur-3xl pointer-events-none" />
        
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="container relative z-10 mx-auto max-w-5xl text-center space-y-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-semibold tracking-wide backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5 fill-current animate-pulse" />
            <span>Honoring Service, Protecting Rights, Uniting Community</span>
          </motion.div>

          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl font-extrabold tracking-tight sm:text-6xl text-foreground leading-[1.15]"
          >
            Empowering Those Who <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent drop-shadow-sm">
              Protect Our Community
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mx-auto max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            The Metropolitan Police Association is dedicated to advocating for the rights, safety, and professional interests of our officers, while building bridges of trust and collaboration in our neighborhoods.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto rounded-xl px-8 h-12 bg-primary hover:bg-primary/95 text-primary-foreground font-semibold text-sm shadow-xl shadow-primary/20">
                Access Members Portal
              </Button>
            </Link>
            <Link href="/donate" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-xl px-8 h-12 border-border text-sm font-semibold hover:bg-muted">
                Make a Contribution
              </Button>
            </Link>
          </motion.div>
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
