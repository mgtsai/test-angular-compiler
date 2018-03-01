const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginExtra = require('./tools/webpack.plugin.html-webpack-plugin-extra');
const TypescriptCompilerOptions = require('./tools/webpack.plugin.typescript-compilerOptions');

function getOutputDir() {
    return path.resolve(__dirname, module.exports.output.path);
}

function getSourceDir() {
    return path.resolve(__dirname, '../build/ngcAsCommonJS.ngc/src');
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
        extensions: ['.js', '.html'],
        plugins: [
            new TypescriptCompilerOptions({
                context: __dirname,
                configFile: 'tsconfig.ngcAsCommonJS.json',
                sourceDir: getSourceDir()
            })
        ]
    },
    module: {
        rules: [{
            test: isCompiledJs,
            loader: 'source-map-loader',
            enforce: 'pre'
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        }),
        new HtmlWebpackPlugin({
            title: 'TestAngularCompiler - Ngc as CommonJS then Webpack',
            template: 'tools/webpack.template.index.ejs'
        }),
        new HtmlWebpackPluginExtra({
            htmlBase: '..'
        })
    ]
};
