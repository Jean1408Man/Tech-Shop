import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { categories, products } from "../../data/products";
import SpecialOffers from "../../components/home/SpecialOffers";
import ProductGrid from "../../components/catalog/ProductGrid";
import Breadcrumb from "../../components/ui/Breadcrumb.jsx";
import TitleTab from "../../components/ui/TitleTab.jsx";

export default function CategoryPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    // Simulate loading delay when filtering products
    const timer = setTimeout(() => {
      const result = products.filter((product) => product.category === slug);
      setFilteredProducts(result);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [slug]);

  if (!slug) return null;

  const category = categories.find((cat) => cat.slug === slug);

  const breadcrumbItems = category
    ? [{ label: category.name, href: `/category/${category.slug}` }]
    : [];

  return (
    <div className="min-h-screen">
      {/* Special Offers Carousel at the top */}
      <SpecialOffers />

      {/* Category Content */}
      <main className="max-w-[1856px] mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t-2 border-primary-dark">
        <TitleTab>
          {category ? category.name : "Categoría desconocida"}
        </TitleTab>

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

        <ProductGrid products={filteredProducts} loading={loading} />
      </main>
    </div>
  );
}
