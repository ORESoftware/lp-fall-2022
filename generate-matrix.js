'use strict';

const math = require('mathjs');

const generateRandomMatrix = function (m, n, density, L, U) {

    const args = [...arguments]; // copy args in case we need call func recursively

    if (m < 1) {
        throw new Error('height of matrix has to be greater than zero')
    }
    if (n < 1) {
        throw new Error('width of matrix has to be greater than zero')
    }
    if (U < L) {
        throw new Error('Upper bound must be greater than or equal to lower bound')
    }
    if (density <= 0 || density >= 1) {
        throw new Error('density must be greater than 0 and less than 1.')
    }
    const matrix = [];

    const zeroCountCol = new Map();
    for (let i = 0; i < m; i++) {
        matrix.push([]);
        let zeroCountRow = 0;
        for (let j = 0; j < n; j++) {
            const col = zeroCountCol.has(j) ? zeroCountCol.get(j) : (zeroCountCol.set(j, 0), 0);
            const num = Math.random();
            if (num > density && zeroCountRow < n && col < m) {
                zeroCountCol.set(j, col + 1);
                zeroCountRow++;  // we ensure that we don't fill the whole row with zeros
                matrix[i][j] = 0;
                continue;
            }
            const el = math.round(num * (U - L) + L, 5);
            if (el < L) {
                throw new Error('element is less than lower bound')
            }
            if (el > U) {
                throw new Error('element is greater than upper bound')
            }
            matrix[i][j] = el;
        }
    }

    if (math.det(matrix) === 0) {
        // if determinant is 0 we cannot take inverse of matrix, so try again
        return generateRandomMatrix(...args);
    }

    return matrix;
}

exports.generateRandomMatrix = generateRandomMatrix;