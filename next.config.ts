import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains:["cdn.myanimelist.net", "i.pinimg.com","img.freepik.com","res.cloudinary.com","www.google.com","lh3.googleusercontent.com","avatars.githubusercontent.com"]
  },
  typescript : {
    ignoreBuildErrors : true,
  },
  eslint : {
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
