import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.ctfassets.net', 'res.cloudinary.com', 'images.unsplash.com', 'imq-prod-public.s3.us-east-1.amazonaws.com'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      
      use: [
        {
          loader: require.resolve('@svgr/webpack'),
          options: {
            // Optionally, you can add SVGR options here
            // e.g., icon: true
          },
        },
      ],
    });
    return config;
  },
};

export default nextConfig;
