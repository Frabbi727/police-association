"use client";

import * as React from "react";
import { useDemo, WelfareApplication } from "@/lib/demo-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HeartHandshake, ShieldCheck, ShieldAlert, CheckCircle2, XCircle, Clock } from "lucide-react";

export default function AdminWelfarePage() {
  const { welfareApplications, reviewWelfare, members } = useDemo();

  const [selectedApp, setSelectedApp] = React.useState<WelfareApplication | null>(null);
  const [reviewComment, setReviewComment] = React.useState("");
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null);

  const getMemberName = (badge: string) => {
    // For demo simplicity, we assume John Doe submitted the applications since they are linked to the main mock user
    return members.find(m => m.badge === "8492")?.name || "Officer John Doe";
  };

  const handleReview = (id: string, status: "Approved" | "Rejected") => {
    if (!reviewComment.trim()) {
      alert("Please provide review notes or comments.");
      return;
    }

    reviewWelfare(id, status, reviewComment);
    
    setSuccessMsg(`Application ${id} status successfully set to: ${status}.`);
    setReviewComment("");
    setSelectedApp(null);
    
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  // If selectedApp is null, default to first pending app
  const activeApp = selectedApp || welfareApplications.find(w => w.status === "Pending") || welfareApplications[0] || null;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Welfare Assistance Review</h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Process welfare grants, educational scholarships, and emergency relief assistance claims submitted by officers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Claims List (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {successMsg && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-2xs font-semibold rounded-xl flex items-center gap-2">
              <ShieldCheck className="h-4.5 w-4.5 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <Card className="border-border">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                <HeartHandshake className="h-4.5 w-4.5 text-accent animate-pulse" />
                Submitted Welfare Claims
              </CardTitle>
              <CardDescription className="text-3xs">
                Review submitted claims. Board approval triggers auto-issuance of funds.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 text-left">
              {welfareApplications.length === 0 ? (
                <div className="text-center py-12 text-xs text-muted-foreground">
                  No claims submitted for review.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-2xs text-left">
                    <thead className="bg-muted/40 border-b border-border text-3xs font-extrabold uppercase tracking-wider text-muted-foreground select-none">
                      <tr>
                        <th className="p-4">Claim ID</th>
                        <th className="p-4">Applicant</th>
                        <th className="p-4">Category / Date</th>
                        <th className="p-4">Amount</th>
                        <th className="p-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                      {welfareApplications.map((app) => (
                        <tr
                          key={app.id}
                          onClick={() => { setSelectedApp(app); setReviewComment(""); }}
                          className={`hover:bg-muted/20 cursor-pointer transition-colors ${
                            activeApp?.id === app.id ? "bg-primary/5 font-semibold" : ""
                          }`}
                        >
                          <td className="p-4 font-extrabold text-foreground">{app.id}</td>
                          <td className="p-4">
                            <div className="font-semibold text-foreground/80">{getMemberName("8492")}</div>
                            <div className="text-[10px] text-muted-foreground">Badge: #8492</div>
                          </td>
                          <td className="p-4">
                            <div className="font-extrabold text-foreground">{app.type}</div>
                            <div className="text-[10px] text-muted-foreground">Date: {app.date}</div>
                          </td>
                          <td className="p-4 font-bold text-foreground">${app.amount.toLocaleString()}</td>
                          <td className="p-4">
                            <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                              app.status === "Approved" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" :
                              app.status === "Rejected" ? "bg-red-500/10 text-red-500 border border-red-500/20" :
                              "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                            }`}>
                              {app.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Claim details & Review Form (5 cols) */}
        <div className="lg:col-span-5">
          {activeApp ? (
            <Card className="border-border">
              <CardHeader className="border-b border-border pb-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm font-bold">Review Claim: {activeApp.id}</CardTitle>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    activeApp.status === "Approved" ? "bg-emerald-500/10 text-emerald-500" :
                    activeApp.status === "Rejected" ? "bg-red-500/10 text-red-500" :
                    "bg-amber-500/10 text-amber-500"
                  }`}>
                    {activeApp.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-6 text-left">
                
                {/* Applicant Info */}
                <div className="grid grid-cols-2 gap-4 text-3xs border-b border-border/50 pb-3">
                  <div>
                    <span className="text-muted-foreground block font-bold">Applicant Officer:</span>
                    <span className="font-extrabold text-foreground">{getMemberName("8492")}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block font-bold">Requested Amount:</span>
                    <span className="font-extrabold text-accent">${activeApp.amount.toLocaleString()}</span>
                  </div>
                </div>

                {/* Justification details */}
                <div className="space-y-1">
                  <span className="text-3xs font-bold text-muted-foreground uppercase tracking-wider">Justification Rationale</span>
                  <div className="p-3 bg-muted/40 border border-border/50 rounded-xl text-3xs text-muted-foreground leading-normal">
                    {activeApp.description}
                  </div>
                </div>

                {/* Status Timeline */}
                <div className="space-y-2 border-t border-border/40 pt-3">
                  <span className="text-3xs font-bold text-muted-foreground uppercase tracking-wider block">Timeline History</span>
                  <div className="space-y-2 max-h-[100px] overflow-y-auto pr-1">
                    {activeApp.timeline.map((step, index) => (
                      <div key={index} className="flex gap-2 items-start text-3xs border-l-2 border-border/60 pl-3 py-0.5">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-foreground">{step.status} ({step.date}): </span>
                          <span className="text-muted-foreground">{step.comment}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Decision review form (only if pending) */}
                {activeApp.status === "Pending" ? (
                  <div className="space-y-4 border-t border-border/50 pt-4 mt-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="reviewComment" className="text-xs font-semibold">Executive Board Review Notes</Label>
                      <textarea
                        id="reviewComment"
                        required
                        rows={3}
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        className="flex min-h-[70px] w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Provide details regarding medical co-pay limits or scholarship qualifications..."
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        type="button"
                        className="rounded-xl h-10 bg-emerald-500 hover:bg-emerald-500/90 text-slate-950 font-bold gap-1 text-3xs"
                        onClick={() => handleReview(activeApp.id, "Approved")}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Approve Grant
                      </Button>
                      <Button
                        type="button"
                        className="rounded-xl h-10 bg-red-500 hover:bg-red-500/90 text-white font-bold gap-1 text-3xs"
                        onClick={() => handleReview(activeApp.id, "Rejected")}
                      >
                        <XCircle className="h-3.5 w-3.5" />
                        Reject Claim
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-muted/40 border border-border/40 rounded-xl text-3xs text-center text-muted-foreground font-semibold">
                    This claim is closed. Further edits require auditing credentials.
                  </div>
                )}

              </CardContent>
            </Card>
          ) : (
            <div className="text-center py-12 border border-dashed border-border rounded-3xl text-xs text-muted-foreground bg-card/25">
              Select a submitted application to start auditing claims.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
