"use client";

import Link from "next/link";
import { Shield, Phone, Mail, MapPin, Scale } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-card text-card-foreground">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & About Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-card border border-border/80 rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src="/images/309563497_415511680752905_2210960597977463845_n.png"
                  className="h-7 w-7 object-contain"
                  alt="Bangladesh Police Association Logo"
                />
              </div>
              <span className="font-bold text-base tracking-tight">Bangladesh Police Association</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Representing the men and women of law enforcement. Dedicated to promoting community safety, supporting our members, and honoring those who serve.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-semibold">
              <Scale className="h-4 w-4 text-accent" />
              <span>Incorporated Non-Profit Organization</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-sm font-bold tracking-wider uppercase text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Our Association
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-muted-foreground hover:text-primary transition-colors">
                  News & Events
                </Link>
              </li>
              <li>
                <Link href="/news#faq" className="text-muted-foreground hover:text-primary transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/donate" className="text-muted-foreground hover:text-primary transition-colors">
                  Support / Donations
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-sm font-bold tracking-wider uppercase text-foreground mb-4">Member Resources</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                  Member Portal
                </Link>
              </li>
              <li>
                <Link href="/dashboard?tab=support" className="text-muted-foreground hover:text-primary transition-colors">
                  Legal Representation Support
                </Link>
              </li>
              <li>
                <Link href="/dashboard?tab=apply" className="text-muted-foreground hover:text-primary transition-colors">
                  Join the Association
                </Link>
              </li>
              <li>
                <span className="text-muted-foreground cursor-not-allowed">
                  Bylaws & Contract Agreements (PDF)
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-sm font-bold tracking-wider uppercase text-foreground mb-4">Contact Information</h3>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-accent shrink-0" />
                <span className="text-muted-foreground leading-snug">
                  1250 Security Plaza, Suite 400<br />
                  Metropolis, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent shrink-0" />
                <a href="tel:555-0199" className="text-muted-foreground hover:text-primary transition-colors">
                  (555) 019-9900
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent shrink-0" />
                <a href="mailto:info@metro-police-association.org" className="text-muted-foreground hover:text-primary transition-colors">
                  info@metro-police-association.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-2xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Bangladesh Police Association. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-foreground cursor-pointer">Privacy Policy</span>
            <span className="hover:text-foreground cursor-pointer">Terms of Service</span>
            <span className="hover:text-foreground cursor-pointer">Contact Webmaster</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
