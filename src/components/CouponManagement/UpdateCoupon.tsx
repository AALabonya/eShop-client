import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { RiCoupon2Fill } from "react-icons/ri";
import { parseISO, format, formatISO } from "date-fns";
import { toast } from "sonner";
import { ICoupon } from "@/types/modal";
import { useUpdateCouponMutation } from "@/redux/features/coupon/couponApi";

interface UpdateCouponModalProps {
  onClose: () => void;
  singleCoupon: ICoupon;
}

const UpdateCoupon: React.FC<UpdateCouponModalProps> = ({ onClose, singleCoupon }) => {
    console.log(singleCoupon);
    
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      code: singleCoupon?.code || "",
      discountStatus: singleCoupon?.discountStatus || "PERCENTAGE",
      discountValue: singleCoupon?.discountValue || 0,
      endDate: formatISO(new Date(singleCoupon?.endDate || new Date())),
    },
  });
  const [updateCoupon] = useUpdateCouponMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    toast.loading("Updating coupon...");

    const formattedDate = format(parseISO(data.endDate), "yyyy-MM-dd'T'23:59:59'Z'");

    try {
      const couponInfo = {
        code:data?.code,
        discountStatus:data?.discountStatus,
        endDate: formattedDate,
        discountValue: Number(data.discountValue),
      };
console.log(couponInfo);

      // Assume updateCoupon is the mutation function
      const res = await updateCoupon({ id: singleCoupon.id, couponInfo }).unwrap();
      onClose();
      if (res) {
        toast.dismiss();
        toast.success("Coupon updated successfully!");
      
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to update coupon");
    }
  };

  return (
    <div>
      <div className="flex gap-2 items-center justify-center text-primary font-bold text-3xl">
       
        <span>Update Coupon</span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="my-10 p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 my-3 gap-6">
          <input {...register("code")} placeholder="Coupon Code"  className="border"/>
          <select {...register("discountStatus") } className="border">
            <option value="PERCENTAGE">PERCENTAGE</option>
            <option value="FIXED">FIXED</option>
          </select>
          <input type="date" {...register("endDate")}   className="border"/>
          <input type="number" {...register("discountValue")} placeholder="Discount Value"  className="border"/>
        </div>

        <div className="text-center my-6">
          <button
            type="submit"
            className="btn btn-primary uppercase font-bold"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCoupon;
