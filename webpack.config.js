module.exports = function (env) {

    let libraryName = 'ProtonLoader'
    let libraryTarget = 'var';
    if (env && env.umd) {
        libraryName += '.module';
        libraryTarget = 'umd';
    }
    return {
        entry: __dirname + '/src/ProtonLoader.js',
        devtool: 'source-map',
        output: {
            path: __dirname + '/build',
            filename: libraryName + '.js',
            library: libraryName,
            libraryTarget: libraryTarget
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
};