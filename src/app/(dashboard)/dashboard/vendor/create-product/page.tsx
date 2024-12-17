"use client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCreateProductMutation } from "@/redux/features/products/productApi";
import { ICategory } from "@/types/modal";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IFormInput {
    name: string;
    price: number;
    stockQuantity: number;
    discount: number;
    description: string;
    image: FileList | null;
    categoryId: string;
    flashSale: boolean;
}

export default function CreateProductForm() {

    const router = useRouter();
    const { data: allCategories, } = useGetAllCategoriesQuery(undefined);
    const [flashSale, setFlashSale] = useState(false);
    const [createProduct, ] = useCreateProductMutation();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<IFormInput>({
        defaultValues: {
            name: "",
            price: 0,
            stockQuantity: 0,
            discount: 0,
            description: "",
            image: null,
            categoryId: "",
            flashSale: false,
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
            image: image ? Array.from(image) : [],
            categoryId,
            flashSale: flashSale,
        };

        const formDataToSubmit = new FormData();
        formDataToSubmit.append("data", JSON.stringify(productData));

        if (image) {
            Array.from(image).forEach((img) => {
                formDataToSubmit.append("image", img);
            });
        }

        const loadingToast = toast.loading("Creating product...");
        try {
            await createProduct(formDataToSubmit);
            toast.success("Product created successfully!");
            router.push("/dashboard/vendor/manage-products")
        } catch (error) {
            toast.error("Error creating product!");
        }
        toast.dismiss(loadingToast);
    };

    return (
        <div className="mx-auto">
            <Card className="w-full mx-auto">
                <CardHeader>
                    <CardTitle>Create Product</CardTitle>
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
                            value={undefined} // If you want the value to reset correctly
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
 {/* Flash Sale */}
<div>
    <label>Flash Sale</label>
    <div className="flex gap-4 items-center">
        <label className="flex items-center gap-2">
            <input
                type="radio"
                {...register("flashSale")}
                checked={!flashSale}
                onChange={() => {
                    setFlashSale(false);
                    setValue("flashSale", false); // Correctly sets flashSale as a boolean false
                }}
            />
            No
        </label>
        <label className="flex items-center gap-2">
            <input
                type="radio"
                {...register("flashSale")}
                checked={flashSale}
                onChange={() => {
                    setFlashSale(true);
                    setValue("flashSale", true); // Correctly sets flashSale as a boolean true
                }}
            />
            Yes
        </label>
    </div>
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
                            {...register("image", { required: "At least one image is required" })}
                        />
                        {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
                    </div>

                    <Button type="submit" className="w-full bg-[#7fad39] hover:bg-black">
                        Create Product
                    </Button>
                </form>
            </Card>
        </div>
    );
}
