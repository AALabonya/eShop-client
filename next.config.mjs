/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        },
        {
          protocol: "https",
          hostname: "https://firebasestorage.googleapis.com",
        },
        {
          protocol: "http",
          hostname: "example.com",
        },
        {
          protocol: "https",
          hostname: "https://i.pravatar.cc",
        }
       
      ],
    },
    env: {
      BASE_URL: process.env.NEXT_PUBLIC_BASE_API,
  },
  };

export default nextConfig;
