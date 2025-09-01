import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

    async redirects() {
    return [
      {
        source: '/',
        destination: '/show',
        permanent: true, // set to true if you want a 308 permanent redirect
      },
    ];
  }, 
  
};

export default nextConfig;
