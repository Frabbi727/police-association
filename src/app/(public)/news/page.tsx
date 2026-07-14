"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDemo } from "@/lib/demo-context";
import { Calendar, ChevronDown, Mail, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Schema for newsletter
const newsletterSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type NewsletterInput = z.infer<typeof newsletterSchema>;

export default function News() {
  const { t } = useDemo();
  const [signedUp, setSignedUp] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterInput>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async () => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSignedUp(true);
  };

  const newsItems = [
    {
      title: t("Annual Charity Gala Raises Record for Welfare Fund", "Annual Charity Gala Raises Record for Welfare Fund"),
      date: "July 12, 2026",
      category: t("Community Event", "Community Event"),
      summary: t("This year's Bangladesh Police Charity Gala saw unprecedented attendance and donations, which will directly support disabled officers and their families.", "This year's Bangladesh Police Charity Gala saw unprecedented attendance and donations, which will directly support disabled officers and their families."),
    },
    {
      title: t("New Collective Welfare Demands Negotiations Begin", "New Collective Welfare Demands Negotiations Begin"),
      date: "June 28, 2026",
      category: t("Bargaining Update", "Bargaining Update"),
      summary: t("The executive board has officially opened talks regarding the pay scale, separate risk allowance, and retirement benefits of non-cadre police officers.", "The executive board has officially opened talks regarding the pay scale, separate risk allowance, and retirement benefits of non-cadre police officers."),
    },
    {
      title: t("Association Welcomes New Officers in Rajarbagh Ceremony", "Association Welcomes New Officers in Rajarbagh Ceremony"),
      date: "June 15, 2026",
      category: t("Member News", "Member News"),
      summary: t("President Kamrul Hasan Talukdar and members of the board officially welcomed the graduating class of constables and sub-inspectors this week.", "President Kamrul Hasan Talukdar and members of the board officially welcomed the graduating class of constables and sub-inspectors this week."),
    },
    {
      title: t("Welfare Fund Education Grants Open for Dependents", "Welfare Fund Education Grants Open for Dependents"),
      date: "May 30, 2026",
      category: t("Resources", "Resources"),
      summary: t("Applications are now open for the annual educational scholarship. Dependent children of active, retired, or deceased members are eligible to apply.", "Applications are now open for the annual educational scholarship. Dependent children of active, retired, or deceased members are eligible to apply."),
    },
  ];

  const faqs = [
    {
      q: t("Who is eligible to join the Bangladesh Police Association?", "Who is eligible to join the Bangladesh Police Association?"),
      a: t("All non-cadre police personnel (Inspectors, Sub-Inspectors, Sergeants, Assistant Sub-Inspectors, and Constables) in active service are eligible for full membership. Retired officers are eligible for associate membership status.", "All non-cadre police personnel (Inspectors, Sub-Inspectors, Sergeants, Assistant Sub-Inspectors, and Constables) in active service are eligible for full membership. Retired officers are eligible for associate membership status."),
    },
    {
      q: t("How do I request emergency legal representation?", "How do I request emergency legal representation?"),
      a: t("Members can request legal support immediately through the dashboard or by calling the emergency hotline printed on the back of your membership card. Our representative attorneys are available 24/7/365.", "Members can request legal support immediately through the dashboard or by calling the emergency hotline printed on the back of your membership card. Our representative attorneys are available 24/7/365."),
    },
    {
      q: t("Where do my donation funds go?", "Where do my donation funds go?"),
      a: t("Donations are processed through our Charitable Foundation. Funds go directly to support families of fallen officers, disabled member assistance, and community outreach programs.", "Donations are processed through our Charitable Foundation. Funds go directly to support families of fallen officers, disabled member assistance, and community outreach programs."),
    },
    {
      q: t("How can I update my profile or member contact details?", "How can I update my profile or member contact details?"),
      a: t("Simply log in to the Members Portal, navigate to the Profile Settings section under the dashboard, update your details, and click Save. Your record will be synchronized within 24 hours.", "Simply log in to the Members Portal, navigate to the Profile Settings section under the dashboard, update your details, and click Save. Your record will be synchronized within 24 hours."),
    },
  ];

  return (
    <div className="flex flex-col w-full bg-background min-h-screen">
      {/* Header */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-border bg-card/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto max-w-4xl text-center space-y-4">
          <span className="text-2xs font-bold uppercase tracking-widest text-accent">{t("Updates & FAQ", "Updates & FAQ")}</span>
          <h1 className="text-3xl font-extrabold sm:text-5xl tracking-tight text-foreground">
            {t("News & Press Releases", "News & Press Releases")}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {t("Stay informed with the latest updates on bargaining, charitable drives, and helpful answers to common association questions.", "Stay informed with the latest updates on bargaining, charitable drives, and helpful answers to common association questions.")}
          </p>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl space-y-12">
          <h2 className="text-xl font-bold tracking-tight border-b border-border pb-4">{t("Latest Press Releases", "Latest Press Releases")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {newsItems.map((item, idx) => (
              <article
                key={idx}
                className="p-6 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-3xs font-bold uppercase tracking-wider text-accent mb-4">
                    <span>{item.category}</span>
                    <div className="flex items-center gap-1 text-muted-foreground font-normal normal-case">
                      <span>{item.date}</span>
                    </div>
                  </div>
                  <h3 className="text-base font-extrabold text-foreground leading-snug mb-3 hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-6">{item.summary}</p>
                </div>
                <div className="flex items-center text-xs font-bold text-primary hover:text-primary/80 cursor-pointer gap-1 group">
                  <span>{t("Read Full Release", "Read Full Release")}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Exclusive Accordion FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border bg-card/10">
        <div className="container mx-auto max-w-4xl space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-accent">{t("Help Center", "Help Center")}</h2>
            <p className="text-2xl font-extrabold sm:text-3xl">{t("Frequently Asked Questions", "Frequently Asked Questions")}</p>
            <p className="text-xs text-muted-foreground">
              {t("Click any question below to expand the answer. Opening a question automatically closes others.", "Click any question below to expand the answer. Opening a question automatically closes others.")}
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                name="faq-accordion"
                className="group rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 [&_summary]:open:bg-muted [&_summary]:open:text-primary [&_summary_svg]:open:rotate-180"
              >
                <summary className="flex items-center justify-between p-5 text-sm font-semibold cursor-pointer select-none text-foreground hover:bg-muted/50 list-none transition-colors duration-200">
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-300" />
                </summary>
                <div className="p-5 text-xs text-muted-foreground border-t border-border bg-card/50 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup Form */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="container mx-auto max-w-3xl rounded-3xl border border-border bg-card/50 p-8 sm:p-12 text-center space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 h-40 w-40 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="inline-flex p-3 rounded-2xl bg-muted text-primary mb-2 shadow-inner">
            <Mail className="h-6 w-6" />
          </div>

          <h2 className="text-xl font-extrabold tracking-tight">{t("Subscribe to Our Newsletter", "Subscribe to Our Newsletter")}</h2>
          <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
            {t("Get official press releases, bargaining summaries, and community updates delivered straight to your inbox.", "Get official press releases, bargaining summaries, and community updates delivered straight to your inbox.")}
          </p>

          {signedUp ? (
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 max-w-md mx-auto text-xs font-semibold text-primary animate-fade-in">
              {t("Thank you! You have been successfully subscribed to our newsletter list.", "Thank you! You have been successfully subscribed to our newsletter list.")}
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 pt-2"
              noValidate
            >
              <div className="flex-1 text-left">
                <label htmlFor="newsletter-email" className="sr-only">{t("Email Address", "Email Address")}</label>
                <Input
                  id="newsletter-email"
                  type="email"
                  placeholder={t("Enter your email", "Enter your email")}
                  className="rounded-xl h-11 border-border bg-background focus-visible:ring-accent"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-2xs text-destructive mt-1.5 ml-2 font-medium flex items-center gap-1">
                    <ShieldAlert className="h-3 w-3 shrink-0" />
                    {errors.email.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="rounded-xl h-11 bg-primary hover:bg-primary/95 text-primary-foreground font-semibold px-6 shadow-md"
              >
                {isSubmitting ? t("Subscribing...", "Subscribing...") : t("Subscribe", "Subscribe")}
              </Button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
