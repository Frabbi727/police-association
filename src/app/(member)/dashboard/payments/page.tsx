"use client";

import * as React from "react";
import { useDemo, Invoice } from "@/lib/demo-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CreditCard, CheckCircle2, History, Printer, ShieldAlert, BadgeInfo } from "lucide-react";

export default function PaymentsPage() {
  const { user, invoices, payInvoice } = useDemo();
  
  const [selectedInvoice, setSelectedInvoice] = React.useState<Invoice | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = React.useState(false);
  const [activeReceipt, setActiveReceipt] = React.useState<Invoice | null>(null);

  const [loading, setLoading] = React.useState(false);
  const [cardError, setCardError] = React.useState<string | null>(null);
  const [cardNumber, setCardNumber] = React.useState("");
  const [cardExpiry, setCardExpiry] = React.useState("");
  const [cardCvv, setCardCvv] = React.useState("");

  const unpaidInvoices = invoices.filter((i) => i.status === "Unpaid");
  const paidInvoices = invoices.filter((i) => i.status === "Paid");

  const openCheckout = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setCardNumber("");
    setCardExpiry("");
    setCardCvv("");
    setCardError(null);
    setIsCheckoutOpen(true);
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setCardError(null);

    if (!selectedInvoice) return;
    if (cardNumber.replace(/\s+/g, "").length < 16) {
      setCardError("Please enter a valid 16-digit card number.");
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) {
      setCardError("Expiry date must be in MM/YY format.");
      return;
    }
    if (cardCvv.length < 3) {
      setCardError("CVV must be at least 3 digits.");
      return;
    }

    setLoading(true);
    const success = await payInvoice(selectedInvoice.id, cardNumber);
    setLoading(false);
    
    if (success) {
      setIsCheckoutOpen(false);
      // Automatically open receipt
      const updatedInv = { ...selectedInvoice, status: "Paid" as const, paidDate: new Date().toISOString().split("T")[0] };
      setActiveReceipt(updatedInv);
      setIsReceiptOpen(true);
    } else {
      setCardError("Payment processing failed. Try another card.");
    }
  };

  const openReceipt = (invoice: Invoice) => {
    setActiveReceipt(invoice);
    setIsReceiptOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Invoices & Dues Payments</h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Review pending fees, voluntary union contributions, or facilities charges, and make secure credit card payments.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Unpaid Invoices (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="border-border">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                <CreditCard className="h-4.5 w-4.5 text-accent animate-pulse" />
                Unpaid Invoices
              </CardTitle>
              <CardDescription className="text-3xs">
                Invoices must be settled prior to reservation confirmation or expiration.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              {unpaidInvoices.length === 0 ? (
                <div className="text-center py-12 text-2xs text-muted-foreground">
                  Excellent! You have no unpaid invoices on record.
                </div>
              ) : (
                unpaidInvoices.map((inv) => (
                  <div
                    key={inv.id}
                    className="p-4 rounded-2xl border border-border bg-card/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-left"
                  >
                    <div className="space-y-1">
                      <h4 className="font-extrabold text-xs text-foreground">{inv.description}</h4>
                      <div className="flex gap-2 text-4xs text-muted-foreground font-bold uppercase tracking-wider">
                        <span>Invoice Date: {inv.date}</span>
                        <span>•</span>
                        <span className="text-amber-500">Due: {inv.dueDate}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-5">
                      <div className="text-left sm:text-right">
                        <span className="text-[10px] text-muted-foreground block font-bold">Total Amount</span>
                        <span className="text-xs font-black text-foreground">${inv.amount}</span>
                      </div>
                      
                      <Button
                        size="sm"
                        className="rounded-lg text-3xs font-bold h-8 px-4 bg-primary hover:bg-primary/95 text-primary-foreground"
                        onClick={() => openCheckout(inv)}
                      >
                        Pay Invoice
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Paid History (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="border-border">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                <History className="h-4.5 w-4.5 text-accent" />
                Payment History
              </CardTitle>
              <CardDescription className="text-3xs">
                History of cleared dues and official downloadable receipts.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-3 max-h-[300px] overflow-y-auto scrollbar-thin">
              {paidInvoices.length === 0 ? (
                <div className="text-center py-8 text-2xs text-muted-foreground">
                  No payment records found.
                </div>
              ) : (
                paidInvoices.map((inv) => (
                  <div
                    key={inv.id}
                    className="p-3 rounded-2xl border border-border bg-card/40 flex justify-between items-center text-left"
                  >
                    <div className="space-y-0.5">
                      <h4 className="font-extrabold text-[11px] text-foreground leading-snug line-clamp-1">{inv.description}</h4>
                      <p className="text-[9px] text-muted-foreground">Paid: {inv.paidDate} • ID: {inv.id}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] font-black text-foreground">${inv.amount}</span>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="rounded-lg h-8 w-8 text-muted-foreground border border-border hover:bg-muted"
                        onClick={() => openReceipt(inv)}
                        title="View Receipt"
                      >
                        <Printer className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

      </div>

      {/* SECURE CHECKOUT DIALOG MODAL */}
      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent className="bg-card border-border rounded-3xl max-w-sm w-[90%] p-6">
          <DialogHeader className="space-y-1.5 text-center pb-4 border-b border-border">
            <DialogTitle className="text-base font-bold flex items-center justify-center gap-1.5">
              <CreditCard className="h-5 w-5 text-accent" />
              Secure Checkout
            </DialogTitle>
            <DialogDescription className="text-3xs">
              Securely billing details. Encryption standard CJIS-level 2.
            </DialogDescription>
          </DialogHeader>

          {selectedInvoice && (
            <form onSubmit={handlePayment} noValidate className="space-y-4 pt-4">
              
              {/* Payment Summary */}
              <div className="p-3 bg-muted/40 border border-border/50 rounded-xl flex items-center justify-between text-2xs">
                <span className="text-muted-foreground font-semibold">Payment For:</span>
                <span className="font-bold text-foreground text-right max-w-[150px] truncate" title={selectedInvoice.description}>
                  {selectedInvoice.description}
                </span>
              </div>

              {cardError && (
                <div className="p-2.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-3xs font-semibold flex items-center gap-1.5">
                  <ShieldAlert className="h-4 w-4 shrink-0" />
                  <span>{cardError}</span>
                </div>
              )}

              {/* Cardholder Name */}
              <div className="space-y-1">
                <Label htmlFor="cc-name" className="text-3xs font-bold uppercase tracking-wider text-muted-foreground">Cardholder Name</Label>
                <Input
                  id="cc-name"
                  type="text"
                  required
                  autoComplete="cc-name"
                  className="rounded-xl h-10 border-border text-xs focus-visible:ring-accent"
                  defaultValue={user?.name || ""}
                />
              </div>

              {/* Card Number */}
              <div className="space-y-1">
                <Label htmlFor="cc-number" className="text-3xs font-bold uppercase tracking-wider text-muted-foreground">Credit Card Number</Label>
                <Input
                  id="cc-number"
                  type="text"
                  required
                  autoComplete="cc-number"
                  placeholder="4111 2222 3333 4444"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="rounded-xl h-10 border-border text-xs focus-visible:ring-accent"
                />
              </div>

              {/* Expiry & CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="cc-exp" className="text-3xs font-bold uppercase tracking-wider text-muted-foreground">Expiration Date</Label>
                  <Input
                    id="cc-exp"
                    type="text"
                    required
                    autoComplete="cc-exp"
                    placeholder="MM/YY"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="rounded-xl h-10 border-border text-xs focus-visible:ring-accent"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="cc-csc" className="text-3xs font-bold uppercase tracking-wider text-muted-foreground">Security Code (CVV)</Label>
                  <Input
                    id="cc-csc"
                    type="password"
                    required
                    autoComplete="cc-csc"
                    placeholder="123"
                    maxLength={4}
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    className="rounded-xl h-10 border-border text-xs focus-visible:ring-accent"
                  />
                </div>
              </div>

              {/* Submit Pay CTA */}
              <Button
                type="submit"
                disabled={loading}
                className="rounded-xl h-11 w-full bg-accent hover:bg-accent/90 text-accent-foreground font-extrabold text-xs shadow-md mt-2"
              >
                {loading ? "Authorizing Dues..." : `Pay $${selectedInvoice.amount.toFixed(2)}`}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* OFFICIAL RECEIPT VIEW DIALOG */}
      <Dialog open={isReceiptOpen} onOpenChange={setIsReceiptOpen}>
        <DialogContent className="bg-card border-border rounded-3xl max-w-sm w-[90%] p-6">
          <div className="space-y-6 text-center select-none">
            
            {/* Header Stamp */}
            <div className="space-y-2 border-b border-dashed border-border pb-4 flex flex-col items-center">
              <div className="h-10 w-10 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-black text-foreground uppercase tracking-wider">Payment Clarified</h3>
              <p className="text-4xs text-muted-foreground uppercase font-bold tracking-widest">Official Transaction Receipt</p>
            </div>

            {/* Receipt Details List */}
            {activeReceipt && (
              <div className="space-y-3 text-2xs">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-semibold">Receipt Number:</span>
                  <span className="font-extrabold text-foreground">{activeReceipt.id.replace("INV-", "REC-")}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-semibold">Payment For:</span>
                  <span className="font-extrabold text-foreground truncate max-w-[160px]">{activeReceipt.description}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-semibold">Payment Date:</span>
                  <span className="font-extrabold text-foreground">{activeReceipt.paidDate || activeReceipt.date}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-semibold">Charged Badge:</span>
                  <span className="font-extrabold text-foreground">#{user?.badgeNumber}</span>
                </div>
                <div className="border-t border-dashed border-border pt-3 flex justify-between items-center text-sm font-black">
                  <span className="text-foreground">Total Charged:</span>
                  <span className="text-accent">${activeReceipt.amount.toFixed(2)}</span>
                </div>
              </div>
            )}

            {/* Print trigger mockup */}
            <div className="pt-2 border-t border-border flex justify-between gap-4">
              <Button
                variant="outline"
                className="rounded-xl flex-1 text-3xs font-bold h-9 border-border"
                onClick={() => setIsReceiptOpen(false)}
              >
                Close Receipt
              </Button>
              <Button
                className="rounded-xl flex-1 bg-primary text-primary-foreground text-3xs font-bold h-9 flex items-center justify-center gap-1 shadow"
                onClick={() => { alert("Receipt print sequence triggered (mockup)."); }}
              >
                <Printer className="h-3.5 w-3.5" />
                Print Receipt
              </Button>
            </div>
            
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
