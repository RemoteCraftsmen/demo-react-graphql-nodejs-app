const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");
const path = require("path");

module.exports = () => {
  const env = dotenv.config().parsed;
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    entry: "./index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "main.js",
      publicPath: "/"
    },
    module: {
      rules: [
        {
          use: "babel-loader",
          test: /\.js$/,
          exclude: /node_modules/
        },
        {
          use: ["style-loader", "css-loader"],
          test: /\.css$/
        }
      ]
    },
    devServer: {
      historyApiFallback: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        favicon: "./src/favicon.ico"
      }),
      new webpack.DefinePlugin(envKeys)
    ]
  };
};
