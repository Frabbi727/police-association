"use client";

import * as React from "react";
import { useDemo } from "@/lib/demo-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, Search, BookmarkCheck, CalendarClock, ShieldCheck } from "lucide-react";

export default function LibraryPage() {
  const { user, books, borrowBook, returnBook } = useDemo();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const categories = ["All", "Law & Code", "Mental Health", "Physical Training", "History"];

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const myBorrowedBooks = books.filter((b) => b.borrowedBy === user?.badgeNumber);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Library & Resources Catalog</h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Browse, search, and borrow professional manuals, law codes, physical training guides, and wellness journals.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Panel: Catalog list and search filters (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Filters card */}
          <Card className="border-border bg-card/40">
            <CardContent className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by book title or author..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-xl pl-10 h-10 border-border bg-background focus-visible:ring-accent"
                />
              </div>

              {/* Category buttons list */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? "default" : "outline"}
                    className="rounded-xl text-3xs font-bold h-9 px-3 border-border"
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </Button>
                ))}
              </div>

            </CardContent>
          </Card>

          {/* Book Catalog Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredBooks.length === 0 ? (
              <div className="col-span-full text-center py-12 border border-dashed border-border rounded-2xl text-xs text-muted-foreground">
                No publications found matching your selection.
              </div>
            ) : (
              filteredBooks.map((book) => {
                const isBorrowedByMe = book.borrowedBy === user?.badgeNumber;
                const isAvailable = book.status === "Available";
                
                return (
                  <Card key={book.id} className={`border-border transition-all duration-200 ${isBorrowedByMe ? 'border-primary/50 bg-primary/5' : 'bg-card'}`}>
                    <CardContent className="p-5 flex flex-col justify-between h-[150px] text-left">
                      <div className="flex justify-between items-start">
                        <div className="space-y-0.5">
                          <span className="text-[9px] font-bold text-accent uppercase tracking-wider">{book.category}</span>
                          <h3 className="font-extrabold text-xs text-foreground leading-snug line-clamp-1">{book.title}</h3>
                          <p className="text-[10px] text-muted-foreground">By {book.author}</p>
                        </div>
                        <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          isAvailable ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                          isBorrowedByMe ? 'bg-primary/25 text-primary border border-primary/30' :
                          'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                        }`}>
                          {isAvailable ? 'Available' : isBorrowedByMe ? 'Checked Out' : 'Unavailable'}
                        </span>
                      </div>

                      <div className="border-t border-border/40 pt-3 flex items-center justify-between">
                        <div>
                          {isBorrowedByMe ? (
                            <div className="flex items-center gap-1 text-[9px] text-primary font-bold">
                              <CalendarClock className="h-3.5 w-3.5" />
                              <span>Due: {book.dueDate}</span>
                            </div>
                          ) : (
                            <span className="text-4xs text-muted-foreground font-semibold">Ref Code: {book.id}</span>
                          )}
                        </div>

                        {isAvailable ? (
                          <Button
                            size="sm"
                            className="rounded-lg text-3xs font-bold h-8 px-4 bg-primary hover:bg-primary/95 text-primary-foreground"
                            onClick={() => borrowBook(book.id)}
                          >
                            Borrow Item
                          </Button>
                        ) : isBorrowedByMe ? (
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-lg text-3xs font-bold h-8 px-4 border-destructive text-destructive hover:bg-destructive/10"
                            onClick={() => returnBook(book.id)}
                          >
                            Return Book
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="ghost"
                            disabled
                            className="rounded-lg text-3xs font-bold h-8 px-4 text-muted-foreground bg-muted/30"
                          >
                            Out of Stock
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>

        </div>

        {/* Right Panel: Loan Status / Rules (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-border bg-card/40">
            <CardHeader className="pb-3 border-b border-border">
              <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                <BookOpen className="h-4.5 w-4.5 text-accent" />
                Library Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 text-left space-y-4">
              {[
                { title: "Standard Borrow Limit", desc: "Members are permitted to borrow up to 3 physical or digital resources simultaneously." },
                { title: "2-Week Loan Cycle", desc: "Loan duration is 14 days. Items can be renewed once if there are no pending reserves from other officers." },
                { title: "Overdue Notices", desc: "System alerts will trigger automatically. Unreturned manuals after 30 days are subject to replacements fees." },
                { title: "Physical Collection", desc: "Bring your digital ID card to the headquarters room 302 to pick up or return checked out volumes." }
              ].map((policy, idx) => (
                <div key={idx} className="space-y-1">
                  <h4 className="text-2xs font-extrabold text-foreground">{policy.title}</h4>
                  <p className="text-3xs text-muted-foreground leading-normal">{policy.desc}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-accent/30 bg-accent/5">
            <CardContent className="p-5 flex items-start gap-3">
              <BookmarkCheck className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <div className="space-y-1 text-left">
                <h4 className="text-xs font-bold text-accent">Active Loans</h4>
                <p className="text-3xs text-muted-foreground leading-normal">
                  {myBorrowedBooks.length === 0
                    ? "You do not have any borrowed resources currently."
                    : `You have checked out ${myBorrowedBooks.length} items. Keep track of due dates.`}
                </p>
                {myBorrowedBooks.map((b) => (
                  <div key={b.id} className="text-4xs text-foreground/80 mt-1 font-semibold truncate">
                    • {b.title} (Due {b.dueDate})
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>

    </div>
  );
}
