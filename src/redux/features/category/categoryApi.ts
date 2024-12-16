import { TResponseRedux } from "@/types/global";
import { baseApi } from "../../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => {
        return {
          url: "/category",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return response.data;
      },
      providesTags: ["category"],
    }),
    createCategory: builder.mutation({
      query: (newCategory) => {
        return {
          url: "/category",
          method: "POST",
          body: newCategory, 
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return response.data;
      },
     
      invalidatesTags: ["category"],
    }),
    updateCategory: builder.mutation({
      query: ({ categoryId, formData }) => ({
        url: `/category/${categoryId}`,
        method: "PATCH",
        body: formData, 
      }),
      transformResponse: (response: TResponseRedux<any>) => response.data,
      invalidatesTags: ["category"], 
    }),
    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `/category/${categoryId}`,
        method: "DELETE",
      }),
      transformResponse: (response: TResponseRedux<any>) => response.data,
      invalidatesTags: ["category"], 
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
