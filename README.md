# nextjs-node-loader (No Longer Maintained)

**Status: Deprecated**

There's no need for it anymore. I've added an example in [next 14](./examples/next-14) to demo including different native modules.
Solution in NextJS 14 is to add a:
```javascript
experimental: {
  serverComponentsExternalPackages: ['yournativemodule'],
}
```
For a dependency built with neon bindings, you might also need to configure `externals`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['mynativemodule'],
  },
  /** @type {import('webpack').Configuration} */
  webpack: (config, context) => {
    if (context.isServer) {
      config.externals = [
        ...config.externals,
        {'mynativemodule': 'commonjs mynativemodule'},
      ]
    }
    return config;
  },
};
```

A huge thank you to everyone who contributed to this project! ❤️

For historical purposes, the original README is preserved below.


# nextjs-node-loader

This is a custom loader for Webpack that allows you to include native Node.js `.node` modules in your Next.js project.
It simplifies the process of loading native modules by providing a standardized interface that works seamlessly with
Next.js.
This is a modified version of [Node loader](https://github.com/webpack-contrib/node-loader).
More context on the [why and example use of the loader in my blog post](https://www.amarjanica.com/nextjs-and-rust-creating-a-custom-webpack-loader-for-native-node-modules).

## Getting Started

To begin, you'll need to install a `nextjs-node-loader`:

```console
npm install nextjs-node-loader --save-dev
```

**next.config.js**

```js
module.exports = {
  webpack: (config, { dev, isServer, webpack, nextRuntime }) => {
    config.module.rules.push({
      test: /\.node$/,
      use: [
        {
          loader: "nextjs-node-loader",
          options: {
            flags: os.constants.dlopen.RTLD_NOW,
            outputPath: config.output.path
          }
        },
      ],
    });
    return config;
  },
};
```

And use in e.g. your api route;

```javascript
import module from "node-module";

export default function handler(req, res) {
  // ...
}
```

## Options

|    Name    |    Type    |       Default        | Description                                           |
|:----------:|:----------:|:--------------------:| :---------------------------------------------------- |
|   flags    | `{Number}` |     `undefined`      | Enables/Disables `url`/`image-set` functions handling |
| outputPath | `{String}` | webpack's outputPath | The root path of shared node libraries |
| includeWebpackPublicPath | `{String}`| false | If __webpack_public_path__ should be included in a path for loading node module. For nextjs >13.2.5 should be false. |

## License

[MIT](./LICENSE)
