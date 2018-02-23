const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const {AngularCompilerPlugin} = require('@ngtools/webpack');
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
        extensions: ['.js'],
        plugins: [
            new TypescriptCompilerOptions({
                context: __dirname,
                configFile: 'tsconfig.webpackAsES2015.angular.json'
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
            test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
            loader: '@ngtools/webpack'
        }]
    },
    plugins: [
        new AngularCompilerPlugin({
            tsConfigPath: 'tsconfig.webpackAsES2015.angular.json',
            entryModule: 'app/app.module#AppModule',
            sourceMap: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        })
    ]
};
