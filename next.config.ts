/** @type {import('next').NextConfig} */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  i18n: {
    locales: ['en', 'am'],
    defaultLocale: 'en',
  },
};

export default nextConfig;
