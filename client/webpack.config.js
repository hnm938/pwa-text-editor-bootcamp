// TODO: WEBOACJ OWA NABUFEST TO INCLUDE MANIFEST IN BUILD
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/js/app.js", // Your main application entry point
    editor: "./src/js/editor.js", // The entry point for the text editor
  },
  output: {
    filename: "[name].bundle.js", // Use [name] to generate separate bundles for each entry point
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      // Add rules for processing CSS, images, and other assets as needed
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html", // Path to your HTML template file
      filename: "index.html", // Name for the output HTML file
    }),
    // inject service worker
    new InjectManifest({
      swSrc: "./service-worker.js",
      swDest: "service-worker.js",
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8080,
  },
};
