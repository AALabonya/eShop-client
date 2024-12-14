"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { registerUser } from "@/utils/loginService";

export type TSignUp = {
  name: string;
  email: string;
  password: string;
  photo: string;
  role: string;
  shopName?: string;
  logo?: string;
  description?: string;
};

export default function Registration() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("User");
  const [isLogInSuccess, setIsLogInSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TSignUp>();

  useEffect(() => {
    if (isLogInSuccess) {
      const target = redirect || "/";
      router.push(target);
    }
  }, [isLogInSuccess, redirect, router]);
//   const handleSignUp: SubmitHandler<TSignUp> = async (data) => {
//     toast.loading("Loading...");
//     const signUpData = {
//         ...data,
//         role,
//         ...(role === "vendor" && {
//             shopName: data.shopName,
//             logo: data.logo ? data.logo[0] : null,
//             description: data.description,
//         }),
//     };
//     console.log("SignUp Data:", signUpData);

//     try {
//         const res = await registerUser(signUpData);
//         if (res.success) {
//             toast.dismiss();
//             const user = verifyToken(res.token) as TUser;
//             dispatch(setUser({ user: user, token: res.token }));
//             toast.success("Account created successfully!", { duration: 3000 });
//             if (redirect) {
//                 router.push(redirect);
//             } else {
//                 router.push("/");
//             }
//         }
//     } catch (error: any) {
//         toast.dismiss();
//         toast.error(error?.message);
//     }
// };
const handleSignUp: SubmitHandler<TSignUp> = async (data) => {
  // toast.loading("Loading...");
  const signUpData = {
      ...data,
      role,
      ...(role === "Vendor" && {
          shopName: data.shopName,
          logo: data.logo ? data.logo[0] : null,
          description: data.description,
      }),
  };
  console.log("SignUp Data:", signUpData);
  try {
    const res = await registerUser(signUpData);
    console.log(res);
    if (res.success) {
      toast.dismiss();
      const user = verifyToken(res.token) as TUser;
      dispatch(setUser({ user: user, token: res.token }));

      setIsLogInSuccess(true);
      toast.success("Account created successfully!", { duration: 3000 });
    }
  } catch (error: any) {
    console.log(error);
    toast.dismiss();
    toast.error(error?.message);
  }
};

  return (
    <div className="flex justify-center items-center my-6 md:my-20">
      <div className="border-2 rounded-lg shadow-lg max-w-md w-full p-6 bg-white">
        <h1 className="text-center text-xl font-bold mb-6">Register</h1>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2" htmlFor="username">
              Username *
            </label>
            <input
              type="text"
              id="username"
              {...register("name", { required: "Username is required" })}
              aria-label="Username"
              className="w-full px-4 py-2 bg-gray-100 border rounded"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>
          {/* <div className="mb-4">
            <label className="block text-gray-600 mb-2" htmlFor="photo">
              Select Photo *
            </label>
            <input
              type="file"
              id="photo"
              accept="image/*"
              {...register("photo", { required: "Photo is required" })}
              className="w-full bg-gray-100 border rounded py-2 px-4"
            />
            {errors.photo && (
              <p className="text-red-500 text-sm mt-1">
                {errors.photo.message}
              </p>
            )}
          </div> */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-2" htmlFor="email">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              aria-label="Email"
              className="w-full px-4 py-2 bg-gray-100 border rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-600 mb-2" htmlFor="password">
              Password *
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              aria-label="Password"
              className="w-full px-4 py-2 bg-gray-100 border rounded"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-[38px] right-4 cursor-pointer"
            >
              {showPassword ? (
                <Eye size={20} className="text-gray-500" />
              ) : (
                <EyeOff size={20} className="text-gray-500" />
              )}
            </span>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Vendor Role Selection */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Are you a Vendor?</label>
            <button
              type="button"
              onClick={() => setRole("vendor")}
              className={`w-full py-2 text-white rounded ${
                role === "vendor"
                  ? "bg-blue-600"
                  : "bg-gray-600 hover:bg-gray-700"
              }`}
            >
              Vendor
            </button>
          </div>

          {/* Vendor-specific Fields */}
          {role === "vendor" && (
            <div className="space-y-4">
              <div>
                <label
                  className="block text-gray-600 mb-2"
                  htmlFor="shopName"
                >
                  Shop Name *
                </label>
                <input
                  type="text"
                  id="shopName"
                  {...register("shopName", { required: "Shop Name is required" })}
                  className="w-full px-4 py-2 bg-gray-100 border rounded"
                />
                {errors.shopName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.shopName.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
            <label className="block text-gray-600 mb-2" htmlFor="logo">
                Shop Logo *
            </label>
            <input
                type="file"
                id="logo"
                accept="image/*"
                {...register("logo", { required: "Logo is required for vendors" })}
                className="w-full bg-gray-100 border rounded py-2 px-4"
            />
            {errors.logo && (
                <p className="text-red-500 text-sm mt-1">{errors.logo.message}</p>
            )}
        </div>
              <div>
                <label
                  className="block text-gray-600 mb-2"
                  htmlFor="shopDescription"
                >
                  Shop Description *
                </label>
                <textarea
                  id="description"
                  {...register("description", {
                    required: "Shop Description is required",
                  })}
                  className="w-full px-4 py-2 bg-gray-100 border rounded"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 text-white rounded ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-green-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
