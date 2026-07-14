"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useDemo, translateDigits } from "@/lib/demo-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";
import {
  Shield,
  CreditCard,
  Calendar,
  BookOpen,
  HeartHandshake,
  Bell,
  TrendingUp,
  Clock
} from "lucide-react";

export default function MemberDashboardOverview() {
  const {
    user,
    gymBookings,
    books,
    welfareApplications,
    facilityBookings,
    invoices,
    notifications,
    announcements,
    t,
    formatCurrency,
    language
  } = useDemo();

  // Computations
  const userGymBookings = gymBookings.filter(b => b.reservedBy === user?.badgeNumber);
  const userBooks = books.filter(b => b.borrowedBy === user?.badgeNumber);
  const unpaidInvoices = invoices.filter(i => i.status === "Unpaid");
  const unpaidTotal = unpaidInvoices.reduce((acc, curr) => acc + curr.amount, 0);
  const userWelfare = welfareApplications;
  
  // Charts Dummy Data
  const activityData = [
    { name: t("Jan", "Jan"), GymHours: 12, BooksRead: 1, ClaimsSubmitted: 0 },
    { name: t("Feb", "Feb"), GymHours: 18, BooksRead: 2, ClaimsSubmitted: 1 },
    { name: t("Mar", "Mar"), GymHours: 15, BooksRead: 1, ClaimsSubmitted: 0 },
    { name: t("Apr", "Apr"), GymHours: 24, BooksRead: 3, ClaimsSubmitted: 0 },
    { name: t("May", "May"), GymHours: 30, BooksRead: 4, ClaimsSubmitted: 1 },
    { name: t("Jun", "Jun"), GymHours: 22, BooksRead: 2, ClaimsSubmitted: 0 },
    { name: t("Jul", "Jul"), GymHours: 28, BooksRead: 3, ClaimsSubmitted: 1 },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">
            {t("Welcome Back, ", "Welcome Back, ")}
            {user?.name.split(" ")[1] || "Officer"}
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {t("Portal Overview for Badge #", "Portal Overview for Badge #")}
            {language === "bn" ? translateDigits(user?.badgeNumber || "") : user?.badgeNumber} • {t(user?.division || "", user?.division || "")}
          </p>
        </div>
        <div className="text-3xs font-semibold px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-accent uppercase tracking-wider self-start sm:self-center">
          {t("Status: Active Association Member", "Status: Active Association Member")}
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        
        {/* Membership Card */}
        <Card className="border-border bg-card/60 hover:shadow-md transition-shadow">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-2">
              <span className="text-3xs font-extrabold uppercase text-muted-foreground tracking-wider">{t("Membership", "Membership")}</span>
              <h3 className="text-base font-extrabold text-foreground leading-none">{t("Active", "Active")}</h3>
              <p className="text-4xs text-muted-foreground">{t("Badge Verification Code", "Badge Verification Code")}</p>
            </div>
            <div className="p-3 bg-primary/10 text-primary rounded-xl">
              <Shield className="h-5 w-5 text-accent" />
            </div>
          </CardContent>
        </Card>

        {/* Payments Card */}
        <Card className="border-border bg-card/60 hover:shadow-md transition-shadow">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-2">
              <span className="text-3xs font-extrabold uppercase text-muted-foreground tracking-wider">{t("Due Amount", "Due Amount")}</span>
              <h3 className="text-base font-extrabold text-foreground leading-none">
                {formatCurrency(unpaidTotal)}
              </h3>
              <p className="text-4xs text-muted-foreground">
                {language === "bn" ? translateDigits(String(unpaidInvoices.length)) : unpaidInvoices.length} {t("Unpaid Invoice(s)", "Unpaid Invoice(s)")}
              </p>
            </div>
            <div className="p-3 bg-primary/10 text-primary rounded-xl">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
          </CardContent>
        </Card>

        {/* Gym Reservation Card */}
        <Card className="border-border bg-card/60 hover:shadow-md transition-shadow">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-2">
              <span className="text-3xs font-extrabold uppercase text-muted-foreground tracking-wider">{t("Gym Slots", "Gym Slots")}</span>
              <h3 className="text-base font-extrabold text-foreground leading-none">
                {userGymBookings.length > 0 ? (
                  `${language === "bn" ? translateDigits(String(userGymBookings.length)) : userGymBookings.length} ${t("Active", "Active")}`
                ) : (
                  t("None", "None")
                )}
              </h3>
              <p className="text-4xs text-muted-foreground truncate max-w-[120px]">
                {userGymBookings[0] ? (
                  `${t(userGymBookings[0].day, userGymBookings[0].day)} @ ${language === "bn" ? translateDigits(userGymBookings[0].slot.split(" - ")[0]) : userGymBookings[0].slot.split(" - ")[0]}`
                ) : (
                  t("No upcoming slots", "No upcoming slots")
                )}
              </p>
            </div>
            <div className="p-3 bg-primary/10 text-primary rounded-xl">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
          </CardContent>
        </Card>

        {/* Library Loans Card */}
        <Card className="border-border bg-card/60 hover:shadow-md transition-shadow">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-2">
              <span className="text-3xs font-extrabold uppercase text-muted-foreground tracking-wider">{t("Books Borrowed", "Books Borrowed")}</span>
              <h3 className="text-base font-extrabold text-foreground leading-none">
                {language === "bn" ? translateDigits(String(userBooks.length)) : userBooks.length} {t("Books", "Books")}
              </h3>
              <p className="text-4xs text-muted-foreground truncate max-w-[120px]">
                {userBooks[0] ? `Due: ${userBooks[0].dueDate}` : t("Zero borrowed items", "Zero borrowed items")}
              </p>
            </div>
            <div className="p-3 bg-primary/10 text-primary rounded-xl">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
          </CardContent>
        </Card>

        {/* Welfare Applications Card */}
        <Card className="border-border bg-card/60 hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-2">
              <span className="text-3xs font-extrabold uppercase text-muted-foreground tracking-wider">{t("Welfare Claims", "Welfare Claims")}</span>
              <h3 className="text-base font-extrabold text-foreground leading-none">
                {language === "bn" ? translateDigits(String(userWelfare.filter(w => w.status === "Pending").length)) : userWelfare.filter(w => w.status === "Pending").length} {t("Pending", "Pending")}
              </h3>
              <p className="text-4xs text-muted-foreground">
                {t("Total claims", "Total claims")}: {language === "bn" ? translateDigits(String(userWelfare.length)) : userWelfare.length}
              </p>
            </div>
            <div className="p-3 bg-primary/10 text-primary rounded-xl">
              <HeartHandshake className="h-5 w-5 text-primary" />
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Quick Actions Panel */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: t("Book Gym Slot", "Book Gym Slot"), href: "/dashboard/gym", icon: Calendar, color: "text-accent border-accent/25 bg-accent/5 hover:bg-accent/10" },
          { label: t("Borrow Books", "Borrow Books"), href: "/dashboard/library", icon: BookOpen, color: "text-primary border-primary/25 bg-primary/5 hover:bg-primary/10" },
          { label: t("Reserve Facilities", "Reserve Facilities"), href: "/dashboard/facilities", icon: Calendar, color: "text-primary border-primary/25 bg-primary/5 hover:bg-primary/10" },
          { label: t("Apply for Welfare", "Apply for Welfare"), href: "/dashboard/welfare", icon: HeartHandshake, color: "text-primary border-primary/25 bg-primary/5 hover:bg-primary/10" },
        ].map((act, idx) => (
          <Link key={idx} href={act.href} className="block w-full">
            <Button variant="outline" className={`w-full h-14 rounded-2xl flex flex-col items-center justify-center gap-1 border font-bold text-xs ${act.color}`}>
              <act.icon className="h-4.5 w-4.5 shrink-0" />
              <span>{act.label}</span>
            </Button>
          </Link>
        ))}
      </div>

      {/* Main Grid: Charts + Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Activity Charts (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                    <TrendingUp className="h-4 w-4 text-accent" />
                    {t("Member Activity Log", "Member Activity Log")}
                  </CardTitle>
                  <CardDescription className="text-3xs">
                    {t("Overview of your service engagement, gym bookings, and checked out resources.", "Overview of your service engagement, gym bookings, and checked out resources.")}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gymColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="oklch(0.35 0.12 245)" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="oklch(0.35 0.12 245)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="bookColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="oklch(0.76 0.15 75)" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="oklch(0.76 0.15 75)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" fontSize={11} stroke="oklch(0.45 0.05 240)"/>
                  <YAxis fontSize={11} stroke="oklch(0.45 0.05 240)"/>
                  <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '12px', border: '1px solid oklch(0.88 0.02 240)' }} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Area type="monotone" dataKey="GymHours" name={t("Gym Hours Logged", "Gym Hours Logged")} stroke="oklch(0.35 0.12 245)" fillOpacity={1} fill="url(#gymColor)" strokeWidth={2} />
                  <Area type="monotone" dataKey="BooksRead" name={t("Library Borrowings", "Library Borrowings")} stroke="oklch(0.76 0.15 75)" fillOpacity={1} fill="url(#bookColor)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Announcements Ticker (1 col) */}
        <div className="space-y-6">
          <Card className="border-border flex flex-col h-[380px]">
            <CardHeader className="pb-2 border-b border-border shrink-0">
              <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                <Bell className="h-4.5 w-4.5 text-accent animate-pulse" />
                {t("Latest Announcements", "Latest Announcements")}
              </CardTitle>
              <CardDescription className="text-3xs">
                {t("Official releases and updates from the executive committee.", "Official releases and updates from the executive committee.")}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
              {announcements.map((ann) => (
                <div key={ann.id} className="p-3 border border-border/50 bg-muted/20 rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between text-4xs font-bold text-accent uppercase tracking-wider">
                    <span>{t(ann.sender, ann.sender)}</span>
                    <span className="text-muted-foreground">{ann.date}</span>
                  </div>
                  <h4 className="font-extrabold text-2xs text-foreground leading-snug">{t(ann.title, ann.title)}</h4>
                  <p className="text-3xs text-muted-foreground leading-normal">{t(ann.content, ann.content)}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

      </div>

      {/* Welfare Claim Timeline & Facility Bookings Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Welfare applications status tracker */}
        <Card className="border-border">
          <CardHeader className="border-b border-border pb-3">
            <CardTitle className="text-sm font-bold">{t("Welfare Claim Tracker", "Welfare Claim Tracker")}</CardTitle>
            <CardDescription className="text-3xs">{t("Live status updates on your submitted welfare grants.", "Live status updates on your submitted welfare grants.")}</CardDescription>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            {userWelfare.length === 0 ? (
              <div className="text-center py-8 text-2xs text-muted-foreground">{t("No submitted welfare applications.", "No submitted welfare applications.")}</div>
            ) : (
              userWelfare.map((app) => (
                <div key={app.id} className="p-4 rounded-2xl border border-border bg-card/40 space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-xs">{t(app.type, app.type)}</h4>
                      <p className="text-4xs text-muted-foreground">ID: {app.id} • {t("Date", "Date")}: {app.date}</p>
                    </div>
                    <span className={`text-4xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      app.status === "Approved" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" :
                      app.status === "Rejected" ? "bg-red-500/10 text-red-500 border border-red-500/20" :
                      "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                    }`}>
                      {t(app.status, app.status)}
                    </span>
                  </div>
                  <div className="border-t border-border/50 pt-2 flex items-center justify-between text-3xs">
                    <span className="text-muted-foreground">{t("Amount Requested", "Amount Requested")}:</span>
                    <span className="font-bold text-foreground">{formatCurrency(app.amount)}</span>
                  </div>
                  {/* Latest timeline activity */}
                  {app.timeline.length > 0 && (
                    <div className="p-2.5 rounded-xl bg-muted/30 border border-border/30 flex gap-2 items-start text-3xs">
                      <Clock className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-foreground">{t("Latest Update", "Latest Update")}: </span>
                        <span className="text-muted-foreground">{t(app.timeline[app.timeline.length - 1].comment, app.timeline[app.timeline.length - 1].comment)}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Facility Bookings Status */}
        <Card className="border-border">
          <CardHeader className="border-b border-border pb-3">
            <CardTitle className="text-sm font-bold">{t("Facility Booking History", "Facility Booking History")}</CardTitle>
            <CardDescription className="text-3xs">{t("Bookings for community halls, guest rooms, and spaces.", "Bookings for community halls, guest rooms, and spaces.")}</CardDescription>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            {facilityBookings.length === 0 ? (
              <div className="text-center py-8 text-2xs text-muted-foreground">{t("No facility reservations booked.", "No facility reservations booked.")}</div>
            ) : (
              facilityBookings.map((bk) => (
                <div key={bk.id} className="p-4 rounded-2xl border border-border bg-card/40 flex justify-between items-center">
                  <div className="space-y-1">
                    <h4 className="font-bold text-xs text-foreground">{t(bk.facility, bk.facility)}</h4>
                    <div className="flex gap-2 text-4xs text-muted-foreground font-semibold uppercase tracking-wider">
                      <span>{t("Date", "Date")}: {language === "bn" ? translateDigits(bk.date) : bk.date}</span>
                      <span>•</span>
                      <span>{t("Duration", "Duration")}: {t(bk.duration, bk.duration)}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className={`text-4xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      bk.status === "Approved" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" :
                      bk.status === "Cancelled" ? "bg-red-500/10 text-red-500 border border-red-500/20" :
                      "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                    }`}>
                      {t(bk.status, bk.status)}
                    </span>
                    <span className="text-2xs font-extrabold">{formatCurrency(bk.amount)}</span>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

      </div>

    </div>
  );
}
