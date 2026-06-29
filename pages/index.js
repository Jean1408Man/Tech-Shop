import { useState } from "react";
import { categories, products } from "../data/products";
import CategoriesSection from "../components/home/CategoriesSection";
import FeaturedProductsSection from "../components/home/FeaturedProductsSection";
import HeroSection from "../components/home/HeroSection";
import SpecialOffers from "../components/home/SpecialOffers";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts =
    selectedCategory === "all"
      ? products.slice(0, 8)
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="max-w-[1856px] mx-auto">
      <HeroSection />
      <SpecialOffers />
      <CategoriesSection categories={categories} />
      <FeaturedProductsSection
        products={filteredProducts}
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
    </div>
  );
}
