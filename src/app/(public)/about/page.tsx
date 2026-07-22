"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useDemo } from "@/lib/demo-context";
import { Shield, Clock, CheckCircle } from "lucide-react";

export default function About() {
  const { t } = useDemo();

  const boardMembers = [
    {
      name: t("Mosleh Uddin Ahmed", "Mosleh Uddin Ahmed"),
      role: t("President, Bangladesh Police Service Association", "President, Bangladesh Police Service Association"),
      bio: t("Oversees the association's strategic direction, representative policy, and welfare initiatives for the central committee of police service officers.", "Oversees the association's strategic direction, representative policy, and welfare initiatives for the central committee of police service officers."),
      image: "/images/1.jpeg",
      imageClassName: "h-full w-full object-cover object-left scale-[1.6] origin-left"
    },
    {
      name: t("Shamima Parveen", "Shamima Parveen"),
      role: t("General Secretary, Bangladesh Police Service Association", "General Secretary, Bangladesh Police Service Association"),
      bio: t("Manages coordination, communications, member relations, and representations of BPSA operations nationwide.", "Manages coordination, communications, member relations, and representations of BPSA operations nationwide."),
      image: "/images/1.jpeg",
      imageClassName: "h-full w-full object-cover object-right scale-[1.6] origin-right"
    },
    {
      name: t("Md. Abdullahhel Baki", "Md. Abdullahhel Baki"),
      role: t("Vice President, Bangladesh Police Association", "Vice President, Bangladesh Police Association"),
      bio: t("Coordinates community outreach, regional committees, and public relations partnerships for the association.", "Coordinates community outreach, regional committees, and public relations partnerships for the association."),
      image: "/images/309563497_415511680752905_2210960597977463845_n.png",
      imageClassName: "h-12 w-12 object-contain"
    },
    {
      name: t("Md. Daud Hossain", "Md. Daud Hossain"),
      role: t("Treasurer, Bangladesh Police Association", "Treasurer, Bangladesh Police Association"),
      bio: t("Manages the welfare fund distribution, financial audits, and charity program operations of the association.", "Manages the welfare fund distribution, financial audits, and charity program operations of the association."),
      image: "/images/309563497_415511680752905_2210960597977463845_n.png",
      imageClassName: "h-12 w-12 object-contain"
    },
  ];

  return (
    <div className="flex flex-col w-full bg-background min-h-screen">
      {/* Page Header */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-border bg-card/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto max-w-4xl text-center space-y-4">
          <span className="text-2xs font-bold uppercase tracking-widest text-accent">{t("Who We Are", "Who We Are")}</span>
          <h1 className="text-3xl font-extrabold sm:text-5xl tracking-tight text-foreground">
            {t("About Our Association", "About Our Association")}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {t("Representing the professional interests and ensuring the safety and welfare of Bangladesh Police officers since 1920.", "Representing the professional interests and ensuring the safety and welfare of Bangladesh Police officers since 1920.")}
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
              <h2 className="text-2xl font-extrabold tracking-tight">{t("Our Proud History", "Our Proud History")}</h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t("Founded in 1920, the Bangladesh Police Association is one of the oldest professional representations in the region, established to represent the interests of non-cadre police officers from Inspector downwards.", "Founded in 1920, the Bangladesh Police Association is one of the oldest professional representations in the region, established to represent the interests of non-cadre police officers from Inspector downwards.")}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t("Representing over 50,000 members, our legacy is built on protecting those who protect others. We continue to advocate for better welfare services, professional training, legal security, and enhanced community partnerships.", "Representing over 50,000 members, our legacy is built on protecting those who protect others. We continue to advocate for better welfare services, professional training, legal security, and enhanced community partnerships.")}
              </p>
            </div>

            {/* Values bullet points card */}
            <div className="p-8 rounded-3xl border border-border bg-card shadow-sm space-y-6">
              <h3 className="text-sm font-bold tracking-wide uppercase text-accent">{t("Our Core Directives", "Our Core Directives")}</h3>
              <ul className="space-y-4">
                {[
                  "Negotiating fair labor agreements and competitive benefit structures.",
                  "Providing comprehensive legal defense representation 24/7.",
                  "Supporting families of disabled or fallen officers via the Welfare Fund.",
                  "Strengthening police-community relations through neighborhood events."
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3 items-start text-xs text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <span>{t(item, item)}</span>
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
            <h2 className="text-xs font-bold uppercase tracking-widest text-accent">{t("Leadership", "Leadership")}</h2>
            <p className="text-2xl font-extrabold sm:text-3xl">{t("Executive Board Officers", "Executive Board Officers")}</p>
            <p className="text-xs text-muted-foreground">
              {t("Committed to transparency, representation, and guiding the association forward.", "Committed to transparency, representation, and guiding the association forward.")}
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
                  {/* Logo or portrait header rendering */}
                  <div className="h-16 w-16 rounded-2xl bg-card text-muted-foreground flex items-center justify-center mb-4 border border-border shadow-inner overflow-hidden">
                    <img
                      src={member.image}
                      className={member.imageClassName}
                      alt={member.name}
                    />
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
