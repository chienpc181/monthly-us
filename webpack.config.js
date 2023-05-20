const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
    },
    // plugins: [
    //     new HtmlWebpackPlugin({
    //         template: './index.html'
    //     })
    // ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.html$/,
                use: [
                    'html-loader',
                ],
            },
        ],
    },
};
