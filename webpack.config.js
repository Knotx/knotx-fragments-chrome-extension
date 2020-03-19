const path = require('path');
const StyleLintWebpackPlugin = require('stylelint-webpack-plugin');

module.exports = {
  mode: 'development',
  watchOptions: {
    ignored: /node_modules/,
  },
  entry: {
    main: './src/js/index.jsx',
    background: './src/js/background/background.js',
    content: './src/js/content/content.js',
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new StyleLintWebpackPlugin({
      configFile: './styleintrc',
      context: './src',
      files: 'css/*',
    }),
  ],
};
