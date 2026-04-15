import Link from "next/link";
import { Button } from "../../components/ui/button.jsx";

export default function SecurityPage() {
  return (
    <div className="pb-12 pt-8">
      <div className="container-shell">
        <div className="mb-6 rounded-2xl border border-border/70 bg-gradient-to-r from-card via-card to-primary/10 p-5">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Legal</p>
          <h1 className="text-3xl font-semibold">Security</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Best practices and how we keep accounts safe.
          </p>
        </div>

        <section className="surface-card p-6 md:p-8">
          <p className="text-sm text-muted-foreground md:text-base">
            Placeholder security page. Add your security measures, reporting channels, and disclosures.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="outline" className="rounded-full px-6">
              <Link href="/support">Help center</Link>
            </Button>
            <Button asChild className="rounded-full px-6">
              <Link href="/login">Sign in</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

