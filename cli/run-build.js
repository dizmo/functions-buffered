let ps = require('child_process'),
    fs = require('fs');

function argv(key, value) {
    let argv = require('yargs')
        .default('lint', true)
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
            npm_lint(code);
        });
    } else {
        npm_lint(0);
    }
}

function npm_lint(code) {
    if (code === 0 && argv('lint') === true) {
        ps.spawn('npm', [
            'run-script', '--', 'lint'
        ], {
            shell: true, stdio: 'inherit'
        }).on('exit', function (code) {
            npx_tsc(code);
        });
    } else {
        npx_tsc(code);
    }
}

function npx_tsc(code) {
    if (code === 0) {
        ps.spawn('npx', [
            'tsc'
        ], {
            shell: true, stdio: 'inherit'
        }).on('exit', function (code) {
            npx_babel(code);
        });
    } else {
        npx_babel(code);
    }
};

function npx_babel(code) {
    if (code === 0) {
        ps.spawn('npx', [
            'babel', 'dist', '-d', 'dist', '--presets=env', '-s'
        ], {
            shell: true, stdio: 'inherit'
        }).on('exit', function (code) {
            process.exit(code);
        });
    } else {
        process.exit(code);
    }
};

fs.access('./node_modules', npm_install);
