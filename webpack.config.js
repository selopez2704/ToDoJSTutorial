const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
    mode: 'development',
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
                test:/estilos.css$/,
                use:[MiniCssExtractPlugin.loader , "css-loader"]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/img/[name][ext]'
                  }
              }
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
        ]
    },
    output: {
        clean: true,
        // assetModuleFilename: 'img/[name][ext]',
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }), 
        new MiniCssExtractPlugin({
            filename:"[name].css",
            linkType: "text/css",
          }),
        // new CopyPlugin({
        //     patterns: [
        //       { from: "src/assets/", to: "assets/" },
        //     ],
        //   }),
    ]

}