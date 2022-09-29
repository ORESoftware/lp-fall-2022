const math = require("mathjs");


const chainPi = (list) => {
    return list.reduce((a, b) => math.bignumber(a) * math.bignumber(b), 1)
}

const chainSigma = (list) => {
    return list.reduce((a, b) => math.bignumber(a) + math.bignumber(b), 0)
}

Number.prototype.map = function (f){
    const ret = []
    for(let i = 0; i <= this; i++){
        ret.push(f(i))
    }
    return ret;
}

const binomial = (n, p) => {
    return {
        atLeastK(k){
            return [].fill()
        },
        atLeast(k){
            let p = 0;
            for(let j = 0; j <= k; j++){
                p = p + this.evaluate(j)
            }
            return p;
        },
        evaluate(k) {
            return chainPi([
                math.combinations(n, k),
                math.pow(p, k),
                math.pow(1 - p, n - k)
            ]);
        }
    }
}

console.log(
    binomial(5,.5).evaluate(3),
    binomial(5,.5).atLeast(5)
)

process.exit(0)