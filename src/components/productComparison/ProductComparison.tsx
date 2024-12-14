import { clearCompareProducts, selectCompareProducts, removeFromComparison } from "@/redux/features/productCompare/compareSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { MdSwapHorizontalCircle } from "react-icons/md";

const ComparisonModal = ({ openWishlist, setOpenWishlist }: any) => {
  const productsForComparison = useAppSelector(selectCompareProducts);
  const dispatch = useAppDispatch();

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50"
      onClick={() => setOpenWishlist(false)}
    >
      <div
        className="bg-white rounded-lg w-3/4 max-w-3xl p-6 relative"
        onClick={(e) => e.stopPropagation()} // Prevent clicking inside the modal from closing it
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2 items-center text-primary font-bold text-3xl">
            <MdSwapHorizontalCircle className="text-primary text-3xl" />
            <span>Compare Products</span>
          </div>
          <Button
            onClick={() => setOpenWishlist(false)}
            variant="flat"
            className="text-white bg-primary hover:bg-primary-dark"
          >
            Close
          </Button>
        </div>

        <section className="text-gray-700 body-font border-t border-gray-200 mt-6">
          <div className="container px-5 py-12 mx-auto flex flex-wrap">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {productsForComparison?.map((product, index) => (
                <div
                  key={index}
                  className="border-2 border-gray-300 rounded-lg p-4 relative"
                >
                  {/* Close button for each product */}
                  <button
                    onClick={() => dispatch(removeFromComparison(product.id))}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                  >
                    <MdSwapHorizontalCircle className="text-2xl" />
                  </button>

                  <div className="flex flex-col items-center">
                    <Image
                      src={product.image[0]} // Assuming `product.image` is an array
                      alt={product.name}
                      height={192}
                      width={190}
                      className="h-48 w-48 object-cover rounded-md mb-4"
                    />
                    <h4 className="font-semibold text-xl text-center">{product.name}</h4>
                  </div>

                  {/* Product Details */}
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-600">Price:</span>
                      <span className="text-gray-800">${product.price}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-600">Category:</span>
                      <span className="text-gray-800">{product.category?.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-600">Flash Sale:</span>
                      <span className={product.flashSale ? "text-green-500" : "text-red-500"}>
                        {product.flashSale ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-600">Shop:</span>
                      <span className="text-gray-800">{product.vendor?.shopName}</span>
                    </div>
                  </div>

                  {/* Product Description */}
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">{product.description}</p>
                  </div>

                  {/* Add to Cart and View Details Buttons */}
                  <div className="flex justify-between mt-4">
                    <Button
                      onClick={() => {/* Add to Cart functionality */}}
                      className="bg-primary text-white w-1/2 hover:bg-primary-dark"
                    >
                      Add to Cart
                    </Button>
                    <Button
                      onClick={() => {/* View Product Details functionality */}}
                      className="bg-gray-300 text-black w-1/2 hover:bg-gray-400"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ComparisonModal;
