import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "../components/ui/button.jsx";

export default function NotFound() {
  return (
    <div className="container-shell py-20">
      <div className="mx-auto max-w-xl rounded-3xl border border-border/70 bg-card p-8 text-center shadow-sm">
        <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">404</p>
        <h1 className="mt-2 text-3xl font-semibold md:text-4xl">Page not found</h1>
        <p className="mt-3 text-sm text-muted-foreground md:text-base">
          The page you’re looking for doesn’t exist or was moved. Try searching or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild variant="outline" className="rounded-full px-6">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back home
            </Link>
          </Button>
          <Button asChild className="rounded-full px-6">
            <Link href="/search">
              <Search className="h-4 w-4" />
              Search products
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

