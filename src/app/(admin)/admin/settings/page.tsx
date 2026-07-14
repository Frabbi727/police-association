"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Settings, RefreshCw, Trash2, Info, AlertTriangle, ShieldCheck } from "lucide-react";

export default function AdminSettingsPage() {
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null);

  const handleResetDemo = () => {
    if (confirm("Are you sure you want to reset all demo database logs? This will wipe your bookings, registrations, and custom invoices, resetting the database to the default static records.")) {
      try {
        localStorage.clear();
        setSuccessMsg("Demo state has been cleared and reset. Reloading page...");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } catch (e) {
        alert("Failed to reset localStorage data.");
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">System Configurations</h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Configure security flags, adjust mock schedules, or clear local mock database caches.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Reset Database & Configurations (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {successMsg && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-2xs font-semibold rounded-xl flex items-center gap-2">
              <ShieldCheck className="h-4.5 w-4.5 shrink-0 animate-bounce" />
              <span>{successMsg}</span>
            </div>
          )}

          <Card className="border-border">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                <Settings className="h-4.5 w-4.5 text-accent" />
                Demo Control Operations
              </CardTitle>
              <CardDescription className="text-3xs">
                Manage system data parameters in this frontend-only sandboxed deployment.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 text-left space-y-6">
              
              {/* Toggle 1 */}
              <div className="flex justify-between items-center pb-4 border-b border-border/40">
                <div className="space-y-0.5 max-w-[70%]">
                  <h4 className="font-extrabold text-xs text-foreground">Interactive Presenter Mode</h4>
                  <p className="text-3xs text-muted-foreground leading-normal">
                    Sync client and administrative views instantly in the same browser session.
                  </p>
                </div>
                <div className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" id="admin-mode-toggle" />
                  <div className="w-9 h-5 bg-muted rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accent" />
                </div>
              </div>

              {/* Toggle 2 */}
              <div className="flex justify-between items-center pb-4 border-b border-border/40">
                <div className="space-y-0.5 max-w-[70%]">
                  <h4 className="font-extrabold text-xs text-foreground">Mock Server Latency</h4>
                  <p className="text-3xs text-muted-foreground leading-normal">
                    Add artificial delay (800ms - 1200ms) to form submissions to showcase loading skeleton indicators.
                  </p>
                </div>
                <div className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" id="delay-toggle" />
                  <div className="w-9 h-5 bg-muted rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accent" />
                </div>
              </div>

              {/* Reset Database Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <div className="space-y-0.5 max-w-sm">
                  <h4 className="font-extrabold text-xs text-destructive flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4 shrink-0 text-destructive" />
                    Reset Sandbox Database
                  </h4>
                  <p className="text-3xs text-muted-foreground leading-normal">
                    Restore the state variables and delete localStorage caches, returning the system data to default.
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="rounded-xl text-3xs font-bold h-9 px-4 border-destructive text-destructive hover:bg-destructive/10 shrink-0 gap-1"
                  onClick={handleResetDemo}
                >
                  <Trash2 className="h-3.5 w-3.5 shrink-0" />
                  Reset Database Logs
                </Button>
              </div>

            </CardContent>
          </Card>
        </div>

        {/* Right Side: Informative guidance (5 cols) */}
        <div className="lg:col-span-5 space-y-6 text-left">
          <Card className="border-border bg-card/40">
            <CardHeader className="pb-3 border-b border-border">
              <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                <Info className="h-4.5 w-4.5 text-accent" />
                Admin Architecture
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 text-3xs text-muted-foreground leading-relaxed space-y-3">
              <p>
                The administrative panel operates entirely on client-side React hooks for state storage and localStorage for persistence. This allows reviewers to experience complete full-stack functionality without deploying database infrastructure.
              </p>
              <div className="p-3 bg-muted/40 border border-border/40 rounded-xl text-foreground font-semibold flex items-center gap-1.5">
                <RefreshCw className="h-3.5 w-3.5 text-accent animate-spin" />
                <span>Synchronized with Client View</span>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>

    </div>
  );
}
