import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSingleVendorStatusUpdatedMutation } from "@/redux/features/users/userApi";
import { IVendor } from "@/types/modal";

import { useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { toast } from "sonner";


const ToggleBlackListShop = ({ shop }: { shop: IVendor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  console.log(shop.id);
  
  // Use the mutation hook to update the vendor status
  const [singleVendorStatusUpdated] = useSingleVendorStatusUpdatedMutation();

  const handleAction = async () => {
    setIsLoading(true);
  
    try {
      const isDeleted = true;  // Ensure this is a boolean
      const vendorId= shop.vendor.id
      await singleVendorStatusUpdated({ vendorId, isDeleted });
  
      toast.success(`Shop ${shop.vendor.name} has been added to the blacklist`);
    } catch (error) {
      toast.error("Error in updating vendor status");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Button onClick={handleAction} disabled={isLoading}>
      {isLoading ? <FaSpinner className="animate-spin" /> : ""}
      {shop.isDeleted ? "Remove from Blacklist" : "Blacklist"}
    </Button>
  );
};

export default ToggleBlackListShop;