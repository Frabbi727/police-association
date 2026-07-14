"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useDemo } from "@/lib/demo-context";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Users,
  Calendar,
  HeartHandshake,
  CreditCard,
  Settings,
  LogOut,
  Bell,
  Menu,
  X,
  LayoutDashboard,
  ShieldCheck,
  UserCheck
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { welfareApplications } = useDemo();
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

  const sidebarItems = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Members Log", href: "/admin/members", icon: Users },
    { name: "Bookings", href: "/admin/bookings", icon: Calendar },
    { name: "Welfare Claims", href: "/admin/welfare", icon: HeartHandshake, badge: welfareApplications.filter(w => w.status === "Pending").length },
    { name: "Payments Log", href: "/admin/payments", icon: CreditCard },
    { name: "System Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="flex flex-col md:flex-row flex-1 bg-background min-h-screen">
      
      {/* Mobile Header */}
      <div className="md:hidden flex h-16 w-full items-center justify-between border-b border-border bg-[#0a0f1d] text-white px-4 sticky top-16 z-40">
        <div className="flex items-center gap-2">
          <img src="/images/309563497_415511680752905_2210960597977463845_n.png" className="h-6 w-6 object-contain" alt="Logo" />
          <span className="font-extrabold text-xs uppercase tracking-wider text-accent">Admin Portal</span>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="h-9 w-9 rounded-xl border-white/20 text-white bg-transparent hover:bg-white/10"
        >
          {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0c1224] text-white border-b border-white/10 w-full z-30 overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-1">
              {sidebarItems.map((item) => {
                const ActiveIcon = item.icon;
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileNavOpen(false)}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                      active ? "bg-accent/20 text-accent" : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <ActiveIcon className="h-4.5 w-4.5 shrink-0" />
                      <span>{item.name}</span>
                    </div>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="h-4.5 px-1.5 rounded-full bg-accent text-[9px] font-bold text-accent-foreground flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
              <div className="h-px bg-white/10 my-2" />
              <Link
                href="/dashboard"
                onClick={() => setMobileNavOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-accent/80 hover:bg-accent/10"
              >
                <UserCheck className="h-4.5 w-4.5 shrink-0" />
                <span>Return to Member Portal</span>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar (Left Panel, 260px wide) */}
      <aside className="hidden md:flex flex-col w-[260px] border-r border-border bg-[#080d1a] text-white shrink-0 select-none">
        
        {/* User Card */}
        <div className="p-5 border-b border-white/10 bg-[#060a14]">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-card rounded-2xl flex items-center justify-center border border-white/10 shadow-inner overflow-hidden">
              <img src="/images/309563497_415511680752905_2210960597977463845_n.png" className="h-8 w-8 object-contain" alt="Logo" />
            </div>
            <div className="flex flex-col min-w-0 text-left">
              <span className="font-extrabold text-xs text-white">Portal Administrator</span>
              <span className="text-[9px] text-accent font-bold uppercase tracking-widest mt-0.5">
                Executive Access
              </span>
            </div>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-thin">
          {sidebarItems.map((item) => {
            const ActiveIcon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all duration-200 group ${
                  active
                    ? "bg-accent text-accent-foreground shadow-md shadow-accent/15"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <ActiveIcon className={`h-4.5 w-4.5 shrink-0 transition-transform group-hover:scale-105 ${active ? "text-accent-foreground" : "text-white/60 group-hover:text-accent"}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`h-4.5 px-1.5 rounded-full text-[9px] font-bold flex items-center justify-center ${active ? 'bg-accent-foreground text-accent' : 'bg-accent text-accent-foreground'}`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Back link */}
        <div className="p-4 border-t border-white/10 bg-[#060a14]">
          <Link href="/dashboard" className="block w-full">
            <Button variant="outline" className="w-full justify-start rounded-xl h-10 border-white/15 bg-transparent hover:bg-white/5 text-white/80 text-xs font-semibold gap-2">
              <UserCheck className="h-4.5 w-4.5 text-accent shrink-0" />
              <span>Exit Admin Portal</span>
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Desktop Top Header */}
        <header className="hidden md:flex h-16 w-full items-center justify-between border-b border-border bg-card px-8 sticky top-16 z-40 select-none">
          <div className="flex items-center gap-2">
            <img src="/images/309563497_415511680752905_2210960597977463845_n.png" className="h-6 w-6 object-contain" alt="Logo" />
            <h2 className="font-extrabold text-sm tracking-tight text-foreground uppercase">Executive Administration Dashboard</h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-accent/20 bg-accent/5 text-[9px] font-extrabold text-accent uppercase tracking-wider">
              <span>Security Clearances Level 3</span>
            </div>
            
            <Link href="/dashboard">
              <Button size="sm" variant="outline" className="rounded-xl h-9 text-xs font-bold border-border gap-1 hover:bg-muted">
                Return to Member View
              </Button>
            </Link>
          </div>
        </header>

        {/* Content Layout Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

    </div>
  );
}
