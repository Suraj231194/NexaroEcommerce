import Link from "next/link";
import { Button } from "../../components/ui/button.jsx";

export default function ReturnsPage() {
  return (
    <div className="pb-12 pt-8">
      <div className="container-shell">
        <div className="mb-6 rounded-2xl border border-border/70 bg-gradient-to-r from-card to-secondary/35 p-5">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Support</p>
          <h1 className="text-3xl font-semibold">Returns & refunds</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Easy return flows, timelines, and refund status.
          </p>
        </div>

        <section className="surface-card p-6 md:p-8">
          <h2 className="text-xl font-semibold">Return policy</h2>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            This is a placeholder page. Add your return window, eligibility rules, and steps to
            initiate a return.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="rounded-full px-6">
              <Link href="/orders">Track an order</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-6">
              <Link href="/support">Visit help center</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

