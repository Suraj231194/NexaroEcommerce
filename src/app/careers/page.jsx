import Link from "next/link";
import { Button } from "../../components/ui/button.jsx";
import { BRAND_NAME, SUPPORT_EMAIL } from "../../lib/brand.js";

export default function CareersPage() {
  return (
    <div className="pb-12 pt-8">
      <div className="container-shell">
        <div className="mb-6 rounded-2xl border border-border/70 bg-gradient-to-r from-card via-card to-primary/10 p-5">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Company</p>
          <h1 className="text-3xl font-semibold">Careers</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Join {BRAND_NAME} and help build the future of commerce.
          </p>
        </div>

        <section className="surface-card p-6 md:p-8">
          <h2 className="text-xl font-semibold">Open roles</h2>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            This is a placeholder page. Add your careers content, role listings, and hiring process.
          </p>
          <div className="mt-5 rounded-2xl border border-border/70 bg-secondary/40 p-4 text-sm text-muted-foreground">
            To get started quickly, share openings at{" "}
            <a className="font-medium text-primary underline-offset-4 hover:underline" href={`mailto:${SUPPORT_EMAIL}`}>
              {SUPPORT_EMAIL}
            </a>
            .
          </div>
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

