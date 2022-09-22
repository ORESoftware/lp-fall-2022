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

    const zeroCountCol = new Map();
    for (let i = 0; i < m; i++) {
        zeroCountCol.set(i, 0);
        matrix.push([]);
        let zeroCountRow = 0;
        for (let j = 0; j < n; j++) {
            const col = zeroCountCol.get(i);
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

console.log(
    generateRandomMatrix(4, 4, 0.5, 8, 9)
)

const findDeterminant = m => {
    return m.length === 1 ?
        m[0][0] : m.length === 2 ? m[0][0] * m[1][1] - m[0][1] * m[1][0] :
            m[0].reduce((r, e, i) =>
            r + (-1) ** (i + 2) * e * findDeterminant(m.slice(1).map(c =>
                c.filter((_, j) => i !== j))), 0)
}


const findMatrixInverse = (m) => {

    const determinant = math.det(m);
    if (determinant === 0) {
        throw new Error('determinant is zero, cannot invert matrix m');
    }


};

