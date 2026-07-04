"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import TitleTab from "../ui/TitleTab";

export default function CategoriesSection({ categories = [] }) {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [previousSelected, setPreviousSelected] = useState(categories[0]);
  const [thumbnails, setThumbnails] = useState();

  useEffect(() => {
    if (!selectedCategory?.image) return;
    const id = setTimeout(() => {
      setPreviousSelected(selectedCategory);
    }, 500);
    return () => {
      clearTimeout(id);
    };
  }, [selectedCategory]);

  useEffect(() => {
    if (!categories || !selectedCategory?.slug) return;
    const index = categories.findIndex(
      (category) => category.slug === selectedCategory.slug
    );
    const id = setInterval(() => {
      setSelectedCategory(categories[index + 1] || categories[0]);
    }, 10000);
    return () => {
      clearInterval(id);
    };
  }, [selectedCategory]);

  useEffect(() => {
    if (!selectedCategory?.slug) return;
    setThumbnails();
    const getGalleryThumbnails = () => new Array(3).fill({ image: "" }, 0, 3);
    const id = setInterval(() => {
      setThumbnails(getGalleryThumbnails());
    }, 750);
    return () => {
      clearInterval(id);
    };
  }, [selectedCategory]);

  return (
    <section className="w-full max-w-[1856px] h-[512px] mx-auto relative overflow-hidden py-8 border-t-2 border-primary-dark">
      {previousSelected && (
        <Image
          src={previousSelected.image}
          alt={previousSelected.name}
          layout="fill"
          objectFit="cover"
          className="absolute top-0 left-0 -z-20 brightness-75"
        />
      )}
      {selectedCategory && (
        <Image
          key={selectedCategory.slug}
          src={selectedCategory.image}
          alt={selectedCategory.name}
          layout="fill"
          objectFit="cover"
          className="absolute top-0 left-0 -z-10 brightness-75 animate-fade-in"
        />
      )}
      <TitleTab>Galerías de productos</TitleTab>
      <div className="flex flex-col md:flex-row gap-6 bg-gradient-to-t from-black/60 to-transparent h-full w-full min-w-0 px-4">
        {/* Sidebar with category list */}
        <div className="md:w-1/4">
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.slug}>
                <button
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                    selectedCategory?.slug === category.slug
                      ? "bg-primary text-white"
                      : "bg-white hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Dynamic content area with background image */}
        <div className="md:w-3/4 flex justify-between items-center overflow-hidden">
          <div className="relative flex-1 max-w-md -top-16">
            {!!thumbnails?.length &&
              thumbnails.map((t, i) => {
                const dynamic = [
                  "min-w-16 w-[20%] -top-4 left-16",
                  "min-w-20 w-[30%] -top-16 left-1/2",
                  "min-w-16 w-[20%] top-8 -right-8",
                ][i];
                return (
                  <picture
                    key={i}
                    className={
                      "aspect-square bg-white rounded-full absolute outline outline-offset-8 outline-primary animate-fade-in-fl " +
                      dynamic
                    }
                  >
                    {t.image && (
                      <Image
                        src={t.image}
                        alt={t.name}
                        className="object-fill"
                      />
                    )}
                  </picture>
                );
              })}
          </div>
          {selectedCategory && (
            <div
              key={selectedCategory.slug}
              className="flex flex-col items-end justify-center p-6 text-end animate-fade-in-fl"
            >
              <h3 className="text-white text-3xl font-bold mb-3">
                {selectedCategory.name}
              </h3>
              <p className="text-white text-sm mb-4 max-w-md">
                {selectedCategory.description}
              </p>
              <Link href={`/category/${selectedCategory.slug}`} legacyBehavior>
                <a className="inline-block bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors">
                  Ver productos
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
