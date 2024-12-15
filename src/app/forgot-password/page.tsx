/* eslint-disable react/self-closing-comp */
"use client";
import { forgotPassword } from "@/utils/loginService";
import { Input } from "@nextui-org/input";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";


const ForgotPassword = () => {
  const [value, setValue] = useState("");
  const router = useRouter();

  const validateEmail = (value: string) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = useMemo(() => {
    if (value === "") return false;

    return validateEmail(value) ? false : true;
  }, [value]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // toast.loading("Loading...");

    const userData = { email: value };

    try {
      const response = await forgotPassword(userData);
      toast.dismiss();

      if ("success" in response && response?.success) {
        setValue("");
        router.push("/login");
        return toast.success("Please check email inbox or spam!", {
          duration: 6000,
        });
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <section className="bg-gray-100 h-screen flex items-center justify-center">
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-center items-center mb-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/favicon.ico.png"
            alt="logo"
            width={80}
            height={80}
          />
        </Link>
      </div>

      <h1 className="text-2xl text-center font-bold text-black mb-2">
        Forgot your password?
      </h1>
     
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            value={value}
            type="email"
            placeholder="Enter your email..."
            variant="bordered"
            isInvalid={isInvalid}
            color={isInvalid ? "danger" : "primary"}
            errorMessage="Please enter a valid email"
            onValueChange={setValue}
            size="lg"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 text-white bg-[#7fad39] focus:ring-4 focus:ring-blue-300 rounded-lg text-lg font-semibold focus:outline-none"
        >
          Reset Password
        </button>
      </form>
    </div>
  </section>
  );
};

export default ForgotPassword;