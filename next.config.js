/** @type {import('next').NextConfig} */
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

const nextConfig = {
    reactStrictMode: true,
    experimental: {
        // appDir is now stable in recent versions, but keeping this just in case
    },
    turbopack: {
        root: projectRoot,
    },
    // Ensure we don't conflict with Vite's output if running simultaneously (though we shouldn't)
    distDir: '.next',
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'picsum.photos',
            },
        ],
    },
}

export default nextConfig;
