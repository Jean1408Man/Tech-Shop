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
    // Allow Unsplash images to be used throughout the site. If you
    // integrate your own product photography, add additional domains
    // here. See https://nextjs.org/docs/pages/api-reference/components/image
    domains: ["images.unsplash.com"],
  },
};

module.exports = nextConfig;