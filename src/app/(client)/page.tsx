import FlashProduct from "@/components/Home/FlashSaleProduct";

import RecentrlyViewProducts from "@/components/Home/RecentrlyViewProducts";
import Products from "@/components/HomePage/Products";

import Banner from "@/components/shared/Banner";

export default function Home() {
    return (
        <div className="w-full py-[50px]">
            <Banner />
            <Products />
            <FlashProduct />
            <RecentrlyViewProducts />
        </div>
    );
}
