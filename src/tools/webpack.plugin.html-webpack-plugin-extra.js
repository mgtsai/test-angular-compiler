const path = require('path');

function plugin(options) {
    options = options || {};
    this.htmlBase = options.htmlBase;
}

plugin.prototype.apply = function(compiler) {
    if (!this.htmlBase)
        return;
    const htmlBase = path.resolve(compiler.context, this.htmlBase);
    compiler.plugin('compilation', (compilation) => compilation.plugin(
        'html-webpack-plugin-before-html-processing',
        (data, cb) => {
            data.assets.js = data.assets.js.map(js => path.relative(htmlBase, path.resolve(compiler.outputPath, js)));
            cb(null, data);
        }
    ));
};

module.exports = plugin;
