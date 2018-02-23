import commonjs     from 'rollup-plugin-commonjs'
import includepaths from 'rollup-plugin-includepaths'
import nodeResolve  from 'rollup-plugin-node-resolve'
import sourcemaps   from 'rollup-plugin-sourcemaps'
import uglify       from 'rollup-plugin-uglify'

export default {
    output: {
        name: 'AngularCompiler',
        sourcemap: true,
        format: 'iife'
    },
    plugins: [
        nodeResolve({jsnext: true, module: true}),
        commonjs({
            include: ['../build/ngcAsCommonJS.ngc/src/**', '../node_modules/rxjs/**', '../node_modules/ng2-bootstrap/**']
        }),
        includepaths({
            paths: ['../build/ngcAsCommonJS.ngc/src/main', '../build/ngcAsCommonJS.ngc/src/app', '../build/ngcAsCommonJS.ngc/src/template']
        }),
        sourcemaps()
        //uglify()
    ]
}
