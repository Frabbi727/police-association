"use client";

import * as React from "react";
import Link from "next/link";
import { useDemo } from "@/lib/demo-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  Legend
} from "recharts";
import {
  Users,
  Calendar,
  HeartHandshake,
  CreditCard,
  Shield,
  ArrowUpRight,
  UserPlus,
  AlertCircle
} from "lucide-react";

export default function AdminDashboardOverview() {
  const { members, facilityBookings, welfareApplications, invoices } = useDemo();

  // Metrics
  const activeMembers = members.filter(m => m.status === "Active").length;
  const pendingWelfare = welfareApplications.filter(w => w.status === "Pending").length;
  const activeBookings = facilityBookings.filter(b => b.status === "Approved").length;
  
  const paidInvoices = invoices.filter(i => i.status === "Paid");
  const totalRevenue = paidInvoices.reduce((acc, curr) => acc + curr.amount, 0);

  // Facility distribution data
  const facilityData = [
    { name: "Hall", Count: facilityBookings.filter(b => b.facility === "Community Hall").length },
    { name: "Suite A", Count: facilityBookings.filter(b => b.facility === "Guest House Suite A").length },
    { name: "Suite B", Count: facilityBookings.filter(b => b.facility === "Guest House Suite B").length },
    { name: "Training", Count: facilityBookings.filter(b => b.facility === "Tactical Training Room").length },
  ];

  // Revenue chart data
  const revenueData = [
    { name: "Jan", Revenue: 4200 },
    { name: "Feb", Revenue: 4900 },
    { name: "Mar", Revenue: 5100 },
    { name: "Apr", Revenue: 5800 },
    { name: "May", Revenue: 6200 },
    { name: "Jun", Revenue: 5500 },
    { name: "Jul", Revenue: totalRevenue },
  ];

  return (
    <div className="space-y-8">
      {/* Header banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Admin Overview</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Key metrics, financial performance, and bookings log audit dashboard.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/members">
            <Button size="sm" className="rounded-xl h-9 text-xs font-bold bg-primary text-primary-foreground flex items-center gap-1 shadow">
              <UserPlus className="h-4 w-4" />
              Register Member
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Widgets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Members */}
        <Card className="border-border">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-2 text-left">
              <span className="text-3xs font-extrabold uppercase text-muted-foreground tracking-wider">Union Members</span>
              <h3 className="text-base font-extrabold text-foreground leading-none">{members.length} Total</h3>
              <p className="text-4xs text-muted-foreground">{activeMembers} Active in patrol force</p>
            </div>
            <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-xl">
              <Users className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        {/* Pending Welfare claims */}
        <Card className="border-border">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-2 text-left">
              <span className="text-3xs font-extrabold uppercase text-muted-foreground tracking-wider">Pending Claims</span>
              <h3 className="text-base font-extrabold text-foreground leading-none">{pendingWelfare} Claims</h3>
              <p className="text-4xs text-muted-foreground">Requires immediate review</p>
            </div>
            <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl">
              <HeartHandshake className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        {/* Revenue Collected */}
        <Card className="border-border">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-2 text-left">
              <span className="text-3xs font-extrabold uppercase text-muted-foreground tracking-wider font-semibold">Total Revenue</span>
              <h3 className="text-base font-extrabold text-foreground leading-none">${totalRevenue.toLocaleString()}</h3>
              <p className="text-4xs text-muted-foreground">{paidInvoices.length} Settled invoices</p>
            </div>
            <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl">
              <CreditCard className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        {/* Active Facility Bookings */}
        <Card className="border-border">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-2 text-left">
              <span className="text-3xs font-extrabold uppercase text-muted-foreground tracking-wider">Active Bookings</span>
              <h3 className="text-base font-extrabold text-foreground leading-none">{activeBookings} Approved</h3>
              <p className="text-4xs text-muted-foreground">Across 4 municipal facilities</p>
            </div>
            <div className="p-3 bg-rose-500/10 text-rose-500 rounded-xl">
              <Calendar className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Revenue chart */}
        <Card className="border-border">
          <CardHeader className="pb-2 text-left">
            <CardTitle className="text-sm font-bold flex items-center gap-1.5">
              <CreditCard className="h-4 w-4 text-accent" />
              Monthly Revenue Collections ($)
            </CardTitle>
            <CardDescription className="text-3xs">
              Subsidized membership and facility fee collections log.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4 h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="revColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.76 0.15 75)" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="oklch(0.76 0.15 75)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" fontSize={11} stroke="oklch(0.45 0.05 240)" />
                <YAxis fontSize={11} stroke="oklch(0.45 0.05 240)" />
                <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="Revenue" stroke="oklch(0.76 0.15 75)" fillOpacity={1} fill="url(#revColor)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bookings Chart */}
        <Card className="border-border">
          <CardHeader className="pb-2 text-left">
            <CardTitle className="text-sm font-bold flex items-center gap-1.5">
              <Calendar className="h-4.5 w-4.5 text-accent" />
              Bookings by Facility Type
            </CardTitle>
            <CardDescription className="text-3xs">
              Aggregate distribution of bookings across association assets.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4 h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={facilityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(0.88 0.02 240)" />
                <XAxis dataKey="name" fontSize={11} stroke="oklch(0.45 0.05 240)" />
                <YAxis fontSize={11} stroke="oklch(0.45 0.05 240)" />
                <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '12px' }} />
                <Bar dataKey="Count" fill="oklch(0.35 0.12 245)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      </div>

      {/* Welfare Alerts list */}
      {pendingWelfare > 0 && (
        <Card className="border-amber-500/30 bg-amber-500/5 text-left">
          <CardContent className="p-4 flex gap-3 items-center">
            <AlertCircle className="h-6 w-6 text-amber-500 shrink-0" />
            <div className="flex-1 space-y-0.5">
              <h4 className="text-xs font-bold text-amber-500">Pending Welfare Claims Require Review</h4>
              <p className="text-3xs text-muted-foreground leading-normal">
                There are currently {pendingWelfare} claims awaiting board review. Officers are waiting for tuition or medical support grants.
              </p>
            </div>
            <Link href="/admin/welfare">
              <Button size="sm" className="rounded-xl text-3xs font-bold h-9 bg-amber-500 hover:bg-amber-500/90 text-slate-950 shadow shrink-0">
                Review Claims
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

    </div>
  );
}
