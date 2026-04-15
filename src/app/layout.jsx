import { Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import Script from "next/script";
import { Providers } from "./providers.jsx";
import "./globals.css";
import { AppChrome } from "../components/layout/AppChrome.jsx";
import { BRAND_NAME } from "../lib/brand.js";

const bodyFont = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-body",
});

const displayFont = Fraunces({
    subsets: ["latin"],
    variable: "--font-display",
});
export const metadata = {
    title: {
        default: BRAND_NAME,
        template: `%s | ${BRAND_NAME}`,
    },
    description: "Experience premium electronic and fashion shopping with Nexora. Smart features, elevated design, and same-day delivery.",
    keywords: ["e-commerce", "premium shopping", "electronics", "fashion", "nextjs", "ecommerce platform"],
    authors: [{ name: "Nexora Team" }],
    creator: "Nexora",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://nexora.shop",
        title: BRAND_NAME,
        description: "Smart shopping, elevated.",
        siteName: BRAND_NAME,
    },
    twitter: {
        card: "summary_large_image",
        title: BRAND_NAME,
        description: "Smart shopping, elevated.",
    },
};

export default function RootLayout({ children }) {
    const themeInitScript = `
        (function() {
            try {
                var theme = localStorage.getItem('nexora_theme');
                var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
                if (!theme && supportDarkMode) theme = 'dark';
                if (!theme) theme = 'light';
                document.documentElement.classList.add(theme);
                document.documentElement.style.colorScheme = theme;
            } catch (e) {}
        })();
    `;

    return (
        <html lang="en" suppressHydrationWarning className={`${bodyFont.variable} ${displayFont.variable}`}>
            <head>
                <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
                <style dangerouslySetInnerHTML={{ 
                    __html: `
                        html.dark { background: hsl(222 42% 8%); color: white; }
                        html.light { background: hsl(36 38% 98%); color: black; }
                    ` 
                }} />
            </head>
            <body className="antialiased min-h-screen">
                <Providers>
                    <AppChrome>{children}</AppChrome>
                </Providers>
            </body>
        </html>
    );
}
