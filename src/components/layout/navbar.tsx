"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon, Shield, User, Heart } from "lucide-react";
import { useTheme } from "../theme-provider";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "News & FAQ", href: "/news" },
    { name: "Members Portal", href: "/dashboard" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md transition-all duration-300">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand/Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-105">
            <Shield className="h-6 w-6 text-accent group-hover:rotate-12 transition-transform duration-300" />
            <div className="absolute inset-0 rounded-xl bg-accent/25 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-foreground sm:text-lg">
              Metropolitan
            </span>
            <span className="text-2xs -mt-1 font-semibold uppercase tracking-widest text-accent">
              Police Association
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative py-1 text-sm font-medium transition-colors hover:text-primary ${
                isActive(item.href) ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {item.name}
              {isActive(item.href) && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full bg-accent rounded-full animate-fade-in" />
              )}
            </Link>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-4">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-xl h-10 w-10 border border-border hover:bg-muted"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-accent animate-pulse" />
            ) : (
              <Moon className="h-5 w-5 text-primary" />
            )}
          </Button>

          {/* Member Login CTA */}
          <Link href="/dashboard">
            <Button variant="outline" className="rounded-xl flex items-center gap-2 font-medium border-border">
              <User className="h-4 w-4" />
              Portal Login
            </Button>
          </Link>

          {/* Support CTA */}
          <Link href="/donate">
            <Button className="rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground flex items-center gap-2 font-bold shadow-lg shadow-accent/20">
              <Heart className="h-4 w-4 fill-current" />
              Support Us
            </Button>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-xl h-9 w-9 border border-border"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-accent" />
            ) : (
              <Moon className="h-4 w-4 text-primary" />
            )}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl h-9 w-9 border-border"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer (Accessible overlay using simple native transition check) */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-4 animate-in fade-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-semibold transition-colors py-2 px-3 rounded-lg hover:bg-muted ${
                  isActive(item.href)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="h-px bg-border my-2" />
            <div className="grid grid-cols-2 gap-3">
              <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="w-full">
                <Button variant="outline" className="rounded-xl w-full flex items-center justify-center gap-2">
                  <User className="h-4 w-4" />
                  Portal Login
                </Button>
              </Link>
              <Link href="/donate" onClick={() => setMobileMenuOpen(false)} className="w-full">
                <Button className="rounded-xl w-full bg-accent hover:bg-accent/90 text-accent-foreground flex items-center justify-center gap-2 font-bold">
                  <Heart className="h-4 w-4 fill-current" />
                  Support Us
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
