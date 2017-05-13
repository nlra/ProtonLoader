const libraryName = 'ProtonLoader';

module.exports = {
    entry: __dirname + '/src/ProtonLoader.js',
    devtool: 'source-map',
    output: {
        path: __dirname + '/build',
        filename: libraryName + '.js',
        library: libraryName,
        libraryTarget: 'umd'
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