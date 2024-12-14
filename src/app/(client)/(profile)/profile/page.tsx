// "use client";
// import { useAppSelector } from "@/redux/hook";
// import { format } from "date-fns";
// import Image from "next/image";
// import Link from "next/link";
// import { FaPen } from "react-icons/fa";

// const Profile = () => {
//   const { isLoading, user } = useAppSelector((state) => state.auth);

//   return (
//     <div className="w-full rounded-[10px] px-[25px] py-[20px]">
//       <div className="flex items-start justify-start gap-[20px]">
//         <Link
//           href={"/profile/settings"}
//           className="w-[120px] h-[120px] rounded-full overflow-hidden bg-red-100 relative group/profile"
//         >
//           <Image
//             src={user?.image || "/images/avatar.jpg"}
//             width={120}
//             height={120}
//             alt="avatar"
//             className=" w-full h-full object-cover"
//           />

//           <span className="absolute top-0 left-0 bg-[#2727272f] w-full h-full scale-0 group-hover/profile:scale-[1] duration-75 rounded-full cursor-pointer center text-black">
//             <FaPen />
//           </span>
//         </Link>

//         <div>
//           <h2 className="text-[30px] font-[700]">Hello,</h2>
//           <h3 className="text-[20px] font-[600]">
//             {user?.first_name} {user?.last_name}
//           </h3>
//         </div>
//       </div>
//       <p className="text-primaryTxt mt-[20px]">
//         <span className="font-[600]">Email: </span> {user?.email}
//       </p>
//       <p className="text-primaryTxt mt-[8px]">
//         <span className="font-[600]">user since: </span>{" "}
//         {format(new Date(user?.createdAt || "12-30-2024"), "MMM dd, yyy")}
//       </p>
//     </div>
//   );
// };

// export default Profile;

/* eslint-disable jsx-a11y/anchor-is-valid */
// "use client";

// import { BsPhone } from "react-icons/bs";
// import { MdEmail, MdOutlineLocationOn } from "react-icons/md";
// import { motion } from "framer-motion";
// import useUserDetails from "@/hooks/userUser";
// import Loading from "@/app/loading";
// import Image from "next/image";
// import { useState } from "react";
// import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
// import { useUpdateCustomerMutation } from "@/redux/features/users/userApi";
// import { toast } from "sonner";
// import { FieldValues, SubmitHandler } from "react-hook-form";

// const CustomerProfile = () => {
//   const { userData, isLoading } = useUserDetails();
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [updateCustomer] = useUpdateCustomerMutation();

//   if (isLoading) {
//     return <Loading />;
//   }

//   const {
//     image,
//     name,
//     role,
//     email,
//     address = "N/A",
//     phone = "N/A",
//   } = userData?.userData || {};

//   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
//     const hasImage = !!data.image && data.image instanceof File;

//     console.log(hasImage);

//     toast.loading("Updating Profile...");

//     console.log(process.env.NEXT_PUBLIC_CLOUDINARY_URL, process.env.cloudinary_upload_preset);

//     let imageUrl = userData?.userData?.profilePhoto;

//     if (hasImage) {
//       const formData = new FormData();
//       formData.append("file", data.profilePhoto);
//       formData.append(
//         "upload_preset",
//         envConfig.cloudinary_upload_preset as string
//       );

//       try {
//         const response = await axios.post(
//           envConfig.cloudinary_url as string,
//           formData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );
//         imageUrl = response.data.secure_url;
//       } catch (error: any) {
//         console.error(error.message);
//         toast.error("Failed to upload image");
//         return;
//       }
//     }

//     const updateUserInfo = {
//       name: data.name ? data.name : userData?.userData?.name,
//       profilePhoto: imageUrl,
//       address: data.address ? data.address : userData?.userData?.address,
//       phone: data.phone ? data.phone : userData?.userData?.phone,
//     };
//     toast.dismiss();
//     console.log(updateUserInfo);

//     try {
//       const res = await updateCustomer(updateUserInfo).unwrap();
//       if (res.success) {
//         toast.success("Profile Updated successfully", { duration: 3000 });
//         setIsDialogOpen(false);
//       }
//     } catch (error: any) {
//       toast.error(error.message);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
//       className="items-center min-h-screen"
//     >
//       <div className="">
//         {/* Main Profile Section */}
//         <div className=" rounded-lg shadow-2xl px-5">
//           <div className="p-4 text-center lg:text-left">
//             {/* Profile Image */}
//             <Image
//               width={200}
//               height={200}
//               src={image}
//               alt="Customer"
//               loading="lazy"
//               className="block rounded-full bg-red-600 shadow-xl mx-auto -mt-16 h-48 w-48 object-cover"
//             />

//             {/* Name and Role */}
//             <h1 className="text-3xl font-bold pt-8 lg:pt-0 text-black">{name}</h1>
//             <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-primary opacity-25" />
//             <p className="pt-4 text-sm font-medium flex items-center justify-start uppercase text-black">
//               <span className="ml-6 md:ml-14 lg:ml-0">{role}</span>
//             </p>

