const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const vConsolePlugin = require('vconsole-webpack-plugin')

const resolve = (...args) => path.join(__dirname, '..', ...args)

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: resolve('examples/index.js'),
    output: {
        path: resolve('dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    }
                ],
                include: [resolve('src'), resolve('examples')]
            },
            {
                test: /\.(tsx|ts)$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    },
                    'ts-loader'
                ],
                include: [resolve('src'), resolve('examples')]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
                include: [resolve('src'), resolve('examples')]
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
                include: [resolve('src'), resolve('examples')]
            },
            {
                test: /\.(jpe?g|png|ico|gif|woff|woff2|eot|ttf|otf|svg|swf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 4000,
                            name: 'images/[name][hash:8].[ext]'
                        }
                    }
                ],
                include: [resolve('src'), resolve('examples')]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx']
    },
    plugins: [
        // webpack热更新组件
        new webpack.HotModuleReplacementPlugin(),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: resolve('examples/index.html'), // 模板路径
            inject: true, // js插入位置
            chunksSortMode: 'none',
            chunks: ['manifest', 'vendor', resolve('examples/index.js')],
            hash: true
        }),
        new vConsolePlugin({
            enable: true
        })
    ],

    devServer: {
        host: '0.0.0.0',
        contentBase: path.resolve(__dirname, 'dist'),
        port: 7777
    }
}
