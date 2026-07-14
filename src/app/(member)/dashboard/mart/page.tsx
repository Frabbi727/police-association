"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDemo, translateDigits } from "@/lib/demo-context";
import { ShoppingBag, ShoppingCart, Plus, Minus, Trash2, CheckCircle, Tag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

export default function MartPage() {
  const { t, language, formatCurrency } = useDemo();
  const [cart, setCart] = React.useState<Record<string, number>>({});
  const [checkoutSuccess, setCheckoutSuccess] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const products = [
    {
      id: "M-01",
      name: t("Official BDPA Polo T-Shirt", "Official BDPA Polo T-Shirt"),
      desc: t("Navy blue polo shirt with gold embroidered Bangladesh Police Association logo. 100% premium cotton.", "Navy blue polo shirt with gold embroidered Bangladesh Police Association logo. 100% premium cotton."),
      price: 800,
      priceBn: "৳৮০০",
      image: "/images/309563497_415511680752905_2210960597977463845_n.png" // using logo for now
    },
    {
      id: "M-02",
      name: t("BDPA Ceramic Tea Mug", "BDPA Ceramic Tea Mug"),
      desc: t("Elegant matte black ceramic mug featuring gold emblem graphics. Microwave & dishwasher safe.", "Elegant matte black ceramic mug featuring gold emblem graphics. Microwave & dishwasher safe."),
      price: 350,
      priceBn: "৳৩৫০",
      image: "/images/309563497_415511680752905_2210960597977463845_n.png"
    },
    {
      id: "M-03",
      name: t("Premium Leather Badge Wallet", "Premium Leather Badge Wallet"),
      desc: t("Handcrafted full-grain black leather wallet with dedicated badge window and card inserts.", "Handcrafted full-grain black leather wallet with dedicated badge window and card inserts."),
      price: 1500,
      priceBn: "৳১,৫০০",
      image: "/images/309563497_415511680752905_2210960597977463845_n.png"
    },
    {
      id: "M-04",
      name: t("Official Metal Keychain", "Official Metal Keychain"),
      desc: t("Zinc-alloy keychain engraved with BDPA seal and Rajarbagh Headquarters coordinates.", "Zinc-alloy keychain engraved with BDPA seal and Rajarbagh Headquarters coordinates."),
      price: 150,
      priceBn: "৳১৫০",
      image: "/images/309563497_415511680752905_2210960597977463845_n.png"
    }
  ];

  const handleAddToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleUpdateQty = (id: string, delta: number) => {
    setCart((prev) => {
      const updated = { ...prev };
      const current = updated[id] || 0;
      const next = current + delta;
      if (next <= 0) {
        delete updated[id];
      } else {
        updated[id] = next;
      }
      return updated;
    });
  };

  const handleRemove = (id: string) => {
    setCart((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const cartItemsCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const prod = products.find((p) => p.id === id);
    return sum + (prod ? prod.price * qty : 0);
  }, 0);

  const handleCheckout = async () => {
    if (cartItemsCount === 0) return;
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitting(false);
    setCheckoutSuccess(true);
    setCart({});
  };

  return (
    <div className="space-y-8 text-left max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-border pb-4">
        <div>
          <span className="text-3xs font-extrabold uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
            {t("BPA Store", "BPA Store")}
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground mt-2">
            {t("Official Police Mart & Merchandise", "Official Police Mart & Merchandise")}
          </h1>
          <p className="text-2xs sm:text-xs text-muted-foreground mt-1">
            {t("Purchase official association apparel, accessories, and collectibles. All proceeds go to the Welfare Fund.", "Purchase official association apparel, accessories, and collectibles. All proceeds go to the Welfare Fund.")}
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {checkoutSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-md mx-auto border border-accent/20 bg-card/60 rounded-3xl p-8 text-center space-y-5 shadow-lg relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-accent" />
            <div className="p-3 bg-accent/10 rounded-full inline-flex text-accent">
              <CheckCircle className="h-10 w-10 text-accent" />
            </div>
            <h2 className="text-xl font-bold text-foreground">{t("Order Placed Successfully!", "Order Placed Successfully!")}</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t("Thank you for supporting the association. Your order has been registered and sent to the Rajarbagh Central Inventory desk for fulfillment. Collect your items from the desk within 3 office days.", "Thank you for supporting the association. Your order has been registered and sent to the Rajarbagh Central Inventory desk for fulfillment. Collect your items from the desk within 3 office days.")}
            </p>
            <Button onClick={() => setCheckoutSuccess(false)} className="w-full rounded-xl bg-primary text-primary-foreground font-bold text-xs h-10">
              {t("Return to Store", "Return to Store")}
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="shop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Products Column */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {products.map((p) => {
                const cartQty = cart[p.id] || 0;
                return (
                  <Card key={p.id} className="border-border bg-card overflow-hidden group hover:shadow-md transition-all h-full flex flex-col justify-between">
                    <div className="aspect-video bg-muted/30 border-b border-border flex items-center justify-center p-6 relative">
                      <div className="absolute top-3 left-3 bg-accent/10 border border-accent/20 text-accent text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                        {p.id}
                      </div>
                      <img src={p.image} className="h-20 w-20 object-contain group-hover:scale-105 transition-transform duration-300" alt={p.name} />
                    </div>

                    <CardHeader className="pb-2 text-left">
                      <CardTitle className="text-sm font-bold text-foreground">{p.name}</CardTitle>
                      <CardDescription className="text-2xs text-muted-foreground mt-1 min-h-[40px] leading-relaxed">
                        {p.desc}
                      </CardDescription>
                    </CardHeader>

                    <CardFooter className="pt-4 border-t border-border flex justify-between items-center bg-muted/20">
                      <span className="font-extrabold text-sm text-foreground">
                        {formatCurrency(p.price)}
                      </span>
                      
                      {cartQty > 0 ? (
                        <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-2 py-1">
                          <button onClick={() => handleUpdateQty(p.id, -1)} className="p-1 hover:bg-muted text-muted-foreground hover:text-foreground rounded-lg">
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-2xs font-bold font-mono px-1">{language === "bn" ? translateDigits(cartQty.toString()) : cartQty}</span>
                          <button onClick={() => handleAddToCart(p.id)} className="p-1 hover:bg-muted text-muted-foreground hover:text-foreground rounded-lg">
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      ) : (
                        <Button onClick={() => handleAddToCart(p.id)} size="sm" className="rounded-xl h-8 text-[10px] font-bold bg-primary hover:bg-primary/95 text-primary-foreground flex items-center gap-1">
                          <Plus className="h-3.5 w-3.5" />
                          {t("Add to Cart", "Add to Cart")}
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                );
              })}
            </div>

            {/* Shopping Cart Summary Column */}
            <div className="lg:col-span-4 space-y-6">
              <Card className="border-border bg-card shadow-sm">
                <CardHeader className="border-b border-border pb-4 text-left">
                  <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                    <ShoppingCart className="h-4.5 w-4.5 text-accent" />
                    {t("Shopping Cart", "Shopping Cart")}
                    {cartItemsCount > 0 && (
                      <span className="bg-accent/10 border border-accent/20 text-accent text-3xs font-extrabold px-2 py-0.5 rounded-full">
                        {language === "bn" ? translateDigits(cartItemsCount.toString()) : cartItemsCount}
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  {cartItemsCount === 0 ? (
                    <div className="text-center py-12 text-2xs text-muted-foreground flex flex-col items-center justify-center">
                      <ShoppingBag className="h-8 w-8 text-slate-400 mb-2" />
                      <p className="font-bold">{t("Your Cart is Empty", "Your Cart is Empty")}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{t("Add official merchandise items from the catalog.", "Add official merchandise items from the catalog.")}</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Cart Items List */}
                      <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                        {Object.entries(cart).map(([id, qty]) => {
                          const p = products.find((x) => x.id === id);
                          if (!p) return null;
                          return (
                            <div key={id} className="flex gap-3 items-center justify-between border-b border-border/60 pb-3 text-left">
                              <div className="min-w-0 flex-1">
                                <span className="font-bold text-2xs text-foreground block truncate">{p.name}</span>
                                <span className="text-4xs text-slate-400 block mt-0.5">
                                  {language === "bn" ? translateDigits(qty.toString()) : qty} x {formatCurrency(p.price)}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <button onClick={() => handleRemove(id)} className="p-1.5 hover:bg-destructive/10 text-muted-foreground hover:text-destructive rounded-lg transition-colors">
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Summary calculations */}
                      <div className="border-t border-border pt-4 space-y-2 text-xs font-semibold">
                        <div className="flex justify-between text-muted-foreground text-2xs">
                          <span>{t("Subtotal", "Subtotal")}:</span>
                          <span>{formatCurrency(cartTotal)}</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground text-2xs">
                          <span>{t("Central Processing Fee", "Central Processing Fee")}:</span>
                          <span>{t("৳০", "৳০")}</span>
                        </div>
                        <div className="flex justify-between text-foreground border-t border-border/80 pt-2 text-sm font-bold">
                          <span>{t("Grand Total", "Grand Total")}:</span>
                          <span className="text-accent">{formatCurrency(cartTotal)}</span>
                        </div>
                      </div>

                      {/* Checkout Button */}
                      <Button onClick={handleCheckout} disabled={submitting} className="w-full rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-xs py-5">
                        {submitting ? t("Processing Order...", "Processing Order...") : t("Place Store Order", "Place Store Order")}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
