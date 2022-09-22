

const {generateRandomMatrix} = require("./generate-matrix");
const fs = require('fs');

fs.createWriteStream('./10x10-matrix.json').end(
    JSON.stringify(generateRandomMatrix(
        10,10,.7,-5,15
    ))
);

