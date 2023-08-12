#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const prompt = require('prompt-sync')({sigint: true});
const fetch = require('node-fetch');
const isImageURL = require('image-url-validator').default;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function base() {
    if (!fs.existsSync(path.join(__dirname, 'python/base/base.jpg')) || !fs.existsSync(path.join(__dirname, 'python/base/'))) {    
        let URL = prompt('Enter image URL (REQUIRED): ');
       
        if (!URL || URL.trim() === '') {
            print('Please enter a valid URL');
            return;
        }
        if (!isImageURL(URL)) {
            print('Please enter a valid URL');
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
sleep(1000);

const fullpath = path.join(__dirname);

let text = process.argv.slice(2).join(' ');

if (!text || text.trim() === '') {
    text = prompt('Enter text: ');
}

fs.writeFile(fullpath + '/python/text.txt', text, (err) => { if (err) throw err;});

const zip = require('./zip.js');
zip();


console.log("Successfully saved in " + fullpath.replace("bin", ""));

const { exec } = require('child_process');
exec('start "" "' + fullpath.replace("bin", "") + '"');
