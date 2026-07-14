"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, ShieldAlert, KeyRound, CheckCircle, HelpCircle } from "lucide-react";

export default function SettingsPage() {
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null);
  const [formError, setFormError] = React.useState<string | null>(null);
  
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSuccessMsg(null);

    if (currentPassword.length < 6) {
      setFormError("Current password must be at least 6 characters.");
      return;
    }
    if (newPassword.length < 6) {
      setFormError("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setFormError("New password and confirmation password do not match.");
      return;
    }

    setSuccessMsg("Security credentials updated successfully.");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Portal Settings & Security</h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Manage your notification preferences, security parameters, and credential updates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Panel: Security password form (6 cols) */}
        <div className="lg:col-span-6">
          <Card className="border-border">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                <KeyRound className="h-4.5 w-4.5 text-accent" />
                Change Password
              </CardTitle>
              <CardDescription className="text-3xs">
                Update your security password regularly to ensure CJIS data compliance.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handlePasswordReset} noValidate>
              <CardContent className="space-y-4 pt-6">
                
                {formError && (
                  <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-2xs font-semibold rounded-xl flex items-center gap-2">
                    <ShieldAlert className="h-4.5 w-4.5 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {successMsg && (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-2xs font-semibold rounded-xl flex items-center gap-2">
                    <CheckCircle className="h-4.5 w-4.5 shrink-0" />
                    <span>{successMsg}</span>
                  </div>
                )}

                {/* Current Password */}
                <div className="space-y-1.5">
                  <Label htmlFor="current-password" className="text-xs font-semibold">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    required
                    autoComplete="current-password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="rounded-xl h-11 border-border focus-visible:ring-accent"
                  />
                </div>

                {/* New Password */}
                <div className="space-y-1.5">
                  <Label htmlFor="new-password" className="text-xs font-semibold">New Password (min 6 characters)</Label>
                  <Input
                    id="new-password"
                    type="password"
                    required
                    autoComplete="new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="rounded-xl h-11 border-border focus-visible:ring-accent"
                  />
                </div>

                {/* Confirm Password */}
                <div className="space-y-1.5">
                  <Label htmlFor="confirm-password" className="text-xs font-semibold">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    required
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="rounded-xl h-11 border-border focus-visible:ring-accent"
                  />
                </div>

              </CardContent>
              <CardFooter className="pt-2 pb-6 border-t border-border mt-4">
                <Button type="submit" className="rounded-xl h-11 bg-primary hover:bg-primary/95 text-primary-foreground font-semibold text-xs shadow-md">
                  Update Password Credentials
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>

        {/* Right Panel: Preferences toggles & advisories (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <Card className="border-border">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                <Settings className="h-4.5 w-4.5 text-accent" />
                Portal Preferences
              </CardTitle>
              <CardDescription className="text-3xs">
                Configure notifications and security settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 text-left space-y-5">
              {[
                { title: "Email Notifications", desc: "Send automated updates for approved welfare claims and bookings.", enabled: true },
                { title: "SMS Broadcasts", desc: "Receive emergency notifications for collective bargaining developments.", enabled: false },
                { title: "Two-Factor Auth (2FA)", desc: "Enforce multi-factor authorization during secure badge login sessions.", enabled: true }
              ].map((pref, idx) => (
                <div key={idx} className="flex justify-between items-center pb-4 border-b border-border/40 last:border-b-0 last:pb-0">
                  <div className="space-y-0.5 max-w-[70%]">
                    <h4 className="font-extrabold text-xs text-foreground">{pref.title}</h4>
                    <p className="text-3xs text-muted-foreground leading-normal">{pref.desc}</p>
                  </div>
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked={pref.enabled}
                      className="sr-only peer"
                      id={`pref-toggle-${idx}`}
                    />
                    <div className="w-9 h-5 bg-muted peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accent" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border bg-card/40">
            <CardHeader className="pb-3 border-b border-border">
              <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                <HelpCircle className="h-4.5 w-4.5 text-primary" />
                Access Log Diagnostics
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 text-left space-y-2 text-3xs text-muted-foreground font-semibold">
              <div className="flex justify-between">
                <span>Last Login Timestamp:</span>
                <span className="text-foreground">Today, 23:36:23</span>
              </div>
              <div className="flex justify-between">
                <span>IP Address:</span>
                <span className="text-foreground">192.168.1.104</span>
              </div>
              <div className="flex justify-between">
                <span>Browser Client:</span>
                <span className="text-foreground">Chrome / macOS</span>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>

    </div>
  );
}
