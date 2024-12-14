
import ContactUs from "@/components/Home/ContactUs";
import FlashProduct from "@/components/Home/FlashSaleProduct";

import Products from "@/components/HomePage/Products";
import RecentrlyViewProducts from "@/components/Home/RecentrlyViewProducts";

import Banner from "@/components/shared/Banner";

export default function Home() {
  return (
    <div className="w-full py-[50px]">
    
    <Banner/>
    <Products />
    <FlashProduct/>
      {/* <FollowedShopProduct /> */}

      <RecentrlyViewProducts />
     

    </div>
  );
}
