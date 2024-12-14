import ManageVendorProducts from "@/components/ManageVendorProduct/ManageVendorProducts";
import Protectedroute from "@/provider/Protectedroute";


const page = () => {
  return (
    <Protectedroute role={"VENDOR"}>
      <ManageVendorProducts/>
    </Protectedroute>
  );
};

export default page;