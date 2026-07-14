"use client";

import * as React from "react";
import { useDemo, Member } from "@/lib/demo-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Users, UserPlus, ShieldCheck, ShieldAlert, Mail, Phone } from "lucide-react";

export default function AdminMembersPage() {
  const { members, addMember } = useDemo();

  const [searchQuery, setSearchQuery] = React.useState("");
  const [showAddForm, setShowAddForm] = React.useState(false);

  // Form states
  const [newName, setNewName] = React.useState("");
  const [newBadge, setNewBadge] = React.useState("");
  const [newRank, setNewRank] = React.useState("Patrol Officer");
  const [newDivision, setNewDivision] = React.useState("");
  const [newEmail, setNewEmail] = React.useState("");
  const [newPhone, setNewPhone] = React.useState("");

  const [formError, setFormError] = React.useState<string | null>(null);
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null);

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSuccessMsg(null);

    if (!newName.trim()) return setFormError("Name is required.");
    if (newBadge.length < 3) return setFormError("Badge number must be at least 3 digits.");
    if (members.some(m => m.badge === newBadge)) return setFormError("A member with this badge number already exists.");
    if (!newDivision.trim()) return setFormError("Precinct/Division is required.");
    if (!newEmail.includes("@")) return setFormError("A valid email is required.");

    addMember({
      name: newName,
      badge: newBadge,
      rank: newRank,
      division: newDivision,
      email: newEmail,
      phone: newPhone || "(555) 000-0000"
    });

    setSuccessMsg(`Member ${newName} registered successfully! Badge #${newBadge} is now authorized for login.`);
    setNewName("");
    setNewBadge("");
    setNewDivision("");
    setNewEmail("");
    setNewPhone("");
    
    setTimeout(() => {
      setSuccessMsg(null);
      setShowAddForm(false);
    }, 3500);
  };

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.badge.includes(searchQuery) ||
    member.division.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Members Ledger</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Audit existing credentials, update ranks, or authorize new officers for secure portal access.
          </p>
        </div>
        <Button
          size="sm"
          className="rounded-xl h-9 text-xs font-bold bg-primary text-primary-foreground flex items-center gap-1 shadow self-start sm:self-center"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <UserPlus className="h-4 w-4" />
          {showAddForm ? "Hide Form" : "Register Officer"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Register Member Form (conditional overlay or sidebar, 4 cols) */}
        {showAddForm && (
          <div className="lg:col-span-4">
            <Card className="border-border">
              <CardHeader className="border-b border-border pb-4">
                <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                  <UserPlus className="h-4.5 w-4.5 text-accent" />
                  Add Member
                </CardTitle>
                <CardDescription className="text-3xs">
                  Authorize a new officer. Added badge numbers can log in immediately.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleAddMember} noValidate>
                <CardContent className="space-y-4 pt-6 text-left">
                  
                  {formError && (
                    <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-2xs font-semibold rounded-xl flex items-center gap-2">
                      <ShieldAlert className="h-4.5 w-4.5 shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  {successMsg && (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-2xs font-semibold rounded-xl flex items-center gap-2">
                      <ShieldCheck className="h-4.5 w-4.5 shrink-0" />
                      <span>{successMsg}</span>
                    </div>
                  )}

                  {/* Name */}
                  <div className="space-y-1.5">
                    <Label htmlFor="reg-name" className="text-xs font-semibold">Full Name</Label>
                    <Input
                      id="reg-name"
                      type="text"
                      required
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="rounded-xl h-10 border-border text-xs focus-visible:ring-accent"
                      placeholder="e.g. Officer Jane Smith"
                    />
                  </div>

                  {/* Badge */}
                  <div className="space-y-1.5">
                    <Label htmlFor="reg-badge" className="text-xs font-semibold">Badge Number</Label>
                    <Input
                      id="reg-badge"
                      type="text"
                      required
                      placeholder="e.g. 5293"
                      value={newBadge}
                      onChange={(e) => setNewBadge(e.target.value)}
                      className="rounded-xl h-10 border-border text-xs focus-visible:ring-accent"
                    />
                  </div>

                  {/* Rank */}
                  <div className="space-y-1.5">
                    <Label htmlFor="reg-rank" className="text-xs font-semibold">Rank / Role</Label>
                    <Select
                      value={newRank}
                      onValueChange={(val) => setNewRank(val || "Patrol Officer")}
                    >
                      <SelectTrigger id="reg-rank" className="rounded-xl h-10 border-border text-xs">
                        <SelectValue placeholder="Select rank" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="Patrol Officer">Patrol Officer</SelectItem>
                        <SelectItem value="Detective">Detective</SelectItem>
                        <SelectItem value="Sergeant">Sergeant</SelectItem>
                        <SelectItem value="Captain">Captain</SelectItem>
                        <SelectItem value="Retired Captain">Retired Captain</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Division */}
                  <div className="space-y-1.5">
                    <Label htmlFor="reg-div" className="text-xs font-semibold">Precinct Division</Label>
                    <Input
                      id="reg-div"
                      type="text"
                      required
                      placeholder="e.g. Patrol South"
                      value={newDivision}
                      onChange={(e) => setNewDivision(e.target.value)}
                      className="rounded-xl h-10 border-border text-xs focus-visible:ring-accent"
                    />
                  </div>

                  {/* Contact info */}
                  <div className="grid grid-cols-1 gap-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="reg-email" className="text-xs font-semibold">Email Address</Label>
                      <Input
                        id="reg-email"
                        type="email"
                        required
                        placeholder="jane.smith@metro-pd.gov"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        className="rounded-xl h-10 border-border text-xs focus-visible:ring-accent"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="reg-phone" className="text-xs font-semibold">Phone Number</Label>
                      <Input
                        id="reg-phone"
                        type="text"
                        placeholder="(555) 012-3092"
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value)}
                        className="rounded-xl h-10 border-border text-xs focus-visible:ring-accent"
                      />
                    </div>
                  </div>

                </CardContent>
                <CardFooter className="pt-2 pb-6 border-t border-border mt-4">
                  <Button type="submit" className="rounded-xl h-11 w-full bg-primary hover:bg-primary/95 text-primary-foreground font-semibold text-xs shadow-md">
                    Submit Registration Details
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        )}

        {/* Right Side: Ledger table (adjust width if form is open, 8/12 cols) */}
        <div className={showAddForm ? "lg:col-span-8 space-y-6" : "lg:col-span-12 space-y-6"}>
          <Card className="border-border">
            <CardHeader className="border-b border-border pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                    <Users className="h-4.5 w-4.5 text-accent" />
                    Credentialed Members Log
                  </CardTitle>
                  <CardDescription className="text-3xs">
                    Overview of credentials currently authorized on this portal.
                  </CardDescription>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search by name, badge..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="rounded-xl pl-9 h-9 border-border bg-muted/40 text-xs focus-visible:ring-accent"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-2xs text-left">
                  <thead className="bg-muted/40 border-b border-border text-3xs font-extrabold uppercase tracking-wider text-muted-foreground select-none">
                    <tr>
                      <th className="p-4">Name / Badge</th>
                      <th className="p-4">Rank / Division</th>
                      <th className="p-4">Contact Info</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {filteredMembers.map((member) => (
                      <tr key={member.badge} className="hover:bg-muted/20 transition-colors">
                        <td className="p-4">
                          <div className="font-extrabold text-foreground">{member.name}</div>
                          <div className="text-[10px] text-accent font-semibold tracking-wider uppercase">Badge #{member.badge}</div>
                        </td>
                        <td className="p-4">
                          <div className="font-semibold text-foreground/80">{member.rank}</div>
                          <div className="text-[10px] text-muted-foreground">{member.division}</div>
                        </td>
                        <td className="p-4 space-y-0.5">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Mail className="h-3 w-3 shrink-0" />
                            <span className="truncate max-w-[150px]">{member.email}</span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Phone className="h-3 w-3 shrink-0" />
                            <span>{member.phone}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                            member.status === "Active" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" :
                            member.status === "Suspended" ? "bg-red-500/10 text-red-500 border border-red-500/20" :
                            "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                          }`}>
                            {member.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>

    </div>
  );
}
