"use client";

import UserRoleSelector from "@/components/ManageUsers/UserRoleSelector";
import UsersTable from "@/components/ManageUsers/UsersTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NextPagination } from "@/components/uiElements/NextPagination";
import NextSearchBox from "@/components/uiElements/NextSearchBox";
import { useGetAllTypeUsersQuery } from "@/redux/features/users/userApi";

import { useState } from "react";

const MangeUsersView = () => {
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    role: "",
    searchTerm: "",
  });

  const { page, limit, searchTerm, role } = query;

  // Fetch data with query params (searchTerm, page, and role)
  const { data, isFetching, error } = useGetAllTypeUsersQuery({
    page,
    limit,
    searchTerm,
    role,
  });

  console.log(data?.data, "Full API response");
  console.log(error, "API error"); // Log any API error

  const handlePageChange = (newPage: number) => {
    setQuery({ ...query, page: newPage });
  };

  const handleSearchChange = (newSearchTerm: string) => {
    setQuery({ ...query, searchTerm: newSearchTerm, page: 1 });
  };

  const handleRoleChange = (newRole: string) => {
    const updatedRole = newRole === " " ? "" : newRole;
    setQuery({ ...query, role: updatedRole });
  };

  if (isFetching) {
    return <div>Loading...</div>;
  }

  // if (!data || !data.users) {
  //   return <div>No users found</div>;
  // }
  return (
    <Card className="w-full mx-auto relative">
      <CardHeader>
        <CardTitle>User Management</CardTitle>
      </CardHeader>
      <CardContent>
        <NextSearchBox
          className="mb-4"
          placeholder="e.g. first name, last name or email"
          onValueChange={handleSearchChange}
        />
        
        <UserRoleSelector onRoleChange={handleRoleChange} />
        
        {isFetching ? (
          <div>Loading...</div>
        ) : (
          <UsersTable users={data?.data || []} isLoading={isFetching} />
        )}
        
        {/* Pagination can be updated similarly */}
        {/* <NextPagination
          totalDocs={data?.meta?.total || 0}  // Make sure to pass correct totalDocs here
          limit={limit}
          currentPage={page}
          onPageChange={handlePageChange}
        /> */}
      </CardContent>
      
      {isFetching && (
        <span className="absolute w-full h-full center text-[18px] top-0 left-0 bg-[#ffffffa6]">
          loading...
        </span>
      )}
    </Card>
  );
};

export default MangeUsersView;
