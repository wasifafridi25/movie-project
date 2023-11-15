/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['image.tmdb.org', 'rb.gy'], // it optimizes the image and converts the image into webP format and 
    //lazy loads the images
  },
}

module.exports = nextConfig
