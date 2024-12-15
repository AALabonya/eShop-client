/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";

import { SerializedError } from "@reduxjs/toolkit";
import Image from "next/image";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { ErrorResponse, IProduct } from "@/types/modal";
import { useUpdateProductMutation } from "@/redux/features/products/productApi";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";

interface UpdateProductViewProps {
    product: IProduct | null;
    open: boolean;
    onClose: () => void;
}

const UpdateProductView = ({
    product,
    open,
    onClose,
}: EditProductDialogProps) => {
    const form = useForm<IProduct>({
        defaultValues: product || {
            name: "",
            price: 0,
            description: "",
            categoryId: "",
            stockQuantity: 0,
            discount: 0,
         
            
        },
        values: product || undefined,
    });
    const { reset } = form;

    const [updateProduct, { isSuccess, isError, isLoading, error }] =
        useUpdateProductMutation();

    useEffect(() => {
        if (isError) {
            const errorResponse = error as ErrorResponse | SerializedError;

            const errorMessage =
                (errorResponse as ErrorResponse)?.data?.message ||
                "Something Went Wrong";

            toast.error(errorMessage);
        } else if (isSuccess) {
            toast.success("Product Successfully Updated");
        }
    }, [isError, isSuccess, error]);


    const { data: categories, isLoading: isCategoryLoading } =
        useGetAllCategoriesQuery(undefined);

    useEffect(() => {
        reset(
            product || {
                name: "",
                price: 0,
                description: "",
                categoryId: "",
               
              stockQuantity: 0,
                discount: 0,
               
            }
        );
    }, [product, reset]);

    const onSubmit = async (data: IProduct) => {
        const loadingToast = toast.loading("Product is Updating...");
            
        const productData = {
            name: data.name,
            price: Number(data.price),
            description: data.description,
            categoryId: data.categoryId,
            stockQuantity: Number(data. stockQuantity),
            discount: Number(data.discount),
        };

      
        if (data.image) {
            Array.from(data.image).forEach((image) => {
                formData.append("image", image as unknown as string);
            });
        }
        formData.append("data", JSON.stringify(productData));

        if (product) {
            formData.append("id", product?.id);
            await updateProduct({ formData, id: product?.id });
        }
        onClose();
        toast.dismiss(loadingToast);
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent
                aria-describedby={undefined}
                className="sm:max-w-[725px]"
            >
                <DialogHeader>
                    <DialogTitle>Edit Brand</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        {/* Basic Information */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="name">
                                        Product Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="name"
                                            placeholder="Enter product name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="price">Price</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="price"
                                            type="number"
                                            step="0.01"
                                            placeholder="Enter product price"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="description">
                                        Description
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            id="description"
                                            placeholder="Enter product description"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Category and Brand */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="categoryId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="category">
                                            Category
                                        </FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={(values) => {
                                                    field.onChange(values);
                                                }}
                                                value={
                                                    field.value
                                                        ? String(field.value)
                                                        : undefined
                                                }
                                                disabled={isCategoryLoading}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue
                                                        placeholder={
                                                            isCategoryLoading
                                                                ? "Loading.."
                                                                : "Select Category"
                                                        }
                                                        
                                                    />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {categories?.data?.map(
                                                        (item) => (
                                                            <SelectItem
                                                                value={String(
                                                                    item?.slug
                                                                )}
                                                                key={item?.slug}
                                                            >
                                                                {item.name}
                                                            </SelectItem>
                                                        )
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                           
                        </div>

                        {/* Inventory, Discount, and Media */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="inventory"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="inventory">
                                            StockQuantity
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="inventory"
                                                type="number"
                                                placeholder="Enter StockQuantity count"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="discount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="discount">
                                            Discount (%)
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="discount"
                                                type="number"
                                                step="0.01"
                                                placeholder="Enter discount percentage"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="thumbnail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="thumbnail">
                                        Thumbnail
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="thumbnail"
                                            type="file"
                                            onChange={(e) =>
                                                field.onChange(
                                                    e.target.files?.[0] || null
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="images"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="images">
                                        Images
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="images"
                                            type="file"
                                            multiple
                                            onChange={(e) =>
                                                field.onChange(
                                                    e.target.files || null
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full"
                        >
                            {isLoading
                                ? "Upading Product..."
                                : "Update Product"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateProductView;