
import { TResponseRedux } from "@/types/modal";
import { baseApi } from "../../api/baseApi";

const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCoupons: builder.query({
      query: () => {
        return {
          url: "/coupons",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return response.data;
      },
      providesTags: ["coupon"],
    }),
  }),
});

export const { useGetAllCouponsQuery } = couponApi;