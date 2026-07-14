"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useDemo } from "@/lib/demo-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  User,
  Users,
  Calendar,
  BookOpen,
  Building,
  HeartHandshake,
  CreditCard,
  FileText,
  Settings,
  LogOut,
  Bell,
  Menu,
  X,
  Eye,
  EyeOff,
  LayoutDashboard
} from "lucide-react";

// Form Validation Schema
const loginSchema = z.object({
  badgeNumber: z.string().min(3, { message: "Badge number must be at least 3 digits." }),
  email: z.string().email({ message: "Invalid department email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type LoginInputs = z.infer<typeof loginSchema>;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, login, logout, notifications, markNotificationRead } = useDemo();
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [loginError, setLoginError] = React.useState<string | null>(null);
  const [showNotifDropdown, setShowNotifDropdown] = React.useState(false);

  // Form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      badgeNumber: "8492",
      email: "officer.doe@metro-pd.gov",
      password: "password123",
    },
  });

  const onSubmit = async (data: LoginInputs) => {
    setLoginError(null);
    try {
      const success = await login(data.badgeNumber, data.email, data.password);
      if (!success) {
        setLoginError("Verification failed. Please check badge or email.");
      }
    } catch (e) {
      setLoginError("An unexpected error occurred during secure authentication.");
    }
  };

  // Nav Items configuration
  const sidebarItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Profile & ID Card", href: "/dashboard/profile", icon: User },
    { name: "Gym Booking", href: "/dashboard/gym", icon: Calendar },
    { name: "Library Catalog", href: "/dashboard/library", icon: BookOpen },
    { name: "Facility Bookings", href: "/dashboard/facilities", icon: Building },
    { name: "Welfare Claims", href: "/dashboard/welfare", icon: HeartHandshake },
    { name: "Invoices & Payments", href: "/dashboard/payments", icon: CreditCard },
    { name: "Member Directory", href: "/dashboard/directory", icon: Users },
    { name: "Documents", href: "/dashboard/documents", icon: FileText },
    { name: "Portal Settings", href: "/dashboard/settings", icon: Settings },
  ];

  const unreadNotifs = notifications.filter(n => !n.read);

  // 1. If not logged in, render the login card centered on screen
  if (!user) {
    return (
      <div className="flex-1 flex items-center justify-center py-20 px-4 bg-background relative min-h-[85vh]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md z-10"
        >
          <Card className="border-border shadow-xl backdrop-blur-sm bg-card/90">
            <CardHeader className="space-y-2 text-center pb-6 border-b border-border">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
                <Shield className="h-6 w-6 text-accent" />
              </div>
              <CardTitle className="text-xl font-bold tracking-tight">Members Secure Login</CardTitle>
              <CardDescription className="text-2xs text-muted-foreground">
                Access collective agreements, facilities booking, and member records securely.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <CardContent className="space-y-4 pt-6">
                {loginError && (
                  <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-2xs font-semibold flex items-center gap-2">
                    <ShieldAlert className="h-4.5 w-4.5 shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                {/* Badge Number */}
                <div className="space-y-1.5">
                  <Label htmlFor="badgeNumber" className="text-xs font-semibold">Department Badge Number</Label>
                  <Input
                    id="badgeNumber"
                    type="text"
                    className="rounded-xl h-11 border-border focus-visible:ring-accent"
                    {...register("badgeNumber")}
                  />
                  {errors.badgeNumber && (
                    <p className="text-2xs text-destructive font-medium flex items-center gap-1">
                      <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
                      {errors.badgeNumber.message}
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-semibold">Officer Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="username"
                    className="rounded-xl h-11 border-border focus-visible:ring-accent"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-2xs text-destructive font-medium flex items-center gap-1">
                      <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password with toggle unmask */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password" className="text-xs font-semibold">Security Password</Label>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      className="rounded-xl h-11 border-border focus-visible:ring-accent pr-10"
                      {...register("password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-2xs text-destructive font-medium flex items-center gap-1">
                      <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="pt-2 pb-6 flex flex-col gap-3">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-xl h-11 w-full bg-primary hover:bg-primary/95 text-primary-foreground font-semibold text-xs shadow-xl shadow-primary/20"
                >
                  {isSubmitting ? "Authenticating Secures..." : "Secure Login"}
                </Button>
                <div className="text-center text-3xs text-muted-foreground">
                  By logging in, you agree to the CJIS data security policies.
                </div>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
      </div>
    );
  }

  // 2. Logged in member portal frame
  return (
    <div className="flex flex-col md:flex-row flex-1 bg-background min-h-screen">
      
      {/* Mobile Top Bar */}
      <div className="md:hidden flex h-16 w-full items-center justify-between border-b border-border bg-card px-4 sticky top-16 z-40">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-accent" />
          <span className="font-bold text-xs">Member Portal</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Mobile Notifications button */}
          <Button variant="ghost" size="icon" onClick={() => setShowNotifDropdown(!showNotifDropdown)} className="relative h-9 w-9 rounded-xl border border-border">
            <Bell className="h-4.5 w-4.5 text-muted-foreground" />
            {unreadNotifs.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-accent-foreground">
                {unreadNotifs.length}
              </span>
            )}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="h-9 w-9 rounded-xl border-border"
          >
            {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Sidebar Navigation Drawer */}
      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-b border-border w-full z-30 overflow-hidden"
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
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                      active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <ActiveIcon className="h-4.5 w-4.5 shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              <div className="h-px bg-border my-2" />
              <Link
                href="/admin"
                onClick={() => setMobileNavOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-accent hover:bg-accent/10"
              >
                <ShieldAlert className="h-4.5 w-4.5 shrink-0" />
                <span>Admin View (Presenter)</span>
              </Link>
              <Button
                variant="ghost"
                onClick={() => { logout(); setMobileNavOpen(false); }}
                className="flex items-center justify-start gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-destructive hover:bg-destructive/10 mt-1"
              >
                <LogOut className="h-4.5 w-4.5 shrink-0" />
                <span>Sign Out</span>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar (Left Panel, 260px wide) */}
      <aside className="hidden md:flex flex-col w-[260px] border-r border-border bg-card shrink-0 select-none">
        
        {/* User Card */}
        <div className="p-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20 shadow-inner">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-extrabold text-xs text-foreground truncate">{user.name}</span>
              <span className="text-3xs text-muted-foreground uppercase font-bold tracking-wider mt-0.5 truncate">
                {user.rank} • #{user.badgeNumber}
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
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all duration-200 group ${
                  active
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/15"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <ActiveIcon className={`h-4.5 w-4.5 shrink-0 transition-transform group-hover:scale-105 ${active ? "text-accent" : "text-muted-foreground group-hover:text-primary"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Admin and Logout Footer */}
        <div className="p-4 border-t border-border space-y-2">
          <Link href="/admin" className="block w-full">
            <Button variant="outline" className="w-full justify-start rounded-xl h-10 border-accent/20 bg-accent/5 text-accent text-3xs font-bold hover:bg-accent/15 gap-2 uppercase tracking-wide">
              <ShieldAlert className="h-4 w-4 text-accent animate-pulse" />
              Presenter: Admin View
            </Button>
          </Link>
          <Button
            variant="ghost"
            onClick={logout}
            className="w-full justify-start rounded-xl h-10 text-destructive hover:bg-destructive/10 text-xs font-semibold gap-2"
          >
            <LogOut className="h-4.5 w-4.5 shrink-0" />
            <span>Secure Logout</span>
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Desktop Top Header */}
        <header className="hidden md:flex h-16 w-full items-center justify-between border-b border-border bg-card px-8 sticky top-16 z-40 select-none">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-accent" />
            <h2 className="font-extrabold text-sm tracking-tight">Metropolitan Officer Portal</h2>
          </div>

          <div className="flex items-center gap-4 relative">
            {/* Quick stats details */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-muted/30 text-3xs font-semibold text-muted-foreground uppercase tracking-wider">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>CI-Secured Link</span>
            </div>

            {/* Desktop Notifications Bell */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowNotifDropdown(!showNotifDropdown)}
                className="h-10 w-10 rounded-xl border border-border bg-background hover:bg-muted"
              >
                <Bell className="h-4.5 w-4.5 text-muted-foreground" />
                {unreadNotifs.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-accent-foreground">
                    {unreadNotifs.length}
                  </span>
                )}
              </Button>

              {/* Notification Dropdown Drawer */}
              <AnimatePresence>
                {showNotifDropdown && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowNotifDropdown(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-2xl shadow-xl z-50 p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between border-b border-border pb-2">
                        <span className="font-extrabold text-xs">Notifications</span>
                        <span className="text-3xs text-muted-foreground font-semibold">({unreadNotifs.length} unread)</span>
                      </div>
                      
                      <div className="max-h-60 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                        {notifications.length === 0 ? (
                          <div className="text-center py-6 text-2xs text-muted-foreground">No alerts at this time.</div>
                        ) : (
                          notifications.map((notif) => (
                            <div
                              key={notif.id}
                              onClick={() => { markNotificationRead(notif.id); }}
                              className={`p-2.5 rounded-xl border transition-colors cursor-pointer text-left ${
                                notif.read
                                  ? "border-border/50 bg-background/50 hover:bg-muted/30"
                                  : "border-primary/20 bg-primary/5 hover:bg-primary/10"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className={`text-2xs font-extrabold ${notif.read ? "text-muted-foreground" : "text-foreground"}`}>
                                  {notif.title}
                                </span>
                                <span className="text-[9px] text-muted-foreground">{notif.date}</span>
                              </div>
                              <p className="text-3xs text-muted-foreground mt-1 leading-normal">{notif.message}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
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
