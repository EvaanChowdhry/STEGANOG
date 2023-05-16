const path = require('path');

async function main() {
    const fullpath = path.join(__dirname);
    const {PythonShell} = require('python-shell');
    PythonShell.run(fullpath + '/python/zip.py', null, function (err) {
        if (err) throw err;
    }
    );
}

module.exports = main;