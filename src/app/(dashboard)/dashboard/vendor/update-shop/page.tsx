
"use client"

import ShopForm from "@/components/MyShop/ShopForm";
import Loader from "@/components/shared/Loader";
import useUserDetails from "@/hooks/userUser";
import { useUpdateVendorMutation } from "@/redux/features/users/userApi";

const EditMyShop= () => {

  const { userData } = useUserDetails();

  return (

     <>
     <ShopForm initialValues={userData?.userData} />;

    </>
  )
};

export default EditMyShop;
