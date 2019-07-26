const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

module.exports = {
  webpack: (config) => {
    config.plugins.push(
      new SWPrecacheWebpackPlugin({
        minify: true,
        staticFileGlobsIgnorePatterns: [/\.next\//],
        runtimeCaching: [
          {
            handler: 'networkFirst',
            urlPattern: /^https?.*/,
          },
        ],
      }),
    );
    return config;
  },
};
