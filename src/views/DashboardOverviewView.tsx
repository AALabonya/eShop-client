"use client";



import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { CreditCard, ShoppingBag, Store, Users } from "lucide-react";

const DashboardOverviewView = () => {

  const cards = [
    { title: "Active Users", icon: Users },
    {
      title: "Active Vendors",
     
      icon: Store,
    },
    {
      title: "Active Shops",
     
      icon: ShoppingBag,
    },
    {
      title: "Total Payments",
      
      icon: CreditCard,
    },
  ];
  return (
    <div className=" p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
          >
            <Card className="cursor-pointer hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">
                  {card.title}
                </CardTitle>
                <card.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
               
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    
    </div>
  );
};

export default DashboardOverviewView;
