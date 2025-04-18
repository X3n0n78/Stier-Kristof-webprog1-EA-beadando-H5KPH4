const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development", // VAGY "production"
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // JSX fájlokra is vonatkozzon
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"], // Engedélyezd a .jsx kiterjesztést
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/react.html",
    }),
  ],
  devServer: {
    static: "./dist",
    port: 8080,
    open: true,
  },
};
