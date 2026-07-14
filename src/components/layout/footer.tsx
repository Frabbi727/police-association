"use client";

import Link from "next/link";
import { Shield, Phone, Mail, MapPin, Scale } from "lucide-react";

// Clean inline SVG components for brands since some lucide-react versions exclude them
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

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
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.facebook.com/bdpa1920/?locale=bn_IN"
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-accent transition-all duration-200"
                title="Facebook"
              >
                <FacebookIcon className="h-4 w-4 shrink-0" />
              </a>
              <a
                href="https://twitter.com/BD_PoliceOfficial"
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-accent transition-all duration-200"
                title="Twitter/X"
              >
                <TwitterIcon className="h-4 w-4 shrink-0" />
              </a>
              <a
                href="https://www.youtube.com/@BDPoliceOfficial"
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-accent transition-all duration-200"
                title="YouTube"
              >
                <YoutubeIcon className="h-4 w-4 shrink-0" />
              </a>
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
            <ul className="space-y-3 text-xs text-left">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span className="text-muted-foreground leading-snug">
                  Rajarbagh Police Lines<br />
                  Dhaka - 1217, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent shrink-0" />
                <a href="tel:+8802223381967" className="text-muted-foreground hover:text-primary transition-colors">
                  +880 2-223381967
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent shrink-0" />
                <a href="mailto:support@bangladesh-police-association.org" className="text-muted-foreground hover:text-primary transition-colors">
                  support@bangladesh-police-association.org
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
