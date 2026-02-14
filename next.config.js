/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'onnxruntime-web/dist/ort.webgpu.min.js': 'onnxruntime-web/webgpu',
      'onnxruntime-web': 'onnxruntime-web',
    }
    return config
  },
}

module.exports = nextConfig
