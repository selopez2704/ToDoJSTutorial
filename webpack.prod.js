const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");


module.exports = {
    mode: 'production',
    module: {
        
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    sources: false,
                },
            },
            {
                test: /\.css$/i,
                exclude:/estilos.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test:/styles.css$/,
                use:[MiniCssExtractPlugin.loader , "css-loader"]
            },
            {
                test: /\.png/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/img/[hash][ext]'
                  }
              },
            // {
            //     test: /\.(png|jpe?g|gif)$/i,
            //     type: 'asset/resource',
            //     use: [
            //       {
            //         loader: 'file-loader',
            //       },
            //     ],
            //     type: 'javascript/auto',
            //   },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
              }
        ]
    },
    output: {
        clean: true,
        filename: '[name]_[fullhash].js',
        // assetModuleFilename: 'img/[name][ext]',
    },
    optimization:{
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }), 
        new MiniCssExtractPlugin({
            filename:"[name]_[fullhash].css",
            linkType: "text/css",
          }),
        // new CopyPlugin({
        //     patterns: [
        //       { from: "src/assets/", to: "assets/" },
        //     ],
        //   }),
    ]

}