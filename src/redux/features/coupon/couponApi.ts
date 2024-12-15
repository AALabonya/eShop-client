
import { TResponseRedux } from "@/types/global";
import { baseApi } from "../../api/baseApi";
import { ICoupon } from "@/types/modal";

const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCoupons: builder.query({
      query: () => {
        return {
          url: "/coupons",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<ICoupon[]>) => {
        return response.data;
      },
      providesTags: ["coupon"],
    }),
  }),
});

export const { useGetAllCouponsQuery } = couponApi;