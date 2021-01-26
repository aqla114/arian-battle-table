const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = [
    {
        entry: {
            main: './src/frontend/index.tsx',
            css: './src/frontend/style/index.styl',
        },
        mode: 'development',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: [/node_modules/, path.resolve(__dirname, '/src/server')],
                },
                {
                    test: /\.mjs$/,
                    type: 'javascript/auto',
                },
                {
                    test: /\.styl$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader?url=false', 'stylus-loader'],
                },
            ],
        },
        resolve: {
            extensions: ['.js', '.tsx', '.ts', '.mjs'],
        },
        output: {
            path: path.resolve(__dirname, './dst'),
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'index.css',
            }),
        ],
    },
];
