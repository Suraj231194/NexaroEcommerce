"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar.jsx";
import { Footer } from "./Footer.jsx";
import { MobileBottomNav } from "./MobileBottomNav.jsx";
import { ShoppingAssistantWidget } from "../assistant/ShoppingAssistantWidget.jsx";
import { PageTransition } from "./PageTransition.jsx";
import { ScrollTopButton } from "./ScrollTopButton.jsx";
import { GlobalCommandPalette } from "./GlobalCommandPalette.jsx";

const CHROME_HIDDEN_ROUTES = ["/login", "/signup"];

function shouldHideChrome(pathname) {
  if (!pathname) {
    return false;
  }
  return CHROME_HIDDEN_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

export function AppChrome({ children }) {
  const pathname = usePathname();
  const hideChrome = shouldHideChrome(pathname);

  if (hideChrome) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-foreground focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        Skip to content
      </a>

      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1 pb-24 outline-none md:pb-0">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <MobileBottomNav />
      <ShoppingAssistantWidget />
      <ScrollTopButton />
      <GlobalCommandPalette />
    </div>
  );
}

