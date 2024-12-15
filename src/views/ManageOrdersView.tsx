"use client";

import DashboardHeading from "@/components/uiElements/DashboardHeading";


import { useState } from "react";

const ManageOrdersView = () => {
  const [query, setQuery] = useState({
    page: 1,
    status: "",
    limit: 10,
  });

 
  return (
    <div>
      <DashboardHeading
        title="Manage Orders"
        description="View and manage your orders"
        className="mb-4"
      />

  
    

      
    </div>
  );
};

export default ManageOrdersView;
