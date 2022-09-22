### Alexander Mills, Matt Skiles, Aidan Pimental

The following code is for Parts 1, 2 and 3 of Programming assignment 1

``` js


/*
Assignment #1. Matrix Generation and Solving Simultaneous Equations; Due Tuesday, September 13

Part 1.  Write a random matrix generator for an n  m matrix A = (aij) that has a prespecified density.
    Input should include n, m, a general lower bound (L) for each element, an upper bound (U) for each
    element (that is, L  aij  U), and density factor  where 0 <   1.  Note that if  = 0.4, this means that
there is a 0.4 probability that any element aij will not be zero or that on average, 4 out of 10 elements will
be nonzero.  For each element in the A matrix, you can first sample from a continuous uniform
distribution between 0 and 1 to determine whether or not the element should be set to zero.  If the result
indicates that it should be nonzero, you should draw a second random number between 0 and 1 and then
scale it between L and U.  (Can you think of a more efficient way of doing this?)  Finally, provide a
subroutine that checks to see if any row or column has all zeroes.  If so, discard the matrix and start again.

    Part 2.  Write a program to solve an m  m system of simultaneous equations (Bx = b).  Use a Gauss-
Jordan approach to finding the inverse of a nonsingular square matrix (e.g., see page 49 in Bazaraa et al.
(1990) or the algorithm in Murty (1983) on page 104, §3.3.2, that finds B–1).  Test you program by using
the code that you developed in Part 1 to generate a 10  10 random matrix with  = 0.6, L = –10, and U =

    - 3 -
    30.  The right-hand-side vector b should have a density of 0.8, and each component bi should be
randomly distributed between 0 and 50.  Provide results for one sample problem. Determine the
computational complexity of your matrix inversion routine; that is, determine the order of magnitude of
the number of arithmetic and logic operations required to find a solution as a function of m. A logic
operation might be evaluating whether a number is zero, positive, or negative, for example. Note that the
actual number of operations depends on the density of the matrix, so when performing this type analysis,
    assume the worst case – the matrix is completely dense.  The complexity is written O(f(m)), where f(m) is
an algebraic function of m such as m4 or mlog2m.
*/

const math = require('mathjs');

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

const generateSquareMatrix = () => {
    return [
        [0, 9, 5],
        [4, 0, 4],
        [0, 0, 1]
    ]

}

const generateIdentityMatrix = () => {
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


const combined = combineMatrixWithBVector (
    generateRandomMatrix(5, 5, .3, 10, 30),
    generateRandomBVector(5, 0, 50, .8),
);

console.log('Augmented matrix:', combined);

console.log(
    matrixInversion(
        combined
    )
);


/*

Example augmented matrix: [
  [ 0, 0, 0, 0, 12.458, 39.0199 ],
  [ 0, 0, 0, 13.728, 0, 4.757 ],
  [ 13.432, 0, 10.023, 12.924, 0, 10.2857 ],
  [ 12.129, 0, 0, 11.737, 0, 0 ],
  [ 0, 11.92, 0, 0, 0, 38.6682 ]
]

Solution:
[
  [ 1, 0, 0, 0, 0, -0.3353 ],
  [ 0, 1, 0, 0, 0, 3.244 ],
  [ 0, 0, 1, 0, 0, 1.0288 ],
  [ 0, 0, 0, 1, 0, 0.3465 ],
  [ 0, 0, 0, 0, 1, 3.1321 ]
]

 */


```
