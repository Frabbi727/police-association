"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Heart, CreditCard, ShieldCheck, Info, CheckCircle, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Zod Schema for Donation
const donationSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Donation amount must be greater than 0.",
  }),
  cardNumber: z.string().regex(/^\d{16}$/, { message: "Card number must be 16 digits." }),
  cardExpiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Expiry must be in MM/YY format." }),
  cardCvv: z.string().regex(/^\d{3,4}$/, { message: "CVC must be 3 or 4 digits." }),
  address: z.string().min(5, { message: "Please enter a valid street address." }),
  postalCode: z.string().min(3, { message: "Please enter a valid postal code." }),
  honeypot: z.string().max(0, { message: "Spam detected." }), // Honeypot field
});

type DonationInputs = z.infer<typeof donationSchema>;

export default function Donate() {
  const [selectedPreset, setSelectedPreset] = React.useState<number | null>(100);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [transactedAmount, setTransactedAmount] = React.useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<DonationInputs>({
    resolver: zodResolver(donationSchema),
    mode: "onBlur",
    defaultValues: {
      amount: "100",
      honeypot: "",
    },
  });

  const amountWatch = watch("amount");

  const presets = [25, 50, 100, 250, 500];

  const handlePresetSelect = (preset: number) => {
    setSelectedPreset(preset);
    setValue("amount", preset.toString(), { shouldValidate: true });
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSelectedPreset(null);
    setValue("amount", val, { shouldValidate: true });
  };

  const onSubmit = async (data: DonationInputs) => {
    // Simulate transaction delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setTransactedAmount(data.amount);
    setIsSuccess(true);
  };

  return (
    <div className="flex flex-col w-full bg-background min-h-screen">
      {/* Header */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-border bg-card/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto max-w-4xl text-center space-y-4">
          <span className="text-2xs font-bold uppercase tracking-widest text-accent">Support Our Mission</span>
          <h1 className="text-3xl font-extrabold sm:text-5xl tracking-tight text-foreground">
            Donation & Support Portal
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Your contributions directly fund our welfare program for officers disabled in the line of duty and our neighborhood outreach initiatives.
          </p>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          {isSuccess ? (
            /* Success State Overlay */
            <div className="max-w-2xl mx-auto p-8 sm:p-12 rounded-3xl border border-border bg-card shadow-lg text-center space-y-6 animate-in fade-in zoom-in duration-300">
              <div className="inline-flex p-4 rounded-full bg-primary/10 text-accent mb-2">
                <CheckCircle className="h-12 w-12 text-accent" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">Thank You for Your Support!</h2>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
                We have successfully processed your tax-deductible donation of{" "}
                <span className="font-bold text-foreground">${Number(transactedAmount).toFixed(2)}</span>.
                A confirmation receipt has been sent to your email.
              </p>
              <div className="p-4 rounded-2xl bg-muted text-3xs text-muted-foreground max-w-sm mx-auto space-y-2 border border-border">
                <p className="font-bold uppercase tracking-wider text-foreground">Transaction Receipt Summary</p>
                <div className="flex justify-between">
                  <span>Merchant:</span>
                  <span>Metropolitan Police Welfare Fund</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="text-accent font-semibold uppercase">Completed</span>
                </div>
                <div className="flex justify-between">
                  <span>Receipt ID:</span>
                  <span>MPA-TX-998{Math.floor(Math.random() * 900) + 100}</span>
                </div>
              </div>
              <div className="pt-4">
                <Button
                  onClick={() => setIsSuccess(false)}
                  className="rounded-xl bg-primary hover:bg-primary/95 text-primary-foreground font-bold px-8 shadow-md"
                >
                  Make Another Contribution
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-start">
              {/* Informative / Trust Column */}
              <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
                <div className="space-y-4">
                  <h2 className="text-xl font-bold tracking-tight">Charity Fund Accountability</h2>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    The Metropolitan Police Association Welfare Fund is a registered 501(c)(3) charitable organization. 100% of community donations go directly toward member wellness, fallen officer memorials, and local programs.
                  </p>
                </div>

                <div className="p-6 rounded-2xl border border-border bg-card space-y-4 shadow-inner">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-accent" />
                    Secure Billing Details
                  </h3>
                  <p className="text-2xs text-muted-foreground leading-relaxed">
                    Our billing platform is PCI-DSS Compliant. Your credit card information is encrypted in transit and never stored on our local servers.
                  </p>
                </div>

                <div className="p-6 rounded-2xl border border-accent/20 bg-accent/5 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-2">
                    <Info className="h-4 w-4 text-accent shrink-0" />
                    Tax Deduction Eligibility
                  </h3>
                  <p className="text-2xs text-muted-foreground leading-relaxed">
                    Donations are fully tax-deductible. If you require a formal written copy of your receipt for tax deduction records, please email our treasury department.
                  </p>
                </div>
              </div>

              {/* Form Input Column */}
              <div className="lg:col-span-7 rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-lg">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                  {/* Honeypot field (hidden from screen reader and user) */}
                  <div className="absolute overflow-hidden h-0 w-0" aria-hidden="true">
                    <label htmlFor="honeypot">Leave blank</label>
                    <input id="honeypot" tabIndex={-1} {...register("honeypot")} />
                  </div>

                  {/* Step 1: Donation Amount */}
                  <div className="space-y-4">
                    <Label className="text-sm font-bold uppercase text-foreground">Select Contribution Amount</Label>
                    <div className="grid grid-cols-5 gap-2">
                      {presets.map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => handlePresetSelect(preset)}
                          className={`rounded-xl py-3 text-xs font-bold border transition-all ${
                            selectedPreset === preset
                              ? "bg-accent border-accent text-accent-foreground shadow-md shadow-accent/15"
                              : "border-border bg-muted/40 hover:bg-muted"
                          }`}
                        >
                          ${preset}
                        </button>
                      ))}
                    </div>

                    <div className="relative mt-2">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground">$</span>
                      <Input
                        type="text"
                        placeholder="Custom Amount"
                        value={selectedPreset === null ? amountWatch : ""}
                        onChange={handleAmountChange}
                        className="rounded-xl pl-8 h-12 border-border font-semibold text-sm focus-visible:ring-accent"
                      />
                    </div>
                    {errors.amount && (
                      <p className="text-2xs text-destructive font-medium ml-1 flex items-center gap-1">
                        <ShieldAlert className="h-3 w-3 shrink-0" />
                        {errors.amount.message}
                      </p>
                    )}
                  </div>

                  {/* Step 2: Personal Information */}
                  <div className="space-y-4 border-t border-border pt-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Donor Information</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="fullName" className="text-xs font-semibold text-foreground">Full Name</Label>
                        <Input
                          id="fullName"
                          type="text"
                          autoComplete="name"
                          placeholder="Jane Doe"
                          className="rounded-xl h-11 border-border focus-visible:ring-primary text-sm"
                          {...register("fullName")}
                        />
                        {errors.fullName && (
                          <p className="text-2xs text-destructive font-medium ml-1 flex items-center gap-1">
                            <ShieldAlert className="h-3 w-3 shrink-0" />
                            {errors.fullName.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-xs font-semibold text-foreground">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          autoComplete="email"
                          placeholder="jane@example.com"
                          className="rounded-xl h-11 border-border focus-visible:ring-primary text-sm"
                          {...register("email")}
                        />
                        {errors.email && (
                          <p className="text-2xs text-destructive font-medium ml-1 flex items-center gap-1">
                            <ShieldAlert className="h-3 w-3 shrink-0" />
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Payment details */}
                  <div className="space-y-4 border-t border-border pt-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <CreditCard className="h-4 w-4" />
                      Card Details
                    </h3>

                    <div className="space-y-1.5">
                      <Label htmlFor="cardNumber" className="text-xs font-semibold text-foreground">Card Number</Label>
                      <Input
                        id="cardNumber"
                        type="text"
                        maxLength={16}
                        autoComplete="cc-number"
                        placeholder="4111 2222 3333 4444"
                        className="rounded-xl h-11 border-border focus-visible:ring-primary font-mono text-sm tracking-widest"
                        {...register("cardNumber")}
                      />
                      {errors.cardNumber && (
                        <p className="text-2xs text-destructive font-medium ml-1 flex items-center gap-1">
                          <ShieldAlert className="h-3 w-3 shrink-0" />
                          {errors.cardNumber.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="cardExpiry" className="text-xs font-semibold text-foreground">Expiry (MM/YY)</Label>
                        <Input
                          id="cardExpiry"
                          type="text"
                          maxLength={5}
                          autoComplete="cc-exp"
                          placeholder="12/28"
                          className="rounded-xl h-11 border-border focus-visible:ring-primary font-mono text-sm tracking-wide text-center"
                          {...register("cardExpiry")}
                        />
                        {errors.cardExpiry && (
                          <p className="text-2xs text-destructive font-medium ml-1 flex items-center gap-1">
                            <ShieldAlert className="h-3 w-3 shrink-0" />
                            {errors.cardExpiry.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="cardCvv" className="text-xs font-semibold text-foreground">CVC / CVV</Label>
                        <Input
                          id="cardCvv"
                          type="text"
                          maxLength={4}
                          autoComplete="cc-csc"
                          placeholder="385"
                          className="rounded-xl h-11 border-border focus-visible:ring-primary font-mono text-sm tracking-wide text-center"
                          {...register("cardCvv")}
                        />
                        {errors.cardCvv && (
                          <p className="text-2xs text-destructive font-medium ml-1 flex items-center gap-1">
                            <ShieldAlert className="h-3 w-3 shrink-0" />
                            {errors.cardCvv.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Step 4: Billing Address */}
                  <div className="space-y-4 border-t border-border pt-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Billing Address</h3>

                    <div className="space-y-1.5">
                      <Label htmlFor="address" className="text-xs font-semibold text-foreground">Street Address</Label>
                      <Input
                        id="address"
                        type="text"
                        autoComplete="street-address"
                        placeholder="123 Main St"
                        className="rounded-xl h-11 border-border focus-visible:ring-primary text-sm"
                        {...register("address")}
                      />
                      {errors.address && (
                        <p className="text-2xs text-destructive font-medium ml-1 flex items-center gap-1">
                          <ShieldAlert className="h-3 w-3 shrink-0" />
                          {errors.address.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="postalCode" className="text-xs font-semibold text-foreground">ZIP / Postal Code</Label>
                      <Input
                        id="postalCode"
                        type="text"
                        autoComplete="postal-code"
                        placeholder="10001"
                        className="rounded-xl h-11 border-border focus-visible:ring-primary text-sm"
                        {...register("postalCode")}
                      />
                      {errors.postalCode && (
                        <p className="text-2xs text-destructive font-medium ml-1 flex items-center gap-1">
                          <ShieldAlert className="h-3 w-3 shrink-0" />
                          {errors.postalCode.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-xl h-12 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-sm shadow-lg shadow-accent/20 flex items-center justify-center gap-2 pt-1"
                  >
                    <Heart className="h-4 w-4 fill-current shrink-0" />
                    {isSubmitting
                      ? "Processing Securely..."
                      : `Donate $${isNaN(Number(amountWatch)) || Number(amountWatch) <= 0 ? "0.00" : Number(amountWatch).toFixed(2)}`}
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
