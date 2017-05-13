module.exports = {
    entry: './src/ProtonLoader.js',
    output: {
        path: __dirname + '/build/',
        filename: 'ProtonLoader.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        }]
    }
};