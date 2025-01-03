"use client";

import Loading from "@/app/loading";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUserDetails from "@/hooks/userUser";
import { useUpdateCustomerMutation } from "@/redux/features/users/userApi";
import Image from "next/image";
import { useRef, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BsPhone } from "react-icons/bs";
import { MdEmail, MdOutlineLocationOn } from "react-icons/md";
import { toast } from "sonner";
interface FormValues {
    name: string;
    email: string;
    address: string;
    phone: string;
    image: File | null;
}
const CustomerProfile = () => {
    const { userData, isLoading } = useUserDetails();
    console.log(userData?.userData?.role);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [updateCustomer] = useUpdateCustomerMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();
    if (isLoading) {
        return <Loading />;
    }
    const {
        image,
        name,
        role,
        email,
        address = "N/A",
        phone = "N/A",
    } = userData?.userData || {};

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const formData = new FormData();
       

        formData.append("data", JSON.stringify(data));

        const image = fileInputRef.current?.files?.[0];
        if (image) {
            formData.append("image", image);
        }

       
        formData.append("name", data.name || userData?.userData?.name);
        formData.append("address", data.address || userData?.userData?.address);
        formData.append("phone", data.phone || userData?.userData?.phone);
        formData.append("email", data.email || userData?.userData?.email);
        formData.append("role", userData?.userData?.role);
        toast.loading("Updating Profile...");
   

        try {
            const res = await updateCustomer(formData).unwrap();
            if (res.success) {
                toast.success("Profile updated successfully!");
                setIsDialogOpen(false);
            }
        } catch (error: unknown) {
            const typedError = error as Error;
            throw new Error(
                typedError.message || "An unexpected error occurred"
            );
        } finally {
            toast.dismiss();
        }
    };

    return (
     
    <div className="p-4 md:p-12 text-center">
    
       <Image
           width={300}
           height={200}
           src={image}
           alt="Customer"
           loading="lazy"
           className="block  rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 object-cover"
       />

   
       <h1 className="text-3xl font-bold pt-8 lg:pt-0 text-black">
           {name}
       </h1>
     
       <p className="pt-4 text-sm font-medium flex items-center justify-start uppercase text-black">
           <span className="ml-6 md:ml-14 lg:ml-0">{role}</span>
       </p>

 
       <p className="pt-3 text-black font-medium text-sm flex items-center justify-start">
           <MdEmail className="text-primary mr-4 text-lg" />
           Email: {email}
       </p>
       <p className="pt-3 text-black font-medium text-sm flex items-start">
           <MdOutlineLocationOn className="text-primary mr-4 text-lg" />
           Address: {address}
       </p>
       <p className="pt-3 text-black font-medium text-sm flex items-center">
           <BsPhone className="text-primary mr-4 text-lg" />
           Phone: {phone}
       </p>
      
       <div>
           <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
               <DialogTrigger asChild>
                   <div className="flex">
                       <button className="bg-[#7fad39]  my-8  btn-custom text-white font-bold py-2 px-4 rounded-full">
                           Update Profile
                       </button>
                   </div>
               </DialogTrigger>
               <DialogContent>
                   <DialogHeader>
                       <DialogTitle>Update Profile</DialogTitle>
                   </DialogHeader>
                   <form
                       onSubmit={handleSubmit(onSubmit)}
                       className="space-y-6"
                       encType="multipart/form-data"
                   >
                       <div>
                           <Label htmlFor="name">Name</Label>
                           <Input
                               id="name"
                               type="text"
                               {...register("name")}
                           />
                           {errors.name && (
                               <p className="text-sm text-red-500">
                                   {errors.name.message}
                               </p>
                           )}
                       </div>

                       <div>
                           <Label htmlFor="address">Address</Label>
                           <Input
                               id="address"
                               type="text"
                               {...register("address")}
                           />
                       </div>
                       <div>
                           <Label htmlFor="phone">Phone</Label>
                           <Input
                               id="phone"
                               type="tel"
                               {...register("phone")}
                           />
                       </div>
                       <div>
                           <Label htmlFor="image">Image</Label>
                           <Input
                               id="image"
                               type="file"
                               {...register("image")}
                           />
                       </div>
                       <Button type="submit">Submit</Button>
                   </form>
               </DialogContent>
           </Dialog>
       </div>

       {/* Social Links */}
       <div className="mt-6 pb-16 flex items-center justify-between">
           {["facebook", "twitter", "github", "unsplash"].map(
               (platform) => (
                   <a
                       key={platform}
                       className="link"
                       href="#"
                       data-tippy-content={`@${platform}_handle`}
                   >
                       <svg
                           className="h-6 fill-current text-gray-600 hover:text-primary"
                           role="img"
                           xmlns="http://www.w3.org/2000/svg"
                       >
                           <title>
                               {platform.charAt(0).toUpperCase() +
                                   platform.slice(1)}
                           </title>
                           {/* Add appropriate paths for each platform */}
                       </svg>
                   </a>
               )
           )}
       </div>
   </div>
    );
};

export default CustomerProfile;
