const { interpolateName } = require("loader-utils");

const schema = require("./options.json");

function loader(content) {
  const { rootContext, _compiler, getOptions, emitFile } = this;
  const options = getOptions(schema);
  const { flags } = options;
  const outputPath = _compiler.options.output.path;

  const name = interpolateName(this, "[name].[ext]", {
    context: rootContext,
    content,
  });

  emitFile(name, content);

  return `
try {
  process.dlopen(module, ${JSON.stringify(
    outputPath
  )} + require("path").sep + __webpack_public_path__ + ${JSON.stringify(name)}${
    typeof flags !== "undefined" ? `, ${JSON.stringify(options.flags)}` : ""
  });
} catch (error) {
  throw new Error('nextjs-node-loader:\\n' + error);
}
`;
}

module.exports = loader;
module.exports.raw = true;
