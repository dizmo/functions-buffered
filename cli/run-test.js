let ps = require('child_process'),
    fs = require('fs');

function argv(key, value) {
    let argv = require('yargs')
        .default('build', true)
        .default('cover', false)
        .argv;
    if (argv[key] !== undefined) {
        return argv[key];
    } else {
        return value;
    }
}

function npm_install(flag) {
    if (flag) {
        ps.spawn('npm', ['install'], {
            shell: true, stdio: 'inherit'
        }).on('exit', function (code) {
            npm_build(code);
        });
    } else {
        npm_build(0);
    }
}

function npm_build(code) {
    if (code === 0 && argv('build') === true) {
        ps.spawn('npm', [
            'run-script', '--', 'build'
        ], {
            shell: true, stdio: 'inherit'
        }).on('exit', function (code) {
            npx_mocha(code);
        });
    } else {
        npx_mocha(code);
    }
}

function npx_mocha(code) {
    if (code === 0) {
        ps.spawn('npx', [
            argv('cover') ? 'nyc' : '', 'mocha', 'dist/test'
        ], {
            shell: true, stdio: 'inherit'
        }).on('exit', function (code) {
            process.exit(code);
        });
    } else {
        process.exit(code);
    }
}

fs.access('./node_modules', npm_install);