//             {/* Contact Details */}
//             <p className="pt-3 text-black font-medium text-sm flex items-center justify-start">
//               <MdEmail className="text-primary mr-4 text-lg" />
//               Email: {email}
//             </p>
//             <p className="pt-3 text-black font-medium text-sm flex items-start">
//               <MdOutlineLocationOn className="text-primary mr-4 text-lg" />
//               Address: {address}
//             </p>
//             <p className="pt-3 text-black font-medium text-sm flex items-center">
//               <BsPhone className="text-primary mr-4 text-lg" />
//               Phone: {phone}
//             </p>

//             {/* Update Button */}
//             <div className="pt-12 pb-8">
//               <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//                 <DialogTrigger asChild>
//                   <button className="bg-primary btn-custom text-black font-bold py-2 px-4 rounded-full hover:bg-[#c4650a]">
//                     Update Profile
//                   </button>
//                 </DialogTrigger>
//                 <DialogContent>
//                   <DialogHeader>
//                     <DialogTitle>Update Profile</DialogTitle>
//                   </DialogHeader>
//                   <form onSubmit={onSubmit} className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">Name</label>
//                       <input type="text" defaultValue={name} className="input" required />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">Role</label>
//                       <input type="text" defaultValue={role} className="input" />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium  text-gray-700">Email</label>
//                       <input type="email" defaultValue={email} className="input" required />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">Address</label>
//                       <input type="text" defaultValue={address} className="input" />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">Phone</label>
//                       <input type="tel" defaultValue={phone} className="input" />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">Image</label>
//                       <input type="file" className="input" />
//                     </div>
//                     <DialogFooter>
//                       <button
//                         type="submit"
//                         className="bg-primary btn-custom text-black font-bold py-2 px-4 rounded-full hover:bg-[#c4650a]"
//                       >
//                         Save Changes
//                       </button>
//                     </DialogFooter>
//                   </form>
//                 </DialogContent>
//               </Dialog>
//             </div>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default CustomerProfile;


"use client";

import { BsPhone } from "react-icons/bs";
import { MdEmail, MdOutlineLocationOn } from "react-icons/md";
import { motion } from "framer-motion";
import useUserDetails from "@/hooks/userUser";
import Loading from "@/app/loading";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useUpdateCustomerMutation } from "@/redux/features/users/userApi";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
interface FormValues {
  name: string;
  email: string;
  address: string;
  phone: string;
  image: File | null;
}
const CustomerProfile = () => {
  const { userData, isLoading } = useUserDetails();
  console.log( userData?.userData?.role);
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
  // console.log(data);
  
  formData.append("data", JSON.stringify(data));

  const image = fileInputRef.current?.files?.[0];
  if (image) {
    formData.append("image", image);
  }
  
    // Append other fields to FormData
    formData.append("name", data.name || userData?.userData?.name);
    formData.append("address", data.address || userData?.userData?.address);
    formData.append("phone", data.phone || userData?.userData?.phone);
    formData.append("email", data.email || userData?.userData?.email);
    formData.append("role", userData?.userData?.role);
    toast.loading("Updating Profile...");
  console.log(formData,"formdata");
  
    try {
      const res = await updateCustomer(formData).unwrap();
      if (res.success) {
        toast.success("Profile updated successfully!");
        setIsDialogOpen(false);
      }
    } catch (error: any) {
      console.error("Error updating profile:", error.message);
      toast.error("Failed to update profile.");
    } finally {
      toast.dismiss();
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
      className="flex justify-center items-center min-h-screen"
    >
      <div className="w-80 md:w-auto flex items-center flex-wrap mx-auto my-20 lg:my-0">
        {/* Main Profile Section */}
        <div className="w-full lg:w-3/5 rounded-lg shadow-2xl  px-5">
          <div className="p-4 md:p-12 text-center lg:text-left">
            {/* Profile Image */}
            <img
              src={image}
              alt="Customer"
              loading="lazy"
              className="block  rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 object-cover"
            />

            {/* Name and Role */}
            <h1 className="text-3xl font-bold pt-8 lg:pt-0 text-black">{name}</h1>
            <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-primary opacity-25" />
            <p className="pt-4 text-sm font-medium flex items-center justify-start uppercase text-black">
              <span className="ml-6 md:ml-14 lg:ml-0">{role}</span>
            </p>

            {/* Contact Details */}
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
           {/* Update Button */}
           <div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                <div className="flex justify-end">
                <button className="bg-[#7fad39]  my-8  btn-custom text-white font-bold py-2 px-4 rounded-full">
                    Update Profile
                  </button>
                </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" encType="multipart/form-data">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" type="text" {...register("name")} />
                      {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                    </div>

                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" type="text" {...register("address")} />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" {...register("phone")} />
                    </div>
                    <div>
                      <Label htmlFor="image">Image</Label>
                      <Input id="image"  type="file" {...register("image")} />
                    </div>
                    <Button type="submit">Submit</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Social Links */}
            <div className="mt-6 pb-16 flex items-center justify-between">
              {["facebook", "twitter", "github", "unsplash"].map((platform) => (
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
                    <title>{platform.charAt(0).toUpperCase() + platform.slice(1)}</title>
                    {/* Add appropriate paths for each platform */}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>
              
    </motion.div>
  );
};

export default CustomerProfile;
