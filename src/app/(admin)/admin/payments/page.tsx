"use client";

import * as React from "react";
import { useDemo } from "@/lib/demo-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, ShieldAlert, ShieldCheck, ListPlus, Send, History } from "lucide-react";

export default function AdminPaymentsPage() {
  const { invoices, issueInvoice, members } = useDemo();

  const [targetBadge, setTargetBadge] = React.useState("");
  const [invoiceDesc, setInvoiceDesc] = React.useState("");
  const [invoiceAmount, setInvoiceAmount] = React.useState("");

  const [formError, setFormError] = React.useState<string | null>(null);
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null);

  const getMemberName = (badge: string) => {
    return members.find(m => m.badge === badge)?.name || `Officer (Badge #${badge})`;
  };

  const handleIssueInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSuccessMsg(null);

    if (!targetBadge) return setFormError("Target member badge is required.");
    if (!invoiceDesc.trim()) return setFormError("Invoice description is required.");
    
    const amountNum = parseFloat(invoiceAmount);
    if (isNaN(amountNum) || amountNum <= 0) return setFormError("Please enter a valid billing amount.");

    // Call context
    issueInvoice(targetBadge, invoiceDesc, amountNum);

    setSuccessMsg(`Invoice successfully generated and sent to Officer ${getMemberName(targetBadge)} (Badge #${targetBadge}).`);
    setInvoiceDesc("");
    setInvoiceAmount("");
    setTargetBadge("");
    
    setTimeout(() => setSuccessMsg(null), 3500);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Billing Ledger & Invoicing</h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Monitor cleared payments, audit union dues, or issue customized invoices to member officers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Issue Invoice Form (5 cols) */}
        <div className="lg:col-span-5">
          <Card className="border-border">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                <ListPlus className="h-4.5 w-4.5 text-accent animate-pulse" />
                Issue Custom Invoice
              </CardTitle>
              <CardDescription className="text-3xs">
                Billing targets will see invoice and alerts on their dashboards immediately.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleIssueInvoice} noValidate>
              <CardContent className="space-y-4 pt-6 text-left">
                
                {formError && (
                  <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-2xs font-semibold rounded-xl flex items-center gap-2">
                    <ShieldAlert className="h-4.5 w-4.5 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {successMsg && (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-2xs font-semibold rounded-xl flex items-center gap-2">
                    <ShieldCheck className="h-4.5 w-4.5 shrink-0" />
                    <span>{successMsg}</span>
                  </div>
                )}

                {/* Target Officer Badge */}
                <div className="space-y-1.5">
                  <Label htmlFor="targetBadge" className="text-xs font-semibold">Bill Target (Select Officer)</Label>
                  <Select value={targetBadge} onValueChange={(val) => setTargetBadge(val || "")}>
                    <SelectTrigger id="targetBadge" className="rounded-xl h-10 border-border text-xs">
                      <SelectValue placeholder="Select target badge" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      {members.map((member) => (
                        <SelectItem key={member.badge} value={member.badge}>
                          {member.name} (Badge #{member.badge})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Invoice Description */}
                <div className="space-y-1.5">
                  <Label htmlFor="desc" className="text-xs font-semibold">Billing Description</Label>
                  <Input
                    id="desc"
                    type="text"
                    required
                    placeholder="e.g. Health Insurance Co-pay adjustment"
                    value={invoiceDesc}
                    onChange={(e) => setInvoiceDesc(e.target.value)}
                    className="rounded-xl h-10 border-border text-xs focus-visible:ring-accent"
                  />
                </div>

                {/* Amount */}
                <div className="space-y-1.5">
                  <Label htmlFor="amount" className="text-xs font-semibold">Billing Amount ($)</Label>
                  <Input
                    id="amount"
                    type="number"
                    required
                    placeholder="e.g. 150"
                    value={invoiceAmount}
                    onChange={(e) => setInvoiceAmount(e.target.value)}
                    className="rounded-xl h-10 border-border text-xs focus-visible:ring-accent"
                  />
                </div>

              </CardContent>
              <CardFooter className="pt-2 pb-6 border-t border-border mt-4">
                <Button type="submit" className="rounded-xl h-11 w-full bg-primary hover:bg-primary/95 text-primary-foreground font-semibold text-xs shadow-md">
                  Issue Invoice
                  <Send className="ml-2 h-4 w-4 shrink-0" />
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>

        {/* Right Side: Ledger history table (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="border-border">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                <History className="h-4.5 w-4.5 text-accent" />
                Invoices Ledger Records
              </CardTitle>
              <CardDescription className="text-3xs">
                Audit list of all billed dues, facility booking fees, or custom assessments.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 text-left">
              {invoices.length === 0 ? (
                <div className="text-center py-12 text-xs text-muted-foreground border-t border-border">
                  No billing invoices on record.
                </div>
              ) : (
                <div className="overflow-x-auto max-h-[420px] overflow-y-auto scrollbar-thin">
                  <table className="w-full text-2xs text-left">
                    <thead className="bg-muted/40 border-b border-border text-3xs font-extrabold uppercase tracking-wider text-muted-foreground select-none">
                      <tr>
                        <th className="p-4">Invoice ID</th>
                        <th className="p-4">Billed Officer</th>
                        <th className="p-4">Description / Date</th>
                        <th className="p-4">Amount</th>
                        <th className="p-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                      {invoices.map((inv) => (
                        <tr key={inv.id} className="hover:bg-muted/20 transition-colors">
                          <td className="p-4 font-extrabold text-foreground">{inv.id}</td>
                          <td className="p-4 font-semibold text-foreground/80">{getMemberName("8492")}</td>
                          <td className="p-4">
                            <div className="font-extrabold text-foreground">{inv.description}</div>
                            <div className="text-[10px] text-muted-foreground">Billed: {inv.date} • Due: {inv.dueDate}</div>
                          </td>
                          <td className="p-4 font-bold text-foreground">${inv.amount}</td>
                          <td className="p-4">
                            <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                              inv.status === "Paid" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" :
                              "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                            }`}>
                              {inv.status}
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

      </div>

    </div>
  );
}
