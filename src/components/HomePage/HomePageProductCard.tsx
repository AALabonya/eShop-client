import Link from "next/link";
import { useState } from "react";

import { IoMdCart } from "react-icons/io";

import { useRouter } from "next/navigation";
import { IProduct } from "@/types/modal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import useUserDetails from "@/hooks/userUser";
import { addProduct, clearCart } from "@/redux/features/products/productSlice";
import { toast } from "sonner";
import WarningModal from "../shared/CarConflictVendorWarning";
import Image from "next/image";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { Eye, ShoppingBasket } from "lucide-react";
import { FaArrowCircleRight } from "react-icons/fa";
import { addCompareProducts, removeFromComparison, selectCompareProducts } from "@/redux/features/productCompare/compareSlice";
import ProductComparison from "../productComparison/ProductComparison";
import { GrCompare } from "react-icons/gr";
interface ProductCardProps {
  singleProduct: IProduct;
  isCompareActive?: boolean;
  setIsCompareActive?:{};
  compareProducts: IProduct[];
  onCompareCheckbox: (checked: boolean, product: IProduct) => void;
}
const HomePageProductCard = ({ singleProduct}: { singleProduct: IProduct }) => {
  const params = new URLSearchParams();
  params.set("product", singleProduct.id);
  const { products } = useAppSelector((state) => state.products);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingProduct, setPendingProduct] = useState<any>(null);
  const { userData } = useUserDetails();
  const router = useRouter();
  const [isCompareActive, setIsCompareActive] = useState(false);
  const dispatch = useAppDispatch();
  const productsForComparison = useAppSelector(selectCompareProducts);

  const addProductToCart = () => {
    if (!userData?.userData) {
      router.push("/login");
      return;
    }

    const productInfo = {
      id: singleProduct.id,
      name: singleProduct?.name,
      price: singleProduct?.price,
      quantity: 1,
      image: singleProduct?.image[0],
      inStock: singleProduct.stockQuantity - 1,
      vendorId: singleProduct?.vendor?.id,
    };

    dispatch(addProduct(productInfo));
    toast.success("Product added to cart successfully!");
  };

  const handleAddToCart = () => {
    const existingVendorId = products[0]?.vendorId;

    console.log(existingVendorId, singleProduct?.vendor?.id);

    if (existingVendorId && existingVendorId !== singleProduct?.vendor?.id) {
      setPendingProduct({
        id: singleProduct.id,
        name: singleProduct?.name,
        price: singleProduct?.price,
        quantity: 1,
        image: singleProduct?.image[0],
        inStock: singleProduct.stockQuantity - 1,
        vendorId: singleProduct?.vendor?.id,
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

  const discountPercentage = (singleProduct?.discount ?? 0) / 100;
  const discountAmount = singleProduct.price * discountPercentage;
  const discountedPrice = singleProduct.flashSale
    ? singleProduct.price - discountAmount
    : singleProduct.price;

    const handleCompareButton = () => {
      if (productsForComparison.length >= 3) {
        toast.error("You can only compare up to 3 products.");
        return;
      }
  
      dispatch(addCompareProducts({ products: [...productsForComparison, singleProduct] }));
      toast.success(`${singleProduct.name} added for comparison.`);
    };
  
    const handleCompareCheckbox = (checked: boolean) => {
      if (checked) {
        handleCompareButton();
      } else {
        dispatch(removeFromComparison(singleProduct.id));
        toast.success(`${singleProduct.name} removed from comparison.`);
      }
    };

    console.log("from redux", productsForComparison);
  return (
    <div className="bg-[#F1F1F1 ">
    <div className="bg-whie px-3 py-2 lg:py-6 shadow-d borer mt-2">
   <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3 lg:gap-4">
      <div className="h-[420px] w-72 bg-white  cursor-pointer group shadow-lg rounded-md border px-3 py-1 lg:py-3">
          {/* Image Section */}
      <div className="relative overflow-hidden rounded-lg">
       <Image
            className="mx-auto group-hover: w-[200px] h-[140px] md:h-[170px] lg:h-[320px] md:w-full lg:w-full object-cover rounded-md transition-opacity hover:duration-700 ease-in-out group-hover:scale-110 transition-transform duration-500"
            src={singleProduct.image[0]}
            alt={singleProduct.name}
            width={500}
            height={150}
          />
  <div className="absolute top-5 left-2">
  {singleProduct.flashSale ? (
      <span className="bg-red-600 text-white px-4 text-base py-1 rounded-tl-[15px] rounded-tr-none rounded-bl-none rounded-br-[15px]">
        {singleProduct.discount}% off
      </span>
    ) : (
      <span className="bg-[#80b500] text-white px-4 text-base py-1 rounded-tl-[15px] rounded-tr-none rounded-bl-none rounded-br-[15px]">
        New Arrival
      </span>
    )}
</div>

        {userData?.userData ? (
          <div>
            {singleProduct.stockQuantity > 0 && (
              
             <div>
          <div className="flex justify-center">
<ul className="flex gap-3 h-[715px] lg:h-[40px] rounded-full bg-opacity-90 opacity-0 group-hover:opacity-100 transition-all duration-700  top-[180px] justify-center items-center  absolute group-hover:bottom-0">
            <li
          
              className="w-[38px] shadow-md border h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[360deg] transition-all"
            >
             <button
         
           
          >
            <li className="w-[38px] shadow-md border h-[38px] cursor-pointer bg-green-5-- flex justify-center items-center rounded-full">
                          <button onClick={handleCompareButton}>
                            <GrCompare className="text-xl text-black" />
                          </button>
                        </li>

          </button>
            </li>
            <Link
            href={`/product?${params.toString()}`}
              className="w-[38px] shadow-md border h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-red-500 hover:text-white hover:rotate-[360deg] transition-all"
            >
        
            <Eye className="w-[50px]"/>
            </Link>
         
          
          </ul>
       
          <div   onClick={() => handleAddToCart()} className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-40 h-[75px] rounded-t-full bg-[#80b500] text-white flex flex-col items-center justify-center text-sm font-semibold opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-300 cursor-pointer border border-white">
  <span>
  <ShoppingBasket  className="text-[20px] text-white mb-2"/>
  </span>
  <span className="text-lg">Add to Cart</span>
</div>
         </div>
             </div>
            )}
          </div>
        ) : (
        <div className="flex justify-center"> 
          <ul className="flex gap-3 h-[715px] lg:h-[40px] rounded-full bg-opacity-90 opacity-0 group-hover:opacity-100 transition-all duration-700  top-[180px] justify-center items-center  absolute group-hover:bottom-0">
            <li
          
              className="w-[38px] shadow-md border h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[360deg] transition-all"
            >
             <button
         
           
          >
            <FaArrowRightArrowLeft  className="w-[50px]" />
          </button>
            </li>
            <Link
            href={`/product?${params.toString()}`}
              className="w-[38px] shadow-md border h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-red-500 hover:text-white hover:rotate-[360deg] transition-all"
            >
        
            <Eye className="w-[50px]"/>
            </Link>
         
          
          </ul>
           <span
        onClick={handleAddToCart}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-40 h-[75px] rounded-t-full bg-primary text-white flex flex-col items-center justify-center text-sm font-semibold opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-300 cursor-pointer border border-white"
      >
        <span>
          <IoMdCart className="text-xl" />
        </span>
        <span className="text-lg">Add to Cart</span>
      </span></div>


        )}
      </div>

      {/* Details Section */}
      {/* <div className="gap-2 flex flex-col">
        <h1 className="text-xl font-semibold text-white flex-grow">
          {singleProduct.name}
        </h1>
        <div className="flex gap-2 items-center mt-3 mb-1">
          <span className="font-medium md:text-lg text-white">Price:</span>
          <h2
            className={`font-medium md:text-lg text-white ${singleProduct?.flashSale && "line-through"}`}
          >
            <span>$</span>
            {singleProduct.price}
          </h2>
          {singleProduct?.flashSale && (
            <h2 className="font-medium md:text-lg text-primary">
              <span>$</span>
              {discountedPrice}
            </h2>
          )}
        </div>

        <Link href={`/productDetails?${params.toString()}`}>
          <button className="relative h-10 w-full origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold px-3">
            View Details
          </button>
        </Link>

        <WarningModal
          isOpen={isModalOpen}
          onConfirm={handleConfirmReplace}
          onCancel={handleCancel}
        />
      </div> */}
   {/* <Link  href={`/product/`}>
   <div className="flex-1">

    <div className="flex items-center justify-between mt-2">  <button className="text-white text-sm font-medium bg-[#7fad39] px-2 py-1 rounded-md">
                 {singleProduct.category?.name || "Unknown Category"}
               </button> <p className="font-semibold flex items-center gap-1 text-red-500 pb-2 transition-all duration-500">
              $ {singleProduct?.discount}
             </p></div>

             <h3 className="font-medium text-slate-800 my-1 mt-1 hover:text-red-500 duration-500">
             {singleProduct.name}
             </h3>

             <button className="block lg:hidden text-red-500 absolute bottom-5 right-4">
              {" "}
               <FaArrowCircleRight className="text-[21px]" />{" "}
             </button>

 

      </div>
   </Link> */}
    <Link href={`/product?${params.toString()}`}>
     <div className="gap-2 flex-1 flex-col">
     <button className="text-white text-sm font-medium bg-[#7fad39] px-3 py-1 rounded-md">
                 {singleProduct?.category?.name || "Unknown Category"}
               </button>
    
        <h1 className="text-lg font-semibold text-black flex-grow">
          {singleProduct.name}
        </h1>
        <div className="flex gap-2 items-center">
          <span className="font-medium md:text-lg text-black">Price:</span>
          <h2
            className={`font-medium md:text-lg text-black ${singleProduct?.flashSale && "line-through"}`}
          >
            <span>$</span>
            {singleProduct.price}
          </h2>
          {singleProduct?.flashSale && (
            <h2 className="font-medium md:text-lg text-primary">
              <span>$</span>
              {discountedPrice}
            </h2>
          )}
        </div>

      </div>



      </Link>
      </div>
    </div>

   </div>
   <WarningModal
          isOpen={isModalOpen}
          onConfirm={handleConfirmReplace}
          onCancel={handleCancel} />

<div>
{isModalOpen && <ProductComparison setIsModalOpen={setIsModalOpen} openCart={isModalOpen} />}
</div>
    </div>

  );
};

export default HomePageProductCard;