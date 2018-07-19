import path from "path";
import merge from "webpack-merge";
import nodeExternals from "webpack-node-externals";
import { SourceMapDevToolPlugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import config from "./config.common";

export default merge(config, {
  webpack: {
    server: {
      mode: "production",
      target: "node",
      entry: {
        server: "./src/server/index.js",
      },
      output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "..", config.path.output),
      },
      node: {
        __filename: false,
        __dirname: false,
      },
      module: {
        rules: [{
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        }],
      },
      externals: [
        nodeExternals(),
      ],
    },
    client: {
      mode: "production",
      entry: {
        app: "./src/client/index.js",
      },
      output: {
        filename: "[name]-[chunkhash].js",
        path: path.resolve(__dirname, "..", config.path.output, "assets"),
        publicPath: "/assets/",
      },
      resolve: {
        modules: [
          "node_modules",
          "src/client",
        ],
      },
      optimization: {
        splitChunks: {
          cacheGroups: {
            vendor: {
              name: "vendor",
              test: /node_modules/,
              chunks: "all",
            },
            style: {
              name: "style",
              test: /\.s?css$/,
              chunks: "all",
            },
          },
        },
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: "[name]-[contenthash].css",
        }),
        new SourceMapDevToolPlugin({
          filename: "[name]-[contenthash].map",
          exclude: /vendor/,
          noSources: true,
        }),
        new HtmlWebpackPlugin({
          template: "src/client/index.html",
          filename: "../index.html",
          favicon: "src/client/scss/img/favicon.png",
        }),
      ],
      module: {
        rules: [{
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        }, {
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)(\?\S*)?$/,
          loader: "file-loader",
          query: {
            name: "[hash].[ext]",
          },
        }, {
          test: /\.s?css$/,
          use: [{
            loader: MiniCssExtractPlugin.loader,
          }, {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          }, {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              includePaths: [
                "node_modules",
                "src/client",
              ],
              data: "@import 'scss/variables';",
            },
          }],
        }],
      },
    },
  },
});
