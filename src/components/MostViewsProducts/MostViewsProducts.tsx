"use client";
import React, { useContext } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/grid"; // Import Swiper grid styles
import { FreeMode, Pagination, Grid } from "swiper/modules";
import MostViewsCard from "./MostViewsCard";
import RecentProduct from "./RecentProduct";


const MostViewsProducts = () => {


  return (
    <div className="">
      <div className="my-4">
        <div className="grid  grid-cols-1 gap-8">
          <div className="col-span-1">
          
           <h2 className="text-[25px] md:text-[40px] border-b-2  mb-4 md:mb-12 mt"> </h2>
            <Swiper
              slidesPerView={4}
              spaceBetween={30}
              freeMode={true}
              pagination={{
                clickable: true,
              }}
            //   style={{
            //     "--swiper-pagination-color": "#80b500",
            //     "--swiper-pagination-bullet-inactive-color": "#80b500",
            //   }}
              grid={{
                rows: 3,
                fill: "row",
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                480: {
                  slidesPerView: 2,
                  spaceBetween: 15,
                },
                768: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 1,
                  spaceBetween: 30,
                },
              }}
              modules={[FreeMode, Pagination, Grid]}
              className="mySwiper"
            >
             
                <SwiperSlide>
                  {/* <MostViewsCard /> */}
                  <RecentProduct/>
                </SwiperSlide>
             
            </Swiper>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default MostViewsProducts
