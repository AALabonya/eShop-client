import React from "react";

import Image from "next/image";
import BlogCard from "./BlogCard";


const BlogPage = () => {
  const blogPosts = [
    {
      image: "https://img.freepik.com/free-photo/nutrition-healthy-diet-plan-concept_53876-125014.jpg?t=st=1733342352~exp=1733345952~hmac=bf956193685bac03acc46842c64756f8c6769b7de6a7956f5ed1f1905bee926b&w=900",
      title: "Exploring the Art of Minimalist Web Design",
      paragraph:
        "Discover how minimalist design principles can help create stunning and effective websites by focusing on simplicity, user experience, and impactful visuals.",
      readMore: "Read More",
      date: "May 3, 2021",
      category: "Design & Development",
      tags: "web design, UX",
    },
    {
      image: "https://img.freepik.com/premium-photo/raw-meat-vegetables-wooden-board-isolated-white_392895-305402.jpg?w=900",
      title: "10 Essential Tips for Better Grocery Shopping",
      paragraph:
        "Learn how to save money and time with these practical grocery shopping tips. From meal planning to finding fresh produce, we've got you covered.",
      readMore: "Read More",
      date: "May 3, 2021",
      category: "Lifestyle",
      tags: "grocery, shopping",
    },
    {
        image: "https://img.freepik.com/premium-photo/cute-little-girl-2-4-gray-dress-boy-7-10-t-shirt-cooking-pizza-together-kitchen-brother-sister-cooking_349071-457.jpg?w=900",
        title: "Brewing the Perfect Cup of English Breakfast Tea",
        paragraph:
          "Dive into the world of tea with our guide to brewing the perfect cup of English Breakfast Tea. Pair it with delightful desserts for a complete experience.",
        readMore: "Read More",
        date: "May 2, 2021",
        category: "Food & Drink",
        tags: "tea, dessert",
      },
    {
      image: "https://img.freepik.com/premium-photo/bouquet-spring-wildflowers-white-background_86117-2286.jpg?w=996",
      title: "Brewing the Perfect Cup of English Breakfast Tea",
      paragraph:
        "Dive into the world of tea with our guide to brewing the perfect cup of English Breakfast Tea. Pair it with delightful desserts for a complete experience.",
      readMore: "Read More",
      date: "May 2, 2021",
      category: "Food & Drink",
      tags: "tea, dessert",
    },
  ];

  return (
    <div className="container mx-auto px-4">
      {/* Blog Page Layout */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-8 my-12">
        {/* Main Content Area */}
        <div className="col-span-5">
          <h1 className="text-3xl font-bold mb-6">Our Latest Blogs</h1>
          <div className="space-y-6">
            {blogPosts.map((item, idx) => (
              <BlogCard item={item} key={idx} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-2">
          {/* Search Bar */}
          <div className="mb-8">
            <fieldset className="space-y-1">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 512 512"
                    className="w-5 h-5 text-gray-400"
                  >
                    <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                  </svg>
                </span>
                <input
                  id="search"
                  type="search"
                  placeholder="Search blogs..."
                  className="w-full py-2 pl-10 pr-3 text-sm border rounded focus:outline-none focus:ring focus:ring-blue-300 bg-gray-100"
                />
              </div>
            </fieldset>
          </div>

          {/* Popular Posts */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Popular Posts</h2>
            <div className="space-y-4">
              {blogPosts.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="rounded-lg"
                    width={60}
                    height={60}
                  />
                  <div>
                    <h3 className="text-sm font-medium">{item.title.slice(0, 45)}...</h3>
                    <p className="text-xs text-gray-500">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
                    <Image src="/image1.png" width={350} height={300} alt="" className=' h-full rounded-lg' />
                </div>
                <div className="my-6">
  <h1 className="text-3xl font-semibold mb-6">Trending Now</h1>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 gap-6">
  {/* Map through your product list here */}
  {Array(4)
    .fill(null)
    .map((_, index) => (
      <div
        key={index}
        className="group cursor-pointer border border-gray-200 hover:border-green-700 shadow-sm hover:shadow-md duration-200 p-4 rounded-lg bg-white flex items-center gap-4"
      >
        {/* Image */}
        <div className="overflow-hidden rounded-md flex-shrink-0">
          <img
            src="https://nest-frontend-v6.vercel.app/assets/imgs/banner/banner-11.png"
            alt="Trending Product"
            className="h-32 w-32 object-cover group-hover:scale-110 duration-300"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col flex-grow">
          <h2 className="text-lg font-medium text-gray-800 hover:text-green-700 transition">
            Product Name
          </h2>
          <h3 className="text-lg font-medium text-gray-600 hover:text-green-700 transition">
            1200TK
          </h3>

          {/* Rating */}
          <div className="flex items-center mt-2">
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5"
                  fill="yellow"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              ))}
          </div>
        </div>
      </div>
    ))}
</div>

</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
