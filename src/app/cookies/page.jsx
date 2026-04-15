import Link from "next/link";
import { Button } from "../../components/ui/button.jsx";

export default function CookiesPage() {
  return (
    <div className="pb-12 pt-8">
      <div className="container-shell">
        <div className="mb-6 rounded-2xl border border-border/70 bg-gradient-to-r from-card to-secondary/35 p-5">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Legal</p>
          <h1 className="text-3xl font-semibold">Cookies</h1>
          <p className="mt-2 text-sm text-muted-foreground">How cookies are used and how to manage them.</p>
        </div>

        <section className="surface-card p-6 md:p-8">
          <p className="text-sm text-muted-foreground md:text-base">
            Placeholder cookies page. Add your cookie categories, retention, and opt-out information.
          </p>
          <div className="mt-6">
            <Button asChild variant="outline" className="rounded-full px-6">
              <Link href="/">Back home</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

