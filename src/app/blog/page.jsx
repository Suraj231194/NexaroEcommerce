import Link from "next/link";
import { Button } from "../../components/ui/button.jsx";

export default function BlogPage() {
  return (
    <div className="pb-12 pt-8">
      <div className="container-shell">
        <div className="mb-6 rounded-2xl border border-border/70 bg-gradient-to-r from-card to-secondary/35 p-5">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Company</p>
          <h1 className="text-3xl font-semibold">Blog</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Product drops, shopping guides, and updates.
          </p>
        </div>

        <section className="surface-card p-6 md:p-8">
          <h2 className="text-xl font-semibold">Coming soon</h2>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            This is a placeholder blog index. Add posts and categories when ready.
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

