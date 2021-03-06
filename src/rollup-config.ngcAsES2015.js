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
            include: ['../node_modules/rxjs/**', '../node_modules/ng2-bootstrap/**']
        }),
        includepaths({
            paths: ['../build/ngcAsES2015.ngc/src/main', '../build/ngcAsES2015.ngc/src/app', '../build/ngcAsES2015.ngc/src/template']
        }),
        sourcemaps()
        //uglify()
    ]
}
