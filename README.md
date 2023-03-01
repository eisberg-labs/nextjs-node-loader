# nextjs-node-loader

This is a custom loader for Webpack that allows you to include native Node.js `.node` modules in your Next.js project.
It simplifies the process of loading native modules by providing a standardized interface that works seamlessly with
Next.js.
This is a modified version of [Node loader](https://github.com/webpack-contrib/node-loader).

## Getting Started

To begin, you'll need to install `nextjs-node-loader`:

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

|         Name          |    Type    |   Default   | Description                                           |
| :-------------------: | :--------: | :---------: | :---------------------------------------------------- |
| **[`flags`](#flags)** | `{Number}` | `undefined` | Enables/Disables `url`/`image-set` functions handling |

### `flags`

Type: `Number`
Default: `undefined`

The `flags` argument is an integer that allows to specify dlopen behavior.
See the [`process.dlopen`](https://nodejs.org/api/process.html#process_process_dlopen_module_filename_flags)
documentation for details.

## Contributing

Please take a moment to read our contributing guidelines if you haven't yet done so.

[CONTRIBUTING](./.github/CONTRIBUTING.md)

## License

[MIT](./LICENSE)
