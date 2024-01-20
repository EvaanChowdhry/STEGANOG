#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const prompt = require('prompt-sync')({sigint: true});
const fetch = require('node-fetch');
const isImageURL = require('image-url-validator').default;
const fullpath = path.join(__dirname);
fs.writeFile(fullpath + '/dir.txt', "", (err) => { if (err) throw err;});


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function base() {
    if (!fs.existsSync(path.join(__dirname, 'python/base/base.jpg')) || !fs.existsSync(path.join(__dirname, 'python/base/'))) {    
        let URL = prompt('Enter image URL (REQUIRED): ');
       
        if (!URL || URL.trim() === '') {
            print('Please enter a valid URL.');
            return;
        }
        if (!isImageURL(URL)) {
            print('Please enter a valid URL.');
            return;
        }
    
        const response = await fetch(URL);

        const blob = await response.blob();

        const arrayBuffer = await blob.arrayBuffer();

        const buffer = Buffer.from(arrayBuffer);

        if (!fs.existsSync(path.join(__dirname, 'python/base/'))){
            fs.mkdir(fullpath + '/python/base/', { recursive: true }, (err) => { if (err) throw err;});
        }

        fs.writeFile(fullpath + '/python/base/base.jpg', buffer, (err) => { if (err) throw err;});
    } else {
        let URL = prompt('Enter image URL (OPTIONAL): ');
   
        if (!URL || URL.trim() === '') {
            return;
        }
        if (!isImageURL(URL)) {
            print('Please enter a valid URL.');
            return;
        }
        
        const response = await fetch(URL);

        const blob = await response.blob();

        const arrayBuffer = await blob.arrayBuffer();

        const buffer = Buffer.from(arrayBuffer);

        await fs.writeFile(fullpath + '/python/base/base.jpg', buffer, (err) => { if (err) throw err;});
    }
}

base();
const item = prompt('Choose a task: 1. Hide text in file.  2. Enter directory of the file to hide: ')
sleep(1000);

let dir = ""


if (item == 1) {
    text = prompt('Enter text: ');
    fs.writeFile(fullpath + '/python/text.txt', text, (err) => { if (err) throw err;});
    dir = `"${fullpath}` + '/python/text.txt"';
} else if (item == 2) {
    dir = prompt("Enter directory: ");
    dirham = dir.replace(/['"]+/g, '');
    dir = dir.trim();

    if (!fs.existsSync(dirham)) {
        console.log("Directory does not exist.");
        return;
    }
    fs.writeFile(fullpath + '/dir.txt', dir, (err) => { if (err) throw err;});
} else {
    console.log("Invalid input.");
    return;
}

const zip = require('./zip.js');
zip(dir);


console.log("Successfully saved in " + fullpath.replace("bin", ""));

const { exec } = require('child_process');
exec('start "" "' + fullpath.replace("bin", "") + '"');
