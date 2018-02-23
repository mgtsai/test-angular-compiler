const path = require('path');
const webpack = require('webpack');
const TypescriptCompilerOptions = require('./webpack.plugin.typescript-compilerOptions');

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
        filename: 'bundle.js',
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
        })
    ]
};
