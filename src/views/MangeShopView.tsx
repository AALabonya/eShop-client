"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NextSearchBox from "@/components/uiElements/NextSearchBox";
import { useState } from "react";

const MangeShopView = () => {
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    isBlackListed: "",
    searchTerm: "",
  });



  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle>Shop Management</CardTitle>
      </CardHeader>
      <CardContent>
        <NextSearchBox
          className="mb-4"
          placeholder="Search by shop name"
          onValueChange={(searchTerm) => {
            setQuery({ ...query, searchTerm });
          }}
        />


       
      </CardContent>
    </Card>
  );
};

export default MangeShopView;
