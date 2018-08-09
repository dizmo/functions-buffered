const { access } = require('fs');
const { promisify } = require('util');
const { spawn } = require('child_process');

function arg(key, lhs, rhs) {
    const y = require('yargs')
        .default('build', true)
        .default('cover', false)
        .default('lint', true);
    return y.argv[key]
        ? lhs !== undefined ? lhs : y.argv[key] : rhs;
}
function install(path) {
    return promisify(access)(path)
        .catch(() => run('npm', 'install'));
}
function run(cmd, ...args) {
    return new Promise((res, rej) => spawn(cmd, args, {
        shell: true, stdio: 'inherit'
    }).on('exit', (code) =>
        code === 0 ? res(code) : rej(code)
    ));
}

module.exports = {
    arg: arg, install: install, run: run
};
