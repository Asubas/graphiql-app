/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    disableStaticImages: true,
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
