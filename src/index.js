const { interpolateName } = require('loader-utils');

const schema = require('./options.json');

export default function loader(content) {
  const { rootContext, _compiler, getOptions, emitFile } = this;
  const options = getOptions(schema);
  const { flags, outputPath, includeWebpackPublicPath } = options;

  const isWebpackPathIncluded = includeWebpackPublicPath || false;
  const name = interpolateName(this, '[name].[ext]', {
    context: rootContext,
    content,
  });

  emitFile(name, content);

  return `
try {
  process.dlopen(module, ${JSON.stringify(
    outputPath || _compiler.options.output.path
  )} + require("path").sep + ${isWebpackPathIncluded ? '__webpack_public_path__' : '""'} + ${JSON.stringify(name)}${
    typeof flags !== 'undefined' ? `, ${JSON.stringify(options.flags)}` : ''
  });
} catch (error) {
  throw new Error('nextjs-node-loader:\\n' + error);
}
`;
}

export const raw = true;
