import { cn } from "../../lib/utils.js";

const STEPS = [
  { id: "cart", label: "Cart" },
  { id: "checkout", label: "Checkout" },
  { id: "done", label: "Done" },
];

export function CheckoutStepper({ step = "cart", className }) {
  const activeIndex = Math.max(
    0,
    STEPS.findIndex((item) => item.id === step)
  );

  return (
    <div
      className={cn("mt-4 grid grid-cols-3 gap-2 text-xs sm:text-sm", className)}
      aria-label="Checkout progress"
    >
      {STEPS.map((item, index) => {
        const complete = index < activeIndex;
        const active = index === activeIndex;

        const classes = complete
          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 font-semibold"
          : active
          ? "border-primary/30 bg-primary/10 text-primary font-semibold"
          : "border-border bg-background text-muted-foreground";

        return (
          <div
            key={item.id}
            className={`rounded-full border px-3 py-1.5 text-center ${classes}`}
          >
            {item.label}
          </div>
        );
      })}
    </div>
  );
}

