"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, ShieldCheck, Clock, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactPage() {
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormErrors({});
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    const errors: Record<string, string> = {};
    if (!name || name.trim().length < 2) errors.name = "Full name is required.";
    if (!email || !/\S+@\S+\.\S+/.test(email)) errors.email = "Please enter a valid email.";
    if (!message || message.trim().length < 10) errors.message = "Message must be at least 10 characters.";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setLoading(true);
    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col w-full bg-background min-h-screen">
      {/* Page Header */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-border bg-card/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto max-w-4xl text-center space-y-4">
          <span className="text-2xs font-bold uppercase tracking-widest text-accent">Get in Touch</span>
          <h1 className="text-3xl font-extrabold sm:text-5xl tracking-tight text-foreground">
            Contact the Association
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Have questions regarding membership, representation, or benefits? We are here to support you.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Contact Information (4 cols) */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-extrabold tracking-tight">Association Headquarters</h2>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Our administrative offices are open Monday through Friday, 8:30 AM to 5:00 PM. For emergency legal representation or critical incident support, members should call the emergency hotline.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: MapPin,
                    title: "Physical Address",
                    desc: "4820 Liberty Ave, Sector 4, Metro City, MC 10023",
                  },
                  {
                    icon: Phone,
                    title: "Administrative Phone",
                    desc: "(555) 019-3820 (Toll-Free: 1-800-555-4MPA)",
                  },
                  {
                    icon: Phone,
                    title: "24/7 Critical Incident Support",
                    desc: "(555) 911-MPA1 (Badge verification required)",
                    accent: true,
                  },
                  {
                    icon: Mail,
                    title: "General Inquiries Email",
                    desc: "support@metro-pa.org",
                  },
                  {
                    icon: Clock,
                    title: "Office Hours",
                    desc: "Mon - Fri: 8:30 AM - 5:00 PM",
                  },
                ].map((item, idx) => (
                  <div key={idx} className={`flex gap-4 p-4 rounded-2xl border ${item.accent ? 'border-accent/40 bg-accent/5' : 'border-border bg-card/50'}`}>
                    <div className={`p-2.5 rounded-xl ${item.accent ? 'bg-accent/25 text-accent' : 'bg-muted text-muted-foreground'}`}>
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-foreground">{item.title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form (7 cols) */}
            <div className="lg:col-span-7">
              <Card className="border-border shadow-xl backdrop-blur-sm bg-card/90">
                <CardHeader className="pb-6 border-b border-border">
                  <CardTitle className="text-xl font-bold tracking-tight">Send a Message</CardTitle>
                  <CardDescription className="text-2xs text-muted-foreground">
                    Please use the form below to contact our staff. Officers requiring legal representation should call the emergency hotline directly.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  {submitted ? (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex flex-col items-center justify-center text-center p-8 space-y-4"
                    >
                      <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                        <ShieldCheck className="h-8 w-8 text-accent" />
                      </div>
                      <h3 className="text-lg font-bold">Message Received Successfully</h3>
                      <p className="text-xs text-muted-foreground max-w-sm">
                        Thank you for contacting us. An association representative will review your message and reply via email within 24 to 48 hours.
                      </p>
                      <Button variant="outline" className="rounded-xl mt-4" onClick={() => setSubmitted(false)}>
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} noValidate className="space-y-4">
                      {/* Name */}
                      <div className="space-y-1.5">
                        <Label htmlFor="name" className="text-xs font-semibold">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          required
                          className="rounded-xl h-11 border-border focus-visible:ring-accent"
                          placeholder="Officer John Doe"
                        />
                        {formErrors.name && (
                          <p className="text-2xs text-destructive font-medium flex items-center gap-1">
                            <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
                            {formErrors.name}
                          </p>
                        )}
                      </div>

                      {/* Contact Info (Row on Desktop) */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="email" className="text-xs font-semibold">Email Address</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="rounded-xl h-11 border-border focus-visible:ring-accent"
                            placeholder="john.doe@example.com"
                          />
                          {formErrors.email && (
                            <p className="text-2xs text-destructive font-medium flex items-center gap-1">
                              <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
                              {formErrors.email}
                            </p>
                          )}
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="badge" className="text-xs font-semibold">Badge Number (Optional)</Label>
                          <Input
                            id="badge"
                            name="badge"
                            type="text"
                            className="rounded-xl h-11 border-border focus-visible:ring-accent"
                            placeholder="e.g. 8492"
                          />
                        </div>
                      </div>

                      {/* Subject */}
                      <div className="space-y-1.5">
                        <Label htmlFor="subject" className="text-xs font-semibold">Subject</Label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          required
                          className="rounded-xl h-11 border-border focus-visible:ring-accent"
                          placeholder="e.g. Membership benefits, legal coverage questions"
                        />
                      </div>

                      {/* Message */}
                      <div className="space-y-1.5">
                        <Label htmlFor="message" className="text-xs font-semibold">Message</Label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          className="flex min-h-[120px] w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Describe your inquiry in detail..."
                        />
                        {formErrors.message && (
                          <p className="text-2xs text-destructive font-medium flex items-center gap-1">
                            <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
                            {formErrors.message}
                          </p>
                        )}
                      </div>

                      {/* Submit */}
                      <Button
                        type="submit"
                        disabled={loading}
                        className="rounded-xl h-11 w-full bg-primary hover:bg-primary/95 text-primary-foreground font-semibold text-xs shadow-md"
                      >
                        {loading ? "Sending Message..." : "Send Message"}
                        <Send className="ml-2 h-4 w-4 shrink-0" />
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
            
          </div>
        </div>
      </section>

      {/* Map Mock Section */}
      <section className="h-[400px] w-full border-t border-border bg-card/25 relative overflow-hidden flex items-center justify-center text-center px-4">
        {/* Background grid for map aesthetic */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="relative z-10 space-y-4 max-w-md">
          <div className="mx-auto h-12 w-12 rounded-full bg-accent/15 flex items-center justify-center text-accent shadow-md">
            <MapPin className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold">Interactive Map Location</h3>
          <p className="text-xs text-muted-foreground">
            Our offices are conveniently located near the municipal courthouse and the Sector 4 precinct headquarters. Parking is available for members.
          </p>
          <div className="inline-flex gap-2">
            <Button variant="outline" className="rounded-xl text-xs font-semibold">Get Directions</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
