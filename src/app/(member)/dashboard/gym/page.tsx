"use client";

import * as React from "react";
import { useDemo } from "@/lib/demo-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, AlertTriangle, ShieldCheck } from "lucide-react";

export default function GymBookingPage() {
  const { user, gymBookings, bookGymSlot, cancelGymSlot } = useDemo();
  const [activeDay, setActiveDay] = React.useState("Monday");

  const days = ["Monday", "Tuesday"]; // Demo supports Monday/Tuesday slots

  const slotsForDay = gymBookings.filter(b => b.day === activeDay);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Gym Reservation</h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Reserve physical training slots at the headquarters wellness center. Max 1 slot per officer per day.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Schedule and Slot Select (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <Tabs defaultValue="Monday" onValueChange={setActiveDay} className="w-full">
            <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
              <TabsList className="bg-muted rounded-xl p-1">
                {days.map((day) => (
                  <TabsTrigger key={day} value={day} className="rounded-lg text-xs px-4 py-1.5 font-semibold">
                    {day}
                  </TabsTrigger>
                ))}
              </TabsList>
              <span className="text-3xs text-muted-foreground uppercase font-bold tracking-wider">
                {slotsForDay.length} Slots Programmed
              </span>
            </div>

            {days.map((day) => (
              <TabsContent key={day} value={day} className="space-y-4 outline-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {slotsForDay.map((slot) => {
                    const isReservedByMe = slot.reservedBy === user?.badgeNumber;
                    const isAvailable = slot.reservedBy === "available";
                    
                    return (
                      <Card key={slot.id} className={`border-border transition-all duration-200 ${isReservedByMe ? 'border-primary/50 bg-primary/5' : 'bg-card'}`}>
                        <CardContent className="p-5 flex flex-col justify-between h-[130px]">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <span className="text-[10px] font-bold text-accent tracking-widest uppercase">{day}</span>
                              <div className="flex items-center gap-1.5 text-xs font-extrabold text-foreground">
                                <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                                <span>{slot.slot}</span>
                              </div>
                            </div>
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                              isAvailable ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                              isReservedByMe ? 'bg-primary/25 text-primary border border-primary/30' :
                              'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                            }`}>
                              {isAvailable ? 'Available' : isReservedByMe ? 'Reserved By You' : 'Booked'}
                            </span>
                          </div>

                          <div className="flex items-center justify-between border-t border-border/40 pt-3">
                            <span className="text-3xs text-muted-foreground font-semibold">
                              {!isAvailable && !isReservedByMe ? `Reserved (Badge #${slot.reservedBy})` : 'Access permitted'}
                            </span>
                            
                            {isAvailable ? (
                              <Button
                                size="sm"
                                className="rounded-lg text-3xs font-bold h-8 px-4 bg-primary hover:bg-primary/95 text-primary-foreground"
                                onClick={() => bookGymSlot(slot.id)}
                              >
                                Reserve Slot
                              </Button>
                            ) : isReservedByMe ? (
                              <Button
                                size="sm"
                                variant="outline"
                                className="rounded-lg text-3xs font-bold h-8 px-4 border-destructive text-destructive hover:bg-destructive/10"
                                onClick={() => cancelGymSlot(slot.id)}
                              >
                                Cancel Slot
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="ghost"
                                disabled
                                className="rounded-lg text-3xs font-bold h-8 px-4 text-muted-foreground bg-muted/30"
                              >
                                Unavailable
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Right Side: Regulations / Guidelines Card (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-border bg-card/40">
            <CardHeader className="pb-3 border-b border-border">
              <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                <AlertTriangle className="h-4.5 w-4.5 text-accent" />
                Wellness Regulations
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 text-left space-y-4">
              {[
                { title: "Badge ID Scanning", desc: "You must scan your digital ID barcode at the entrance reader to unlock gym turnstiles." },
                { title: "Slot Limitations", desc: "Reservations lock out other members. Please cancel slots at least 2 hours prior if you cannot attend." },
                { title: "Guest Policy", desc: "Gym access is restricted to active and retired association officers. Guests/family are not permitted due to liability regulations." },
                { title: "Welfare Relief", desc: "Wellness support is funded entirely by MPA membership dues. Maintain equipment integrity." }
              ].map((rule, idx) => (
                <div key={idx} className="space-y-1">
                  <h4 className="text-2xs font-extrabold text-foreground">{rule.title}</h4>
                  <p className="text-3xs text-muted-foreground leading-normal">{rule.desc}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-accent/30 bg-accent/5">
            <CardContent className="p-5 flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <div className="space-y-1 text-left">
                <h4 className="text-xs font-bold text-accent">Active Reservations</h4>
                <p className="text-3xs text-muted-foreground leading-normal">
                  {gymBookings.filter(b => b.reservedBy === user?.badgeNumber).length === 0
                    ? "You do not have any slots booked for this week."
                    : `You have successfully reserved ${gymBookings.filter(b => b.reservedBy === user?.badgeNumber).length} wellness slot(s).`}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>

    </div>
  );
}
