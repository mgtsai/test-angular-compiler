const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginExtra = require('./tools/webpack.plugin.html-webpack-plugin-extra');
const TypescriptCompilerOptions = require('./tools/webpack.plugin.typescript-compilerOptions');

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
        filename: '[name].[chunkhash].js',
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
        }),
        new HtmlWebpackPlugin({
            title: 'TestAngularCompiler - Tsc as ES2015 then Webpack',
            template: 'tools/webpack.template.index.ejs'
        }),
        new HtmlWebpackPluginExtra({
            htmlBase: '..'
        })
    ]
};
