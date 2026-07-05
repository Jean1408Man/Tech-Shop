/**
 * @type {import('next').NextConfig}
 *
 * The Next.js configuration for the Temu clone. This config enables
 * support for loading remote images from Unsplash, which we use for
 * placeholder product and category photography. Without declaring the
 * domain here, Next.js would prevent these images from being optimized.
 */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

module.exports = nextConfig;
