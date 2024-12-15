"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import useUserDetails from "@/hooks/userUser";
import { useChangePasswordMutation } from "@/redux/features/category/authApi";
import { toast } from "sonner";
import { useState } from "react";
interface IFormInputs {
  email: string;
  oldPassword: string;
  newPassword: string;
}
const Security = () => {
  const { userData, isLoading } = useUserDetails();
  const [changePassword] = useChangePasswordMutation();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: userData?.userData?.email || "",
      oldPassword: "",
      newPassword: "",
    },
  });

  const handlePasswordChange = async (data: IFormInputs) => {
    const passwordInfo = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };

    await toast.promise(changePassword(passwordInfo).unwrap(), {
      loading: "Changing Password...",
      success: "You changed your password successfully!",
      error: "Failed to change password",
    });
  };

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0">
        <h2 className="text-xl font-semibold mb-4">Update Login Credentials</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <form
            onSubmit={handleSubmit(handlePasswordChange)}
            className="w-full p-6 rounded-lg shadow md:mt-5 sm:max-w-2xl sm:p-8"
          >
            <div className="py-5">
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                readOnly
                {...register("email")}
                className="border-gray-300"
              />
            </div>
            <div className="pb-5">
              <label
                htmlFor="oldPassword"
                className="block mb-2 text-sm font-medium"
              >
                Old Password
              </label>
              <div className="relative">
                <Input
                  id="oldPassword"
                  type={showPassword ? "text" : "password"}
                  {...register("oldPassword", {
                    required: "Old password is required",
                  })}
                  className="border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-2 text-sm text-gray-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.oldPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.oldPassword.message}
                </p>
              )}
            </div>
            <div className="pb-8">
              <label
                htmlFor="newPassword"
                className="block mb-2 text-sm font-medium"
              >
                New Password
              </label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  {...register("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                  className="border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-2 text-sm text-gray-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.newPassword.message}
                </p>
              )}
            </div>
            <div className="flex justify-center items-center mb-10">
              <Button type="submit" className="w-full">
                Change Password
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default Security;
