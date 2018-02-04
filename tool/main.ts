import * as ts  from 'typescript';
import * as tsc from '@angular/tsc-wrapped';
import * as cp  from '@angular/compiler';
import * as cli from '@angular/compiler-cli';


function codegen(
    ngOptions: tsc.AngularCompilerOptions,
    cliOptions: tsc.NgcCliOptions,
    program: ts.Program,
    host: ts.CompilerHost
) {
    if (ngOptions.enableSummariesForJit === undefined)
        ngOptions.enableSummariesForJit = false;
    return cli.CodeGenerator.create(ngOptions, cliOptions, program, host).codegen();
}


const consoleError = console.error;
const project = 'tsconfig.ngcAsES2015.json';
const cliOptions = new tsc.NgcCliOptions({});

tsc.main(project, cliOptions, codegen)
.then(() => 0)
.catch(e => {
    if (e instanceof tsc.UserError || cp.isSyntaxError(e)) {
        consoleError(e.message);
        return Promise.resolve(1);
    } else {
        consoleError(e.stack);
        consoleError('Compilation failed');
        return Promise.resolve(1);
    }
});
