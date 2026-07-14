"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useDemo, translateDigits } from "@/lib/demo-context";
import { Tag, Building, Heart, Utensils, Plane, ShoppingBag, Eye, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

export default function DiscountPage() {
  const { t, language } = useDemo();
  const [activeCategory, setActiveCategory] = React.useState<"all" | "hospital" | "restaurant" | "travel" | "retail">("all");
  const [copiedCode, setCopiedCode] = React.useState(false);
  const [showCode, setShowCode] = React.useState(false);

  const discountCode = "BDPA-MEMBER-2026";

  const handleCopy = () => {
    navigator.clipboard.writeText(discountCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const partners = [
    {
      id: "P-01",
      name: t("Labaid Hospital", "Labaid Hospital"),
      category: "hospital",
      discount: "15%",
      discountBn: "১৫%",
      details: t("15% discount on all pathological diagnostic investigations & room charges.", "15% discount on all pathological diagnostic investigations & room charges."),
      icon: Heart,
      location: t("Dhaka, Bangladesh", "Dhaka, Bangladesh")
    },
    {
      id: "P-02",
      name: t("Square Hospital", "Square Hospital"),
      category: "hospital",
      discount: "10%",
      discountBn: "১০%",
      details: t("10% discount on out-patient lab tests & radiological imaging services.", "10% discount on out-patient lab tests & radiological imaging services."),
      icon: Heart,
      location: t("Dhaka, Bangladesh", "Dhaka, Bangladesh")
    },
    {
      id: "P-03",
      name: t("Kasturi Restaurant", "Kasturi Restaurant"),
      category: "restaurant",
      discount: "20%",
      discountBn: "২০%",
      details: t("20% discount on a-la-carte dining for members and immediate family.", "20% discount on a-la-carte dining for members and immediate family."),
      icon: Utensils,
      location: t("Purana Paltan, Dhaka", "Purana Paltan, Dhaka")
    },
    {
      id: "P-04",
      name: t("Grand Sultan Resort", "Grand Sultan Resort"),
      category: "travel",
      discount: "25%",
      discountBn: "২৫%",
      details: t("25% discount on room reservations and complimentary access to sports center.", "25% discount on room reservations and complimentary access to sports center."),
      icon: Plane,
      location: t("Sreemangal, Sylhet", "Sreemangal, Sylhet")
    },
    {
      id: "P-05",
      name: t("US-Bangla Airlines", "US-Bangla Airlines"),
      category: "travel",
      discount: "10%",
      discountBn: "১০%",
      details: t("10% discount on all domestic base fares booked through official counters.", "10% discount on all domestic base fares booked through official counters."),
      icon: Plane,
      location: t("All Counters, Bangladesh", "All Counters, Bangladesh")
    },
    {
      id: "P-06",
      name: t("Apex Footwear", "Apex Footwear"),
      category: "retail",
      discount: "12%",
      discountBn: "১২%",
      details: t("12% discount on lifestyle footwear and leather accessories at outlets.", "12% discount on lifestyle footwear and leather accessories at outlets."),
      icon: ShoppingBag,
      location: t("Nationwide Outlets", "Nationwide Outlets")
    }
  ];

  const filteredPartners = partners.filter(p => activeCategory === "all" || p.category === activeCategory);

  return (
    <div className="space-y-8 text-left max-w-6xl mx-auto">
      {/* Top Banner Card showing the Member Card */}
      <Card className="relative overflow-hidden bg-[#0e1628] border-accent/20 text-white shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/10" />
        <CardContent className="p-8 sm:p-12 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <span className="text-3xs font-extrabold uppercase tracking-widest text-accent bg-accent/10 px-2.5 py-1 rounded border border-accent/20">
              {t("Exclusive Privilege", "Exclusive Privilege")}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {t("Police Privilege Discount Card", "Police Privilege Discount Card")}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t("Show your Digital Membership ID Card or use the promo code at our partner outlets to receive exclusive discounts on healthcare, dining, lodging, and travel.", "Show your Digital Membership ID Card or use the promo code at our partner outlets to receive exclusive discounts on healthcare, dining, lodging, and travel.")}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 bg-black/40 border border-slate-700/60 rounded-xl px-4 py-2 text-xs">
                <span className="text-slate-400">{t("Promo Code", "Promo Code")}:</span>
                <span className="font-mono font-bold text-accent">{showCode ? discountCode : "••••••••••••••••"}</span>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="outline" onClick={() => setShowCode(!showCode)} className="h-9 w-9 rounded-xl border-slate-700 hover:bg-slate-800 text-white">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={handleCopy} className="rounded-xl h-9 px-4 border-slate-700 hover:bg-slate-800 text-white font-semibold text-xs flex items-center gap-1.5">
                  {copiedCode ? <Check className="h-3.5 w-3.5 text-accent" /> : <Copy className="h-3.5 w-3.5" />}
                  {copiedCode ? t("Copied!", "Copied!") : t("Copy Code", "Copy Code")}
                </Button>
              </div>
            </div>
          </div>
          <div className="md:col-span-4 flex justify-center">
            {/* Mock Card Graphic */}
            <div className="w-72 h-44 rounded-2xl bg-gradient-to-tr from-[#1b2640] to-[#0b101d] border border-accent/30 shadow-2xl p-5 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 h-32 w-32 rounded-full bg-accent/5 pointer-events-none" />
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-1.5">
                  <img src="/images/309563497_415511680752905_2210960597977463845_n.png" className="h-6 w-6 object-contain" alt="Logo" />
                  <span className="text-4xs font-bold uppercase tracking-wider text-slate-200">BDPA PRIVILEGE</span>
                </div>
                <Tag className="h-5 w-5 text-accent" />
              </div>
              <div className="space-y-1">
                <span className="text-5xs uppercase tracking-widest text-slate-400 block">CARD NUMBER</span>
                <span className="font-mono text-xs font-semibold text-slate-100 tracking-widest">**** **** **** 8492</span>
              </div>
              <div className="flex justify-between items-end border-t border-slate-800 pt-3">
                <div>
                  <span className="text-5xs uppercase tracking-widest text-slate-400 block">CARDHOLDER</span>
                  <span className="text-3xs font-bold text-slate-100">DET. JOHN DOE</span>
                </div>
                <span className="text-4xs font-bold text-accent px-1.5 py-0.5 rounded bg-accent/10 border border-accent/20">DISCOUNT CARD</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories Tabs Filter */}
      <div className="flex flex-wrap gap-2 justify-start">
        {[
          { id: "all", label: t("All Partners", "All Partners"), icon: Building },
          { id: "hospital", label: t("Hospital & Clinics", "Hospital & Clinics"), icon: Heart },
          { id: "restaurant", label: t("Restaurants", "Restaurants"), icon: Utensils },
          { id: "travel", label: t("Travel & Lodging", "Travel & Lodging"), icon: Plane },
          { id: "retail", label: t("Retail & Stores", "Retail & Stores"), icon: ShoppingBag },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id as any)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 border flex items-center gap-2 ${
              activeCategory === tab.id
                ? "bg-primary border-primary text-primary-foreground shadow-sm shadow-primary/10"
                : "border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            <tab.icon className="h-3.5 w-3.5 shrink-0" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid of Partners */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPartners.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-border bg-card hover:shadow-lg transition-all duration-300 relative group h-full flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 left-0 h-1.5 w-full bg-accent/40 group-hover:bg-accent transition-colors" />
              <CardHeader className="space-y-1 pb-4">
                <div className="flex justify-between items-start">
                  <div className="p-2 rounded-xl bg-muted text-muted-foreground group-hover:bg-primary/5 group-hover:text-primary transition-all">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <span className="text-base font-extrabold text-accent bg-accent/5 px-2.5 py-1 rounded-xl border border-accent/20 group-hover:scale-105 transition-transform">
                    {language === "bn" ? p.discountBn : p.discount} {t("OFF", "OFF")}
                  </span>
                </div>
                <CardTitle className="text-base font-bold text-foreground pt-3">{p.name}</CardTitle>
                <CardDescription className="text-3xs text-muted-foreground flex items-center gap-1">
                  <span>{p.location}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {p.details}
                </p>
              </CardContent>
              <CardFooter className="pt-4 border-t border-border flex justify-between items-center text-3xs font-semibold text-accent uppercase tracking-wider bg-muted/20">
                <span>{t("Discount Available", "Discount Available")}</span>
                <span className="text-slate-400 text-4xs">ID: {p.id}</span>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
