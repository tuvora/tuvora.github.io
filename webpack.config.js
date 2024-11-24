import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

export default {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: '[name].[contenthash].js',
    clean: true,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.pdf$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/docs/[name][contenthash][ext]',
        },
      },
      {
        test: /\.(png|jpg|jpeg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[name][contenthash][ext]',
        },
      },
      {
        test: /sprite\.css\.svg$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/sprite/[name][ext]',
        },
      },
      {
        test: /\.svg$/,
        exclude: /sprite\.css\.svg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/icons/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.woff2?$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][contenthash][ext]',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/assets/fav', to: 'assets/fav' },
        { from: 'src/assets/img', to: 'assets/img' },
        { from: 'src/assets/docs', to: 'assets/docs' },
      ],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.scss'],
    alias: {
      '@': path.resolve('src'),
    },
  },
  devServer: {
    static: {
      directory: path.join('dist'),
    },
    compress: true,
    port: 9000,
    open: true,
    hot: true,
  },
};
