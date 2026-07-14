"use client";

import * as React from "react";
import { useDemo, WelfareApplication } from "@/lib/demo-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HeartHandshake, History, FileText, CheckCircle, Clock, XCircle, Info, Upload } from "lucide-react";

export default function WelfarePage() {
  const { user, welfareApplications, submitWelfare } = useDemo();

  const [welfareType, setWelfareType] = React.useState<WelfareApplication["type"]>("Medical Grant");
  const [claimAmount, setClaimAmount] = React.useState("");
  const [claimDescription, setClaimDescription] = React.useState("");
  const [selectedApp, setSelectedApp] = React.useState<WelfareApplication | null>(null);

  const [formError, setFormError] = React.useState<string | null>(null);
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSuccessMsg(null);

    const amountNum = parseFloat(claimAmount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setFormError("Please enter a valid claim amount.");
      return;
    }

    if (!claimDescription || claimDescription.trim().length < 10) {
      setFormError("Please provide a detailed description (min 10 characters).");
      return;
    }

    submitWelfare(welfareType, amountNum, claimDescription);
    
    setSuccessMsg("Welfare claim application submitted successfully.");
    setClaimAmount("");
    setClaimDescription("");
    
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  // If selectedApp is null, default to first item if available
  const activeApp = selectedApp || welfareApplications[0] || null;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Welfare Fund & Assistance Claims</h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Apply for financial grants, educational scholarships, emergency disaster relief, or retirement benefits.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Panel: Apply Form (5 cols) */}
        <div className="lg:col-span-5">
          <Card className="border-border">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                <HeartHandshake className="h-4.5 w-4.5 text-accent" />
                Assistance Claim
              </CardTitle>
              <CardDescription className="text-3xs">
                Submit claims with supporting files. Board review takes 3-5 days.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleApply} noValidate>
              <CardContent className="space-y-4 pt-6">
                
                {formError && (
                  <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-2xs font-semibold rounded-xl flex items-center gap-2">
                    <XCircle className="h-4.5 w-4.5 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {successMsg && (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-2xs font-semibold rounded-xl flex items-center gap-2">
                    <CheckCircle className="h-4.5 w-4.5 shrink-0" />
                    <span>{successMsg}</span>
                  </div>
                )}

                {/* Welfare Type Selection */}
                <div className="space-y-1.5">
                  <Label htmlFor="welfareType" className="text-xs font-semibold">Assistance Category</Label>
                  <Select
                    value={welfareType}
                    onValueChange={(val) => setWelfareType((val || "Medical Grant") as WelfareApplication["type"])}
                  >
                    <SelectTrigger id="welfareType" className="rounded-xl h-11 border-border">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="Medical Grant">Medical Co-pay Grant</SelectItem>
                      <SelectItem value="Educational Scholarship">Educational Scholarship</SelectItem>
                      <SelectItem value="Emergency Relief">Emergency Disaster Relief</SelectItem>
                      <SelectItem value="Retirement Welfare">Retirement Welfare Fund</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Claim Amount */}
                <div className="space-y-1.5">
                  <Label htmlFor="amount" className="text-xs font-semibold">Requested Amount ($)</Label>
                  <Input
                    id="amount"
                    type="number"
                    required
                    placeholder="e.g. 1500"
                    value={claimAmount}
                    onChange={(e) => setClaimAmount(e.target.value)}
                    className="rounded-xl h-11 border-border focus-visible:ring-accent"
                  />
                </div>

                {/* Claim Description */}
                <div className="space-y-1.5">
                  <Label htmlFor="desc" className="text-xs font-semibold">Claim Rationale & Details</Label>
                  <textarea
                    id="desc"
                    required
                    rows={4}
                    value={claimDescription}
                    onChange={(e) => setClaimDescription(e.target.value)}
                    className="flex min-h-[90px] w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Provide details regarding medical condition, dependent tuition, or emergency context..."
                  />
                </div>

                {/* File Attachment Mockup */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Attach Supporting Documentation (Invoices, Transcripts)</Label>
                  <div className="border border-dashed border-border rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/30 transition-colors">
                    <Upload className="h-5 w-5 text-muted-foreground mb-1.5" />
                    <span className="text-[10px] font-bold text-foreground">Upload Files</span>
                    <span className="text-[8px] text-muted-foreground mt-0.5">PDF, JPG, PNG up to 10MB</span>
                  </div>
                </div>

              </CardContent>
              <CardFooter className="pt-2 pb-6 border-t border-border mt-4">
                <Button type="submit" className="rounded-xl h-11 w-full bg-primary hover:bg-primary/95 text-primary-foreground font-semibold text-xs shadow-md">
                  Submit Claim to Board
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>

        {/* Right Panel: Claims Log & Timeline Tracker (7 cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 gap-6">
          
          {/* Claims List Table card */}
          <Card className="border-border">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                <History className="h-4.5 w-4.5 text-accent" />
                Submitted Claims Log
              </CardTitle>
              <CardDescription className="text-3xs">
                Select a claim below to view its active approval timeline and executive notes.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-3 max-h-[220px] overflow-y-auto scrollbar-thin">
              {welfareApplications.length === 0 ? (
                <div className="text-center py-8 text-2xs text-muted-foreground">
                  You have not submitted any welfare claims.
                </div>
              ) : (
                welfareApplications.map((app) => {
                  const isActive = activeApp?.id === app.id;
                  return (
                    <div
                      key={app.id}
                      onClick={() => setSelectedApp(app)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex justify-between items-center text-left ${
                        isActive ? 'border-primary/50 bg-primary/5' : 'border-border bg-card/50 hover:bg-muted/30'
                      }`}
                    >
                      <div className="space-y-1">
                        <h4 className="font-extrabold text-xs text-foreground">{app.type}</h4>
                        <div className="flex gap-2 text-4xs text-muted-foreground font-bold uppercase tracking-wider">
                          <span>Submitted: {app.date}</span>
                          <span>•</span>
                          <span>Claim ID: {app.id}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-black text-foreground">${app.amount.toLocaleString()}</span>
                        <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          app.status === "Approved" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" :
                          app.status === "Rejected" ? "bg-red-500/10 text-red-500 border border-red-500/20" :
                          "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                        }`}>
                          {app.status}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>

          {/* Timeline status tracker (only show if activeApp exists) */}
          {activeApp && (
            <Card className="border-border">
              <CardHeader className="border-b border-border pb-3">
                <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Live Approval Timeline (Claim: {activeApp.id})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 text-left">
                <div className="relative pl-6 border-l border-border/80 space-y-6">
                  {activeApp.timeline.map((step, idx) => {
                    const isApproved = step.status === "Approved";
                    const isRejected = step.status === "Rejected";
                    const isPending = step.status === "Submitted" || step.status === "Under Review";

                    return (
                      <div key={idx} className="relative">
                        {/* Bullet Icon */}
                        <div className={`absolute -left-[31px] top-0 h-[10px] w-[10px] rounded-full border-2 ${
                          isApproved ? 'bg-emerald-500 border-emerald-500' :
                          isRejected ? 'bg-red-500 border-red-500' :
                          'bg-amber-500 border-amber-500'
                        }`} />
                        
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-extrabold text-foreground">{step.status}</span>
                            <span className="text-4xs text-muted-foreground">{step.date}</span>
                          </div>
                          <p className="text-3xs text-muted-foreground leading-normal">{step.comment}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

        </div>

      </div>

    </div>
  );
}
