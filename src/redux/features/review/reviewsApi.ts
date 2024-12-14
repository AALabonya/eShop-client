
import { TResponseRedux } from "@/types/modal";
import { baseApi } from "../../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (reviewInfo) => {
        return {
          url: "/reviews",
          method: "POST",
          body: reviewInfo,
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return response.data;
      },
      invalidatesTags: ["reviews"],
    }),
    getReviewsById: builder.query({
      query: (productId) => {
        return {
          url: `/reviews?productId=${productId}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return response.data;
      },
      providesTags: ["reviews"],
    }),
  }),
});

export const { useCreateReviewMutation, useGetReviewsByIdQuery } = reviewApi;