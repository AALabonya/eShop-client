"use client";

import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { RiCoupon2Fill } from "react-icons/ri";

import { parseISO, format } from "date-fns";
import { useCreateCouponMutation } from "@/redux/features/coupon/couponApi";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Select } from "../ui/select";
import { DiscountStatus } from "@/types/modal";

interface CreateCouponModalProps {
  onClose?: () => void;
}

const CreateCouponModal = ({ onClose }: CreateCouponModalProps) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FieldValues>({
    defaultValues: {
      code: "WINTER25",  // Pre-filled value for code
      discountStatus: "PERCENTAGE",  // Pre-filled value for discountStatus
      discountValue: 25,  // Pre-filled value for discountValue
      endDate: "2025-01-31",  // Pre-filled value for endDate (formatted as a date)
    }
  });

  const discountStatus = [
    { key: "PERCENTAGE", label: "PERCENTAGE" },
    { key: "FIXED", label: "FIXED" },
  ];

  const [createCoupon, { isLoading, error }] = useCreateCouponMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("Form Data:", data); // Debugging: Check if form data is correct
    toast.loading("Creating coupon...");

    const { endDate,discountValue,discountStatus,code} = data;
    const parsedDate = parseISO(endDate);
    const formattedDate = format(parsedDate, "yyyy-MM-dd'T'23:59:59'Z'");

    const couponData = {
      code:code,
      discountStatus:discountStatus,
      endDate: formattedDate,
      discountValue: Number(discountValue),
    };

    try {
      const res = await createCoupon(couponData).unwrap();
      if (res.success) {
        toast.dismiss();
        toast.success("Coupon created successfully!");
        if (onClose) onClose();
      }
    } catch (error: any) {
      toast.dismiss();
      toast.error("Error creating coupon: " + error?.message || "Unknown error");
    }
  };

  return (
    <div>
      <div className="flex gap-2 items-center justify-center text-primary font-bold text-3xl">
        <span>
          <RiCoupon2Fill className="text-primary text-3xl" />
        </span>
        <span>Create Coupon</span>
      </div>

      <div className="my-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 my-3 gap-6">
            {/* Code Input */}
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                Coupon Code
              </label>
              <Input
                id="code"
                type="text"
                {...register("code", { required: "Code is required" })}
              />
              {errors.code?.message && (
                <span className="text-red-500 text-sm">{errors.code.message as string}</span>
              )}
            </div>

            {/* Discount Status */}
            <Select
              {...register("discountStatus", { required: "Discount status is required" })}
              name="discountStatus"
            >
              <select {...register("discountType")}>
            <option value="PERCENTAGE">PERCENTAGE</option>
            <option value="FIXED">FIXED</option>
          </select>
            </Select>

            {/* Expiry Date */}
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                Coupon Expiry Date
              </label>
              <Input
                id="endDate"
                type="date"
                {...register("endDate", { required: "Expiry date is required" })}
              />
              {errors.endDate?.message && (
                <span className="text-red-500 text-sm">{errors.endDate.message as string}</span>
              )}
            </div>

            {/* Discount Value */}
            <div>
              <label htmlFor="discountValue" className="block text-sm font-medium text-gray-700">
                Discount Value
              </label>
              <Input
                id="discountValue"
                type="number"
                {...register("discountValue", { required: "Discount value is required" })}
              />
              {errors.discountValue?.message && (
                <span className="text-red-500 text-sm">{errors.discountValue.message as string}</span>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center my-6">
            <button
       
              type="submit"
              disabled={isLoading}  // Disable button while loading
              className="relative h-10 w-30 origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold px-3"
            >
              {isLoading ? "Creating..." : "Submit"} {/* Change button text during loading */}
            </button>
            <button onClick={onClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCouponModal;
