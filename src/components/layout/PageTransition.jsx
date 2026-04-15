"use client";

import { usePathname } from "next/navigation";

export function PageTransition({ children }) {
  const pathname = usePathname();

  return (
    <div
      key={pathname}
      className="animate-in fade-in slide-in-from-bottom-1 duration-300 motion-reduce:animate-none motion-reduce:transition-none"
    >
      {children}
    </div>
  );
}
