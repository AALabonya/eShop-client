import { MoveRight } from "lucide-react";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="my-5">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-8">
      <div className="col-span-4 group">
  <div className="relative md:w-full xl:h-[500px] lg:h-[355px] md:h-[290px] rounded-md overflow-hidden">
    {/* Image Wrapper with Scaling */}
    <div className="bg-[url('https://img.freepik.com/free-photo/cyber-monday-retail-sales_23-2148688493.jpg?t=st=1733168891~exp=1733172491~hmac=3ad3f86a7275f8f1d29576734747a74724f1f85836ef347b8679f387e6cc464a&w=1380')] bg-cover bg-center h-full w-full transition-transform ease-in-out transform group-hover:scale-105">
    </div>

    {/* Content Overlay */}
    <div className="absolute top-0 left-0 w-full h-full md:pt-[50px] lx:pt-[120px] pt-[20px] pl-[20px]  md:pb-[0px] md:pl-[80px]">
      <h2 className="uppercase text-gray-600">
        Exclusive Offer{" "}
        <button className="text-[#1d8e42] uppercase ml-2 rounded-full px-3 py-[4px] bg-gradient-to-r from-[#c4e4d3] to-gray-100">
          -20% Off
        </button>
      </h2>
      <h1 className="md:text-[25px] xl:text-[45px] lg:text-[55px] text-[20px] font-extrabold md:w-[500px] lx:my-2 md:my-1 my-2 md:leading-[50px]">
      Treat Your Family to the Best
      </h1>
      <h2 className="md:text-lg text-gray-600"> This week only. Don’t let it slip away...</h2>
      <h2 className="md:text-lg text-gray-600 my-4">
      Starting from{" "}{" "}
        <span className="md:text-2xl xl:text-4xl lg:text-4xl text-lg text-red-500">
          $7.99
        </span>
      </h2>
      <button className="bg-[#80b500] rounded-lg text-sm mt-16 md:text-base flex justify-center text-white items-center gap-2 md:py-2 md:px-6 py-[4px] px-3">
        Shop Now <MoveRight />{" "}
      </button>
    </div>
  </div>
</div>

<div className="col-span-2 group">
  <div className=" overflow-hidden rounded-md xl:h-[500px] lg:h-[355px] md:h-[290px] object-scale-down">
    <Image
      className="rounded-md transition-transform duration-500 ease-in-out transform group-hover:scale-105 object-scale-down"
      src="/gooq9zvo.png"
      width={400}
      height={50}
      alt="banner"
    />
  </div>
</div>

      </div>
      <div>
        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-4 md:mt-8">
        <div className="col-span-1 group">
  <div className="w-full lg:h-[250px] bg-cover rounded-md bg-no-repeat bg-center bg-[url('https://img.freepik.com/premium-photo/concept-flat-lay-brown-glass-bottle-body-lotion-marble-board-white-background-with-brunch-top-view-copy-space_185452-2500.jpg?w=826')] transition-transform duration-500 ease-in-out transform group-hover:scale-105">
    <div className="flex justify-start md:ml-[70px] pt-[20px] ml-[20px] pb-[20px] md:pb-[0px] md:pt-[45px]">
      <div>
        <h2 className="lg:text-2xl text-lg text-gray-600">
          Exclusive is so fresh
        </h2>
        <h2 className="lg:text-3xl text-xl font-extrabold my-2">
          only in Bacola
        </h2>
        <h2 className="text-gray-600 text-sm mb-4">
          Bacola Weekend Discount
        </h2>
        <button className="text-white rounded-lg px-6 text-sm py-[6px] bg-[#80b500]">
          Shop Now
        </button>
      </div>
    </div>
  </div>
</div>

<div className="col-span-1 group">
  <div className="w-full md:h-[185px] xl:h-[250px] lg:h-[250px] rounded-md bg-cover bg-no-repeat bg-center bg-[url('https://i.ibb.co.com/nccvkPX/eshop.png')] transition-transform duration-500 ease-in-out transform group-hover:scale-105">
    <div className="flex justify-end md:mr-[40px] pt-[20px] mr-[20px] pb-[20px] md:pb-[0px] md:pt-[25px] xl:pt-[45px] lg:pt-[45px]">
      <div>
        <h2 className="lg:text-2xl text-lg text-gray-600">
          Big Discount
        </h2>
        <h2 className="lg:text-3xl text-xl font-extrabold my-2">
          Organic Legumes
        </h2>
        <h2 className="text-gray-600 text-sm mb-4">
          Bacola Weekend Discount
        </h2>
        <button className="text-white rounded-lg px-6 text-sm py-[6px] bg-[#80b500]">
          Shop Now
        </button>
      </div>
    </div>
  </div>
</div>

        </div>
      </div>
{/* new  */}

    </div>
  );
};

export default Banner;