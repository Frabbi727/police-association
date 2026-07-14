"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDemo } from "@/lib/demo-context";
import { Briefcase, Users, DollarSign, Calendar, MapPin, CheckCircle, FileText, UploadCloud, Search, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

export default function JobsPage() {
  const { t, language } = useDemo();
  const [selectedJobId, setSelectedJobId] = React.useState<string | null>(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [applicantName, setApplicantName] = React.useState("");
  const [applicantRelation, setApplicantRelation] = React.useState("spouse");
  const [resumeUploaded, setResumeUploaded] = React.useState(false);
  const [appliedJobs, setAppliedJobs] = React.useState<string[]>([]);
  const [submitting, setSubmitting] = React.useState(false);

  const jobs = [
    {
      id: "JOB-901",
      title: t("Administrative Assistant", "Administrative Assistant"),
      dept: t("BDPA Central Office", "BDPA Central Office"),
      location: t("Rajarbagh Police Lines, Dhaka", "Rajarbagh Police Lines, Dhaka"),
      salary: t("৳২৫,০০০ - ৳৩৫,০০০ / Month", "৳২৫,০০০ - ৳৩৫,০০০ / Month"),
      type: t("Full-Time", "Full-Time"),
      eligibility: t("Wife/Son/Daughter of active BDPA members (HSC/Graduate)", "Wife/Son/Daughter of active BDPA members (HSC/Graduate)"),
      desc: t("Responsible for managing desk files, answering correspondence letters, maintaining membership ledgers, and organizing board schedules.", "Responsible for managing desk files, answering correspondence letters, maintaining membership ledgers, and organizing board schedules."),
      deadline: "2026-08-10"
    },
    {
      id: "JOB-902",
      title: t("Computer Operator & IT Support", "Computer Operator & IT Support"),
      dept: t("BDPA Tech Support Unit", "BDPA Tech Support Unit"),
      location: t("Rajarbagh Police Lines, Dhaka", "Rajarbagh Police Lines, Dhaka"),
      salary: t("৳৩০,০০০ - ৳৪০,০০০ / Month", "৳৩০,০০০ - ৳৪০,০০০ / Month"),
      type: t("Full-Time", "Full-Time"),
      eligibility: t("Police family members. Bachelor in CSE or diploma in IT required.", "Police family members. Bachelor in CSE or diploma in IT required."),
      desc: t("Maintain portal databases, assist members with login issues, run regular server backups, and resolve physical hardware faults at offices.", "Maintain portal databases, assist members with login issues, run regular server backups, and resolve physical hardware faults at offices."),
      deadline: "2026-08-05"
    },
    {
      id: "JOB-903",
      title: t("Security Supervisor (Showroom)", "Security Supervisor (Showroom)"),
      dept: t("BPA Partner Retail Group", "BPA Partner Retail Group"),
      location: t("Gulshan, Dhaka", "Gulshan, Dhaka"),
      salary: t("৳২২,০০০ - ৳২৮,০০০ / Month", "৳২২,০০০ - ৳২৮,০০০ / Month"),
      type: t("Shift-Based", "Shift-Based"),
      eligibility: t("Police dependents. Retired military or sports-background preferred.", "Police dependents. Retired military or sports-background preferred."),
      desc: t("Monitor access gates, coordinate daily floor guard rotations, inspect CCTV feeds, and run check audits on retail inventory logs.", "Monitor access gates, coordinate daily floor guard rotations, inspect CCTV feeds, and run check audits on retail inventory logs."),
      deadline: "2026-07-30"
    }
  ];

  const handleApply = (jobId: string) => {
    setSelectedJobId(jobId);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName.trim() || !resumeUploaded) return;

    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitting(false);

    if (selectedJobId) {
      setAppliedJobs([...appliedJobs, selectedJobId]);
    }
    setSelectedJobId(null);
    setApplicantName("");
    setResumeUploaded(false);
  };

  const filteredJobs = jobs.filter((j) =>
    j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    j.eligibility.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 text-left max-w-6xl mx-auto relative">
      {/* Page Header */}
      <div>
        <span className="text-3xs font-extrabold uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
          {t("Police Family Care", "Police Family Care")}
        </span>
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground mt-2">
          {t("Special Job Circulars", "Special Job Circulars")}
        </h1>
        <p className="text-2xs sm:text-xs text-muted-foreground mt-1">
          {t("Employment circulars specifically designated for police dependents and family members.", "Employment circulars specifically designated for police dependents and family members.")}
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          type="text"
          placeholder={t("Search by title, role or keywords...", "Search by title, role or keywords...")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-xl border-border pl-10 h-10 text-xs focus-visible:ring-accent"
        />
      </div>

      {/* Grid of Jobs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredJobs.map((j) => {
          const hasApplied = appliedJobs.includes(j.id);
          return (
            <Card key={j.id} className="border-border bg-card shadow-sm flex flex-col justify-between overflow-hidden relative">
              {hasApplied && (
                <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[9px] font-bold uppercase px-3 py-1 rounded-bl-xl flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" />
                  {t("Applied", "Applied")}
                </div>
              )}
              <CardHeader className="pb-3 text-left">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <CardTitle className="text-base font-bold text-foreground">{j.title}</CardTitle>
                    <CardDescription className="text-3xs font-semibold text-accent mt-0.5">{j.dept}</CardDescription>
                  </div>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 pt-3 text-3xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    <span>{j.location}</span>
                  </div>
                  <div className="flex items-center gap-1 font-semibold text-foreground">
                    <DollarSign className="h-3.5 w-3.5 text-accent" />
                    <span>{j.salary}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                    <span>{t("Deadline", "Deadline")}: {j.deadline}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-xl bg-muted/40 border border-border text-left">
                  <span className="text-4xs font-bold text-muted-foreground uppercase block tracking-wider">{t("Family Eligibility", "Family Eligibility")}</span>
                  <span className="text-3xs font-bold text-foreground mt-0.5 block">{j.eligibility}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed text-left">
                  {j.desc}
                </p>
              </CardContent>
              <CardFooter className="border-t border-border pt-4 bg-muted/10 flex justify-between items-center">
                <span className="text-3xs text-slate-400 font-semibold">{j.type}</span>
                <Button
                  disabled={hasApplied}
                  onClick={() => handleApply(j.id)}
                  className={`rounded-xl h-9 px-4 font-bold text-xs ${
                    hasApplied ? "bg-muted text-muted-foreground cursor-not-allowed border border-border" : "bg-primary hover:bg-primary/95 text-primary-foreground"
                  }`}
                >
                  {hasApplied ? t("Application Sent", "Application Sent") : t("Apply Now", "Apply Now")}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Application Form Overlay Drawer */}
      <AnimatePresence>
        {selectedJobId && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-card border border-border rounded-3xl p-6 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-accent" />
              <h3 className="text-base font-bold text-foreground">{t("Apply for Family Dependent Circular", "Apply for Family Dependent Circular")}</h3>
              <p className="text-3xs text-muted-foreground mt-0.5">ID: {selectedJobId}</p>

              <form onSubmit={handleFormSubmit} className="space-y-4 pt-4 text-left">
                <div className="space-y-1.5">
                  <Label htmlFor="applicantName" className="text-xs font-semibold">{t("Applicant Full Name", "Applicant Full Name")}</Label>
                  <Input
                    id="applicantName"
                    type="text"
                    placeholder="e.g. Nusrat Jahan"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="rounded-xl border-border text-xs focus-visible:ring-accent"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="relation" className="text-xs font-semibold">{t("Relationship to Police Member", "Relationship to Police Member")}</Label>
                  <select
                    id="relation"
                    value={applicantRelation}
                    onChange={(e) => setApplicantRelation(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground focus-visible:ring-accent"
                  >
                    <option value="spouse">{t("Wife / Spouse", "Wife / Spouse")}</option>
                    <option value="son">{t("Son", "Son")}</option>
                    <option value="daughter">{t("Daughter", "Daughter")}</option>
                    <option value="brother">{t("Brother", "Brother")}</option>
                    <option value="sister">{t("Sister", "Sister")}</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-semibold">{t("Upload Resume (PDF / DOCX)", "Upload Resume (PDF / DOCX)")}</Label>
                  <div
                    onClick={() => setResumeUploaded(true)}
                    className={`border border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
                      resumeUploaded ? "border-emerald-500 bg-emerald-500/5 text-emerald-500" : "border-border hover:bg-muted/40"
                    }`}
                  >
                    {resumeUploaded ? (
                      <div className="flex flex-col items-center gap-1 text-2xs font-semibold">
                        <CheckCircle className="h-6 w-6 text-emerald-500" />
                        <span>resume_file.pdf (Uploaded)</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-1.5 text-2xs text-muted-foreground">
                        <UploadCloud className="h-6 w-6 text-slate-400" />
                        <span>{t("Click to upload dependent CV file", "Click to upload dependent CV file")}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 pt-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setSelectedJobId(null);
                      setResumeUploaded(false);
                    }}
                    className="flex-1 rounded-xl h-10 text-xs font-bold border-border"
                  >
                    {t("Cancel", "Cancel")}
                  </Button>
                  <Button
                    type="submit"
                    disabled={submitting || !applicantName.trim() || !resumeUploaded}
                    className="flex-1 rounded-xl h-10 text-xs font-bold bg-primary hover:bg-primary/95 text-primary-foreground"
                  >
                    {submitting ? t("Submitting...", "Submitting...") : t("Submit Application", "Submit Application")}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
