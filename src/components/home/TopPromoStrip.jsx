"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock3, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { Badge } from "../ui/badge.jsx";

const PROMO_POINTS = [
  { icon: Truck, text: "Free delivery over INR 999" },
  { icon: ShieldCheck, text: "100% secure checkout" },
  { icon: Sparkles, text: "Extra 10% on prepaid orders" },
];

export function TopPromoStrip() {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      // Target is end of current day
      const target = new Date(now);
      target.setHours(23, 59, 59, 999);

      const difference = target.getTime() - now.getTime();
      if (difference <= 0) return "00:00:00";

      const h = Math.floor(difference / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="pt-4 md:pt-6">
      <div className="container-shell">
        <div className="overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/15 via-card to-amber-500/15 p-3 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Badge className="rounded-full bg-destructive text-destructive-foreground">Live sale</Badge>
              <p className="text-sm font-semibold">
                Mega Savings Week: Up to 60% off + bank offers
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-flex min-w-[90px] items-center gap-1 rounded-full bg-background/80 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                <Clock3 className="h-3.5 w-3.5 text-primary" />
                Ends in {timeLeft || "07:42:18"}
              </span>
              <Link
                href="/deals"
                className="focus-ring rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
              >
                View deals
              </Link>
            </div>
          </div>

          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {PROMO_POINTS.map((item) => (
              <div
                key={item.text}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border/70 bg-background/85 px-3 py-1.5 text-xs text-muted-foreground"
              >
                <item.icon className="h-3.5 w-3.5 text-primary" />
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
