import Link from "next/link";
import { Button } from "../../components/ui/button.jsx";
import { BRAND_NAME, SUPPORT_EMAIL } from "../../lib/brand.js";

export default function PressPage() {
  return (
    <div className="pb-12 pt-8">
      <div className="container-shell">
        <div className="mb-6 rounded-2xl border border-border/70 bg-gradient-to-r from-card to-secondary/35 p-5">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Company</p>
          <h1 className="text-3xl font-semibold">Press</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            News, media resources, and brand assets for {BRAND_NAME}.
          </p>
        </div>

        <section className="surface-card p-6 md:p-8">
          <h2 className="text-xl font-semibold">Media inquiries</h2>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            This page is a placeholder. Add your press kit, logos, press releases, and contact info.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="rounded-full px-6">
              <a href={`mailto:${SUPPORT_EMAIL}`}>Contact press</a>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-6">
              <Link href="/">Back home</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

