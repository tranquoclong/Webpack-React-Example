const path = require("path");
// var webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  performance: {
    hints: process.env.NODE_ENV === "production" ? "warning" : false,
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "react-native": "react-native-web",
      "pdfjs-dist": path.resolve("node_modules/pdfjs-dist/es5/build/pdf.js"),
    },
    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin(), new TerserJSPlugin({})],
    minimize: true,
    // splitChunks: {
    //   chunks: "all",
    //   minSize: 30000,
    //   maxSize: 0,
    //   minChunks: 1,
    //   maxAsyncRequests: 10,
    //   maxInitialRequests: 5,
    //   automaticNameDelimiter: "_",
    //   name: true,
    //   cacheGroups: {
    //     vendors: {
    //       test: /[\\/]node_modules[\\/]/,
    //       priority: -10,
    //     },
    //     default: {
    //       minChunks: 2,
    //       priority: -20,
    //       reuseExistingChunk: true,
    //     },
    //   },
    // },
  },
  // devtool: "eval-cheap-source-map",
  entry: "./src/index.js",
  output: {
    filename: "bundle.min.js",
    path: path.join(__dirname, "/build")
  },
  // mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.(sa|sc|c|le)ss$/,
        // use: ["style-loader", "css-loader"]
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      minify: true,
      template: "./public/index.html",
      filename: "./index.html",
      }),
    new MiniCssExtractPlugin({
        filename: "[name].min.css",
      }),
      // new webpack.DefinePlugin({
      //   'process.env': {
      //     'NODE_ENV': JSON.stringify('production')
      //   }
      // })
  ]
};
