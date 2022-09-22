#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const fsPromises = fs.promises;
const stdio = require('json-stdio');

process.on('exit', code => {
    console.log('exiting with code:', code);
});

const folder = path.join(process.env.HOME, 'publications/temp');
const files = fs.readdirSync(folder).map(v => path.resolve(folder + '/' + v));

const openFile = (file) => {
    const c = cp.spawn('sh');
    if(process.stdout.isTTY){
        c.stdin.end(`(open "${file}" &> /dev/null) &> /dev/null &`);
    }
};

if (files.length === 1) {
    if (fs.statSync(files[0]).isFile()) {
        openFile(files[0]);
        process.exit(0);
    } else {
        console.error('folder where file should be?');
        process.exit(1);
    }
}

if (files.length > 500) {
    console.error('too many files, clean this folder up lol');
    process.exit(1);
}

const newest = {file: null, mtime: null};

Promise.all(files.map(f => {
    return fsPromises.stat(f).then(stats => {
        if (!newest.file || (stats.mtime.getTime() > newest.mtime.getTime())) {
            newest.file = f;
            newest.mtime = stats.mtime;
        }
    });
})).then(v => {

    if (!newest.file) {
        console.error('could not find the newest file?!');
        return;
    }

    console.log('newest file path:')
    console.log(newest.file);
    if(!process.stdout.isTTY){
        stdio.log({fp: newest.file});
    } else {
        openFile(newest.file);
    }


});


