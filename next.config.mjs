/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/categories/**",  
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/products/**",  
      },
       {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/addmainbanner/**",  
      },
        {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/blogs/**",  
      },
    ],
  },
};

export default nextConfig;
