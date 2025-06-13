

const { resolve } = require("path");

const argv = require('yargs-parser')(process.argv.slice(2))
const isDev = argv.mode === 'development'

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { defineReactCompilerLoaderOption, reactCompilerLoader } = require('react-compiler-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { ThemedProgressPlugin } = require('themed-progress-plugin');

module.exports = {
  mode: isDev ? "development" : 'production',
  entry: resolve("./src/index.tsx"),
  output: {
    path: resolve(process.cwd(), "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          'css-loader',
          'postcss-loader' // ✅ Tailwind 必须有
        ],
      },
      { test: /\.txt$/, use: "raw-loader" },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.[mc]?[jt]sx?$/i,
        exclude: /node_modules/,
        use: [
          // babel-loader 和 swc-loader 不能同时使用，否则会报错，选一种即可，都是处理jsx的loader
          // {
          //   loader: 'babel-loader',
          //   options: {
          //     presets: ['@babel/preset-env', '@babel/preset-react'],
          //   },
          // },
          // 初中生写的一个loader，牛逼
          {
            loader: 'swc-loader',
            options: {
              jsc: {
                parser: {
                  syntax: 'ecmascript', // 或 'ecmascript' 'typescript'
                  jsx: true,
                },
                transform: {
                  react: {
                    runtime: 'automatic',
                  },
                },
              },
            },
          },
          // babel-loader, swc-loader, esbuild-loader, or anything you like to transpile JSX should go here.
          // If you are using rspack, the rspack's buiilt-in react transformation is sufficient.
          // { loader: 'swc-loader' },
          // Now add reactCompilerLoader
          {
            loader: reactCompilerLoader,
            options: defineReactCompilerLoaderOption({
              // React Compiler options goes here
            }),
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '@': resolve('src/'),
      '@components': resolve('src/components'),
      '@hooks': resolve('src/hooks'),
      '@pages': resolve('src/pages'),
      '@layouts': resolve('src/layouts'),
      '@assets': resolve('src/assets'),
      '@states': resolve('src/states'),
      '@service': resolve('src/service'),
      '@utils': resolve('src/utils'),
      '@lib': resolve('src/lib'),
      '@constants': resolve('src/constants'),
      '@connections': resolve('src/connections'),
      '@abis': resolve('src/abis'),
      '@types': resolve('src/types'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: [ new CleanWebpackPlugin(), new MiniCssExtractPlugin({
    filename: !isDev ? 'styles/[name].[contenthash:5].css' : 'styles/[name].css',
    chunkFilename: !isDev ? 'styles/[name].[contenthash:5].css' : 'styles/[name].css',
    ignoreOrder: false,
  }),new ThemedProgressPlugin()],
};
