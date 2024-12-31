"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { AiFillCheckCircle } from "react-icons/ai";
import { BsCart3 } from "react-icons/bs";
import { FaCircleXmark } from "react-icons/fa6";

import Loading from "@/app/loading";
import QuantitySelector from "@/components/Home/QuantitySelector";
import HomePageProductCard from "@/components/HomePage/HomePageProductCard";
import WarningModal from "@/components/shared/ConflictWarningModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  useAddRecentProductMutation,
  useGetAllProductsQuery,
  useGetSingleProductQuery,
} from "@/redux/features/products/productApi";
import { addProduct, clearCart } from "@/redux/features/products/productSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IProduct, IReview } from "@/types/modal";
import { Separator } from "@radix-ui/react-select";
import { MessageSquare } from "lucide-react";
import Link from "next/link";
import ReactStars from "react-stars";
import { toast } from "sonner";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const ProductDetails = () => {
  
    const searchParams = useSearchParams();
    const [productId, setProductId] = useState<string | null>(null);
    const cart = useAppSelector((state) => state.products.cart);

    useEffect(() => {
        const id = searchParams.get("product");
        setProductId(id);
    }, [searchParams]);

    const { data, isLoading } = useGetSingleProductQuery(productId ?? "", {
        skip: !productId,
    });

    const [selectedImage, setSelectedImage] = useState<string | undefined>();
    const [quantity, setQuantity] = useState(0);
    const [inStock, setInStock] = useState(data?.inventory || 0);
    const isDisabled = !(inStock && quantity);
    const dispatch = useAppDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pendingProduct, setPendingProduct] = useState<any>(null);
    const [category, setCategory] = useState<string | undefined>(undefined);
    

    const [addRecentProduct] = useAddRecentProductMutation();

    const { data: allProductsResponse, isLoading: allProductsLoading } =
        useGetAllProductsQuery({ category });

    useEffect(() => {
        const addProduct = async () => {
            if (data) {
                try {
                    const productInfo = { productId: data.id };
                    console.log(productInfo);

                    const result = await addRecentProduct(productInfo).unwrap();
                    console.log(result);
                } catch (error) {
                    console.error("Failed to add recent product:", error);
                }
            }
        };

        if (data?.image?.length) {
            setSelectedImage(data.image[0]);
        }

        if (data?.stockQuantity) {
            setInStock(data?.stockQuantity);
        }

        if (data?.category) {
            setCategory(data?.category?.name);
        }

        addProduct();
    }, [data, addRecentProduct]);

    const increment = () => {
        if (inStock > 1) {
            setQuantity((prev) => prev + 1);
            setInStock((prev: number) => prev - 1);
        }
    };

    const decrement = () => {
        if (quantity > 0) {
            setQuantity((prev) => prev - 1);
            setInStock((prev: number) => prev + 1);
        }
    };

    const addProductToCart = () => {
        const productInfo = {
            id: data.id,
            name: data?.name,
            price: data?.price,
            quantity: quantity,
            image: data?.image[0],
            inStock,
            vendorId: data?.vendor?.id,
        };

        dispatch(addProduct({ ...data, quantity }));
        toast.success("Product added to cart successfully.");
    };

    const handleAddToCart = () => {
        const existingVendorId = cart[0]?.vendorId;

        if (existingVendorId && existingVendorId !== data?.vendor?.id) {
            setPendingProduct({
                id: data.id,
                name: data?.name,
                price: data?.price,
                quantity,
                image: data?.image[0],
                inStock,
                vendorId: data?.vendor?.id,
            });
            setIsModalOpen(true);
        } else {
            addProductToCart();
        }
    };

    const handleConfirmReplace = () => {
        dispatch(clearCart());
        addProductToCart();
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setPendingProduct(null);
        setIsModalOpen(false);
    };

    const getCardCount = () => {
        if (window.innerWidth >= 1280) return 5; // xl
        if (window.innerWidth >= 1024) return 4; // lg
        if (window.innerWidth >= 768) return 3; // md
        return 1; // sm and below
    };

    const renderLoadingCards = () => {
        const cardCount = getCardCount();
        return Array.from({ length: cardCount }).map((_, index) => (
            <SwiperSlide key={index}>
                <Loading />
            </SwiperSlide>
        ));
    };

    const discountPercentage = (data?.discount ?? 0) / 100;
    const discountAmount = data?.price * discountPercentage;
    const discountedPrice = data?.flashSale
        ? data?.price - discountAmount
        : data?.price;

        const id= data?.vendor.id 
        console.log(id,"shop");
        const params = new URLSearchParams();

        params.set("shop", id)
    return (
        <div className="py-10">
            {isLoading ? (
                <Loading />
            ) : (
                <div>
                    <div className="flex flex-col lg:flex-row items-center justify-center">
                        <div className="flex-1 flex flex-col-reverse xl:flex px-14 gap-8 justify-center items-center xl:items-start xl:justify-start">
                            <div className="flex flex-row justify-center gap-5 lg:pl-5 xl:pl-0">
                                {data?.image?.map(
                                    (singleImage: string, index: number) => (
                                        <div
                                            key={index}
                                            className={`relative rounded-lg border-2 cursor-pointer ${
                                                singleImage === selectedImage
                                                    ? "border-primary"
                                                    : "border-gray-300"
                                            }`}
                                            onClick={() =>
                                                setSelectedImage(singleImage)
                                            }
                                        >
                                            <Image
                                                src={singleImage}
                                                alt="Product Image"
                                                height={90}
                                                width={90}
                                                className="rounded-lg h-[120px] object-cover"
                                            />
                                            {singleImage === selectedImage && (
                                                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg" />
                                            )}
                                        </div>
                                    )
                                )}
                            </div>

                            {selectedImage && (
                                <Image
                                    src={selectedImage}
                                    alt="Selected Product Image"
                                    height={400}
                                    width={650}
                                    className="rounded-lg object-cover h-[450px]"
                                />
                            )}
                        </div>
                        <div className="flex-1 space-y-3 flex flex-col justify-center items-center lg:items-start">
                            <h1 className="text-primary text-3xl md:text-4xl">
                                {data?.name}
                            </h1>
                            <p className="text-gray-400 max-w-lg text-center lg:text-left">
                                {data?.description}
                            </p>
                            <div className="flex text-black  gap-2 items-end">
                                <p
                                    className={`text-${
                                        data?.flashSale ? "xl" : "3xl"
                                    } ${
                                        data?.flashSale &&
                                        "line-through text-2xl"
                                    }`}
                                >
                                    Price: <span>$</span>
                                    {data?.price}
                                </p>
                                {data?.flashSale && (
                                    <h2 className="font-medium text-3xl text-primary ml-3">
                                        <span>$</span>
                                        {discountedPrice}
                                    </h2>
                                )}
                            </div>
                            <p
                                id="helper-text-explanation"
                                className=" text-black text-2xl mt-5"
                            >
                                Avaiable in stock :{" "}
                                <span> {data?.stockQuantity}</span>
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3 mt-2">
                                {inStock ? (
                                    <div className="flex items-center space-x-2 border-2 border-primary text-black px-4 py-2 rounded-lg shadow-sm">
                                        <span className="text-xl text-primary">
                                            <AiFillCheckCircle />
                                        </span>
                                        <span className="font-semibold text-primary">
                                            Item Available
                                        </span>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-2 border-2 border-primary text-black px-4 py-2 rounded-lg shadow-sm">
                                        <span className="text-xl text-primary">
                                            <FaCircleXmark />
                                        </span>
                                        <span className="font-semibold text-primary">
                                            Out of Stock
                                        </span>
                                    </div>
                                )}
                            </div>
                            <p
                                id="helper-text-explanation"
                                className=" text-black text-2xl mt-5"
                            >
                                Select the quantity:
                            </p>

                            <div className="flex flex-col md:flex-row gap-6 md:gap-3 w-[70%] lg:w-11/12 mx-auto lg:mx-0">
                                <div className="flex-1 mt-4 lg:mt-0">
                                    <QuantitySelector
                                        quantity={quantity}
                                        increment={increment}
                                        decrement={decrement}
                                        inStock={inStock}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <div>
                                    <button
                                        type="button"
                                        className="min-w-[200px] px-4 py-3 bg-gray-800 hover:bg-gray-900 text-white text-sm font-semibold rounded-md"
                                    >
                                        Buy now
                                    </button>
                                </div>
                                <div>
                                    {isDisabled ? (
                                        <button
                                            disabled={isDisabled}
                                            type="button"
                                            className="flex items-center gap-2 px-6 py-[10px]  rounded-lg w-full justify-center disabled:bg-gray-700 disabled:opacity-50"
                                        >
                                            Add to cart
                                        </button>
                                    ) : (
                                        <label
                                            htmlFor="my-drawer-4"
                                            className="drawer-button w-[280px] mx-auto lg:w-full lg:mx-auto"
                                        >
                                            <span
                                                onClick={handleAddToCart}
                                                className="flex items-center gap-2 px-6 py-3  rounded-lg w-full justify-center cursor-pointer relative h-12 w-30 origin-top transform border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-black hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold"
                                            >
                                                <BsCart3 className="font-bold" />{" "}
                                                <span>Add to cart</span>
                                            </span>
                                        </label>
                                    )}
                                </div>
                            </div>
                            <h1 className="text-black my-3 text-2xl">
                                <span className="font-bold bg-[#80b500] text-white px-4 text-base py-1 rounded-tl-[15px]">
                                    Category:
                                </span>{" "}
                                <span className="text-gray-400">
                                    {data?.category?.name}
                                </span>
                            </h1>
                        </div>
                    </div>
                    <Separator />
                    <section className="mt-[40px] bg-white p-[15px]">
                        <h1
                            className={`px-[10px] text-[40px] font-[400] w-full border-b-[1px] border-borderColor`}
                        >
                            Shop Owner Info
                        </h1>

                        <Card className="w-full mt-[20px]">
                            <CardContent className="">
                                <div className="flex justify-between py-5 rounded-lg">
                                    <div className="px-4 w-1/2">
                                        <h1 className="text-3xl">
                                            Shop Owner: {data?.vendor?.name}
                                        </h1>
                                        <span className="font-bold text-3xl">
                                            Shop Name:
                                        </span>{" "}
                                        <span className="relative inline-block text-2xl font-medium text-gray-400 cursor-pointer">
                                            {data?.vendor?.shopName}
                                        </span>
                                    </div>
                                    <div className="w-1/2 flex justify-center gap-5">
                                        <Link
                                            href={`/shop-page?${params.toString()}`}
                                        >
                                            <Button className="bg-[#7fad39] text-white">
                                                {" "}
                                                View Shop Details
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex flex-col gap-[15px] w-full">
                            <div className="text-center text-gray-500"></div>
                        </div>
                    </section>
                    <div className="flex justify-end"></div>
                    {/* reviews section  */}
                    <section className="mt-[40px] bg-white p-[15px]">
                        <h1
                            className={`px-[10px] text-[40px] font-[400] w-full border-b-[1px] border-borderColor`}
                        >
                            Reviews
                        </h1>

                        {data?.reviews?.length === 0 ? (
                            <Card className="w-full mt-[20px]">
                                <CardContent className="flex flex-col items-center justify-center py-10">
                                    <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                                    <h3 className="text-lg font-semibold mb-2">
                                        No Reviews Yet
                                    </h3>
                                    <p className="text-sm text-muted-foreground text-center">
                                        Be the first to share your thoughts
                                        about this product!
                                    </p>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="flex flex-col gap-[15px] w-full">
                                <div className="text-center text-gray-500">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 px-4">
                                        {data?.reviews?.map(
                                            (
                                                singleReview: IReview,
                                                index: number
                                            ) => (
                                                <div
                                                    key={index}
                                                    className="px-10 pb-12 border-2 border-[#80b500]/80 rounded-lg"
                                                >
                                                    <div className="flex items-center gap-10 pt-8">
                                                        <div className="flex">
                                                            <img
                                                                src={
                                                                    singleReview
                                                                        ?.customer
                                                                        ?.image
                                                                }
                                                                alt="profile"
                                                                className="rounded-full w-20 h-20 object-cover object-top"
                                                            />
                                                            <svg
                                                                viewBox="-1 0 19 19"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="cf-icon-svg w-10 -ml-5"
                                                            >
                                                                <g
                                                                    id="SVGRepo_bgCarrier"
                                                                    strokeWidth="0"
                                                                />
                                                                <g
                                                                    id="SVGRepo_tracerCarrier"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                                <g id="SVGRepo_iconCarrier">
                                                                    <path
                                                                        d="M16.417 9.583A7.917 7.917 0 1 1 8.5 1.666a7.917 7.917 0 0 1 7.917 7.917z"
                                                                        fill="#f5840c"
                                                                    />
                                                                    <path
                                                                        d="M7.659 9.733a3.333 3.333 0 0 0-.362-2.507 2.543 2.543 0 0 0-.908-.851 2.504 2.504 0 0 0-1.364-.278 2.259 2.259 0 0 0-1.297 3.99 2.23 2.23 0 0 0 2.515.211 3.335 3.335 0 0 1-1.655 1.403 3.942 3.942 0 0 1-.485.164 1.84 1.84 0 0 0-.445.128.567.567 0 0 0 .32 1.059 2.496 2.496 0 0 0 .5-.113 5.2 5.2 0 0 0 .475-.161A4.37 4.37 0 0 0 7.57 10.07q.053-.167.09-.337zm6.34 0a3.331 3.331 0 0 0-.362-2.507 2.54 2.54 0 0 0-.908-.851 2.502 2.502 0 0 0-1.364-.278 2.259 2.259 0 0 0-1.297 3.99 2.229 2.229 0 0 0 2.515.211 3.334 3.334 0 0 1-1.654 1.403 3.96 3.96 0 0 1-.486.164 1.847 1.847 0 0 0-.445.128.568.568 0 0 0 .32 1.059 2.496 2.496 0 0 0 .5-.113q.241-.07.475-.161a4.37 4.37 0 0 0 2.617-2.708q.052-.167.089-.337z"
                                                                        fill="#ffffff"
                                                                    />
                                                                </g>
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <h1 className="text-2xl font-semibold text-primary">
                                                                {
                                                                    singleReview
                                                                        ?.customer
                                                                        ?.name
                                                                }
                                                            </h1>
                                                            <ReactStars
                                                                count={5}
                                                                value={
                                                                    singleReview?.rating
                                                                }
                                                                size={24}
                                                                color2={
                                                                    "#f5840c"
                                                                }
                                                                edit={false}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="mt-8">
                                                        <p className="md:text-lg text-left text-[#80b500]">
                                                            &quot;
                                                            {
                                                                singleReview?.comment
                                                            }
                                                            &quot;
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>

                    <div className="my-10">
                        <div className="">
                            <div className="items-end justify-between sm:flex">
                                <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                                    Related Products
                                </h2>

                                <div className=" flex gap-4 lg:mt-0">
                                    <button
                                        aria-label="Previous slide"
                                        id="keen-slider-previous"
                                        className="rounded-md border border-rose-600 px-3 py-1 text-rose-600 transition hover:bg-rose-600 hover:text-black"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-5 rtl:rotate-180"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15.75 19.5L8.25 12l7.5-7.5"
                                            />
                                        </svg>
                                    </button>

                                    <button
                                        aria-label="Next slide"
                                        id="keen-slider-next"
                                        className="rounded-md border border-rose-600 px-3 py-1 text-rose-600 transition hover:bg-rose-600 hover:text-black"
                                    >
                                        <svg
                                            className="size-5 rtl:rotate-180"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M9 5l7 7-7 7"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="w-full my-8">
                            <Swiper
                                spaceBetween={5}
                                loop={true}
                                pagination={{
                                    clickable: true,
                                }}
                                modules={[Navigation]}
                                className="mySwiper"
                                breakpoints={{
                                    640: { slidesPerView: 1 },
                                    768: { slidesPerView: 4 },
                                    1024: { slidesPerView: 4 },
                                }}
                            >
                                {allProductsLoading
                                    ? renderLoadingCards()
                                    : (() => {
                                          const filteredProducts =
                                              allProductsResponse?.data?.filter(
                                                  (singleProduct: IProduct) =>
                                                      singleProduct?.id !==
                                                      data?.id
                                              );

                                          if (filteredProducts?.length === 0) {
                                              return (
                                                  <div className="text-center text-black text-2xl font-bold mt-6">
                                                      Sorry, no related products
                                                      available.
                                                  </div>
                                              );
                                          }

                                          // Render the filtered products
                                          return filteredProducts.map(
                                              (
                                                  singleProduct: IProduct,
                                                  index: number
                                              ) => (
                                                  <SwiperSlide
                                                      key={index}
                                                      className=""
                                                  >
                                                      <HomePageProductCard
                                                          singleProduct={
                                                              singleProduct
                                                          }
                                                      />
                                                  </SwiperSlide>
                                              )
                                          );
                                      })()}
                            </Swiper>
                        </div>
                    </div>

                    <WarningModal
                        isOpen={isModalOpen}
                        onConfirm={handleConfirmReplace}
                        onCancel={handleCancel}
                    />
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
