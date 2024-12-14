// import Protectedroute from "@/provider/Protectedroute";
// import EditMyShopView from "@/views/EditMyShopView";
// const page = () => {
//   return (
//     <Protectedroute role={"VENDOR"}>
//       <EditMyShopView />
//     </Protectedroute>
//   );
// };

// export default page;
"use client"

import ShopForm from "@/components/MyShop/ShopForm";
import Loader from "@/components/shared/Loader";
import useUserDetails from "@/hooks/userUser";
import { useUpdateVendorMutation } from "@/redux/features/users/userApi";

const EditMyShop= () => {

  const { userData } = useUserDetails();

 console.log(userData?.userData?.shopName);
 console.log(userData?.userData?.logo);
 console.log(userData?.userData?.description);
  return (

     <>
     <ShopForm initialValues={userData?.userData} />;

    </>
  )
};

export default EditMyShop;
