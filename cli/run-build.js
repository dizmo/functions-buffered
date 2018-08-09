const { arg, install, run } = require('./lib-utils');
const { exit } = require('process');

function run_lint() {
    return arg('lint') ? run('npm', 'run', 'lint') : null;
}
function run_build() {
    return run('npx', 'tsc');
}
function run_babel() {
    return run('npx', 'babel', '--presets=env', '-qsd', 'dist', 'dist');
}

install('./node_modules')
    .then(run_lint).then(run_build).then(run_babel).catch(exit);
