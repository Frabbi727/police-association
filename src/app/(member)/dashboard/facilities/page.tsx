"use client";

import * as React from "react";
import { useDemo } from "@/lib/demo-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, Calendar, Info, Clock, AlertTriangle } from "lucide-react";

type FacilityType = "Community Hall" | "Guest House Suite A" | "Guest House Suite B" | "Tactical Training Room";

export default function FacilitiesPage() {
  const { user, facilityBookings, bookFacility, cancelFacilityBooking } = useDemo();
  
  const [selectedFacility, setSelectedFacility] = React.useState<FacilityType>("Community Hall");
  const [bookingDate, setBookingDate] = React.useState("");
  const [bookingDuration, setBookingDuration] = React.useState("1 Day");
  const [bookingError, setBookingError] = React.useState<string | null>(null);
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null);

  // Price calculations
  const prices: Record<FacilityType, number> = {
    "Community Hall": 250,
    "Guest House Suite A": 60,
    "Guest House Suite B": 60,
    "Tactical Training Room": 100
  };

  const getAmount = () => {
    const rate = prices[selectedFacility] || 0;
    if (bookingDuration.includes("Hours") || bookingDuration.includes("Hour")) {
      const hours = parseInt(bookingDuration) || 1;
      return (rate / 8) * hours; // hourly rate is fraction of daily rate
    } else {
      const days = parseInt(bookingDuration) || 1;
      return rate * days;
    }
  };

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingError(null);
    setSuccessMsg(null);

    if (!bookingDate) {
      setBookingError("Please select a valid reservation date.");
      return;
    }

    const amount = getAmount();
    bookFacility(selectedFacility, bookingDate, bookingDuration, amount);
    
    setSuccessMsg(`Reservation request filed! Invoice for $${amount} generated.`);
    setBookingDate("");
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  const userBookings = facilityBookings.filter(b => b.bookedBy === user?.badgeNumber);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Facility & Booking Reservations</h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Reserve shared association spaces, lodging facilities, or training rooms. Pricing is subsidized for active members.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Booking Form (5 cols) */}
        <div className="lg:col-span-5">
          <Card className="border-border">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                <Building className="h-4.5 w-4.5 text-accent" />
                Reserve Space
              </CardTitle>
              <CardDescription className="text-3xs">
                Select space, date, and duration. Billing is auto-generated.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleBook} noValidate>
              <CardContent className="space-y-4 pt-6">
                
                {bookingError && (
                  <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-2xs font-semibold rounded-xl flex items-center gap-2">
                    <AlertTriangle className="h-4.5 w-4.5 shrink-0" />
                    <span>{bookingError}</span>
                  </div>
                )}

                {successMsg && (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-2xs font-semibold rounded-xl flex items-center gap-2">
                    <Info className="h-4.5 w-4.5 shrink-0" />
                    <span>{successMsg}</span>
                  </div>
                )}

                {/* Facility Select */}
                <div className="space-y-1.5">
                  <Label htmlFor="facility" className="text-xs font-semibold">Select Facility</Label>
                  <Select
                    value={selectedFacility}
                    onValueChange={(val) => setSelectedFacility((val || "Community Hall") as FacilityType)}
                  >
                    <SelectTrigger id="facility" className="rounded-xl h-11 border-border">
                      <SelectValue placeholder="Select facility" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="Community Hall">Community Hall ($250/day)</SelectItem>
                      <SelectItem value="Guest House Suite A">Guest House Suite A ($60/day)</SelectItem>
                      <SelectItem value="Guest House Suite B">Guest House Suite B ($60/day)</SelectItem>
                      <SelectItem value="Tactical Training Room">Tactical Training Room ($100/day)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Reservation Date */}
                <div className="space-y-1.5">
                  <Label htmlFor="date" className="text-xs font-semibold">Reservation Date</Label>
                  <Input
                    id="date"
                    type="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="rounded-xl h-11 border-border focus-visible:ring-accent"
                  />
                </div>

                {/* Duration */}
                <div className="space-y-1.5">
                  <Label htmlFor="duration" className="text-xs font-semibold">Booking Duration</Label>
                  <Select
                    value={bookingDuration}
                    onValueChange={(val) => setBookingDuration(val || "1 Day")}
                  >
                    <SelectTrigger id="duration" className="rounded-xl h-11 border-border">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="1 Day">1 Day</SelectItem>
                      <SelectItem value="2 Days">2 Days</SelectItem>
                      <SelectItem value="3 Days">3 Days</SelectItem>
                      <SelectItem value="4 Hours">4 Hours</SelectItem>
                      <SelectItem value="8 Hours">8 Hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Estimate Summary */}
                <div className="p-3 bg-muted/40 border border-border/60 rounded-xl flex items-center justify-between text-2xs mt-4">
                  <span className="text-muted-foreground font-semibold">Estimated Booking Fee:</span>
                  <span className="font-extrabold text-foreground text-sm">${getAmount()}</span>
                </div>

              </CardContent>
              <CardFooter className="pt-2 pb-6 border-t border-border mt-4">
                <Button type="submit" className="rounded-xl h-11 w-full bg-primary hover:bg-primary/95 text-primary-foreground font-semibold text-xs shadow-md">
                  File Reservation Request
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>

        {/* Right Side: Active Reservations List (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="border-border">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                <Calendar className="h-4.5 w-4.5 text-accent" />
                Reservation Log
              </CardTitle>
              <CardDescription className="text-3xs">
                History of facility bookings and approval status. Invoices appear in the Payments tab.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-4 max-h-[400px] overflow-y-auto scrollbar-thin">
              {userBookings.length === 0 ? (
                <div className="text-center py-12 text-2xs text-muted-foreground">
                  You have no facility bookings on record.
                </div>
              ) : (
                userBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="p-4 rounded-2xl border border-border bg-card/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-left"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-extrabold text-xs text-foreground">{booking.facility}</h4>
                      </div>
                      <div className="flex gap-2 text-4xs text-muted-foreground font-bold uppercase tracking-wider">
                        <span>Date: {booking.date}</span>
                        <span>•</span>
                        <span>Duration: {booking.duration}</span>
                        <span>•</span>
                        <span>Ref: {booking.id}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4">
                      <div className="text-left sm:text-right">
                        <span className="text-[10px] text-muted-foreground block font-bold">Fee Amount</span>
                        <span className="text-xs font-black text-foreground">${booking.amount}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          booking.status === "Approved" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" :
                          booking.status === "Cancelled" ? "bg-red-500/10 text-red-500 border border-red-500/20" :
                          "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                        }`}>
                          {booking.status}
                        </span>

                        {booking.status === "Pending" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="rounded-lg text-[10px] h-8 px-2.5 text-destructive hover:bg-destructive/10 border border-transparent hover:border-destructive/20 font-bold"
                            onClick={() => cancelFacilityBooking(booking.id)}
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card className="border-border bg-muted/20">
            <CardContent className="p-4 flex gap-3 text-left">
              <Info className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-foreground">Subsidized Pricing details</h4>
                <p className="text-3xs text-muted-foreground leading-relaxed">
                  Community Hall bookings require a refundable security deposit. Lodging check-ins occur at the headquarters reception from 2:00 PM. Booking fee invoices must be paid within 48 hours of reservation approval.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>

    </div>
  );
}
