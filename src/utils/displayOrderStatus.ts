import { TOrderStatus } from "@/types/modal";

export const displayOrderStatus = (status: TOrderStatus) => {
  switch (status) {
    case "PENDING":
      return "Pending";
    case "IN_TRANSIT":
      return "IN TRANSIT";
    case "DELIVERED":
      return "DELIVERED";
    default:
      return "Unknown";
  }
};
