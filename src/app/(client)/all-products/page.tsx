
"use client";

import {useEffect, useState } from "react";

import { BiFilterAlt } from "react-icons/bi";

import { Pagination } from "@nextui-org/pagination";
import { useSearchParams } from "next/navigation";

import { useGetAllProductsQuery } from "@/redux/features/products/productApi";
import {IProduct } from "@/types/modal";
import HomePageProductCard from "@/components/HomePage/HomePageProductCard";
import Loading from "@/app/loading";
import { Input } from "@/components/ui/input";
import { LucideSearch, X } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
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
  const [filterApplied, setFilterApplied] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(12);
  const [minPrice, setMinPrice] = useState(500);
  const [maxPrice, setMaxPrice] = useState(7000);
  const [queryObj, setQueryObj] = useState({
    page: currentPage,
    limit: dataPerPage,
    searchTerm: debouncedSearchTerm,
    minPrice,
    maxPrice,
    category: category || selectedCategory,
    sort,
  });

  const updateDataPerPage = () => {
    const width = window.innerWidth;

    if (width >= 1280) {
      setDataPerPage(12);
    } else if (width >= 768 && width < 1280) {
      setDataPerPage(9);
    } else if (width >= 425 && width < 768) {
      setDataPerPage(8);
    } else {
      setDataPerPage(6);
    }
  };

  useEffect(() => {
    updateDataPerPage();
    window.addEventListener("resize", updateDataPerPage);

    return () => {
      window.removeEventListener("resize", updateDataPerPage);
    };
  }, []);

  const {
    data: allProductsResponse,
    isLoading,
    refetch,
  } = useGetAllProductsQuery(queryObj);

  const totalPages = Math.ceil(
    (allProductsResponse?.meta?.total || 0) / dataPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const { data: allCategories } = useGetAllCategoriesQuery(undefined);
  console.log(allCategories,"all");
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (
      searchTerm ||
      category ||
      sort ||
      minPrice > 500 ||
      maxPrice < 7000 ||
      selectedCategory
    ) {
      setFilterApplied(true);
    } else {
      setFilterApplied(false);
    }
  }, [searchTerm, category, sort, minPrice, maxPrice, selectedCategory]);

  const handleCategorySelect = (value: string) => {
    setCategory(value); 
  };

  const handleSortSelect = (value: string) => {
    setSort(value);
  };

  const handleSliderChange = (values: number[]) => {
    setMinPrice(values[0]);
    setMaxPrice(values[1]);
  };

  useEffect(() => {
    setQueryObj((prev) => ({
      ...prev,
      sort,
      searchTerm: debouncedSearchTerm,
      category: category || selectedCategory,
      minPrice,
      maxPrice,
      page: currentPage,
      limit: dataPerPage,
    }));
    refetch();
  }, [
    sort,
    debouncedSearchTerm,
    category,
    minPrice,
    maxPrice,
    currentPage,
    refetch,
    selectedCategory,
  ]);



  return (

<div className="container mx-auto px-4 md:px-6 py-8">
<div className="flex flex-col sm:flex-row items-center justify-between mb-6">
    <h1 className="text-2xl font-bold">All Products</h1>
    <div className="flex items-center gap-2 md:gap-4 mt-4 md:mt-0">
        <div className="relative w-40 md:w-auto">
            <LucideSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-md"
            />
        </div>
    
    </div>
</div>
<div className="grid grid-cols-1 md:grid-cols-12 gap-8">
    <div
        className="md:col-span-4 lg:col-span-3 rounded-lg border p-6 md:!block"
     
    >
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="grid gap-6">
           
        <div className="pb-16">
      {/* Filter part */}
      <div className="flex flex-col xl:flex-row items-center my-5 p-4 border rounded-md border-primary shadow md:w-[95%] mx-auto gap-4">
        <div className="flex flex-col md:flex-row gap-4 flex-1 w-full">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border-2 border-primary py-[6px] px-6 text-base font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary text-white placeholder-white"
          />

        {/* Category filter part */}
      
        <div className="w-full">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        color="primary"
                        className="capitalize font-medium text-white"
                      >
                        {category || "Select Product Category"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {allCategories?.map((category: ICategory) => (
                        <DropdownMenuItem
                          key={category.name}
                          onSelect={() => handleCategorySelect(category.name)}
                          className="text-white"
                        >
                          {category.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

           {/* Sorting part */}
           <div className="w-full md:w-32">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        color="primary"
                        className="capitalize font-medium text-white"
                      >
                        {sort || "Sort By Price"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onSelect={() => handleSortSelect("asc")} // Handle "Low to High" sort
                        className="text-white"
                      >
                        Low to High
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => handleSortSelect("desc")} // Handle "High to Low" sort
                        className="text-white"
                      >
                        High to Low
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
        </div>
        <div className="flex-1 w-full flex flex-col lg:flex-row gap-5 items-center">
          
          <div className=" space-y-3 mt-3 w-full">
            <Slider
              className="slider"
              min={500}
              max={7000}
              step={10}
              value={[minPrice, maxPrice]}
              onChange={handleSliderChange}
            />

            <p className="xl:text-xl font-medium text-white text-center">
              Price Range: ${minPrice} - ${maxPrice}
            </p>
          </div>
        </div>
      </div>

      {/* Filter show part */}
      {filterApplied && (
        <div className="border border-primary mt-4 p-4 flex gap-3 items-center md:w-[95%] mx-auto rounded-md shadow">
          <p className="font-semibold text-white">Filtered By:</p>
          <div
            onClick={() => setSearchTerm("")}
            className="flex flex-wrap gap-2"
          >
            {debouncedSearchTerm && (
              <span className="border border-primary px-3 py-2 rounded-2xl flex gap-2 items-center text-white cursor-pointer">
                <span>{debouncedSearchTerm}</span>
                <span>
                <X className="text-sm" />
                </span>
              </span>
            )}
            {category && (
              <span
                onClick={() => setCategory("")}
                className="border border-primary px-3 py-2 rounded-2xl flex gap-2 items-center text-white cursor-pointer"
              >
                <span>{category}</span>
                <span>
                <X className="text-sm" />
                </span>
              </span>
            )}
            {selectedCategory && (
              <span
                onClick={() => {
                  setCategory("");
                  const params = new URLSearchParams(searchParams.toString());
                  params.delete("category");
                  window.history.replaceState(
                    null,
                    "",
                    `?${params.toString()}`
                  );
                }}
                className="border border-primary px-3 py-2 rounded-2xl flex gap-2 items-center text-white cursor-pointer"
              >
                <span>{selectedCategory}</span>
                <span>
                  <X className="text-sm" />
                </span>
              </span>
            )}
            {sort && (
              <span
                onClick={() => setSort("")}
                className="border border-primary px-3 py-2 rounded-2xl flex gap-2 items-center text-white cursor-pointer"
              >
                <span>{sort === "asc" ? "Low to High" : "High to Low"}</span>
                <span>
                <X className="text-sm" />
                </span>
              </span>
            )}
            {(minPrice > 500 || maxPrice < 7000) && (
              <span
                onClick={() => {
                  setMinPrice(500);
                  setMaxPrice(7000);
                }}
                className="border border-primary px-3 py-2 rounded-2xl flex gap-2 items-center text-white cursor-pointer"
              >
                <span>
                  Price: {minPrice}-{maxPrice}
                </span>
                <span>
                <X className="text-sm" />
                </span>
              </span>
            )}
            <button
              className="px-3 py-2 flex items-center gap-2 text-white border border-primary rounded-2xl"
              onClick={() => {
                setSearchTerm("");
                setCategory("");
                setSort("");
                setFilterApplied(false);
                setMinPrice(500);
                setMaxPrice(7000);
                const params = new URLSearchParams(searchParams.toString());
                params.delete("category");
                window.history.replaceState(null, "", `?${params.toString()}`);
              }}
            >
              <span>
                <BiFilterAlt className="text-lg" />
              </span>
              <span>Clear All</span>
            </button>
          </div>
        </div>
      )}
        </div>
    </div>
    <div className="md:col-span-8 lg:col-span-9">
    <div className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 px-3">
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
    <div className="md:col-span-12">
    {allProductsResponse?.data?.length > 0 && (
          <div className="flex justify-center items-center mt-4">
            <Pagination
              total={totalPages}
              initialPage={1}
              page={currentPage}
              onChange={handlePageChange}
              showControls
            />
          </div>
        )}
    </div>
</div>
</div>
</div>
  );
};

export default AllProducts;
