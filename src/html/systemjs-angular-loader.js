var templateUrlRegex = /templateUrl\s*:(\s*['"`](.*?)['"`]\s*)/gm;
var stylesRegex = /styleUrls *:(\s*\[[^\]]*?\])/g;
var stringRegex = /(['`"])((?:[^\\]\\\1|.)*?)\1/g;

module.exports.fetch = function (load, cb) {
    var baseURL = this.baseURL;
    var url = document.createElement('a');
    url.href = baseURL;
    var baseOrigin = url.origin;

    var rootUrls = [];
    if (load.metadata.rootPaths) {
        load.metadata.rootPaths.forEach(function (path) {
            if (path === '')
                return;
            if (!path.endsWith('/'))
                path = path + '/';
            if (path.startsWith('/'))
                path = baseOrigin + path;
            else if (baseURL.endsWith('/'))
                path = baseURL + path;
            else
                path = baseURL + '/' + path;
            rootUrls.push(path);
        });
    }

    var matchedRootUrl;
    rootUrls.forEach(function (rootUrl) {
        if (load.address.startsWith(rootUrl))
            matchedRootUrl = rootUrl;
    });

    var promise = cb(load);

    if (matchedRootUrl) {
        var subPath = load.address.substr(matchedRootUrl.length)
        rootUrls.forEach(function (rootUrl) {
            if (rootUrl !== matchedRootUrl) {
                promise = promise.catch(function (e) {
                    load.address = rootUrl + subPath;
                    return cb(load);
                });
            }
        });
    }

    return promise;
};

module.exports.translate = function (load) {
    if (load.source.indexOf('moduleId') != -1)
        return load;

    var url = document.createElement('a');
    url.href = load.address;

    var basePathParts = url.pathname.split('/');
    basePathParts.pop();
    var basePath = basePathParts.join('/');

    var baseHref = document.createElement('a');
    baseHref.href = this.baseURL;
    baseHref = baseHref.pathname;

    if (!baseHref.startsWith('/base/')) // it is not karma
        basePath = basePath.replace(baseHref, '');

    load.source = load.source
        .replace(templateUrlRegex, function (match, quote, url) {
            var resolvedUrl = url;
            if (url.startsWith('.'))
                resolvedUrl = basePath + url.substr(1);
            return 'templateUrl: "' + resolvedUrl + '"';
        }).replace(stylesRegex, function (match, relativeUrls) {
            var urls = [];
            while ((match = stringRegex.exec(relativeUrls)) !== null) {
                if (match[2].startsWith('.'))
                    urls.push('"' + basePath + match[2].substr(1) + '"');
                else
                    urls.push('"' + match[2] + '"');
            }
            return "styleUrls: [" + urls.join(', ') + "]";
        });

    return load;
};
