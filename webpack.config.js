// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : 'style-loader';

const config = {
  entry: {
    index: './src/index.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: (pathData) => {
      return pathData.chunk.name === 'index'
        ? 'assets/js/index.js'
        : 'assets/js/[name]/index.js';
    },
    clean: true,
  },
  devServer: {
    open: false,
    host: 'localhost',
    port: 3000,
    devMiddleware: {
      publicPath: '/wp-mock',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      chunks: ['index'],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public/**/*.(jpg|jpeg|png)',
          to: 'assets/images/[name][ext]',
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: stylesHandler,
          },
          {
            loader: 'css-loader',
            options: {
              url: false, //<------------ this guy helped
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: stylesHandler,
          },
          {
            loader: 'css-loader',
            options: {
              url: false, //<------------ this guy helped
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|jpeg|gif)$/i,
        type: 'asset',
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';

    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: (pathData) => {
          return pathData.chunk.name === 'index'
            ? 'assets/css/index.css'
            : 'assets/css/[name]/index.css';
        },
      })
    );
  } else {
    config.mode = 'development';
  }
  return config;
};
