const path = require('path');

module.exports = [
    {
        entry: './src/frontend/index.tsx',
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
];
