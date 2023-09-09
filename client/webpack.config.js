const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/js/app.js",
    editor: "./src/js/editor.js",
    install: "./src/js/install.js",
    database: "./src/js/db.js",
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
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
    }),
    new InjectManifest({
      swSrc: "./service-worker.js",
      swDest: "service-worker.js",
    }),
    new WebpackPwaManifest({
      fingerprints: false,
      inject: true,
      name: "Just Another Text Editor",
      short_name: "JATE",
      description: "Just another text editor",
      background_color: "#225ca3",
      theme_color: "#225ca3",
      start_url: "/",
      publicPath: "/",
      icons: [
        {
          src: path.resolve("src/images/logo.png"),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join("assets", "icons"),
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "client/src/images", to: "images" },
      ],
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8080,
  },
};
