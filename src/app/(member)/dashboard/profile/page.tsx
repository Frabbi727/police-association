"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useDemo } from "@/lib/demo-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Shield, QrCode, Phone, Mail, UserCheck, RefreshCw } from "lucide-react";

export default function ProfileAndIdCard() {
  const { user, members, updateProfile } = useDemo();
  const currentMember = members.find(m => m.badge === user?.badgeNumber) || {
    name: user?.name || "Officer John Doe",
    phone: "(555) 018-3482",
    email: user?.email || "officer.doe@metro-pd.gov"
  };

  const [name, setName] = React.useState(currentMember.name);
  const [phone, setPhone] = React.useState(currentMember.phone);
  const [email, setEmail] = React.useState(currentMember.email);
  const [isFlipped, setIsFlipped] = React.useState(false);
  const [saveSuccess, setSaveSuccess] = React.useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(name, phone, email);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Profile & Digital Card</h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Manage your contact credentials and access your digital membership ID card.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Panel: Edit Form (6 cols) */}
        <div className="lg:col-span-6">
          <Card className="border-border">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-sm font-bold">Contact Verification details</CardTitle>
              <CardDescription className="text-3xs">
                Keep your details updated. Changes will be reflected immediately in the digital ID card.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSave} noValidate>
              <CardContent className="space-y-4 pt-6">
                {saveSuccess && (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-2xs font-semibold rounded-xl flex items-center gap-2">
                    <UserCheck className="h-4.5 w-4.5 shrink-0" />
                    <span>Contact details updated successfully.</span>
                  </div>
                )}
                
                {/* Full Name */}
                <div className="space-y-1.5">
                  <Label htmlFor="fullname" className="text-xs font-semibold">Full Officer Name</Label>
                  <Input
                    id="fullname"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="rounded-xl h-11 border-border focus-visible:ring-accent"
                    placeholder="Officer Name"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-semibold">Department Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-xl h-11 border-border focus-visible:ring-accent"
                    placeholder="officer@metro-pd.gov"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-xs font-semibold">Contact Phone</Label>
                  <Input
                    id="phone"
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="rounded-xl h-11 border-border focus-visible:ring-accent"
                    placeholder="(555) 000-0000"
                  />
                </div>
              </CardContent>
              <CardFooter className="pt-2 pb-6 border-t border-border mt-4">
                <Button type="submit" className="rounded-xl h-11 bg-primary hover:bg-primary/95 text-primary-foreground font-semibold text-xs shadow-md">
                  Update Profile Details
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>

        {/* Right Panel: Digital Membership Card (6 cols) */}
        <div className="lg:col-span-6 flex flex-col items-center space-y-6">
          <div className="text-center">
            <h3 className="font-extrabold text-sm text-foreground">Digital Membership ID</h3>
            <p className="text-3xs text-muted-foreground mt-0.5">Click Card to Flip / Reveal Verification QR Code</p>
          </div>

          {/* Interactive Card with 3D Flip */}
          <div
            className="w-full max-w-[400px] h-[250px] cursor-pointer relative perspective-1000 select-none"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full h-full transform-style-3d relative duration-300"
            >
              
              {/* CARD FRONT SIDE */}
              <div className="absolute inset-0 backface-hidden w-full h-full rounded-2xl p-6 bg-gradient-to-br from-slate-900 via-[#0B1530] to-slate-950 border-2 border-accent/40 shadow-2xl text-white flex flex-col justify-between overflow-hidden">
                {/* Background Watermark Shield */}
                <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none translate-x-12 translate-y-12">
                  <Shield className="h-64 w-64" />
                </div>
                
                {/* Header Logo */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Shield className="h-7 w-7 text-accent" />
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-black uppercase tracking-wider">Metropolitan</span>
                      <span className="text-[7px] -mt-1 font-bold uppercase tracking-widest text-accent">Police Association</span>
                    </div>
                  </div>
                  <span className="text-[8px] font-bold text-accent border border-accent/35 px-2 py-0.5 rounded bg-accent/10 uppercase tracking-widest">
                    MEMBER
                  </span>
                </div>

                {/* Member Info Body */}
                <div className="flex items-center gap-4 my-2 text-left">
                  <div className="h-16 w-16 bg-white/5 border border-white/15 rounded-xl flex items-center justify-center shadow-inner">
                    <Shield className="h-8 w-8 text-accent/50" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-sm font-extrabold tracking-tight">{name}</h4>
                    <div className="space-y-0.5">
                      <p className="text-[9px] text-white/60 font-semibold uppercase tracking-wide">{user?.rank}</p>
                      <p className="text-[9px] text-white/60 font-semibold uppercase tracking-wide">{user?.division}</p>
                    </div>
                  </div>
                </div>

                {/* Footer Badge/Expiry */}
                <div className="flex items-end justify-between text-left mt-1">
                  <div>
                    <span className="text-[7px] text-white/40 block font-bold uppercase tracking-widest">Badge Number</span>
                    <span className="text-xs font-black text-white">{user?.badgeNumber}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[7px] text-white/40 block font-bold uppercase tracking-widest">Expires</span>
                    <span className="text-[10px] font-bold text-accent">06 / 2028</span>
                  </div>
                </div>
              </div>

              {/* CARD BACK SIDE */}
              <div className="absolute inset-0 backface-hidden w-full h-full rounded-2xl p-6 bg-gradient-to-br from-slate-950 to-[#050C1F] border-2 border-accent/40 shadow-2xl text-white flex flex-col justify-between transform-rotateY-180 overflow-hidden">
                <div className="flex justify-between items-start border-b border-white/10 pb-3">
                  <div className="text-left space-y-0.5">
                    <span className="text-[8px] text-accent font-black uppercase tracking-wider">Verification Terminal</span>
                    <p className="text-[7px] text-white/50 leading-relaxed max-w-[200px]">
                      Scan this barcode to verify current member status and authorization levels.
                    </p>
                  </div>
                  <QrCode className="h-7 w-7 text-white/60" />
                </div>

                {/* Barcode/QR Section */}
                <div className="flex items-center justify-center py-2">
                  <div className="bg-white p-2 rounded-xl border border-white/10 shadow-lg">
                    <QrCode className="h-20 w-20 text-slate-900" />
                  </div>
                </div>

                {/* Terms and Support Info */}
                <div className="flex justify-between items-end text-left">
                  <div className="space-y-0.5">
                    <span className="text-[6px] text-white/30 block uppercase tracking-widest">Helpline</span>
                    <span className="text-[8px] font-bold text-white flex items-center gap-1">
                      <Phone className="h-3 w-3 text-accent shrink-0" />
                      (555) 911-MPA1
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[6px] text-white/35 block uppercase tracking-widest">Card ID No.</span>
                    <span className="text-[8px] font-bold text-white/60">MPA-8492-2026</span>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>

          <Button
            variant="outline"
            className="rounded-xl flex items-center gap-2 font-medium border-border"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <RefreshCw className="h-4 w-4" />
            Flip ID Card
          </Button>
        </div>

      </div>

    </div>
  );
}
