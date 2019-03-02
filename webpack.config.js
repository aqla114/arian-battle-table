const path = require('path');

module.exports = [
    {
        entry: './src/main.tsx',
        mode: 'development',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.mjs$/,
                    type: 'javascript/auto',
                },
            ]
        },
        resolve: {
            extensions: ['.js', '.tsx', '.ts', '.mjs']
        },
        output: {
            filename: 'main.js',
            path: path.resolve(__dirname, './dst')
        },
    }
]