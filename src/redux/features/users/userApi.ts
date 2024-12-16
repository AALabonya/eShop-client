
import { IUser} from "@/types/modal";
import { baseApi } from "../../api/baseApi";
import { TResponseRedux } from "@/types/global";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    followUser: builder.mutation({
      query: (vendorInfo) => ({
        url: "/users/follow",
        method: "POST",
        body: vendorInfo,
      }),
      transformResponse: (response: TResponseRedux<IUser[]>) => {
        return response.data;
      },
      invalidatesTags: ["users"],
    }),
    unfollowUser: builder.mutation({
      query: (vendorInfo) => ({
        url: "/users/unfollow",
        method: "DELETE",
        body: vendorInfo,
      }),
      transformResponse: (response: TResponseRedux<IUser[]>) => {
        return response.data;
      },
      invalidatesTags: ["users"],
    }),
    updateCustomer: builder.mutation({
      query: (customerInfo) => ({
        url: "/users/update-customer",
        method: "PATCH",
        body: customerInfo,
      }),
      invalidatesTags: ["users"],
    }),
    updateVendor: builder.mutation({
      query: (vendorInfo) => ({
        url: "/users/update-vendor",
        method: "PATCH",
        body: vendorInfo,
      }),
      invalidatesTags: ["users"],
    }),
    getAllTypeUsers: builder.query({
      query: () => {
          return {
              url: `/users`,
          };
      },
      transformResponse: (response: TResponseRedux<IUser[]>) => {
          return {
              data: response.data,
              meta: response.meta,
          };
      },

      providesTags: ["users"],
  }),
  deleteUser: builder.mutation({
    query: (userId) => ({
      url: `/users/${userId}`, 
      method: "DELETE",
      body: { userId }
    }),
  
    invalidatesTags: ["users"],
  }),
  updateUserStatus: builder.mutation({
    query: ({ userId, status }: { userId: string; status: string }) => ({
      url: `/users/${userId}/status`,
      method: "PATCH",
      body: { status },
    }),
    invalidatesTags: ["users"],
  }),
  singleVendorStatusUpdated: builder.mutation({
    query: ({ vendorId, isDeleted }) => ({
      url: `/users/update-vendor-status/${vendorId}`,
      method: "PATCH",
      body: { isDeleted },  
    }),
    invalidatesTags: ["users"],
  }),
  }),
  
});

export const {
  useFollowUserMutation,
  useUnfollowUserMutation,
  useUpdateCustomerMutation,
  useUpdateVendorMutation,
useGetAllTypeUsersQuery,
useDeleteUserMutation,
useUpdateUserStatusMutation,
useSingleVendorStatusUpdatedMutation
} = userApi;
