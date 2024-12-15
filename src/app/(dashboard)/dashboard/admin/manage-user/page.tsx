"use client";

import UserRoleSelector from "@/components/ManageUsers/UserRoleSelector";
import UsersTable from "@/components/ManageUsers/UsersTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NextPagination } from "@/components/uiElements/NextPagination";
import NextSearchBox from "@/components/uiElements/NextSearchBox";
import useUserDetails from "@/hooks/userUser";
import { useGetAllUsersQuery } from "@/redux/features/category/authApi";

import { useState } from "react";

const MangeUsersView = () => {
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    role: "",
    searchTerm: "",
  });
  const { data, isFetching } = useGetAllUsersQuery(query)

  
  
  return (
    <Card className="w-full mx-auto relative">
      <CardHeader>
        <CardTitle>User Management</CardTitle>
      </CardHeader>
      <CardContent>
        <NextSearchBox
          className="mb-4"
          placeholder="eg. first name, last name or email"
          onValueChange={(searchTerm) => {
            setQuery({ ...query, searchTerm });
          }}
        />
        <UserRoleSelector
          onRoleChange={(role) => {
            const newRole = role === " " ? "" : role;
            setQuery({ ...query, role: newRole });
          }}
        />
        <UsersTable users={data?.usersData || []} isLoading={isFetching} />
      
      </CardContent>
      {isFetching ? (
        <span className="absolute w-full h-full center text-[18px] top-0 left-0 bg-[#ffffffa6]">
          loading...
        </span>
      ) : (
        ""
      )}
    </Card>
  );
};

export default MangeUsersView;

