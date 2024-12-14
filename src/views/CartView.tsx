
"use client";

import { removeProduct, updateQuantity } from "@/redux/features/products/productSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { FaCircleXmark } from "react-icons/fa6";
import { toast } from "sonner";

const CartVews = () => {
  const { products, quantities, subtotal } = useAppSelector(
    (state) => state.products
  );
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleCheckout = () => {
    router.push("/checkout");
  };

  const increment = (id: string) => {
    const selectedProduct = products.find((item) => item.id === id);
    if (selectedProduct) {
      const currentQuantity = quantities[id] || 0;
      if (currentQuantity < selectedProduct.inStock) {
        dispatch(updateQuantity({ id, quantity: currentQuantity + 1 }));
      }
    }
  };

  const decrement = (id: string) => {
    const currentQuantity = quantities[id];
    if (currentQuantity > 1) {
      dispatch(updateQuantity({ id, quantity: currentQuantity - 1 }));
    }
  };

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeProduct(id));
    toast.success("Product removed from Cart!");
  };

  return (
    <div className="flex flex-col min-h-screen bg-base-100 text-base-content p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-semibold text-black">Your Cart</h1>
        <FaCircleXmark className="text-2xl text-black cursor-pointer" />
      </div>
      <div className="divider" />

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Cart Items */}
        <div className="flex-1">
          {products?.length > 0 ? (
            <div className="overflow-y-auto max-h-[70vh] space-y-4">
              {products.map((singleProduct) => (
                <div
                  key={singleProduct.id}
                  className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg shadow-sm"
                >
                  <img
                    src={singleProduct.image}
                    alt={singleProduct.name}
                    className="w-16 h-16 object-cover rounded-lg border"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-bold text-black">
                        {singleProduct.name}
                      </h2>
                      <FaCircleXmark
                        onClick={() => handleRemoveFromCart(singleProduct.id)}
                        className="text-red-500 cursor-pointer text-xl"
                      />
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center border border-gray-300 rounded">
                        <button
                          onClick={() => decrement(singleProduct.id)}
                          className="px-3 py-1 text-gray-700 hover:bg-gray-200 border-r"
                        >
                          -
                        </button>
                        <span className="px-4 text-black">
                          {quantities[singleProduct.id]}
                        </span>
                        <button
                          onClick={() => increment(singleProduct.id)}
                          className="px-3 py-1 text-gray-700 hover:bg-gray-200 border-l"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-lg font-semibold text-black">
                        ${singleProduct.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-lg text-gray-500">Your cart is currently empty.</p>
          )}
        </div>

        {/* Right: Subtotal & Checkout */}
        {products.length > 0 && (
          <div className="w-full md:w-1/3 p-6 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-black mb-4">Order Summary</h2>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-black">Subtotal</h3>
              <p className="text-lg text-gray-800">${subtotal.toFixed(2)}</p>
              <p className="text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full h-12 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition uppercase"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartVews;
