"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Shield, BookOpen, Clock, Award, CheckCircle } from "lucide-react";

export default function About() {
  const boardMembers = [
    {
      name: "President John Kowalski",
      role: "Active Detective, 22 Years Service",
      bio: "John oversees the association's legal and bargaining agreements, advocating for safer working conditions and fair wage negotiations.",
    },
    {
      name: "Vice President Marcus Vance",
      role: "Active Sergeant, 18 Years Service",
      bio: "Marcus handles community relations and public safety partnerships, coordinating community outreach programs and youth engagement.",
    },
    {
      name: "Secretary Sarah Jenkins",
      role: "Active Patrol Officer, 12 Years Service",
      bio: "Sarah manages internal communications, documentation, bylaws integrity, and member resource distributions.",
    },
    {
      name: "Treasurer Raymond Vance",
      role: "Retired Captain, 30 Years Service",
      bio: "Raymond manages the welfare funds, charitable donations, scholarship programs, and association financial audits.",
    },
  ];

  return (
    <div className="flex flex-col w-full bg-background min-h-screen">
      {/* Page Header */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-border bg-card/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto max-w-4xl text-center space-y-4">
          <span className="text-2xs font-bold uppercase tracking-widest text-accent">Who We Are</span>
          <h1 className="text-3xl font-extrabold sm:text-5xl tracking-tight text-foreground">
            About Our Association
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Representing the professional interests and ensuring the safety and welfare of Metropolitan Police officers since 1991.
          </p>
        </div>
      </section>

      {/* History and Mission */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Story text */}
            <div className="space-y-6">
              <div className="inline-flex p-2.5 rounded-xl bg-primary/10 text-primary">
                <Clock className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight">Our Proud History</h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Founded in 1991 by a small coalition of patrol officers, the Metropolitan Police Association was formed to represent the growing needs of our force. Over three decades, we have expanded to over 5,000 active and retired members.
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Our legacy is built on protecting those who protect others. We continue to lobby for cutting-edge training, robust mental health support, and legal representation to ensure that our officers can perform their duties with confidence and security.
              </p>
            </div>

            {/* Values bullet points card */}
            <div className="p-8 rounded-3xl border border-border bg-card shadow-sm space-y-6">
              <h3 className="text-sm font-bold tracking-wide uppercase text-accent">Our Core Directives</h3>
              <ul className="space-y-4">
                {[
                  "Negotiating fair labor agreements and competitive benefit structures.",
                  "Providing comprehensive legal defense representation 24/7.",
                  "Supporting families of disabled or fallen officers via the Welfare Fund.",
                  "Strengthening police-community relations through neighborhood events."
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3 items-start text-xs text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Board */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border bg-card/10">
        <div className="container mx-auto max-w-6xl space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-accent">Leadership</h2>
            <p className="text-2xl font-extrabold sm:text-3xl">Executive Board Officers</p>
            <p className="text-xs text-muted-foreground">
              Committed to transparency, representation, and guiding the association forward.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {boardMembers.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Mock profile image using CSS styling and icons */}
                  <div className="h-16 w-16 rounded-2xl bg-muted text-muted-foreground flex items-center justify-center mb-4 border border-border shadow-inner">
                    <Shield className="h-8 w-8 text-primary/70" />
                  </div>
                  <h3 className="font-bold text-foreground text-sm">{member.name}</h3>
                  <p className="text-3xs text-accent uppercase font-bold tracking-wider mt-0.5">{member.role}</p>
                  <p className="text-xs text-muted-foreground mt-3 leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
