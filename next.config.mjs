import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    disableStaticImages: true,
    formats: ['image/avif', 'image/webp'],
  },
};

export default withNextIntl(nextConfig);
