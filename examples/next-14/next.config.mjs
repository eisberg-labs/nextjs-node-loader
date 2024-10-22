/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['msnodesqlv8','robotjs', 'node-el-slugify'],
  },
  /** @type {import('webpack').Configuration} */
  webpack: (config, context) => {
    if (context.isServer) {
      config.externals = [
        ...config.externals,
        {'node-el-slugify': 'commonjs node-el-slugify'},
      ]
    }
    return config;
  },
};

export default nextConfig;
