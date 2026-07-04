import { useRouter } from "next/router";
import { categories, products } from "../../data/products";
import SpecialOffers from "../../components/home/SpecialOffers";
import ProductDetails from "../../components/catalog/ProductDetails";
import ProductNotFound from "../../components/catalog/ProductNotFound";
import Breadcrumb from "../../components/ui/Breadcrumb.jsx";

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return null;

  const product = products.find((p) => p.id.toString() === id);
  const category = product
    ? categories.find((cat) => cat.slug === product.category)
    : null;

  const breadcrumbItems =
    category && product
      ? [
          { label: category.name, href: `/category/${category.slug}` },
          { label: product.name },
        ]
      : [];

  return (
    <div className="min-h-screen">
      {/* Special Offers Carousel at the top */}
      <SpecialOffers />

      {/* Product Content */}
      <main className="max-w-[1856px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back navigation */}
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 text-gray-600 hover:text-primary transition-colors duration-200 group animate-fade-in"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="text-sm font-medium">Volver</span>
        </button>

        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {product ? <ProductDetails product={product} /> : <ProductNotFound />}
      </main>
    </div>
  );
}
