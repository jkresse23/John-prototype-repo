/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',
  // Set basePath to match your repository name for GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/John-prototype-repo' : '',
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  // Skip API routes during static export (they won't work on GitHub Pages anyway)
  trailingSlash: true,
}

module.exports = nextConfig

