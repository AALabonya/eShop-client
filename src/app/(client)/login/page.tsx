// /* eslint-disable jsx-a11y/anchor-is-valid */
// "use client";

// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import { FaGoogle, FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
// import Image from "next/image";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
// import { toast } from "sonner";
// import { Eye, EyeOff } from "lucide-react";
// import { useAppDispatch } from "@/redux/hooks";
// import { verifyToken } from "@/utils/verifyToken";
// import { setUser, TUser } from "@/redux/features/auth/authSlice";
// import { loginUser } from "@/utils/loginService";
// import { Button } from "@/components/ui/button";


// export type TLogin = {
//   email: string;
//   password: string;
// };

// export default function Login() {
//   const searchParams = useSearchParams();
//   const redirect = searchParams.get("redirect");
//   const router = useRouter();
//   const dispatch = useAppDispatch();
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLogInSuccess, setIsLogInSuccess] = useState(false);

//   // Initialize React Hook Form
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<TLogin>();


//   useEffect(() => {
//     if (isLogInSuccess) {
//       const target = redirect || "/";
//       router.push(target);
//     }
//   }, [isLogInSuccess, redirect, router]);

//   const handleLogin: SubmitHandler<FieldValues> = async (data) => {
//     toast.loading("Loading...");

//     try {
//       const res = await loginUser(data);

//       if (res.success) {
//         toast.dismiss();
//         const user = verifyToken(res.data.accessToken) as TUser;
//         dispatch(setUser({ user: user, token: res.data.accessToken }));

//         setIsLogInSuccess(true);
//         toast.success("Logged in successfully", { duration: 3000 });
//       }
//     } catch (error: any) {
//       console.log(error);
//       toast.dismiss();
//       toast.error(error?.message);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//     <div className="bg-white shadow-md rounded-lg p-8 md:w-1/3 w-full">
//       <div className="flex justify-center mb-6">
//         <Link href={"/"}>
//           <Image
//             src="/favicon.ico.png"
//             alt="logo"
//             height={80}
//             width={80}
//             className="flex"
//           />
//         </Link>
//       </div>
//       <h1 className="text-2xl font-semibold text-center text-gray-700 mb-4">
//         Welcome Back!
//       </h1>
//       <p className="text-center text-gray-500 mb-6">
//         Please login to your account
//       </p>
//       <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
//         <div>
//           <label className="text-sm font-medium text-gray-600">Email *</label>
//           <input
//             type="text"
//             {...register("email", { required: "Email is required" })}
//             className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-green-200 outline-none mt-1"
//           />
//           {errors.email && (
//             <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
//           )}
//         </div>
//         <div className="relative">
//           <label className="text-sm font-medium text-gray-600">Password *</label>
//           <input
//             type={showPassword ? "text" : "password"}
//             {...register("password", { required: "Password is required" })}
//             className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-green-200 outline-none mt-1"
//           />
//           <span
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
//           >
//             {showPassword ? (
//               <Eye size={20} className="text-gray-500" />
//             ) : (
//               <EyeOff size={20} className="text-gray-500" />
//             )}
//           </span>
//           {errors.password && (
//             <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
//           )}
//         </div>
//         <div className="flex items-center justify-center">
//                 <Link href={"/forgot-password"}>
//                   <button type="reset" className="-mr-3 w-max p-2">
//                     <span className="text-sm tracking-wide text-black">
//                       Forgot password ?
//                     </span>
//                   </button>
//                 </Link>
//               </div>
//         <button
//           type="submit"
//           className="w-full bg-[#80b500] hover:bg-green-700 text-white py-3 rounded-md text-lg font-semibold transition"
//         >
//           Login
//         </button>
//       </form>
//       <p className="text-center text-gray-600 mt-6">
//         Don't have an account?{" "}
//         <Link href="/register" className="text-[#7fad39] font-medium">
//           Register
//         </Link>
//       </p>
//       <div className="mt-8 space-y-4">
//                 <Button
//                     onClick={() => handleClickLogin("admin1@example.com", "admin123")}
//                     className="w-full bg-blue-600 text-white"
//                     variant={'default'}
//                 >
//                     Login as Admin
//                 </Button>
//                 <Button
//                     onClick={() => handleClickLogin("newVendor@example.com", "new123")}
//                     className="w-full bg-green-600 text-white"
//                     variant={'default'}
//                 >
//                     Login as Vendor
//                 </Button>
//                 <Button
//                     onClick={() => handleClickLogin("alissa@gmail.com", "alissa123")}
//                     className="w-full bg-purple-600 text-white"
//                     variant={'default'}
//                 >
//                     Login as Customer
//                 </Button>
//             </div>
//     </div>
//   </div>
  
//   );
// }
/* eslint-disable jsx-a11y/anchor-is-valid */
"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaGoogle, FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { loginUser } from "@/utils/loginService";
import { Button } from "@/components/ui/button";

export type TLogin = {
  email: string;
  password: string;
};

export default function Login() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isLogInSuccess, setIsLogInSuccess] = useState(false);

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLogin>();

  useEffect(() => {
    if (isLogInSuccess) {
      const target = redirect || "/";
      router.push(target);
    }
  }, [isLogInSuccess, redirect, router]);

  const handleLogin: SubmitHandler<FieldValues> = async (data) => {
    toast.loading("Loading...");

    try {
      const res = await loginUser(data);

      if (res.success) {
        toast.dismiss();
        const user = verifyToken(res.data.accessToken) as TUser;
        dispatch(setUser({ user: user, token: res.data.accessToken }));

        setIsLogInSuccess(true);
        toast.success("Logged in successfully", { duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
      toast.dismiss();
      toast.error(error?.message);
    }
  };

  const handleClickLogin = (email: string, password: string) => {
    // Pre-fill login form for specific roles
    handleLogin({ email, password });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 md:w-1/3 w-full">
        <div className="flex justify-center mb-6">
          <Link href={"/"}>
            <Image
              src="/favicon.ico.png"
              alt="logo"
              height={80}
              width={80}
              className="flex"
            />
          </Link>
        </div>
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          Welcome Back!
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Please login to your account
        </p>
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-600">Email *</label>
            <input
              type="text"
              {...register("email", { required: "Email is required" })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-green-200 outline-none mt-1"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          <div className="relative">
            <label className="text-sm font-medium text-gray-600">Password *</label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: "Password is required" })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-green-200 outline-none mt-1"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? (
                <Eye size={20} className="text-gray-500" />
              ) : (
                <EyeOff size={20} className="text-gray-500" />
              )}
            </span>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>
          <div className="flex items-center justify-center">
            <Link href={"/forgot-password"}>
              <button type="reset" className="-mr-3 w-max p-2">
                <span className="text-sm tracking-wide text-black">
                  Forgot password?
                </span>
              </button>
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-[#80b500] hover:bg-green-700 text-white py-3 rounded-md text-lg font-semibold transition"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link href="/register" className="text-[#7fad39] font-medium">
            Register
          </Link>
        </p>
        <div className="mt-8 space-y-4">
          <Button
            onClick={() => handleClickLogin("admin1@example.com", "admin123")}
            className="w-full bg-blue-600 text-white"
            variant={"default"}
          >
            Login as Admin
          </Button>
          <Button
            onClick={() => handleClickLogin("newVendor@example.com", "new123")}
            className="w-full bg-[#80b500] text-white"
            variant={"default"}
          >
            Login as Vendor
          </Button>
          <Button
            onClick={() => handleClickLogin("alissa@gmail.com", "alissa123")}
            className="w-full text-white"
            variant={"default"}
          >
            Login as Customer
          </Button>
        </div>
      </div>
    </div>
  );
}
