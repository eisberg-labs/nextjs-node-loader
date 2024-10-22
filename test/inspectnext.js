const path = require('path');
const fs = require('fs');

const next = require('next');

// Create a custom build script to inspect Webpack configuration
async function inspectWebpackConfig() {
  const app = next({
    dev: false,
    dir: '.',
  });

  await app.prepare();

  const config = await app.server.getWebpackConfig();
  console.log('Webpack Configuration:', config);

  fs.writeFileSync(path.join(__dirname, 'webpack-config.json'), JSON.stringify(config, null, 2));

  console.log('Webpack config saved to webpack-config.json');
}

inspectWebpackConfig().catch((err) => {
  console.error('Error during Webpack inspection:', err);
});
