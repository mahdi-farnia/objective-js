const path = require('node:path');
const HTMLPlugin = require('html-webpack-plugin');
const TSPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = ({ production }) => ({
  mode: production ? 'production' : 'development',
  entry: {
    runtime: path.resolve('objc/runtime.ts'),
    bundle: path.resolve('src/index.ts')
  },
  output: {
    filename: '[name].[fullhash].js',
    path: path.resolve('out'),
    clean: true
  },
  devtool: production ? false : 'eval-source-map',
  devServer: {
    port: 3000,
    hot: true,
    liveReload: true
  },
  plugins: [new HTMLPlugin()],
  resolve: {
    plugins: [new TSPathsPlugin()],
    extensions: ['.js', '.ts']
  },
  module: {
    rules: [
      {
        test: /\.ts$/i,
        loader: 'ts-loader'
      }
    ]
  },
  stats: 'errors-warnings'
});
