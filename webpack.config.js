const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = ({ mode }) => {
    return {
        mode,
        output: {
            filename: '[name].[chunkhash:8].js',
            assetModuleFilename: 'img/[name].[hash:7][ext]'
        },
        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    exclude: /node_modules/,
                    use: 'ts-loader'
                },
                {
                    test: /\.(jpe?g|gif|png|svg)$/i,
                    type: 'asset/resource'
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.js']
        },
        plugins: [
            new webpack.ProgressPlugin(),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './index.html',
                minify: {
                    collapseWhitespace: true,
                    minifyCSS: true,
                    minifyJS: true
                }
            })
        ],
        cache: {
            type: 'filesystem',
            buildDependencies: {
                config: [__filename]
            }
        },
        devtool: 'source-map'
    }
}
