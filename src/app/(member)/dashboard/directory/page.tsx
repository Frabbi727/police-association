"use client";

import * as React from "react";
import { useDemo } from "@/lib/demo-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Search, Mail, Phone, Shield, ShieldAlert, Award } from "lucide-react";

export default function DirectoryPage() {
  const { members } = useDemo();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [rankFilter, setRankFilter] = React.useState("All");
  const [loading, setLoading] = React.useState(false);

  // Ranks inside the dataset
  const ranks = ["All", "Patrol Officer", "Detective", "Sergeant", "Captain", "Retired"];

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.badge.includes(searchQuery) ||
      member.division.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRank = rankFilter === "All" || member.rank.includes(rankFilter) || (rankFilter === "Retired" && member.status === "Retired");
    return matchesSearch && matchesRank;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Association Member Directory</h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Look up active and retired union members. This database is strictly for internal coordination.
        </p>
      </div>

      {/* Filters card */}
      <Card className="border-border bg-card/40">
        <CardContent className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name, badge number, or precinct division..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="rounded-xl pl-10 h-10 border-border bg-background focus-visible:ring-accent"
            />
          </div>

          {/* Ranks quick buttons */}
          <div className="flex flex-wrap gap-2">
            {ranks.map((rank) => (
              <Button
                key={rank}
                variant={rankFilter === rank ? "default" : "outline"}
                className="rounded-xl text-3xs font-bold h-9 px-3 border-border"
                onClick={() => setRankFilter(rank)}
              >
                {rank}
              </Button>
            ))}
          </div>

        </CardContent>
      </Card>

      {/* Directory Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="border-border animate-pulse bg-card/30">
              <CardContent className="p-5 h-[150px] flex flex-col justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-muted rounded-xl" />
                  <div className="space-y-2 flex-1">
                    <div className="h-3.5 bg-muted rounded-md w-2/3" />
                    <div className="h-2 bg-muted rounded-md w-1/3" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="h-2 bg-muted rounded-md w-3/4" />
                  <div className="h-2 bg-muted rounded-md w-1/2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredMembers.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border rounded-2xl space-y-3">
          <div className="mx-auto h-12 w-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <h3 className="text-base font-extrabold">No Members Found</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Your search query did not yield any records in the association database. Try reviewing spelling or badge numbers.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member, idx) => (
            <Card
              key={idx}
              className={`border-border bg-card hover:border-primary/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between text-left`}
            >
              <CardContent className="p-5 space-y-4">
                
                {/* Header Profile Info */}
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-primary/10 border border-primary/20 text-primary rounded-xl flex items-center justify-center shrink-0">
                    {member.status === "Retired" ? (
                      <Award className="h-5 w-5 text-accent" />
                    ) : (
                      <Shield className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-extrabold text-xs text-foreground truncate">{member.name}</h3>
                    <span className="text-[10px] text-accent font-bold uppercase tracking-wider block">
                      {member.rank} • #{member.badge}
                    </span>
                  </div>
                </div>

                {/* Details list */}
                <div className="space-y-2 border-t border-border/40 pt-3 text-3xs text-muted-foreground font-semibold">
                  <div className="flex items-center justify-between">
                    <span>Division:</span>
                    <span className="text-foreground font-bold">{member.division}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Status:</span>
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] uppercase tracking-wider ${
                      member.status === "Active" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" :
                      member.status === "Suspended" ? "bg-red-500/10 text-red-500 border border-red-500/20" :
                      "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                    }`}>
                      {member.status}
                    </span>
                  </div>
                </div>

                {/* Quick actions contact */}
                <div className="pt-2 flex justify-between gap-3 text-4xs">
                  <Button
                    variant="outline"
                    className="rounded-xl flex-1 h-8 border-border text-[10px] flex items-center justify-center gap-1 hover:bg-muted"
                    onClick={() => { alert(`Directing email client to: ${member.email}`); }}
                  >
                    <Mail className="h-3.5 w-3.5 shrink-0" />
                    Email Officer
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-xl flex-1 h-8 border-border text-[10px] flex items-center justify-center gap-1 hover:bg-muted"
                    onClick={() => { alert(`Dialing: ${member.phone}`); }}
                  >
                    <Phone className="h-3.5 w-3.5 shrink-0" />
                    Call Officer
                  </Button>
                </div>

              </CardContent>
            </Card>
          ))}
        </div>
      )}

    </div>
  );
}
