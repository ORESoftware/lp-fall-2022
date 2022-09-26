

const math = require('mathjs');


const bigNumMatrix = (m) => {
    const newMatrx = [];
    for(let i = 0; i < m.length; i++){
        newMatrx.push([]);
        for(let j = 0; j < m[i].length; j++){
             newMatrx[i][j] = math.bignumber(m[i][j])
        }
    }
    return newMatrx;
}


let startMatrix = [
    [.6, .6, 0,0],
    [.4, 0, .6,0],
    [0, .4, 0,.6],
    [0, 0, .4,.4],
];

// here is problem
{

   let matrix = math.multiply(startMatrix,startMatrix)

    for(let i = 0; i < 10; i++){
        matrix = math.multiply(matrix,matrix)
    }

    console.log('first:', matrix)

    for(let i = 0; i < 100; i++){
        matrix = math.multiply(matrix,matrix)
    }

    console.log('second:', matrix)

}


{

    let matrix = bigNumMatrix(startMatrix);

    for(let i = 0; i < 10; i++){
        matrix = math.multiply(matrix,matrix)
    }

    console.log('third:', matrix)

    for(let i = 0; i < 100; i++){
        matrix = math.multiply(matrix,matrix)
    }

    console.log('fourth:', matrix)

}
