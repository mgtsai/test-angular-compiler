const path = require('path');
const webpack = require('webpack');
const TypescriptCompilerOptions = require('./webpack.plugin.typescript-compilerOptions');

function getOutputDir() {
    return path.resolve(__dirname, module.exports.output.path);
}

function getSourceDir() {
    return path.resolve(__dirname, '../build/tscAsES2015.tsc');
}

function isCompiledJs(path) {
    return path.startsWith(`${getSourceDir()}/`) && /\.js$/.test(path)
}

module.exports = {
    devtool: 'source-map',
    output: {
        filename: 'bundle.js',
        devtoolModuleFilenameTemplate: info => path.relative(getOutputDir(), info.absoluteResourcePath)
    },
    resolve: {
        extensions: ['.js'],
        plugins: [
            new TypescriptCompilerOptions({
                context: __dirname,
                configFile: 'tsconfig.tscAsES2015.json',
                sourceDir: getSourceDir()
            })
        ]
    },
    module: {
        rules: [{
            test: /\.html$/,
            loader: 'html-loader'
        }, {
            test: /\.css$/,
            use: ['to-string-loader', 'css-loader']
        }, {
            test: isCompiledJs,
            use: ['source-map-loader', 'angular2-template-loader'],
            enforce: 'pre'
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        })
    ]
};
