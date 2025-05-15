const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/js/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development',
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'), // Serve files from "dist" directory
        },
        compress: true, // Enable gzip compression for everything served
        port: 8080, // Use port 8080
        open: true, // Open the browser automatically when the server starts
        client: {
            overlay: false, // Disable the overlay
        },
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                // use: ['style-loader', 'css-loader'], // Handle CSS imports
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ],
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'node_modules/cesium/Build/Cesium', to: 'Cesium' },
                { from: 'src/index.html', to: 'index.html' },
                { from: 'src/css', to: 'css' },
                { from: 'src/asset', to: 'asset' }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: 'css/styles.css',
        }),
    ],
};

