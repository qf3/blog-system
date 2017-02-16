const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function() {
    return {
        entry: {
            index:['./server/views/index.ejs','webpack-hot-middleware/client?reload=true'],
            // vendor:'jquery'
        },
        output: {
            path: path.join(__dirname, './client/dist'),
            filename: '[name].[hash].js',
            // publicPath: './client/dist'
        },
        module: {
            rules: [{
                test:/\.js$/,
                exclude:/node_modules/,
                use:['babel-loader']
            },
            {
                test: /\.css$/,
                use:[
                        'style-loader', 
                        'css-loader'
                    ]
            },
            {
                test:/\.ejs$/,
                loader:'ejs-loader?variable=data'
            }
            /*{
                test: /\.(jpg|png|gif)$/,
                loader: 'file-loader'
            }, {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            }*/
            ],
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            // new webpack.ProvidePlugin({
            //     $: 'jquery',
            //     jQuery: 'jquery',
            //     'window.jQuery': 'jquery'
            // }),
            // new webpack.optimize.CommonsChunkPlugin({
            //     name: ['vendor','manifest']
            // }),
           /* new HtmlWebpackPlugin({
                template: './client/index.html'
            })*/
        ]
    };
}