"use client"
import React, { useState } from "react";

import { IOrder } from "@/types/modal";
import { useGetAllOrdersQuery } from "@/redux/features/orders/orderApi";
export type TOrderFilterRequest = {
  vendorId?: string; // Optional filter by vendor ID
  customerId?: string; // Optional filter by customer ID
};

const TransactionHistory = () => {
  const [filters, setFilters] = useState<TOrderFilterRequest>({});
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Number of orders per page

  // Fetch orders with current filters and pagination
  const { data: orders, isLoading, isError } = useGetAllOrdersQuery({
    page,
    limit,
    ...filters,
  });

  // Handle changes in filters
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Handle pagination
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (isLoading) return <p>Loading transaction history...</p>;
  if (isError) return <p>Failed to fetch transaction history.</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Transaction History</h1>

      {/* Filters */}
      <div className="mb-4">
        <input
          type="text"
          name="customerId"
          placeholder="Filter by Customer ID"
          onChange={handleFilterChange}
          className="border px-2 py-1 mr-2"
        />
        <input
          type="text"
          name="vendorId"
          placeholder="Filter by Vendor ID"
          onChange={handleFilterChange}
          className="border px-2 py-1"
        />
      </div>

      {/* Transaction Table */}
      {orders?.length > 0 ? (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border px-4 py-2">Transaction ID</th>
              <th className="border px-4 py-2">Vendor ID</th>
              <th className="border px-4 py-2">Total Price</th>
              <th className="border px-4 py-2">Delivery Address</th>
              <th className="border px-4 py-2">Coupon</th>
              <th className="border px-4 py-2">Order Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: IOrder) => (
              <tr key={order.transactionId}>
                <td className="border px-4 py-2">{order.transactionId}</td>
                <td className="border px-4 py-2">{order.vendorId}</td>
                <td className="border px-4 py-2">${order.totalPrice.toFixed(2)}</td>
                <td className="border px-4 py-2">{order.deliveryAddress || "N/A"}</td>
                <td className="border px-4 py-2">{order.coupon || "N/A"}</td>
                <td className="border px-4 py-2">
                  <ul>
                    {order.orderDetails.map((detail, idx) => (
                      <li key={idx}>
                        Product ID: {detail.productId}, Quantity: {detail.quantity}, Price: ${detail.pricePerUnit.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No transaction history found.</p>
      )}

      {/* Pagination */}
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="bg-gray-200 px-4 py-2 disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          className="bg-gray-200 px-4 py-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionHistory;
