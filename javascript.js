function Calculator() {
    this['+'] = (a, b) => a + b;
    this['-'] = (a, b) => a - b;
    this['*'] = (a, b) => a * b;
    this['/'] = (a, b) => a / b;

    this.calculate = (a, b, op) => {
        return this[op](a, b);
    }
}

let a = 5;
let b = 3;
let op = '*';

const calc = new Calculator();

console.log(calc.calculate(a, b, op));

