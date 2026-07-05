/* eslint-disable react/prop-types */
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { flattenCategories } from "../../services/catalogService";

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}) {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Function to update check scroll position and toggle arrows visibility
  const updateArrows = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;

      // We allow a small tolerance of 5px to avoid float precision issues
      setShowLeftArrow(scrollLeft > 5);

      // Right arrow is visible if scrollLeft + clientWidth is less than scrollWidth
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      // Check initially inside an effect
      updateArrows();

      // Listen to scroll events
      container.addEventListener("scroll", updateArrows);

      // Listen to resize events and orientation changes
      window.addEventListener("resize", updateArrows);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", updateArrows);
      }
      window.removeEventListener("resize", updateArrows);
    };
  }, [categories]);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.7; // scroll 70% of the visible container width

      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const catalogCategories = flattenCategories(categories).map((category) => ({
    ...category,
    filterName: category.parentCategoryId ? `↳ ${category.name}` : category.name,
  }));
  const allCategories = [
    { name: "Recomendado", filterName: "Recomendado", slug: "all" },
    ...catalogCategories,
  ];

  return (
    <div className="relative w-full my-6 flex items-center">
      {/* Left Fade + Arrow */}
      {showLeftArrow && (
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-l from-transparent to-gray-100 flex items-center justify-start pointer-events-none z-10">
          <button
            onClick={() => handleScroll("left")}
            className="pointer-events-auto w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all cursor-pointer focus:outline-none"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} className="text-gray-700" />
          </button>
        </div>
      )}

      {/* Categories Scrollable Area */}
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-3 overflow-x-auto scrollbar-none py-2 px-1 w-full scroll-smooth"
        onScroll={updateArrows}
      >
        {allCategories.map((category) => {
          const isSelected = selectedCategory === category.slug;
          return (
            <button
              key={category.slug}
              onClick={() => onSelectCategory(category.slug)}
              className={`px-5 py-2.5 rounded-full text-sm transition duration-200 whitespace-nowrap cursor-pointer select-none focus:outline-none flex-shrink-0 ${
                isSelected
                  ? "border-2 border-black font-semibold text-black bg-white shadow-sm"
                  : "border border-gray-200 font-normal text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300"
              }`}
            >
              {category.filterName}
            </button>
          );
        })}
      </div>

      {/* Right Fade + Arrow */}
      {showRightArrow && (
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-r from-transparent to-gray-100 flex items-center justify-end pointer-events-none z-10">
          <button
            onClick={() => handleScroll("right")}
            className="pointer-events-auto w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all cursor-pointer focus:outline-none mr-1"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} className="text-gray-700" />
          </button>
        </div>
      )}
    </div>
  );
}
