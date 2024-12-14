/* eslint-disable jsx-a11y/anchor-is-valid */
"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FaGoogle, FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { IUser } from "@/types/modal";
import { loginUser } from "@/utils/loginService";


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
  const [isActive, setIsActive] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>("User");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
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
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md text-lg font-semibold transition"
        >
          Login
        </button>
      </form>
      <p className="text-center text-gray-600 mt-6">
        Don't have an account?{" "}
        <Link href="/register" className="text-green-600 font-medium">
          Register
        </Link>
      </p>
      <div className="mt-6 text-center">
        <p className="text-gray-500">Or continue with</p>
        <div className="flex justify-center gap-4 mt-4">
          <a href="#" className="icon">
            <FaGoogle className="w-6 h-6 text-gray-600 hover:text-red-600 transition" />
          </a>
          <a href="#" className="icon">
            <FaFacebookF className="w-6 h-6 text-gray-600 hover:text-blue-600 transition" />
          </a>
          <a href="#" className="icon">
            <FaGithub className="w-6 h-6 text-gray-600 hover:text-gray-900 transition" />
          </a>
          <a href="#" className="icon">
            <FaLinkedinIn className="w-6 h-6 text-gray-600 hover:text-blue-500 transition" />
          </a>
        </div>
      </div>
    </div>
  </div>
  
  );
}