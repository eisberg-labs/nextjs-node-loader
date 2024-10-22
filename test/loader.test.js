const fs = require('fs');

const loader = require('../src/index');

jest.mock('fs');
jest.mock('loader-utils', () => {
  return {
    interpolateName: jest.fn(),
  };
});

describe('Loader', () => {
  let context;

  beforeEach(() => {
    context = {
      rootContext: '/project/root',
      _compiler: {
        options: {
          output: {
            path: '/dist',
          },
        },
      },
      emitFile: jest.fn(),
      getOptions: jest.fn(),
    };
  });

  it('should return the correct loader output string', () => {
    const { interpolateName } = require('loader-utils');
    interpolateName.mockReturnValue('file.js');

    fs.existsSync.mockReturnValue(true);
    context.getOptions.mockReturnValue({
      // eslint-disable-next-line no-undefined
      flags: undefined,
      // eslint-disable-next-line no-undefined
      outputPath: undefined,
      includeWebpackPublicPath: true,
    });

    const content = Buffer.from('console.log("test content");');

    const result = loader.default.call(context, content);

    const expectedOutput = `
try {
  const pathToOpen = require('path').join("/dist", "/", __webpack_public_path__, "file.js");
  process.dlopen(module, pathToOpen, undefined);
} catch (error) {
  throw new Error('nextjs-node-loader:\\n' + error);
}
`;

    // Test: Verify the output string matches
    expect(result.trim()).toEqual(expectedOutput.trim());
  });
});
