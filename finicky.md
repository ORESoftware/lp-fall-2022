
### Alexander Mills, Matt Skiles, Aidan Pimentel

> The following code is for Parts 1, 2 and 3 of Programming assignment 1


```js


const math = require('mathjs');

// m = height, n = width, L lower bound, U upper bound
const generateRandomMatrix = (m, n, density, L, U) => {
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

    for (let i = 0; i < m; i++) {
        matrix.push([]);
        let zeroCountRow = 0;
        for (let j = 0; j < n; j++) {
            const num = Math.random();
            if (num > density && zeroCountRow < n) {
                zeroCountRow++;  // we ensure that we don't fill the whole row with zeros
                matrix[i][j] = 0;
            } else {
                const el = math.round(num * (U - L) + L, 3);
                if (el < L) {
                    throw new Error('element is less than lower bound')
                }
                if (el > U) {
                    throw new Error('element is greater than upper bound')
                }
                matrix[i][j] = el;
            }

        }
    }
    return matrix;
}

const generateAugmentedMatrix = () => {
    const squareMatrix = generateSquareMatrix();
    return [
        [...squareMatrix[0], 5],
        [...squareMatrix[1], 3],
        [...squareMatrix[2], 3]
    ]

}

const combineMatrixWithBVector = (m, b) => {
    for (let i = 0; i < m.length; i++) {
        m[i].push(b[i]);
    }
    return m;
}

const generateTestSquareMatrix = () => {
    return [
        [0, 9, 5],
        [4, 0, 4],
        [0, 0, 1]
    ]

}

const generateTestIdentityMatrix = () => {
    return [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
    ]

}

const findRowToSwap = (i, j, m) => {
    for (; i < m.length; i++) {
        if (m[i][j] !== 0) {
            return i;
        }
    }
    return -1;
}

const swapRows = (m, i, j) => {
    const row = m[i];
    m[i] = m[j];
    m[j] = row;
}

const logFatal = function () {
    console.error.apply(console, arguments);
    process.exit(1);
}

const divideRow = (row, v) => {
    for (let i = 0; i < row.length; i++) {
        row[i] = math.round(row[i] / v, 4);
    }
}

const divideRowImmutable = (row, v) => {
    return row.map(z => math.round(-1 * z * v, 4));
}

const addToRow = (rowToModify, rowToAdd) => {
    for (let i = 0; i < rowToModify.length; i++) {
        rowToModify[i] = math.round(rowToAdd[i] + rowToModify[i], 4);
    }
}

const generateRandomBVector = (n, L, U, density = 0.8) => {
    const ret = [];
    for (let i = 0; i < n; i++) {
        const num = Math.random();
        const val = num > density ? 0 : math.round(num * (U - L) + L, 4);
        ret.push(val);
    }
    return ret;
}

const matrixInversion = (m) => {

    const height = m.length;

    for (let i = 0; i < height; i++) {

        let diagElem = m[i][i];

        if (diagElem === 0) {
            const row = findRowToSwap(i + 1, i, m);
            if (row < 0) {
                logFatal('row could not be found')
            }
            swapRows(m, row, i)
        }

        diagElem = m[i][i];

        if (diagElem !== 1) {
            divideRow(m[i], diagElem);
        }

        diagElem = m[i][i];

        if (diagElem !== 1) {
            logFatal('diagonal is not 1')
        }


        for (let z = 0; z < height; z++) {
            if (z === i) {
                continue;
            }
            const row = m[z];
            if (row[i] === 0) {
                continue;
            }

            const multipliedRow = divideRowImmutable(m[i], row[i])
            addToRow(row, multipliedRow);
        }

    }


    return m;

}


// Here we generate a random 10x10 matrix
const combined = combineMatrixWithBVector (
    generateRandomMatrix(10, 10, .6, -10, 30),
    generateRandomBVector(10, 0, 50, .8),
);

// The augmented matrix includes the b vector
console.log('Augmented matrix:', combined);


// We run gaussian elimination, to find the x vector
console.log(
    matrixInversion(
        combined
    )
);



```


## Example augmented 5x5 matrix as input: 

```
[
    [ 0, 0, 0, 0, 12.458, 39.0199 ],
    [ 0, 0, 0, 13.728, 0, 4.757 ],
    [ 13.432, 0, 10.023, 12.924, 0, 10.2857 ],
    [ 12.129, 0, 0, 11.737, 0, 0 ],
    [ 0, 11.92, 0, 0, 0, 38.6682 ]
]

```

## Example 5x5 output/solution:

```
[
    [ 1, 0, 0, 0, 0, -0.3353 ],
    [ 0, 1, 0, 0, 0, 3.244 ],
    [ 0, 0, 1, 0, 0, 1.0288 ],
    [ 0, 0, 0, 1, 0, 0.3465 ],
    [ 0, 0, 0, 0, 1, 3.1321 ]
]
```


## For a <b>10x10</b> matrix, here is the augmented matrix:

```

[
    [
        4.123,
        -8.724,
        6.113,
        -3.081,
        -5.11,
        0,
        0,
        0,
        0.135,
        0,
        0
    ],
    [
        -4.896,
        4.996,
        -6.678,
        0,
        0,
        2.63,
        -8.459,
        -9.647,
        -5.318,
        0,
        21.2811
    ],
    [
        -6.828,
        0,
        0,
        -1.283,
        10.59,
        0,
        11.694,
        3.097,
        -1.592,
        -5.038,
        16.3182
    ],
    [
        1,
        -8.874,
        8.097,
        -5.683,
        -1.001,
        0,
        5.574,
        0,
        0,
        -4.284,
        4.9073
    ],
    [
        -8.969,
        4.43,
        0,
        -3.401,
        13.76,
        -0.06,
        0,
        0,
        -7.047,
        0,
        23.4762
    ],
    [
        0,
        0,
        0,
        0,
        7.298,
        0,
        -1.61,
        0,
        12.989,
        3.293,
        3.8987
    ],
    [
        3.05,
        2.765,
        1.252,
        -5.488,
        6.359,
        0,
        10.924,
        0.841,
        9.956,
        0,
        18.5684
    ],
    [
        -4.546,
        4.717,
        0,
        0,
        -8.161,
        0.13,
        4.202,
        -6.294,
        0,
        -2.114,
        38.268
    ],
    [
        -8.086,
        1.945,
        2.862,
        0,
        0,
        2.056,
        0,
        3.089,
        12.972,
        12.338,
        33.5214
    ],
    [
        0,
        0,
        -4.579,
        0,
        0,
        -7.779,
        11.149,
        -6.185,
        -2.48,
        9.434,
        16.1032
    ]
]


```

## And here is the solution:

```
[
    [
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        5.0961
    ],
    [
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        3.9123
    ],
    [
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        14.588
    ],
    [
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        15.0982
    ],
    [
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        5.6791
    ],
    [
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        16.2589
    ],
    [
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        6.1735
    ],
    [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        -11.8082
    ],
    [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        -3.6929
    ],
    [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        6.1844
    ]
]
```