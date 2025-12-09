/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for GitHub Pages (only in production)
  // In development, we need API routes and dynamic routes to work
  ...(process.env.NODE_ENV === 'production' && { output: 'export' }),
  // Set basePath to match your repository name for GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/John-prototype-repo' : '',
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig

