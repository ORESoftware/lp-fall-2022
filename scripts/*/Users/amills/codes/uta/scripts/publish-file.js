#!/usr/bin/env node


const stdio = require('json-stdio');
const cp = require('child_process');
const fs = require('fs');
const path = require('path');

const parser = stdio.createParser();
const stdEventName = stdio.stdEventName;  // '@json-stdio-event'

const finalFolder = path.resolve(process.env.HOME + '/publications/final');

const timer = setTimeout(() => {
    console.error('timed out after 2 seconds.')
    process.exit(1);
}, 2000);


process.stdin.pipe(parser).on(stdEventName, obj => {

    if(!obj.fp){
        console.error('missing "fp" field:', obj)
        return;
    }

    if(!(typeof obj.fp === 'string')){
        console.error('missing "fp" field (not a string):', obj)
        return;
    }


    const baseName = path.basename(obj.fp);
    const newBaseName = baseName.startsWith('temp-') ? baseName.slice(5) : baseName;
    const finalPath = path.resolve(finalFolder + '/' + newBaseName);

    fs.rename(obj.fp, finalPath, (err,v) => {
        clearTimeout(timer);
        if(err){
            console.error(err);
        } else {
            console.log(finalPath);
        }
    });

});