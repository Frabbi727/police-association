"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDemo } from "@/lib/demo-context";
import { QrCode, Video, Calendar, ShieldCheck, UserCheck, Clock, MapPin, Plus, CheckCircle, ExternalLink, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

export default function VisitorPage() {
  const { t, user } = useDemo();
  const [visitorMode, setVisitorMode] = React.useState<"qr" | "zoom">("qr");
  const [qrGenerated, setQrGenerated] = React.useState(false);
  const [visitorPurpose, setVisitorPurpose] = React.useState("");
  const [officeSection, setOfficeSection] = React.useState("general");
  
  const [meetings, setMeetings] = React.useState([
    {
      id: "ZOOM-402",
      topic: t("Executive Board Discussion on Pension Policy", "Executive Board Discussion on Pension Policy"),
      time: "2026-07-20 10:00 AM",
      department: t("Administration", "Administration"),
      zoomUrl: "https://zoom.us/j/9982736182?pwd=BPA"
    }
  ]);
  const [newTopic, setNewTopic] = React.useState("");
  const [newTime, setNewTime] = React.useState("");
  const [newDept, setNewDept] = React.useState("Administration");
  const [zoomScheduled, setZoomScheduled] = React.useState(false);

  const handleGenerateQR = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorPurpose.trim()) return;
    setQrGenerated(true);
  };

  const handleScheduleZoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopic.trim() || !newTime) return;
    
    const mockMeet = {
      id: `ZOOM-${Math.floor(Math.random() * 900) + 100}`,
      topic: newTopic,
      time: newTime.replace("T", " "),
      department: newDept,
      zoomUrl: `https://zoom.us/j/${Math.floor(Math.random() * 900000000) + 100000000}?pwd=BPA`
    };

    setMeetings([...meetings, mockMeet]);
    setZoomScheduled(true);
    setNewTopic("");
    setNewTime("");
    setTimeout(() => setZoomScheduled(false), 3000);
  };

  return (
    <div className="space-y-8 text-left max-w-6xl mx-auto">
      {/* Header Tabs */}
      <div className="flex justify-between items-center border-b border-border pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
            {t("Smart Visitor Pass & Meetings", "Smart Visitor Pass & Meetings")}
          </h1>
          <p className="text-2xs sm:text-xs text-muted-foreground mt-1">
            {t("Manage physical office visits via QR entry passes or schedule virtual Zoom meetings.", "Manage physical office visits via QR entry passes or schedule virtual Zoom meetings.")}
          </p>
        </div>
        <div className="flex bg-muted rounded-xl p-1 shrink-0 border border-border">
          <button
            onClick={() => setVisitorMode("qr")}
            className={`px-4 py-2 text-2xs font-bold rounded-lg flex items-center gap-1.5 transition-all ${
              visitorMode === "qr" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <QrCode className="h-3.5 w-3.5" />
            {t("QR Entry Pass", "QR Entry Pass")}
          </button>
          <button
            onClick={() => setVisitorMode("zoom")}
            className={`px-4 py-2 text-2xs font-bold rounded-lg flex items-center gap-1.5 transition-all ${
              visitorMode === "zoom" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Video className="h-3.5 w-3.5" />
            {t("Zoom Meetings", "Zoom Meetings")}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {visitorMode === "qr" ? (
          /* QR CODE VISITOR PASS SECTION */
          <motion.div
            key="qr-section"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            <div className="lg:col-span-6 space-y-6">
              <Card className="border-border bg-card shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base font-bold">{t("Generate Office Entry Pass", "Generate Office Entry Pass")}</CardTitle>
                  <CardDescription className="text-3xs text-muted-foreground">
                    {t("Pre-register your visit to the Bangladesh Police Association Rajarbagh Headquarters for expedited QR code entry clearance.", "Pre-register your visit to the Bangladesh Police Association Rajarbagh Headquarters for expedited QR code entry clearance.")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleGenerateQR} className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="visitorName" className="text-xs font-semibold">{t("Visitor / Officer Name", "Visitor / Officer Name")}</Label>
                      <Input
                        id="visitorName"
                        type="text"
                        readOnly
                        value={user ? `${user.name} (${user.rank})` : ""}
                        className="rounded-xl border-border bg-muted/50 cursor-not-allowed font-semibold text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="purpose" className="text-xs font-semibold">{t("Purpose of Office Visit", "Purpose of Office Visit")}</Label>
                      <Input
                        id="purpose"
                        type="text"
                        placeholder={t("e.g. Welfare Audit, Gym Pass renewal, ID update", "e.g. Welfare Audit, Gym Pass renewal, ID update")}
                        value={visitorPurpose}
                        onChange={(e) => setVisitorPurpose(e.target.value)}
                        className="rounded-xl border-border text-xs focus-visible:ring-accent"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="targetOffice" className="text-xs font-semibold">{t("Visiting Office Department", "Visiting Office Department")}</Label>
                      <select
                        id="targetOffice"
                        value={officeSection}
                        onChange={(e) => setOfficeSection(e.target.value)}
                        className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground focus-visible:ring-accent"
                      >
                        <option value="General Secretary Office">{t("Office of General Secretary", "Office of General Secretary")}</option>
                        <option value="Welfare Services Desk">{t("Welfare Services Desk", "Welfare Services Desk")}</option>
                        <option value="Treasury & Accounts">{t("Treasury & Accounts", "Treasury & Accounts")}</option>
                        <option value="Library & Archiving">{t("Library & Archiving", "Library & Archiving")}</option>
                      </select>
                    </div>
                    <Button type="submit" className="w-full rounded-xl bg-primary hover:bg-primary/95 text-primary-foreground font-bold text-xs py-5">
                      <QrCode className="h-4 w-4 mr-1 shrink-0" />
                      {t("Generate QR Pass", "Generate QR Pass")}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-6 flex justify-center">
              <AnimatePresence mode="wait">
                {qrGenerated ? (
                  <motion.div
                    key="qr-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-80 border border-accent/25 rounded-3xl bg-card p-6 shadow-xl flex flex-col items-center space-y-5 text-center relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-2 bg-accent" />
                    
                    <div className="flex items-center gap-1">
                      <img src="/images/309563497_415511680752905_2210960597977463845_n.png" className="h-6 w-6 object-contain" alt="Logo" />
                      <span className="text-4xs font-bold uppercase tracking-wider text-muted-foreground">BDPA HEADQUARTERS</span>
                    </div>

                    {/* Simulated QR Code */}
                    <div className="h-44 w-44 bg-muted border border-border rounded-2xl flex items-center justify-center p-3 relative group">
                      <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=BPA-VISIT-QR-8492"
                        className="h-full w-full object-contain filter dark:invert"
                        alt="QR Code"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                        <span className="text-4xs font-bold text-white uppercase tracking-wider">{t("Scan at Turnstile", "Scan at Turnstile")}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 w-full">
                      <h4 className="font-extrabold text-sm text-foreground">{user?.name || "Member Name"}</h4>
                      <p className="text-3xs text-muted-foreground font-mono">ID: {user?.badgeNumber || "8492"} | {user?.rank}</p>
                    </div>

                    <div className="w-full border-t border-border pt-4 text-left space-y-2 text-3xs text-muted-foreground">
                      <div className="flex justify-between">
                        <span>{t("Destination", "Destination")}:</span>
                        <span className="font-semibold text-foreground">{officeSection}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t("Purpose", "Purpose")}:</span>
                        <span className="font-semibold text-foreground truncate max-w-[150px]">{visitorPurpose}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t("Access Status", "Access Status")}:</span>
                        <span className="text-accent font-extrabold uppercase flex items-center gap-0.5">
                          <ShieldCheck className="h-3.5 w-3.5 text-accent" />
                          {t("Approved", "Approved")}
                        </span>
                      </div>
                    </div>

                    <Button variant="outline" onClick={() => setQrGenerated(false)} className="w-full rounded-xl text-2xs h-9 border-border font-bold">
                      {t("Reset Gate Pass", "Reset Gate Pass")}
                    </Button>
                  </motion.div>
                ) : (
                  <div className="w-80 h-96 border border-dashed border-border rounded-3xl flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
                    <QrCode className="h-12 w-12 text-slate-400 mb-3 animate-pulse" />
                    <p className="text-xs font-bold">{t("No Entry Pass Active", "No Entry Pass Active")}</p>
                    <p className="text-3xs text-slate-400 mt-1">
                      {t("Submit the registration form on the left to generate your secure gate entrance QR code.", "Submit the registration form on the left to generate your secure gate entrance QR code.")}
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          /* ZOOM VIRTUAL MEETING SECTION */
          <motion.div
            key="zoom-section"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            <div className="lg:col-span-6 space-y-6">
              <Card className="border-border bg-card shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base font-bold">{t("Schedule Virtual Meeting (Zoom)", "Schedule Virtual Meeting (Zoom)")}</CardTitle>
                  <CardDescription className="text-3xs text-muted-foreground">
                    {t("Book a direct Zoom video conference slot with BPA administrative committee desks.", "Book a direct Zoom video conference slot with BPA administrative committee desks.")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleScheduleZoom} className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="meetingTopic" className="text-xs font-semibold">{t("Meeting Agenda / Topic", "Meeting Agenda / Topic")}</Label>
                      <Input
                        id="meetingTopic"
                        type="text"
                        placeholder={t("e.g. Welfare claim briefing, legal representation consultation", "e.g. Welfare claim briefing, legal representation consultation")}
                        value={newTopic}
                        onChange={(e) => setNewTopic(e.target.value)}
                        className="rounded-xl border-border text-xs focus-visible:ring-accent"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="meetingTime" className="text-xs font-semibold">{t("Meeting Date & Time", "Meeting Date & Time")}</Label>
                        <Input
                          id="meetingTime"
                          type="datetime-local"
                          value={newTime}
                          onChange={(e) => setNewTime(e.target.value)}
                          className="rounded-xl border-border text-xs focus-visible:ring-accent"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="meetingDept" className="text-xs font-semibold">{t("Target Department", "Target Department")}</Label>
                        <select
                          id="meetingDept"
                          value={newDept}
                          onChange={(e) => setNewDept(e.target.value)}
                          className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-xs font-semibold text-foreground focus-visible:ring-accent"
                        >
                          <option value="Administration">{t("Administration", "Administration")}</option>
                          <option value="Legal Defense Panel">{t("Legal Defense Panel", "Legal Defense Panel")}</option>
                          <option value="Welfare Audit Team">{t("Welfare Audit Team", "Welfare Audit Team")}</option>
                        </select>
                      </div>
                    </div>
                    <Button type="submit" className="w-full rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-xs py-5">
                      <Video className="h-4 w-4 mr-1 shrink-0" />
                      {t("Schedule Zoom Meeting", "Schedule Zoom Meeting")}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {zoomScheduled && (
                <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-500 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 shrink-0" />
                  <span>{t("Zoom Meeting Scheduled and API Link Created successfully!", "Zoom Meeting Scheduled and API Link Created successfully!")}</span>
                </div>
              )}
            </div>

            <div className="lg:col-span-6 space-y-4">
              <h3 className="text-sm font-bold text-foreground border-b border-border pb-2 flex items-center gap-1.5">
                <Video className="h-4 w-4 text-accent" />
                {t("Active Video Conferences", "Active Video Conferences")}
              </h3>
              
              <div className="space-y-3">
                {meetings.map((m) => (
                  <Card key={m.id} className="border-border bg-card shadow-xs">
                    <CardHeader className="p-4 pb-2 text-left">
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-3xs font-extrabold uppercase tracking-wider text-muted-foreground bg-muted px-2 py-0.5 rounded">
                          {m.id}
                        </span>
                        <span className="text-3xs font-extrabold uppercase tracking-wider text-accent bg-accent/5 px-2 py-0.5 rounded border border-accent/20">
                          {m.department}
                        </span>
                      </div>
                      <CardTitle className="text-xs font-bold text-foreground mt-2">{m.topic}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 text-3xs text-muted-foreground space-y-3 text-left">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                        <span>{m.time}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-muted/40 border border-border flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <span className="text-4xs text-slate-400 block font-semibold">ZOOM API LINK</span>
                          <span className="font-mono text-2xs truncate block text-primary font-bold mt-0.5">{m.zoomUrl}</span>
                        </div>
                        <a href={m.zoomUrl} target="_blank" rel="noopener noreferrer" className="shrink-0">
                          <Button size="sm" className="h-8 rounded-lg bg-accent text-accent-foreground font-bold text-4xs hover:bg-accent/90 flex items-center gap-0.5">
                            {t("Join", "Join")}
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
