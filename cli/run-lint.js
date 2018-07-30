let ps = require('child_process'),
    fs = require('fs');

function npm_install(flag) {
    if (flag) {
        ps.spawn('npm', ['install'], {
            shell: true, stdio: 'inherit'
        }).on('exit', function (code) {
            npx_tslint(code);
        });
    } else {
        npx_tslint(0);
    }
}

function npx_tslint(code) {
    if (code === 0) {
        ps.spawn('npx', [
            'tslint', '--config', 'tslint.json', "'lib/**/*.ts'"
        ].concat(process.argv.slice(2)), {
            shell: true, stdio: 'inherit'
        }).on('exit', function (code) {
            process.exit(code);
        });
    } else {
        process.exit(code);
    }
}

fs.access('./node_modules', npm_install);
