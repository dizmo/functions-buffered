const { install, run } = require('./lib-utils');
const { exit } = require('process');

function run_lint() {
    const lint = (...args) => [
        'tslint', '--config', 'tslint.json'
    ].concat(
        args, process.argv.slice(2) // e.g. `--fix`!
    );
    return Promise.all([
        run('npx', ...lint('"lib/**/*.ts"')),
        run('npx', ...lint('"test/**/*.ts"'))
    ]);
}

install('./node_modules')
    .then(run_lint).catch(exit);
