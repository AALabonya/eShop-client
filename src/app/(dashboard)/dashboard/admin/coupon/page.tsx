"use client";

import Loading from "@/app/loading";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import CreateCouponModal from "@/components/CouponManagement/CreateCoupon";
import { format } from "date-fns";
import { useDeleteCouponMutation, useGetAllCouponsQuery } from "@/redux/features/coupon/couponApi";
import { ICoupon } from "@/types/modal";
import { Pagination } from "@nextui-org/pagination";
import { useState } from "react";
import { toast } from "sonner";
import UpdateCoupon from "@/components/CouponManagement/UpdateCoupon";

const Coupon = () => {
  const { data: allCoupons, isLoading } = useGetAllCouponsQuery(undefined);
  console.log(allCoupons, "check coupon");
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteCoupon] = useDeleteCouponMutation();
  const [selectedCoupon, setSelectedCoupon] = useState<ICoupon | null>(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedEditCoupon, setSelectedEditCoupon] = useState<ICoupon | null>(null);
  const handleDelete = async () => {
    if (!selectedCoupon) return;

    toast.loading("Deleting Coupon...");
    setDeleteModalOpen(false);

    try {
      const res = await deleteCoupon(selectedCoupon.id).unwrap();
      if (res) {
        toast.dismiss();
        toast.success("Coupon deleted successfully!");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const dataPerPage = 6;

  const startIndex = (currentPage - 1) * dataPerPage;
  const endIndex = startIndex + dataPerPage;
  const paginatedCoupons = allCoupons?.slice(startIndex, endIndex) || [];
  const totalCoupons = allCoupons?.length || 0;
  const totalPages = Math.ceil(totalCoupons / dataPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Coupon Management</h1>
      <div className="flex flex-col md:flex-row justify-between items-center mt-8 mb-4 gap-5">
        <div>
          <h1 className="text-black text-2xl font-bold">
            Total Active Coupons: {allCoupons?.length || 0}
          </h1>
        </div>
        <div>
          <button
            onClick={handleModalOpen}
            className="relative h-9 w-30 origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold px-3"
          >
            Create Coupon
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <CreateCouponModal onClose={handleModalClose} />
          </div>
        </div>
      )}

      <div className="pb-8">
        {isLoading ? (
          <div className="grid  gap-5">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index}>
                <Loading />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-5">
           <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">Title</th>
                <th className="border border-gray-300 px-4 py-2">Discount</th>
                <th className="border border-gray-300 px-4 py-2">Expiry Date</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCoupons?.map((coupon: ICoupon, index: number) => (
                <tr key={coupon.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {startIndex + index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {coupon.code}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                  {coupon?.discountStatus === "PERCENTAGE" ? (
                  <span>{coupon?.discountValue}% OFF</span>
                ) : (
                  <span>${coupon?.discountValue} OFF</span>
                )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {format(new Date(coupon?.endDate), "MMMM dd, yyyy")}
                  </td>

                  <td className="border border-gray-300 px-4 py-2 bg-white">
                <Dropdown closeOnSelect={true} className="bg-white">
                  <DropdownTrigger>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-ellipsis cursor-pointer"
                    >
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="19" cy="12" r="1" />
                      <circle cx="5" cy="12" r="1" />
                    </svg>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Actions">
                    <DropdownItem key="edit">
                      <span  onClick={() => {
                        setSelectedEditCoupon(coupon);
                        setEditModalOpen(true);
                      }} className="flex items-center gap-2 bg-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="none"
                          stroke="#000"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-pencil"
                        >
                          <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                          <path d="m15 5 4 4" />
                        </svg>
                        Edit
                      </span>
                    </DropdownItem>
                    <DropdownItem key="delete">
                      <span
                        onClick={() => {
                          setSelectedCoupon(coupon);
                          setDeleteModalOpen(true);
                        }}
                        className="flex items-center gap-2 text-red-600 cursor-pointer bg-white"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="none"
                          stroke="#FF0000"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-trash"
                        >
                          <path d="M3 6h18" />
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                          <line x1="10" x2="10" y1="11" y2="17" />
                          <line x1="14" x2="14" y1="11" y2="17" />
                        </svg>
                        Delete
                      </span>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </td>
                </tr>
              ))}
              
            </tbody>
          </table>
          {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h3 className="text-xl font-bold text-gray-800">
              Are you sure you want to delete this coupon?
            </h3>
            <div className="flex justify-end mt-4 gap-4">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
        </div>
        
        )}
      </div>
      {isEditModalOpen && selectedEditCoupon && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-lg shadow-lg ">
   
      <UpdateCoupon
        singleCoupon={selectedEditCoupon}
        onClose={() => setEditModalOpen(false)}
      />
 
    </div>
  </div>
)}
      <div>
        {totalCoupons > 0 && (
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
  );
};

export default Coupon;
