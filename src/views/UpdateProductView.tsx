"use client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useUpdateProductMutation } from "@/redux/features/products/productApi"; // Assuming you have an update mutation
import { ICategory, IProduct } from "@/types/modal";
import { useRouter } from "next/navigation";

interface IFormInput {
  name: string;
  price: number;
  stockQuantity: number;
  discount: number;
  description: string;
  image: FileList | null;
  categoryId: string;
}

interface UpdateProductProps {
    product: IProduct | null;
    open: boolean;
    onClose: () => void;
  }
  
  export default function UpdateProductView({ product, open, onClose }: UpdateProductProps) {
  const { data: allCategories } = useGetAllCategoriesQuery(undefined);
      const router = useRouter()
      const [updateProduct] = useUpdateProductMutation();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<IFormInput>({
      defaultValues: {
        name: product?.name,
        price: product?.price,
        stockQuantity: product?.stockQuantity,
        discount: product?.discount,
        description: product?.description,
        image: null,
        categoryId: product?.categoryId,
      },
    });
    const onSubmit = async (data: IFormInput) => {
        const { name, price, stockQuantity, discount, description, image, categoryId } = data;
      
        // Basic validation check for missing values
        if (!name || !price || !stockQuantity || !description || !categoryId || !image) {
          toast.error("All fields are required!");
          return;
        }
      
        const productData = {
          name,
          price: Number(price),
          stockQuantity: Number(stockQuantity),
          discount: Number(discount),
          description,
          categoryId,
        };
      
        // If the image is provided, we need to append it to the FormData
        const formDataToSubmit = new FormData();
        formDataToSubmit.append("data", JSON.stringify(productData));
        
        if (image) {
            Array.from(image).forEach((img) => {
                formDataToSubmit.append("image", img);
            });
        }

        // const loadingToast = toast.loading("Updating product...");
        try {
          // Use the updateProduct mutation to update the product
           await updateProduct({
         payload: formDataToSubmit,  // Use FormData for the API call
      id: product?.id || "",      // Ensure you provide the correct product id for update
    }).unwrap();
          toast.success("Product updated successfully!");
        //   router.push("/dashboard/vendor/manage-products");  // Redirect after success
        } catch (error) {
          toast.error("Error updating product!");
        } finally {
          toast.dismiss();  // Dismiss the loading toast after operation
        }
      };
      
  return (
    <div className="mx-auto">
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle>Update Product</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-5">
          {/* Product Name */}
          <div>
            <label>Product Name</label>
            <Input
              type="text"
              {...register("name", { required: "Product name is required" })}
              placeholder="Enter product name"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Price and Stock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label>Price</label>
              <Input
                type="number"
                {...register("price", { required: "Price is required", min: 0 })}
                placeholder="Enter price"
              />
              {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
            </div>
            <div>
              <label>Stock Quantity</label>
              <Input
                type="number"
                {...register("stockQuantity", { required: "Stock quantity is required", min: 0 })}
                placeholder="Enter stock quantity"
              />
              {errors.stockQuantity && <p className="text-red-500 text-sm">{errors.stockQuantity.message}</p>}
            </div>
          </div>

          {/* Category */}
          <div>
            <label>Category</label>
            <Select
              {...register("categoryId", { required: "Category is required" })}
              value={product?.categoryId}
              onValueChange={(value) => setValue("categoryId", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {allCategories?.map((category: ICategory) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.categoryId && <p className="text-red-500 text-sm">{errors.categoryId.message}</p>}
          </div>

          {/* Discount */}
          <div>
            <label>Discount (%)</label>
            <Input
              type="number"
              {...register("discount", { required: "Discount is required", min: 0 })}
              placeholder="Enter discount percentage"
            />
            {errors.discount && <p className="text-red-500 text-sm">{errors.discount.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label>Description</label>
            <Textarea
              {...register("description", { required: "Description is required" })}
              placeholder="Enter product description"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          {/* Images */}
          <div>
            <label>Images</label>
            <Input
              type="file"
              multiple
              {...register("image")}
            />
            {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
          </div>

          <Button type="submit" className="w-full bg-[#7fad39] hover:bg-black">
            Update Product
          </Button>
        </form>
      </Card>
    </div>
  );
}
