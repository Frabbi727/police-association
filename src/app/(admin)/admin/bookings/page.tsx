"use client";

import * as React from "react";
import { useDemo } from "@/lib/demo-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Trash2, CheckCircle2, Clock, MapPin, ShieldAlert } from "lucide-react";

export default function AdminBookingsPage() {
  const {
    gymBookings,
    facilityBookings,
    cancelGymSlot,
    approveFacilityBooking,
    cancelFacilityBooking,
    members
  } = useDemo();

  const getMemberName = (badge: string) => {
    return members.find((m) => m.badge === badge)?.name || `Officer (Badge #${badge})`;
  };

  const activeGymBookings = gymBookings.filter((b) => b.reservedBy !== "available");

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Reservations Registry</h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Track wellness slots and check-in schedules for community halls and lodging.
        </p>
      </div>

      <Tabs defaultValue="facilities" className="w-full">
        <TabsList className="bg-muted rounded-xl p-1 mb-6">
          <TabsTrigger value="facilities" className="rounded-lg text-xs px-4 py-1.5 font-semibold">
            Facilities Bookings ({facilityBookings.length})
          </TabsTrigger>
          <TabsTrigger value="gym" className="rounded-lg text-xs px-4 py-1.5 font-semibold">
            Gym Slots Reserved ({activeGymBookings.length})
          </TabsTrigger>
        </TabsList>

        {/* Facilities Bookings Tab */}
        <TabsContent value="facilities" className="outline-hidden space-y-4">
          <Card className="border-border">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                <Calendar className="h-4.5 w-4.5 text-accent" />
                Lodging & Hall Reservations
              </CardTitle>
              <CardDescription className="text-3xs">
                Approve pending facility reservation requests or cancel existing bookings.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 text-left">
              {facilityBookings.length === 0 ? (
                <div className="text-center py-12 text-xs text-muted-foreground">
                  No facility bookings registered.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-2xs text-left">
                    <thead className="bg-muted/40 border-b border-border text-3xs font-extrabold uppercase tracking-wider text-muted-foreground select-none">
                      <tr>
                        <th className="p-4">Reference</th>
                        <th className="p-4">Facility / Date</th>
                        <th className="p-4">Booked By</th>
                        <th className="p-4">Rate Fee</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                      {facilityBookings.map((bk) => (
                        <tr key={bk.id} className="hover:bg-muted/20 transition-colors">
                          <td className="p-4 font-extrabold text-foreground">{bk.id}</td>
                          <td className="p-4">
                            <div className="font-extrabold text-foreground">{bk.facility}</div>
                            <div className="text-[10px] text-muted-foreground">
                              Date: {bk.date} • Duration: {bk.duration}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="font-semibold text-foreground/80">{getMemberName(bk.bookedBy)}</div>
                            <div className="text-[10px] text-muted-foreground">Badge: #{bk.bookedBy}</div>
                          </td>
                          <td className="p-4 font-bold text-foreground">${bk.amount}</td>
                          <td className="p-4">
                            <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                              bk.status === "Approved" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" :
                              bk.status === "Cancelled" ? "bg-red-500/10 text-red-500 border border-red-500/20" :
                              "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                            }`}>
                              {bk.status}
                            </span>
                          </td>
                          <td className="p-4 text-right space-x-2">
                            {bk.status === "Pending" && (
                              <>
                                <Button
                                  size="sm"
                                  className="rounded-lg text-[10px] h-8 px-3 bg-emerald-500 hover:bg-emerald-500/90 text-slate-950 font-bold gap-1"
                                  onClick={() => approveFacilityBooking(bk.id)}
                                >
                                  <CheckCircle2 className="h-3.5 w-3.5" />
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="rounded-lg text-[10px] h-8 px-3 border-destructive text-destructive hover:bg-destructive/10 font-bold gap-1"
                                  onClick={() => cancelFacilityBooking(bk.id)}
                                >
                                  Cancel
                                </Button>
                              </>
                            )}
                            {bk.status === "Approved" && (
                              <Button
                                size="sm"
                                variant="ghost"
                                className="rounded-lg text-[10px] h-8 px-3 text-destructive hover:bg-destructive/10 border border-transparent hover:border-destructive/20 font-bold gap-1"
                                onClick={() => cancelFacilityBooking(bk.id)}
                              >
                                Revoke
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Gym Slots Reserved Tab */}
        <TabsContent value="gym" className="outline-hidden space-y-4">
          <Card className="border-border">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                <MapPin className="h-4.5 w-4.5 text-accent" />
                Active Gym Bookings
              </CardTitle>
              <CardDescription className="text-3xs">
                List of scheduled physical conditioning training sessions.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 text-left">
              {activeGymBookings.length === 0 ? (
                <div className="text-center py-12 text-xs text-muted-foreground border-t border-border">
                  No active gym slots reserved currently.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-2xs text-left">
                    <thead className="bg-muted/40 border-b border-border text-3xs font-extrabold uppercase tracking-wider text-muted-foreground select-none">
                      <tr>
                        <th className="p-4">Schedule Time</th>
                        <th className="p-4">Day</th>
                        <th className="p-4">Reserved By</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                      {activeGymBookings.map((slot) => (
                        <tr key={slot.id} className="hover:bg-muted/20 transition-colors">
                          <td className="p-4">
                            <div className="font-extrabold text-foreground flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                              {slot.slot}
                            </div>
                          </td>
                          <td className="p-4 font-semibold text-foreground/80">{slot.day}</td>
                          <td className="p-4">
                            <div className="font-semibold text-foreground/80">{getMemberName(slot.reservedBy)}</div>
                            <div className="text-[10px] text-muted-foreground">Badge: #{slot.reservedBy}</div>
                          </td>
                          <td className="p-4 text-right">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="rounded-lg text-[10px] h-8 px-3 text-destructive hover:bg-destructive/10 border border-transparent hover:border-destructive/20 font-bold gap-1"
                              onClick={() => cancelGymSlot(slot.id)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              Release Slot
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
