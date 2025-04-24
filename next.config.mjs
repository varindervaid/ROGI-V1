/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add any existing configuration here
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  
  // Override the default not-found page
  experimental: {
    // Add any existing experimental options here
    
    // Use our custom not-found page
    notFound: {
      page: '/global-not-found'
    }
  }
};

export default nextConfig;
