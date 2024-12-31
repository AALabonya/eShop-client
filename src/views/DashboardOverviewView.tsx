
"use client";

import TransactionHistory from "@/app/(dashboard)/dashboard/admin/transactions/page";
import { Button } from "@/components/ui/button";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { useGetAllTypeUsersQuery } from "@/redux/features/users/userApi";
import React, { useState } from "react";
import { FaUsers, FaStore, FaChartBar, FaCog } from "react-icons/fa";
import UserLength from "./UserLength";
import ShopLength from "./ShopLength";
import ReviewsLength from "./ReviewsLength";
import TransactionLength from "./TransactionLength";
import { DollarSignIcon } from "lucide-react";

const DashboardOverviewView = () => {
    const [query, setQuery] = useState({
      page: 1,
      searchTerm: "",
      
    });
    const {data } = useGetAllCategoriesQuery(query);


  
    // const { data, isFetching } = useGetAllTypeUsersQuery
    // ({
    // });
  


  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#80b500] text-white py-4 px-6 shadow-md">
        <h1 className="text-2xl font-semibold">Welcome to the Admin Dashboard</h1>
        <h2 className="text-3xl font-semibold mb-4 text-gray-700">
            Hello, Admin! 👋
          </h2>
          <p className="text-gray-600">
            This is your central hub where you can manage users, vendors, shops, and monitor platform performance.
          </p>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-8">
          {/* Users */}
          <div className="bg-white shadow-md p-6 rounded-lg flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-700">Users</h3>
             <UserLength/>
              <p className="text-gray-500 mt-2">Manage and monitor all users</p>
            </div>
            <FaUsers className="text-4xl text-[#80b500]" />
          </div>

          {/* Vendors */}
          <div className="bg-white shadow-md p-6 rounded-lg flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-700">Shops</h3>
              <ShopLength/>
              <p className="text-gray-500 mt-2">Manage registered Shops</p>
            </div>
            <FaStore className="text-4xl text-[#80b500]" />
          </div>

  <div className="bg-white shadow-md p-6 rounded-lg flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-700">Categories</h3>
            <Button className="bg-[#80b500] mt-2">{data?.length}</Button>
              <p className="text-gray-500 mt-2">View platform Categories</p>
            </div>
            <FaCog className="text-4xl text-[#80b500]" />
          </div>
          {/* Reviews*/}
          <div className="bg-white shadow-md p-6 rounded-lg flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-700">Reviews</h3>
             <ReviewsLength/>
              <p className="text-gray-500 mt-2">Configure platform settings</p>
            </div>
            <FaCog className="text-4xl text-[#80b500]" />
          </div>
          {/* Reviews*/}
          <div className="bg-white shadow-md p-6 rounded-lg flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-700">Transaction</h3>
             <TransactionLength/>
              <p className="text-gray-500 mt-2">Configure platform settings</p>
            </div>
            <DollarSignIcon className="text-4xl text-[#80b500]" />
          </div>
        </div>
      </main>
    <TransactionHistory/>
      {/* Footer */}
      <footer className="bg-gray-200 text-gray-600 text-center py-4 mt-auto">
        &copy; {new Date().getFullYear()} Admin Dashboard. All rights reserved.
      </footer>
    </div>
  );
};

export default DashboardOverviewView;
