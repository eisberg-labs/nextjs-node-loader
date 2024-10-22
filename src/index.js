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
  const targetOutputPath = outputPath || _compiler.options.output.path;
  const webpackPublicPath = isWebpackPathIncluded ? '__webpack_public_path__' : '""';
  const cleanedTargetOutputPath = targetOutputPath.replace(/\\/g, '/');
  const moduleFlags = typeof flags !== 'undefined' ? `, ${options.flags}` : '';
  const loaderScript = `
  process.dlopen(module, require('path').join("${cleanedTargetOutputPath}", ${webpackPublicPath}, "${name}")${moduleFlags});`;
  // console.log(loaderScript);
  return loaderScript;
}

export const raw = true;
