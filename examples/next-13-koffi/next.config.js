import os from 'os';
import path from "path";

// https://github.com/0xSchneier/gpt4w example of loading koffi
const arch = os.arch()
const platform = os.platform()
export default {
  eslint: {
    ignoreDuringBuilds: true
  },
  reactStrictMode: false,
  webpack: (config) => {
    // eslint-disable-next-line no-param-reassign
    config.resolve.alias.koffi = path.resolve(`node_modules/koffi/build/koffi/${platform}_${arch}/koffi.node`)
    config.module.rules.push({
      test: /\.node$/,
      use: [
        {
          loader: "nextjs-node-loader",
          options: {
            flags: os.constants.dlopen.RTLD_NOW,
            outputPath: config.output.path
          },
        },
      ],
    });

    return config;
  },
};
