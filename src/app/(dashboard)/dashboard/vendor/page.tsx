"use client";

import React from "react";
import { FaBox, FaShoppingCart, FaUsers, FaMoneyBillWave } from "react-icons/fa";

const WelcomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#80b500] text-white py-4 px-6 shadow-md">
        <h1 className="text-2xl font-semibold">Welcome to Your Vendor Dashboard</h1>
      </header>

    
      <main className="flex-1 p-6">
        <div className="bg-white shadow-md rounded-md p-6">
          <h2 className="text-3xl font-semibold mb-4 text-gray-700">
            Hello, Vendor! 👋
          </h2>
          <p className="text-gray-600">
            This is your central hub where you can manage your products, orders, and customers efficiently.
          </p>
        </div>
        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {/* Products */}
          <div className="bg-white shadow-md p-6 rounded-lg flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-700">Products</h3>
              <p className="text-gray-500 mt-2">Manage and update your products</p>
            </div>
            <FaBox className="text-4xl text-[#80b500]" />
          </div>

          {/* Orders */}
          <div className="bg-white shadow-md p-6 rounded-lg flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-700">Orders</h3>
              <p className="text-gray-500 mt-2">Track and fulfill your orders</p>
            </div>
            <FaShoppingCart className="text-4xl text-[#80b500]" />
          </div>

          {/* Customers */}
          <div className="bg-white shadow-md p-6 rounded-lg flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-700">Customers</h3>
              <p className="text-gray-500 mt-2">View and interact with customers</p>
            </div>
            <FaUsers className="text-4xl text-[#80b500]" />
          </div>

          {/* Revenue */}
          <div className="bg-white shadow-md p-6 rounded-lg flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-700">Revenue</h3>
              <p className="text-gray-500 mt-2">Track your total earnings</p>
            </div>
            <FaMoneyBillWave className="text-4xl text-[#80b500]" />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 text-gray-600 text-center py-4 mt-auto">
        &copy; {new Date().getFullYear()} Vendor Dashboard. All rights reserved.
      </footer>
    </div>
  );
};

export default WelcomePage;
