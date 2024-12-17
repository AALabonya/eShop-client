
// export default AllProducts;
"use client";

import { useEffect, useState } from "react";
import { BiFilterAlt } from "react-icons/bi";
import { Pagination } from "@nextui-org/pagination";
import { useSearchParams } from "next/navigation";

import { useGetAllProductsQuery } from "@/redux/features/products/productApi";
import { IProduct } from "@/types/modal";
import HomePageProductCard from "@/components/HomePage/HomePageProductCard";
import Loading from "@/app/loading";
import { Input } from "@/components/ui/input";
import { LucideSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import Slider from "react-slider";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";

interface ICategory {
  id: string;
  name: string;
}
const AllProducts = () => {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(12);
  const [minPrice, setMinPrice] = useState(500);
  const [maxPrice, setMaxPrice] = useState(7000);
  const [activeCategory, setActiveCategory] = useState<string | null>(selectedCategory|| null); 
  const { data: allCategories } = useGetAllCategoriesQuery(undefined);
  const { data: allProductsResponse, isLoading, refetch } =
  useGetAllProductsQuery({
    page: currentPage,
    limit: dataPerPage,
    searchTerm: debouncedSearchTerm,
    minPrice,
    maxPrice,
    category: activeCategory || "", 
    sort,
  });

const totalPages = Math.ceil(
  (allProductsResponse?.meta?.total || 0) / dataPerPage
);

// Debounce search term for performance
useEffect(() => {
  const handler = setTimeout(() => setDebouncedSearchTerm(searchTerm), 300);
  return () => clearTimeout(handler);
}, [searchTerm]);
  useEffect(() => {
    refetch();
  }, [selectedCategories, sort, debouncedSearchTerm, minPrice, maxPrice, currentPage, refetch]);


  const handleCategorySelect = (category: string) => {
    setActiveCategory((prev) => (prev === category ? null : category)); 
    setCurrentPage(1); 
  };
  
  useEffect(() => {
    refetch();
  }, [activeCategory, debouncedSearchTerm, currentPage, refetch]);


  const handleSliderChange = (values: number[]) => {
    setMinPrice(values[0]);
    setMaxPrice(values[1]);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setActiveCategory(null);
    setSort("");
    setMinPrice(20);
    setMaxPrice(12000);
    setCurrentPage(1);
  };

  return (
    <div className="lg:container lg:mx-auto lg:px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">All Products</h1>

      <div className="grid grid-cols-12 gap-6">
        {/* Filters Section - Left Side */}
        <div className="col-span-12 md:col-span-4 lg:col-span-3 bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>

          {/* Search Filter */}
          <div className="relative mb-4">
            <LucideSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-md"
            />
          </div>

          {/* Categories Filter (Checkboxes) */}

         <div className="mb-6">
            <h3 className="font-medium mb-2">Categories</h3>
            <div className="space-y-2">
              {allCategories?.map((cat: ICategory) => (
                <div key={cat.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`category-${cat.id}`}
                    checked={activeCategory === cat.name}
                    onChange={() => handleCategorySelect(cat.name)}
                    className="w-4 h-4 accent-[#80b500] text-white"
                  />
                  <label
                    htmlFor={`category-${cat.id}`}
                    className="capitalize cursor-pointer"
                  >
                    {cat.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-4">
  <h3 className="font-bold mb-7">Price Range</h3>
  
  {/* Slider with value line */}
  <Slider
    min={500}
    max={7000}
    step={10}
    value={[minPrice, maxPrice]}
    onChange={handleSliderChange}
    className="slider w-full h-2 bg-gray-300 rounded-md"
    renderTrack={(props, state) => (
      <div
        {...props}
        style={{
          ...props.style,
          height: "8px",
          background: `linear-gradient(to right, #80b500 ${state.index === 0 ? 0 : state.value[0] / 7000 * 100}%, #80b500 ${state.value[0] / 7000 * 100}% ${state.value[1] / 7000 * 100}%, #e5e7eb ${state.value[1] / 7000 * 100}%)`,
        }}
      />
    )}
    renderThumb={(props, state) => (
      <div
        {...props}
        className="w-5 h-5 bg-black rounded-full border border-gray-300 shadow-md"
        style={{ ...props.style }}
      >
        {/* Price Label on Thumb */}
        <div className="text-xs text-center text-black mt-[-30px]">
          ${state.valueNow}
        </div>
      </div>
    )}
  />

  {/* Price Range Display */}
  <div className="flex justify-between mt-2 text-sm text-gray-600">
    <span>${minPrice}</span>
    <span>${maxPrice}</span>
  </div>
</div>

          {/* Sort Filter */}
          <div className="mb-6">
            <h3 className="font-bold mb-2">Sort By</h3>
            <select
              className="w-full border-gray-300 rounded-md py-2 px-3"
              onChange={(e) => setSort(e.target.value)}
              value={sort}
            >
              <option value="">Select Sort</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>

          {/* Clear Filters Button */}
          <div className="text-center">
            <Button variant="outline" className="w-full" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Product Cards - Right Side */}
        <div className="col-span-12 md:col-span-8 lg:col-span-9">
           <div className="md:col-span-8 lg:col-span-9 col-span-12">
    <div className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
      {isLoading
          ? Array.from({ length: dataPerPage }).map((_, index) => (
              <div key={index}>
                <Loading />
              </div>
            ))
          : allProductsResponse?.data?.map((singleProduct: IProduct) => (
              <div key={singleProduct.id}>
                <HomePageProductCard singleProduct={singleProduct} />
              </div>
            ))}
      </div>
    </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-end items-center space-x-2">
  {/* Previous Button */}
  <button
    onClick={() => setCurrentPage(currentPage - 1)}
    disabled={currentPage === 1}
    className="px-4 py-2 bg-[#80b500] text-white rounded-lg disabled:bg-gray-300"
  >
    &lt;
  </button>

  {/* Page Numbers */}
  <div className="flex space-x-2">
    {Array.from({ length: totalPages }).map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentPage(index + 1)}
        className={`px-4 py-2 rounded-lg ${
          currentPage === index + 1
            ? "bg-[#80b500] text-white"
            : "bg-[#80b500] text-gray-700 hover:bg-[#80b500]"
        }`}
      >
        {index + 1}
      </button>
    ))}
  </div>

  {/* Next Button */}
  <button
    onClick={() => setCurrentPage(currentPage + 1)}
    disabled={currentPage === totalPages}
    className="px-4 py-2 bg-[#80b500] text-white rounded-lg disabled:bg-gray-300"
  >
    &gt;
  </button>
</div>

        </div>
      </div>
    </div>
  );
};

export default AllProducts;
