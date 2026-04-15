import Link from "next/link";
import { cn } from "../../lib/utils.js";
import { BRAND_NAME, BRAND_SHORT, BRAND_TAGLINE } from "../../lib/brand.js";

export function BrandLogo({
  className,
  showTagline = true,
  showNameOnMobile = false,
  ...props
}) {
  return (
    <Link
      href="/"
      className={cn("focus-ring group inline-flex items-center gap-2", className)}
      aria-label={`${BRAND_NAME} home`}
      {...props}
    >
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 via-blue-600 to-cyan-500 text-sm font-black text-white shadow-lg">
        {BRAND_SHORT}
      </span>

      <span className={showNameOnMobile ? "block" : "hidden sm:block"}>
        <span className="block text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          {BRAND_NAME}
        </span>
        {showTagline && (
          <span className="block text-xs font-semibold text-muted-foreground">
            {BRAND_TAGLINE}
          </span>
        )}
      </span>
    </Link>
  );
}
