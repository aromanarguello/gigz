const { env } = require("./src/server/env");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
    'lh3.googleusercontent.com', 
    `${env.S3_UPLOAD_BUCKET}.s3.amazonaws.com`,
    `${env.S3_UPLOAD_BUCKET}.s3.${env.S3_UPLOAD_REGION}.amazonaws.com`,  
    ]
  }
};

module.exports = nextConfig;
