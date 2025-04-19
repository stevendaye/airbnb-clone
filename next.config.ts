import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
    ],
  },
};

module.exports = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
