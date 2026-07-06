import Head from "next/head";

/**
 * SEO component for dynamic meta tags, Open Graph, and Twitter cards
 * @param {Object} props - SEO properties
 * @param {string} props.title - Page title
 * @param {string} [props.description] - Page description
 * @param {string} [props.keywords] - Page keywords
 * @param {string} [props.image] - Open Graph image URL
 * @param {string} [props.url] - Page URL for Open Graph
 * @param {string} [props.type] - Open Graph type (website, product, article)
 * @param {string} [props.siteName] - Site name for Open Graph
 * @param {string} [props.twitterCard] - Twitter card type (summary, summary_large_image)
 * @param {string} [props.locale] - Page locale
 * @param {string} [props.author] - Page author
 */
export default function SEO({
  title,
  description = "Tech Shop - Tu tienda en línea de tecnología y productos electrónicos. Encuentra los mejores productos con precios increíbles.",
  keywords = "tecnología, electrónica, productos, tienda online, tech shop, gadgets, computadoras, celulares",
  image = "/og-image.jpg",
  url,
  type = "website",
  siteName = "Tech Shop",
  twitterCard = "summary_large_image",
  locale = "es_ES",
  author = "Tech Shop",
}) {
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tech-shop.com";
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="es" />
      <meta name="revisit-after" content="1 day" />

      {/* Favicon and Icons */}
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${image}`} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />

      {/* Twitter */}
      <meta property="twitter:card" content={twitterCard} />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${siteUrl}${image}`} />

      {/* Additional SEO Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#0ea5e9" />
      <meta name="msapplication-TileColor" content="#0ea5e9" />
    </Head>
  );
}