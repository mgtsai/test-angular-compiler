const fs = require('fs');
const path = require('path');

function isRelative(p) {
    return /^\.\.?$|^\.\.?\//.test(p);
}

function loadTsconfig(path) {
	if (fs.existsSync(path)) {
		return JSON.parse(fs.readFileSync(path, {encoding: 'utf8'}));
	} else {
		throw new Error(`'${path}' not found.`);
	}
}

function plugin(options) {
    options = options || {};
    const configFile = path.resolve(options.context, options.configFile);
    const tsconfig = loadTsconfig(configFile) || {};
    const compilerOptions = tsconfig.compilerOptions || {};
    const sourceDir = options.sourceDir ? path.resolve(options.sourceDir) : path.dirname(configFile);

    this.rootDirs = compilerOptions.rootDirs
        .filter(dir => typeof dir === 'string')
        .map(dir => path.resolve(sourceDir, dir));
}

plugin.prototype.apply = function(resolver) {
    this.rootDirs.forEach(rootDir => resolver.plugin('described-resolve', (request, callback) => {
        const innerRequest = request.request;
        const context = request.path;

        if (innerRequest && isRelative(innerRequest)) {
            const absolutePath = path.join(context, innerRequest);
            const matchedRootDir = this.rootDirs.find(rootDir => absolutePath.startsWith(rootDir));
            if (matchedRootDir && matchedRootDir !== rootDir) {
                const newInnerRequest = path.resolve(rootDir, path.relative(matchedRootDir, absolutePath));
                const newRequest = Object.assign({}, request, {request: newInnerRequest});
                const message = `looking for modules in ${rootDir}`;
                return resolver.doResolve('resolve', newRequest, message, callback);
            }
        }

        return callback();
    }));
}

module.exports = plugin;
