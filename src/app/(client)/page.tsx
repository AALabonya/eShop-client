import BestDeal from "@/components/Home/BestDeal";
import BundleSet from "@/components/Home/BundleSet";
import Category from "@/components/Home/Category";
import FlashProduct from "@/components/Home/FlashSaleProduct";
import Support from "@/components/Home/Support";
import WhyChooseUs from "@/components/Home/WhyChoseUs";
import Products from "@/components/HomePage/Products";
import MostViewsProducts from "@/components/MostViewsProducts/MostViewsProducts";

import Banner from "@/components/shared/Banner";

export default function Home() {
    return (
        <div className="w-full mt-[30px] z-10">
            <Banner />

            <Category/>
            <Products />
            <FlashProduct />
            <BestDeal/>
            <MostViewsProducts/>
            {/*
            */}
            {/* <RecentrlyViewProducts /> */}
          
        <BundleSet/>
            <WhyChooseUs/>
            <Support/> 
        </div>
    );
}
