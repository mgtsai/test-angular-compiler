import commonjs     from 'rollup-plugin-commonjs'
import string       from 'rollup-plugin-string'
import includepaths from 'rollup-plugin-includepaths'
import nodeResolve  from 'rollup-plugin-node-resolve'
import sourcemaps   from 'rollup-plugin-sourcemaps'
import uglify       from 'rollup-plugin-uglify'
import * as plugin  from 'rollup-pluginutils'
import * as fs      from 'fs'

const stringRegex = /(['`"])((?:[^\\]\\\1|.)*?)\1/g;
const templateUrlRegex = /templateUrl\s*:(\s*['"`](.*?)['"`]\s*([,}]))/gm;
const styleUrlsRegex = /styleUrls *:(\s*\[[^\]]*?\])/g;

function replaceWithRequire(string) {
    return string.replace(stringRegex, (match, quote, url) => {
        if (url.charAt(0) !== '.')
            url = `./${url}`;
        return `require('${url}')`;
    });
}

const filter = plugin.createFilter(['../build/tscAsCommonJS.tsc/**/*.js']);

export default {
    output: {
        name: 'AngularCompiler',
        sourcemap: true,
        format: 'iife'
    },
    plugins: [
        nodeResolve({jsnext: true, module: true}),
        commonjs({
            include: ['../build/tscAsCommonJS.tsc/**', '../node_modules/rxjs/**', '../node_modules/ng2-bootstrap/**']
        }),
        includepaths({
            paths: ['../build/tscAsCommonJS.tsc/main', '../build/tscAsCommonJS.tsc/app', 'template']
        }),
        string({
            include: ['template/**']
        }),
        {
            name: 'angular2-template-loader',
            load(id) {
                if (!filter(id))
                    return null;
                return new Promise(resolve => fs.readFile(id, 'utf8', (err, code) => {
                    if (err) {
                        resolve(null);
                        return;
                    }
                    resolve(
                        code.replace(templateUrlRegex, (match, url) => `template:${replaceWithRequire(url)}`)
                            .replace(styleUrlsRegex, (match, urls) => `styles:${replaceWithRequire(urls)}`)
                    );
                }));
            },
        },
        sourcemaps()
        //uglify()
    ]
}
