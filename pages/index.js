import { categories, products } from '../data/products';
import CategoriesSection from '../components/home/CategoriesSection';
import FeaturedProductsSection from '../components/home/FeaturedProductsSection';
import HeroSection from '../components/home/HeroSection';

export default function HomePage() {
  const trendingProducts = products.slice(0, 8);

  return (
    <div>
      <HeroSection />
      <CategoriesSection categories={categories} />
      <FeaturedProductsSection products={trendingProducts} />
    </div>
  );
}
