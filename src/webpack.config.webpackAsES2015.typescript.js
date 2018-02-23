const path = require('path');
const webpack = require('webpack');
const TypescriptCompilerOptions = require('./webpack.plugin.typescript-compilerOptions');

function getOutputDir() {
    return path.resolve(__dirname, module.exports.output.path);
}

module.exports = {
    devtool: 'source-map',
    output: {
        filename: 'bundle.js',
        devtoolModuleFilenameTemplate: info => path.relative(getOutputDir(), info.absoluteResourcePath)
    },
    resolve: {
        extensions: ['.ts', '.js'],
        plugins: [
            new TypescriptCompilerOptions({
                context: __dirname,
                configFile: 'tsconfig.webpackAsES2015.typescript.json'
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
            test: /\.ts$/,
            use: [
                {
                    loader: 'awesome-typescript-loader',
                    options: {
                        configFileName: 'tsconfig.webpackAsES2015.typescript.json'
                    }
                },
                'angular2-template-loader'
            ]
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        })
    ]
};
