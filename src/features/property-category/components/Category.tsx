"use client";


import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import { Category as ICategory } from "@/src/features/property-category/types/interface";
import { useGetPropertyCategories } from "../api/category";

const Category = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category") ?? "";

  const { data: response, isLoading, isError } = useGetPropertyCategories();
  const categories: ICategory[] = response?.data || [];

  const handleCategoryClick = (slug: string) => {
    
    router.push(
      selectedCategory === slug
        ? "/properties"
        : `/properties?category=${slug}`,
    );
  };

  return (
    <section className="py-12 lg:py-20 px-3 sm:px-6 lg:px-8 bg-emerald-50/40">
      <div className="max-w-7xl mx-auto text-center">
        <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-800 mb-2">
          EXPLORE CATEGORIES
        </h4>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-10 sm:mb-14">
          Browse by Living Style
        </h2>

        {isLoading ? (
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center animate-pulse"
              >
                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-slate-200 mb-3" />
                <div className="w-16 h-4 bg-slate-200 rounded" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <p className="py-6 text-red-500 font-medium text-sm">
            Could not load categories. Please try again.
          </p>
        ) : (
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-8">
            {categories.map((category) => {
              const isSelected = selectedCategory === category.slug;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => handleCategoryClick(category.slug)}
                  className="group flex flex-col items-center"
                >
                  <div
                    className={`relative w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden shadow-md border-2 transition ${
                      isSelected
                        ? "border-emerald-600 ring-4 ring-emerald-600/20"
                        : "border-white group-hover:border-emerald-500"
                    }`}
                  >
                    {category.categoryImg ? (
                      <Image
                        src={category.categoryImg}
                        alt={category.name}
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-emerald-100" />
                    )}
                  </div>

                  <span
                    className={`mt-3 text-xs sm:text-sm font-semibold ${
                      isSelected ? "text-emerald-700" : "text-slate-800"
                    }`}
                  >
                    {category.name}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Category;
