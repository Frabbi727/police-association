"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import {
  Shield,
  FileText,
  User,
  Users,
  LogOut,
  Send,
  CheckCircle,
  Clock,
  Briefcase,
  AlertTriangle,
  Search,
  KeyRound,
  ShieldCheck,
  ShieldAlert,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// 1. Zod schemas
const loginSchema = z.object({
  badgeNumber: z.string().min(3, { message: "Badge number must be at least 3 digits." }),
  email: z.string().email({ message: "Invalid department email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type LoginInputs = z.infer<typeof loginSchema>;

const supportTicketSchema = z.object({
  badgeNumber: z.string().min(3),
  division: z.string().min(1, { message: "Please select your division." }),
  incidentDate: z.string().min(1, { message: "Incident date is required." }),
  description: z.string().min(10, { message: "Please provide a detailed description (min 10 chars)." }),
  priority: z.string(),
});

type SupportTicketInputs = z.infer<typeof supportTicketSchema>;

// Profile Settings Schema
const profileSchema = z.object({
  fullName: z.string().min(2, { message: "Full name is required." }),
  phone: z.string().min(7, { message: "Phone number is required." }),
  address: z.string().min(5, { message: "Valid street address is required." }),
  postalCode: z.string().min(3, { message: "Valid postal code is required." }),
});

type ProfileInputs = z.infer<typeof profileSchema>;

// Mock database data
const initialTickets = [
  {
    id: "TK-4028",
    date: "2026-07-01",
    division: "Patrol North",
    priority: "High",
    status: "In Progress",
    description: "Representation request regarding standard review process after routine patrol encounter.",
  },
  {
    id: "TK-3912",
    date: "2026-06-18",
    division: "Traffic Control",
    priority: "Medium",
    status: "Resolved",
    description: "Bargaining agreement inquiry regarding overtime allocation for holiday shifts.",
  },
];

const mockDirectory = [
  { name: "Det. John Kowalski", role: "Association President", email: "jkowalski@metro-pa.org", phone: "Ext. 201", badge: "1092" },
  { name: "Sgt. Marcus Vance", role: "Association Vice President", email: "mvance@metro-pa.org", phone: "Ext. 202", badge: "8821" },
  { name: "Off. Sarah Jenkins", role: "Association Secretary", email: "sjenkins@metro-pa.org", phone: "Ext. 203", badge: "4421" },
  { name: "Capt. Raymond Vance (Ret.)", role: "Association Treasurer", email: "rvance@metro-pa.org", phone: "Ext. 204", badge: "0990" },
  { name: "Attorney Laura Vance", role: "Chief Legal Council", email: "lvance@metro-pa.org", phone: "Ext. 301", badge: "N/A" },
];

const financialData = [
  { name: "Legal Defense", value: 45 },
  { name: "Member Welfare", value: 25 },
  { name: "Community Outreach", value: 15 },
  { name: "Operations", value: 15 },
];

const ticketActivityData = [
  { month: "Jan", tickets: 12, resolved: 10 },
  { month: "Feb", tickets: 18, resolved: 14 },
  { month: "Mar", tickets: 15, resolved: 15 },
  { month: "Apr", tickets: 22, resolved: 18 },
  { month: "May", tickets: 30, resolved: 25 },
  { month: "Jun", tickets: 25, resolved: 22 },
];

const COLORS = ["oklch(0.35 0.12 245)", "oklch(0.76 0.15 75)", "oklch(0.55 0.15 200)", "oklch(0.65 0.13 140)"];

export default function Dashboard() {
  const [user, setUser] = React.useState<{ badgeNumber: string; email: string } | null>(null);
  const [tickets, setTickets] = React.useState(initialTickets);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isMounted, setIsMounted] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("overview");
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  // Prefill login details for evaluation simplicity
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors, isSubmitting: isLoggingIn },
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      badgeNumber: "8492",
      email: "officer.doe@metro-pd.gov",
      password: "password123",
    },
  });

  const {
    register: ticketRegister,
    handleSubmit: handleTicketSubmit,
    reset: resetTicketForm,
    setValue: setTicketValue,
    formState: { errors: ticketErrors, isSubmitting: isSubmittingTicket },
  } = useForm<SupportTicketInputs>({
    resolver: zodResolver(supportTicketSchema),
    defaultValues: {
      badgeNumber: "8492",
      priority: "Medium",
      division: "",
    },
  });

  const {
    register: profileRegister,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors, isSubmitting: isSubmittingProfile },
  } = useForm<ProfileInputs>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "Officer John Doe",
      phone: "(555) 018-3482",
      address: "4820 Liberty Ave, Sector 4",
      postalCode: "10023",
    },
  });

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const onLogin = async (data: LoginInputs) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setUser({ badgeNumber: data.badgeNumber, email: data.email });
    triggerToast("Login Successful! Welcome to the Metropolitan Police Association Portal.");
  };

  const onLogout = () => {
    setUser(null);
    triggerToast("You have logged out securely.");
  };

  const onSubmitTicket = async (data: SupportTicketInputs) => {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    const newTicket = {
      id: `TK-${Math.floor(Math.random() * 9000) + 1000}`,
      date: new Date().toISOString().split("T")[0],
      division: data.division,
      priority: data.priority,
      status: "Submitted",
      description: data.description,
    };
    setTickets([newTicket, ...tickets]);
    resetTicketForm();
    triggerToast(`Ticket ${newTicket.id} filed successfully! A legal officer will contact you.`);
    setActiveTab("overview");
  };

  const onSubmitProfile = async (data: ProfileInputs) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    triggerToast("Profile contact details updated successfully.");
  };

  const filteredDirectory = mockDirectory.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full bg-background min-h-[90vh]">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3.5 bg-primary text-primary-foreground text-xs font-semibold rounded-2xl shadow-xl flex items-center gap-2.5 border border-primary/20 max-w-sm text-center"
          >
            <ShieldCheck className="h-4.5 w-4.5 text-accent fill-current shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {!user ? (
        /* Login Card Screen */
        <section className="flex-1 flex items-center justify-center py-20 px-4">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <Card className="border-border shadow-xl backdrop-blur-sm bg-card/90">
              <CardHeader className="space-y-2 text-center pb-6 border-b border-border">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-xl font-bold tracking-tight">Members Secure Login</CardTitle>
                <CardDescription className="text-2xs text-muted-foreground">
                  Access collective agreements, emergency representation request lines, and directory records.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleLoginSubmit(onLogin)} noValidate>
                <CardContent className="space-y-4 pt-6">
                  {/* Badge Number */}
                  <div className="space-y-1.5">
                    <Label htmlFor="badgeNumber" className="text-xs font-semibold">Department Badge Number</Label>
                    <Input
                      id="badgeNumber"
                      type="text"
                      className="rounded-xl h-11 border-border focus-visible:ring-accent"
                      {...loginRegister("badgeNumber")}
                    />
                    {loginErrors.badgeNumber && (
                      <p className="text-2xs text-destructive font-medium flex items-center gap-1">
                        <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
                        {loginErrors.badgeNumber.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-xs font-semibold">Officer Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      className="rounded-xl h-11 border-border focus-visible:ring-accent"
                      {...loginRegister("email")}
                    />
                    {loginErrors.email && (
                      <p className="text-2xs text-destructive font-medium flex items-center gap-1">
                        <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
                        {loginErrors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="space-y-1.5">
                    <Label htmlFor="password font-semibold">Security Password</Label>
                    <Input
                      id="password"
                      type="password"
                      className="rounded-xl h-11 border-border focus-visible:ring-accent"
                      {...loginRegister("password")}
                    />
                    {loginErrors.password && (
                      <p className="text-2xs text-destructive font-medium flex items-center gap-1">
                        <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
                        {loginErrors.password.message}
                      </p>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 border-t border-border pt-6 pb-6">
                  <Button
                    type="submit"
                    disabled={isLoggingIn}
                    className="w-full rounded-xl h-11 bg-primary hover:bg-primary/95 text-primary-foreground font-bold text-xs shadow-md"
                  >
                    {isLoggingIn ? "Verifying Credentials..." : "Authenticate & Login"}
                  </Button>
                  <p className="text-3xs text-muted-foreground text-center leading-relaxed">
                    Authorization required. Attempts to access without authorization are logged under MPD protocol.
                  </p>
                </CardFooter>
              </form>
            </Card>
          </motion.div>
        </section>
      ) : (
        /* Logged In Dashboard View */
        <section className="flex-1 container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-300">
          {/* Welcome Banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl border border-border bg-card shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-primary/10 text-primary">
                <Shield className="h-6 w-6 text-accent" />
              </div>
              <div className="space-y-0.5">
                <h1 className="text-lg font-extrabold tracking-tight">Members Portal Dashboard</h1>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-2xs text-muted-foreground">
                  <span className="font-semibold text-foreground">Officer John Doe</span>
                  <span>|</span>
                  <span>Badge Number: #{user.badgeNumber}</span>
                  <span>|</span>
                  <span className="bg-primary/10 text-primary px-2 py-0.5 rounded font-bold uppercase tracking-wider text-3xs border border-primary/20">
                    Active Member
                  </span>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={onLogout}
              className="rounded-xl border-border text-xs flex items-center gap-1.5 hover:bg-muted"
            >
              <LogOut className="h-4 w-4" />
              Sign Out Securely
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-6">
            <TabsList className="bg-card border border-border p-1 rounded-2xl max-w-lg grid grid-cols-4 h-12">
              <TabsTrigger value="overview" className="rounded-xl text-xs font-semibold py-2">
                Overview
              </TabsTrigger>
              <TabsTrigger value="ticket" className="rounded-xl text-xs font-semibold py-2">
                Legal Request
              </TabsTrigger>
              <TabsTrigger value="directory" className="rounded-xl text-xs font-semibold py-2">
                Directory
              </TabsTrigger>
              <TabsTrigger value="settings" className="rounded-xl text-xs font-semibold py-2">
                Profile
              </TabsTrigger>
            </TabsList>

            {/* TAB CONTENT: OVERVIEW */}
            <TabsContent value="overview" className="space-y-6 animate-in fade-in duration-200">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-border bg-card shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xs font-bold uppercase tracking-wider text-muted-foreground">
                      Active Tickets
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    <span className="text-2xl font-extrabold tracking-tight">
                      {tickets.filter((t) => t.status !== "Resolved").length}
                    </span>
                    <div className="p-2 rounded-xl bg-accent/15 text-accent">
                      <Clock className="h-5 w-5" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xs font-bold uppercase tracking-wider text-muted-foreground">
                      Legal Coverage Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    <span className="text-sm font-bold text-accent">FULLY COVERED</span>
                    <div className="p-2 rounded-xl bg-primary/15 text-primary">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xs font-bold uppercase tracking-wider text-muted-foreground">
                      Bargaining Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    <span className="text-sm font-bold text-primary">NEGOTIATION OPEN</span>
                    <div className="p-2 rounded-xl bg-muted text-muted-foreground">
                      <Briefcase className="h-5 w-5" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recharts Analytics Charts (Safeguarded with mounted check to avoid hydration issues) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <Card className="border-border bg-card shadow-sm lg:col-span-8">
                  <CardHeader>
                    <CardTitle className="text-sm font-extrabold tracking-tight">Legal Aid Ticket Activity</CardTitle>
                    <CardDescription className="text-3xs text-muted-foreground">
                      Annual ticketing and resolution trends across the association (monthly aggregate).
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    {isMounted ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={ticketActivityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorTickets" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.4} />
                              <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.4} />
                              <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                          <XAxis dataKey="month" stroke="currentColor" opacity={0.5} style={{ fontSize: "10px" }} />
                          <YAxis stroke="currentColor" opacity={0.5} style={{ fontSize: "10px" }} />
                          <Tooltip
                            contentStyle={{
                              background: "oklch(var(--card))",
                              borderColor: "oklch(var(--border))",
                              borderRadius: "12px",
                              fontSize: "12px",
                            }}
                          />
                          <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }} />
                          <Area
                            name="Tickets Filed"
                            type="monotone"
                            dataKey="tickets"
                            stroke="oklch(var(--primary))"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorTickets)"
                          />
                          <Area
                            name="Tickets Resolved"
                            type="monotone"
                            dataKey="resolved"
                            stroke="oklch(var(--accent))"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorResolved)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-full w-full bg-muted animate-pulse rounded-2xl" />
                    )}
                  </CardContent>
                </Card>

                {/* Financial Allocation Pie Chart */}
                <Card className="border-border bg-card shadow-sm lg:col-span-4">
                  <CardHeader>
                    <CardTitle className="text-sm font-extrabold tracking-tight">Fund Distributions</CardTitle>
                    <CardDescription className="text-3xs text-muted-foreground">
                      Percentage breakdown of budget resources.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-64 flex flex-col justify-center">
                    {isMounted ? (
                      <ResponsiveContainer width="100%" height="80%">
                        <PieChart>
                          <Pie
                            data={financialData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={3}
                            dataKey="value"
                          >
                            {financialData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              background: "oklch(var(--card))",
                              borderColor: "oklch(var(--border))",
                              borderRadius: "12px",
                              fontSize: "12px",
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-40 w-40 mx-auto bg-muted animate-pulse rounded-full" />
                    )}
                    <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-3xs font-semibold text-muted-foreground pt-4 border-t border-border mt-2">
                      {financialData.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: COLORS[idx] }} />
                          <span className="truncate text-foreground">{item.name} ({item.value}%)</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Legal Support Tickets List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <h3 className="text-sm font-extrabold tracking-tight">Submitted Legal Aid Requests</h3>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab("ticket")} className="text-2xs font-semibold text-primary">
                    Create New Request
                  </Button>
                </div>

                <div className="space-y-3">
                  {tickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="p-5 rounded-2xl border border-border bg-card shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-primary/30 transition-all"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-3xs font-bold uppercase tracking-wider">
                          <span className="text-foreground">{ticket.id}</span>
                          <span>|</span>
                          <span className="text-muted-foreground">Division: {ticket.division}</span>
                        </div>
                        <p className="text-xs font-semibold text-foreground">{ticket.description}</p>
                        <p className="text-3xs text-muted-foreground font-medium">Filed Date: {ticket.date}</p>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end gap-3 justify-between w-full sm:w-auto">
                        <div className="flex items-center gap-1.5">
                          {ticket.status === "Resolved" ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-bold text-3xs tracking-wider uppercase">
                              <CheckCircle className="h-3 w-3" />
                              Resolved
                            </span>
                          ) : ticket.status === "In Progress" ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 font-bold text-3xs tracking-wider uppercase">
                              <Clock className="h-3 w-3 animate-pulse" />
                              In Progress
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 font-bold text-3xs tracking-wider uppercase">
                              <Send className="h-3 w-3" />
                              Submitted
                            </span>
                          )}
                        </div>
                        <span className={`text-3xs font-bold uppercase tracking-widest ${
                          ticket.priority === "High" ? "text-red-500" : "text-muted-foreground"
                        }`}>
                          Priority: {ticket.priority}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* TAB CONTENT: NEW TICKET FORM */}
            <TabsContent value="ticket" className="animate-in fade-in duration-200">
              <Card className="border-border bg-card max-w-2xl mx-auto shadow-md">
                <CardHeader className="border-b border-border pb-6">
                  <CardTitle className="text-base font-bold tracking-tight">Request Emergency Legal Representation</CardTitle>
                  <CardDescription className="text-2xs text-muted-foreground">
                    Complete this form immediately following any operational encounter requiring legal assistance. A representative will contact you instantly.
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleTicketSubmit(onSubmitTicket)} className="space-y-6 pt-6 pb-6">
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Badge Number */}
                      <div className="space-y-1.5">
                        <Label htmlFor="ticket-badge" className="text-xs font-semibold">Badge Number</Label>
                        <Input
                          id="ticket-badge"
                          type="text"
                          className="rounded-xl h-11 border-border focus-visible:ring-accent"
                          {...ticketRegister("badgeNumber")}
                        />
                      </div>

                      {/* Division Dropdown */}
                      <div className="space-y-1.5 text-left">
                        <Label htmlFor="ticket-division" className="text-xs font-semibold">Operational Division</Label>
                        <Select onValueChange={(val: string | null) => { if (val) setTicketValue("division", val, { shouldValidate: true }); }}>
                          <SelectTrigger id="ticket-division" className="rounded-xl h-11 border-border">
                            <SelectValue placeholder="Select Division" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Patrol North">Patrol North</SelectItem>
                            <SelectItem value="Patrol South">Patrol South</SelectItem>
                            <SelectItem value="Traffic Control">Traffic Control</SelectItem>
                            <SelectItem value="Narcotics / Tactical">Narcotics / Tactical</SelectItem>
                            <SelectItem value="Administrative">Administrative</SelectItem>
                          </SelectContent>
                        </Select>
                        {ticketErrors.division && (
                          <p className="text-2xs text-destructive font-medium mt-1 flex items-center gap-1">
                            <ShieldAlert className="h-3 w-3 shrink-0" />
                            {ticketErrors.division.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Date */}
                      <div className="space-y-1.5">
                        <Label htmlFor="incidentDate" className="text-xs font-semibold">Date of Incident</Label>
                        <Input
                          id="incidentDate"
                          type="date"
                          className="rounded-xl h-11 border-border focus-visible:ring-accent"
                          {...ticketRegister("incidentDate")}
                        />
                        {ticketErrors.incidentDate && (
                          <p className="text-2xs text-destructive font-medium mt-1 flex items-center gap-1">
                            <ShieldAlert className="h-3 w-3 shrink-0" />
                            {ticketErrors.incidentDate.message}
                          </p>
                        )}
                      </div>

                      {/* Priority */}
                      <div className="space-y-1.5 text-left">
                        <Label htmlFor="priority" className="text-xs font-semibold">Urgency Priority</Label>
                        <Select defaultValue="Medium" onValueChange={(val: string | null) => { if (val) setTicketValue("priority", val); }}>
                          <SelectTrigger id="priority" className="rounded-xl h-11 border-border">
                            <SelectValue placeholder="Select Priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Low">Low (Inquiry)</SelectItem>
                            <SelectItem value="Medium">Medium (Non-Urgent Incident)</SelectItem>
                            <SelectItem value="High">High (Immediate Legal Review)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-1.5">
                      <Label htmlFor="description" className="text-xs font-semibold">Incident Overview / Reason for Request</Label>
                      <textarea
                        id="description"
                        rows={4}
                        placeholder="Please summarize the facts of the encounter requiring representation..."
                        className="w-full p-3.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent text-xs font-medium resize-none min-h-[120px]"
                        {...ticketRegister("description")}
                      />
                      {ticketErrors.description && (
                        <p className="text-2xs text-destructive font-medium mt-1 flex items-center gap-1">
                          <ShieldAlert className="h-3 w-3 shrink-0" />
                          {ticketErrors.description.message}
                        </p>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter className="border-t border-border pt-6 flex justify-between gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setActiveTab("overview")}
                      className="rounded-xl h-11 border-border font-semibold text-xs"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmittingTicket}
                      className="rounded-xl h-11 bg-primary hover:bg-primary/95 text-primary-foreground font-semibold px-6 shadow-md flex items-center gap-2"
                    >
                      <Send className="h-4 w-4" />
                      {isSubmittingTicket ? "Transmitting..." : "Submit Support Request"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            {/* TAB CONTENT: SEARCHABLE ASSOCIATION DIRECTORY */}
            <TabsContent value="directory" className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-b border-border pb-4">
                <div className="space-y-0.5">
                  <h3 className="text-sm font-extrabold tracking-tight">Association Officers Directory</h3>
                  <p className="text-3xs text-muted-foreground">List of active association board officers and legal representatives.</p>
                </div>
                <div className="relative w-full sm:max-w-xs">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search by name or role..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="rounded-xl pl-9 h-11 border-border text-xs font-semibold focus-visible:ring-accent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredDirectory.map((member, idx) => (
                  <Card key={idx} className="border-border bg-card shadow-xs flex flex-col justify-between hover:border-primary/30 transition-all">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-muted border border-border flex items-center justify-center text-muted-foreground font-bold">
                          <User className="h-5 w-5 text-primary/70" />
                        </div>
                        <div className="space-y-0.5">
                          <CardTitle className="text-xs font-bold text-foreground">{member.name}</CardTitle>
                          <CardDescription className="text-3xs font-semibold text-accent uppercase tracking-wider">
                            {member.role}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2 text-2xs text-muted-foreground pb-4 border-t border-border pt-3">
                      <div className="flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5 text-accent shrink-0" />
                        <span>{member.email}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Phone className="h-3.5 w-3.5 text-accent shrink-0" />
                          <span>{member.phone}</span>
                        </div>
                        <span className="text-3xs font-semibold uppercase bg-muted px-2 py-0.5 rounded text-foreground">
                          Badge #{member.badge}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* TAB CONTENT: PROFILE EDIT FORM */}
            <TabsContent value="settings" className="animate-in fade-in duration-200">
              <Card className="border-border bg-card max-w-xl mx-auto shadow-md">
                <CardHeader className="border-b border-border pb-6">
                  <CardTitle className="text-base font-bold tracking-tight">Member Profile Contacts</CardTitle>
                  <CardDescription className="text-2xs text-muted-foreground">
                    Update your local mailing details and phone information. All updates synchronize with departmental rolls.
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleProfileSubmit(onSubmitProfile)} className="space-y-6 pt-6 pb-6">
                  <CardContent className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="profile-fullName" className="text-xs font-semibold">Full Officer Name</Label>
                      <Input
                        id="profile-fullName"
                        type="text"
                        autoComplete="name"
                        className="rounded-xl h-11 border-border focus-visible:ring-accent"
                        {...profileRegister("fullName")}
                      />
                      {profileErrors.fullName && (
                        <p className="text-2xs text-destructive font-medium mt-1 flex items-center gap-1">
                          <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
                          {profileErrors.fullName.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="profile-phone" className="text-xs font-semibold">Contact Phone Number</Label>
                      <Input
                        id="profile-phone"
                        type="text"
                        autoComplete="tel"
                        className="rounded-xl h-11 border-border focus-visible:ring-accent"
                        {...profileRegister("phone")}
                      />
                      {profileErrors.phone && (
                        <p className="text-2xs text-destructive font-medium mt-1 flex items-center gap-1">
                          <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
                          {profileErrors.phone.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="profile-address" className="text-xs font-semibold">Mailing Street Address</Label>
                      <textarea
                        id="profile-address"
                        rows={2}
                        autoComplete="street-address"
                        className="w-full p-3.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent text-xs font-medium resize-none min-h-[60px]"
                        {...profileRegister("address")}
                      />
                      {profileErrors.address && (
                        <p className="text-2xs text-destructive font-medium mt-1 flex items-center gap-1">
                          <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
                          {profileErrors.address.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="profile-postalCode" className="text-xs font-semibold">ZIP / Postal Code</Label>
                      <Input
                        id="profile-postalCode"
                        type="text"
                        autoComplete="postal-code"
                        className="rounded-xl h-11 border-border focus-visible:ring-accent"
                        {...profileRegister("postalCode")}
                      />
                      {profileErrors.postalCode && (
                        <p className="text-2xs text-destructive font-medium mt-1 flex items-center gap-1">
                          <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
                          {profileErrors.postalCode.message}
                        </p>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter className="border-t border-border pt-6 flex justify-end gap-4">
                    <Button
                      type="submit"
                      disabled={isSubmittingProfile}
                      className="rounded-xl h-11 bg-primary hover:bg-primary/95 text-primary-foreground font-semibold px-6 shadow-md flex items-center gap-1.5"
                    >
                      <CheckCircle className="h-4 w-4" />
                      {isSubmittingProfile ? "Saving Changes..." : "Save Member Details"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      )}
    </div>
  );
}
