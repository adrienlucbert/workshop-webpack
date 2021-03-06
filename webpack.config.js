const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
    mode: isProduction ? 'production' : 'development',
    entry: () => './src/js/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: isProduction ? 'app/[name].[hash].js' : 'app/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: [ '/node_modules/' ],
                use: [ 'babel-loader' ]
            },
            {
                test: /\.vue$/,
                use: [ 'vue-loader' ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new VueLoaderPlugin()
    ],
    resolve: {
        alias: {
            '@app': path.resolve(__dirname, 'src'),
            '@js': path.resolve(__dirname, 'src/js'),
            '@css': path.resolve(__dirname, 'src/css'),
            '@components': path.resolve(__dirname, 'src/components'),
        }
    },
    optimization: {
        minimize: true
    },
    devtool: isProduction ? 'none' : 'cheap-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        watchContentBase: true,
        open: true,
        writeToDisk: true
    }
}