"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useDemo } from "@/lib/demo-context";
import { Store, Tag, Mail, Phone, MapPin, Search, Grid, Plus, CheckCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

export default function BusinessDirectoryPage() {
  const { t, language } = useDemo();
  const [activeCategory, setActiveCategory] = React.useState<"all" | "catering" | "logistics" | "it" | "garments">("all");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [connectedIds, setConnectedIds] = React.useState<string[]>([]);
  const [connectingId, setConnectingId] = React.useState<string | null>(null);

  const businesses = [
    {
      id: "BUS-11",
      name: t("Rabbi Catering & Events", "Rabbi Catering & Events"),
      owner: t("Insp. Fazle Rabbi", "Insp. Fazle Rabbi"),
      badge: "8492",
      category: "catering",
      desc: t("Premium wedding catering, office lunches, and executive meeting platters. Home-cooked traditional Bangladeshi dishes and hygiene certified.", "Premium wedding catering, office lunches, and executive meeting platters. Home-cooked traditional Bangladeshi dishes and hygiene certified."),
      phone: "+880 1711-223344",
      email: "rabbi.catering@outlook.com",
      location: t("Dhanmondi, Dhaka", "Dhanmondi, Dhaka")
    },
    {
      id: "BUS-12",
      name: t("Speedy Force Logistics", "Speedy Force Logistics"),
      owner: t("Sgt. Md. Rafiqul Islam", "Sgt. Md. Rafiqul Islam"),
      badge: "4110",
      category: "logistics",
      desc: t("Nationwide courier delivery, home shifting, and corporate parcel transport solutions. Special 10% discount rates for police personnel.", "Nationwide courier delivery, home shifting, and corporate parcel transport solutions. Special 10% discount rates for police personnel."),
      phone: "+880 1819-009988",
      email: "speedy.force@gmail.com",
      location: t("Tejgaon, Dhaka", "Tejgaon, Dhaka")
    },
    {
      id: "BUS-13",
      name: t("Cops & Tech Solutions", "Cops & Tech Solutions"),
      owner: t("Const. Sadek Rahman", "Const. Sadek Rahman"),
      badge: "2209",
      category: "it",
      desc: t("Custom website development, database configuration, CCTV security setup, and office networking solutions. PCI compliant integration.", "Custom website development, database configuration, CCTV security setup, and office networking solutions. PCI compliant integration."),
      phone: "+880 1515-334455",
      email: "info@cops-tech.net",
      location: t("Motijheel, Dhaka", "Motijheel, Dhaka")
    },
    {
      id: "BUS-14",
      name: t("Police Family Outfits", "Police Family Outfits"),
      owner: t("Wife of Insp. Kamrul Hasan", "Wife of Insp. Kamrul Hasan"),
      badge: "7022",
      category: "garments",
      desc: t("Wholesale readymade garments, boutique fabrics, children wear, and custom embroidery. Home delivery nationwide.", "Wholesale readymade garments, boutique fabrics, children wear, and custom embroidery. Home delivery nationwide."),
      phone: "+880 1912-887766",
      email: "family.outfits@yahoo.com",
      location: t("Mirpur, Dhaka", "Mirpur, Dhaka")
    }
  ];

  const handleConnect = async (id: string) => {
    setConnectingId(id);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setConnectingId(null);
    setConnectedIds([...connectedIds, id]);
  };

  const filteredBusinesses = businesses.filter((b) => {
    const matchesCategory = activeCategory === "all" || b.category === activeCategory;
    const matchesSearch =
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.desc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 text-left max-w-6xl mx-auto">
      {/* Page Header */}
      <div>
        <span className="text-3xs font-extrabold uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
          {t("BPA Business Network", "BPA Business Network")}
        </span>
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground mt-2">
          {t("Police Members' Business Directory", "Police Members' Business Directory")}
        </h1>
        <p className="text-2xs sm:text-xs text-muted-foreground mt-1">
          {t("Support businesses owned, run, or managed by Bangladesh Police members and their immediate families.", "Support businesses owned, run, or managed by Bangladesh Police members and their immediate families.")}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder={t("Search businesses or owners...", "Search businesses or owners...")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-xl border-border pl-10 h-10 text-xs focus-visible:ring-accent"
          />
        </div>
        
        {/* Categories Carousel */}
        <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-1 justify-start">
          {[
            { id: "all", label: t("All Businesses", "All Businesses") },
            { id: "catering", label: t("Catering & Food", "Catering & Food") },
            { id: "logistics", label: t("Logistics & Delivery", "Logistics & Delivery") },
            { id: "it", label: t("IT & Technical", "IT & Technical") },
            { id: "garments", label: t("Garments & Apparel", "Garments & Apparel") },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2 rounded-xl text-3xs font-bold transition-all duration-200 border shrink-0 ${
                activeCategory === cat.id
                  ? "bg-accent border-accent text-accent-foreground shadow-sm"
                  : "border-border bg-card hover:bg-muted text-muted-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Businesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredBusinesses.map((b) => {
          const isConnected = connectedIds.includes(b.id);
          const isConnecting = connectingId === b.id;
          return (
            <Card key={b.id} className="border-border bg-card hover:shadow-md transition-all duration-300 relative group h-full flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 left-0 h-1 w-full bg-accent/30 group-hover:bg-accent transition-colors" />
              
              <CardHeader className="pb-3 text-left">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <CardTitle className="text-base font-bold text-foreground">{b.name}</CardTitle>
                    <CardDescription className="text-3xs text-muted-foreground mt-1 flex items-center gap-1">
                      <Store className="h-3.5 w-3.5 text-accent" />
                      <span>{t("Owned by", "Owned by")}: <span className="font-semibold text-foreground">{b.owner}</span> (Badge: {b.badge})</span>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 text-left">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {b.desc}
                </p>
                <div className="border-t border-border pt-4 space-y-2 text-3xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <a href={`tel:${b.phone}`} className="text-foreground hover:text-primary transition-colors">{b.phone}</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <a href={`mailto:${b.email}`} className="text-foreground hover:text-primary transition-colors">{b.email}</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span>{b.location}</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="border-t border-border pt-4 bg-muted/10 flex justify-between items-center">
                <span className="text-4xs font-extrabold uppercase tracking-wider text-accent bg-accent/5 px-2 py-0.5 rounded border border-accent/20">
                  {t(b.category, b.category)}
                </span>
                <Button
                  onClick={() => handleConnect(b.id)}
                  disabled={isConnected || isConnecting}
                  className={`rounded-xl h-8 px-4 text-3xs font-bold ${
                    isConnected
                      ? "bg-muted text-muted-foreground border border-border cursor-not-allowed"
                      : "bg-primary hover:bg-primary/95 text-primary-foreground"
                  }`}
                >
                  {isConnecting ? t("Connecting...", "Connecting...") :
                   isConnected ? (
                     <span className="flex items-center gap-1 text-emerald-500 font-bold">
                       <ShieldCheck className="h-3.5 w-3.5" />
                       {t("Connected", "Connected")}
                     </span>
                   ) : t("Request Inquiry", "Request Inquiry")}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
