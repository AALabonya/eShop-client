import { TResponseRedux } from "@/types/global";
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
        getAllReviews: builder.query({
            query: (queryObj) => {
                const { page, limit, vendorId } = queryObj || {};

                let url = "/reviews";
                let params = new URLSearchParams();

                if (vendorId) {
                    params.append("vendorId", vendorId);
                }

                if (page && limit) {
                    params.append("page", page);
                    params.append("limit", limit);
                }

                if (params.toString()) {
                    url += `?${params.toString()}`;
                }

                return {
                    url,
                    method: "GET",
                };
            },
            transformResponse: (response: TResponseRedux<any>) => response.data,
            providesTags: ["reviews"],
        }),
    }),
});

export const {
    useCreateReviewMutation,
    useGetReviewsByIdQuery,
    useGetAllReviewsQuery,
} = reviewApi;
