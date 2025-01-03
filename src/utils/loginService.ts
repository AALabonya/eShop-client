"use server";

import { cookies } from "next/headers";


export const loginUser = async (userData: Record<string, any>) => {
  try {
    const response = await fetch("https://eshop-ecommerce-application.vercel.app/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to log in");
    }

    const data = await response.json();

    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const registerUser = async (userInfo: Record<string, any>) => {
  const { role, ...remaining } = userInfo;
console.log(role,"login");

  try {
    if (role === "CUSTOMER") {
      const response = await fetch(
        "https://eshop-ecommerce-application.vercel.app/api/users/create-customer",
        
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(remaining),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to log in");
      }

      const data = await response.json();

      if (data.success) {
        cookies().set("accessToken", data?.token);
        // cookies().set("refreshToken", data?.data?.refreshToken);
      }

      return data;
    } else {
      const response = await fetch(
        "https://eshop-ecommerce-application.vercel.app/api/users/create-vendor",

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(remaining),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to log in");
      }

      const data = await response.json();

      if (data.success) {
        cookies().set("accessToken", data?.token);
        // cookies().set("refreshToken", data?.data?.refreshToken);
      }

      return data;
    }
  } catch (error: any) {
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const logoutService = () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
};

export const getAccessToken = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  return accessToken;
};

export const forgotPassword = async (userEmail: { email: string }) => {
  console.log(userEmail);
  // `https://eshop-ecommerce-application.vercel.app/api/auth/forgot-password` 
  try {
    const response = await fetch(`https://eshop-ecommerce-application.vercel.app/api/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userEmail),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to send reset link");
    }

    const result = await response.json();
    console.log("Response received:", result);
    return result;
  } catch (error: any) {
    console.error("Error in forgotPassword:", error);
    throw error;
  }
};

export const resetPassword = async (
  userData: {
    email: string;
    newPassword: string;
  },
  token: string
) => {
  try {
    // const response = await fetch(`https://eshop-ecommerce-application.vercel.app/api/auth/reset-password`, {
    const response = await fetch(`https://eshop-ecommerce-application.vercel.app/api/auth/forgot-password/api/auth/reset-password`, {
      method: "POST",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response:", errorData);
      throw new Error(errorData.message || "Failed to reset password");
    }

    const result = await response.json();
    console.log("Response received:", result);
    return result;
  } catch (error: any) {
    console.error("Error in resetPassword:", error);
    throw error;
  }
};