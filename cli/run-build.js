let child_process = require('child_process'),
    fs = require('fs');

let run_script = function () {
    child_process.spawn('npx', [
        'tsc'
    ].concat(process.argv.slice(2)), {
        shell: true, stdio: 'inherit'
    }).on('close', function (code) {
        if (code === 0) {
            child_process.spawn('npx', [
                'babel', 'dist', '-d', 'dist', '--presets=env', '-s'
            ].concat(process.argv.slice(2)), {
                shell: true, stdio: 'inherit'
            });
        }
    });
};

fs.access('./node_modules', function (error) {
    if (error) {
        let Spinner = require('./cli-spinner').Spinner,
            spinner = new Spinner('%s fetching dependencies: .. ');
        let npm_install = child_process.spawn('npm', [
            'install'
        ], {
            shell: true, stdio: 'ignore'
        });
        npm_install.on('close', function () {
            spinner.stop(true);
            run_script();
        });
        spinner.start();
    } else {
        run_script();
    }
});
