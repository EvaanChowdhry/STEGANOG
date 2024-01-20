const path = require('path');

async function main(directory) {
    const fullpath = path.join(__dirname);
    const exec = require('child_process').exec;
    command = "python \"" + fullpath + "/python/zip.py\" " + directory;
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }

        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
    }  
    );
}

module.exports = main;