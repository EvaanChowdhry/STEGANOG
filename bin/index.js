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
        let url = prompt('Enter image url (REQUIRED): ');
       
        if (!url || url.trim() === '') {
            print('Please enter a valid url');
            return;
        }
        if (!isImageURL(url)) {
            print('Please enter a valid url');
            return;
        }
    
        const response = await fetch(url);

        const blob = await response.blob();

        const arrayBuffer = await blob.arrayBuffer();

        const buffer = Buffer.from(arrayBuffer);

        if (!fs.existsSync(path.join(__dirname, 'python/base/'))){
            fs.mkdir(fullpath + '/python/base/', { recursive: true }, (err) => { if (err) throw err;});
        }

        fs.writeFile(fullpath + '/python/base/base.jpg', buffer, (err) => { if (err) throw err;});
    } else {
        let url = prompt('Enter image url (OPTIONAL): ');
   
        if (!url || url.trim() === '') {
            return;
        }
        if (!isImageURL(url)) {
            print('Please enter a valid url');
            return;
        }
        
        const response = await fetch(url);

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