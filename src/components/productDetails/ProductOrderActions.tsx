"use client";
import { addToCart } from "@/redux/features/cart/cart.slice";
import { addItemsToCheckout } from "@/redux/features/checkout/checkout.slice";
import { useAppSelector } from "@/redux/hook";

import { MinusIcon, PlusIcon, ShoppingBag, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import CarConflictVendorWarning from "../shared/CarConflictVendorWarning";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ICart, IProduct } from "@/types/modal";

const ProductOrderActions = ({ product }: { product: IProduct }) => {
  const [isConflict, setIsConflict] = useState(false);
  const { items } = useAppSelector((state) => state.cart);


  const router = useRouter();

  const dispatch = useDispatch();

  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);



  const handleAddToCart = (replace?: boolean) => {
    const isSameShop = items.find((item) => item.shopId === product.shopId);
    if (!isSameShop && !replace && items.length > 0) {
      setIsConflict(true);
      return;
    }

    const item: Omit<ICart, "cartId"> = {
      productId: product.id,
      price: product.price,
      quantity: selectedQuantity,
      isOutOfStock: false,
      shopId: product.shopId,
      shopName: product.shopInfo.name,
     
      discount: product.discount,
      image: product.images[0],
      name: product.name,
    };

  

    toast.success("Product added to cart successfully 👍");

    dispatch(addToCart({ payload: item, replace: Boolean(replace) }));
  };

  const handleProccedToCheckout = () => {
    const item = {
      productId: product.id,
      price: product.price,
      quantity: selectedQuantity,
      isOutOfStock: false,
      shopId: product.shopId,
      shopName: product.shopInfo.name,
      discount: product.discount,
      image: product.images[0],
      name: product.name,
    };

    dispatch(addItemsToCheckout([item]));

    router.push("/checkout");
  };

  return (
    <>
      <div>
        
      

        <div className="flex items-center justify-start gap-[10px]">
          <h3 className="text-xl font-bold text-gray-800">Avaiable in stock</h3>
          
        </div>
        <div>
                            <h3 className="text-xl font-bold text-gray-800 mt-4">Choose a Color</h3>
                            <div className="flex flex-wrap gap-4 mt-2 ">
                                <button type="button" className="w-6 h-6 bg-black border border-white hover:border-gray-800 rounded-md shrink-0"></button>
                                <button type="button" className="w-6 h-6 bg-gray-400 border border-white hover:border-gray-800 rounded-md shrink-0"></button>
                                <button type="button" className="w-6 h-6 bg-orange-400 border border-white hover:border-gray-800 rounded-md shrink-0"></button>
                                <button type="button" className="w-6 h-6 bg-red-400 border border-white hover:border-gray-800 rounded-md shrink-0"></button>
                            </div>
                        </div>
        <div className="flex flex-col mt-2">
          <h3 className="font-semibold mb-2">Quantity</h3>

          <div className="flex items-center justify-start">
            <Button
              variant="outline"
              size="icon"
            
              aria-label="Decrease quantity"
              className="bg-main text-white"
            >
              <MinusIcon className="h-4 w-4" />
            </Button>
            <Input
              type="number"
              value={selectedQuantity}
              defaultValue={1}
            
              className="w-16 mx-2 text-center"
              aria-label="Quantity"
            />
            <Button
              variant="outline"
              size="icon"
             
              aria-label="Increase quantity"
              className="bg-main text-white"
            >
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="center gap-[20px]">
          <Button
            className="w-full mt-8 mb-4 disabled:opacity-[0.3] disabled:cursor-not-allowed center gap-[10px] bg-main"
            onClick={handleProccedToCheckout}
           
          >
            <ShoppingBag width={20} /> Buy Now
          </Button>
          <Button
            onClick={() => handleAddToCart()}
            variant={"outline"}
            className="w-full mt-8 mb-4 disabled:opacity-[0.3] disabled:cursor-not-allowed center gap-[10px]"
            
          >
            <ShoppingCart width={20} /> Add to Cart
          </Button>
        </div>
      </div>

      <CarConflictVendorWarning
        isOpen={isConflict}
        setIsOpen={setIsConflict}
        onReplace={() => handleAddToCart(true)}
        newVendor={product.shopInfo?.name}
        currentVendor={items[0]?.shopName || ""}
      />
    </>
  );
};

export default ProductOrderActions;
