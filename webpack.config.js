const path = require('path');
const nodeExternals = require('webpack-node-externals'); //server側は無理にbundleする必要ないやん。require使えるんやし。

module.exports = [
    {
        entry: './src/main.tsx',
        mode: 'development',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.mjs$/,
                    type: 'javascript/auto',
                },
            ],
        },
        resolve: {
            extensions: ['.js', '.tsx', '.ts', '.mjs'],
        },
        output: {
            filename: 'main.js',
            path: path.resolve(__dirname, './dst'),
        },
    },
    {
        entry: './src/server.ts',
        mode: 'development',
        target: 'node',
        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.mjs$/,
                    type: 'javascript/auto',
                },
            ],
        },
        resolve: {
            extensions: ['.js', '.tsx', '.ts', '.mjs'],
        },
        externals: [nodeExternals()],
        output: {
            filename: 'server.js',
            path: path.resolve(__dirname, './dst'),
        },
    },
];
