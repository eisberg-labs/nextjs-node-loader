const path = require("path");
const nextBuild = require('next/dist/build').default;

async function inspectWebpackConfig() {
  const appDir = path.resolve(__dirname);
  const debugOutput = true;
  const runLint = false;
  const noMangling = true;
  const appDirOnly = true;
  const turboNextBuild = false;
  const experimentalBuildMode = false;

  try {
    void await nextBuild(appDir, {

      // Hook into the webpack configuration before it builds
      webpack(config, { isServer }) {
        // Inspect or modify the webpack configuration here
        console.log('Inspecting Webpack configuration...');
        console.log(config);

        // Optionally, save the Webpack config to a file for easier inspection
        fs.writeFileSync(
          path.join(__dirname, 'webpack-config.json'),
          JSON.stringify(config, null, 2)
        );

        console.log('Webpack config saved to webpack-config.json');

        // Return the modified or original config
        return config;
      },
    }, debugOutput, runLint, noMangling, appDirOnly, turboNextBuild, experimentalBuildMode);

    console.log('Next.js build completed successfully.');
  } catch (error) {
    console.error('Error during Next.js build:', error);
  }
}

inspectWebpackConfig();
