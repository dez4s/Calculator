function Calculator() {
    this['+'] = (a, b) => a + b;
    this['-'] = (a, b) => a - b;
    this['*'] = (a, b) => a * b;
    this['/'] = (a, b) => a / b;

    this.calculate = (a, b, op) => {
        return this[op](a, b);
    }
}

let a = null;
let b = null;
let op = null;
let result;


const calc = new Calculator();

// console.log(calc.calculate(a, b, op));

function getNumber() {
    if (!op) {
        if (!a) {
            result = null;
            a = this.getAttribute('data-number');
            screen.textContent = a;
        } else {
            a += this.getAttribute('data-number');
            screen.textContent = a;
        }
    } else if (op) {
        if (!b) {
            b = this.getAttribute('data-number');
            screen.textContent = b;
        } else {
            b += this.getAttribute('data-number');
            screen.textContent = b;
        }
    }

    console.log('---------getNumber---------')
    console.log("a: " + a);
    console.log("b: " + b); 
    console.log('op: ' + op);
    console.log('result: ' + result);
}

function setOperator(e) {
     if (op && b) {
        doFunc(e);
        a = result;
        result = null;
        // op = this.getAttribute('data-operator');
        // secondaryScreen.textContent = a + op;
    } else if (result) {
        a = result;
        result = null;
        // op = this.getAttribute('data-operator');
        // secondaryScreen.textContent = a + op;
    } 
    //     else if (!op && a) {
    //     op = this.getAttribute('data-operator');
    //     secondaryScreen.textContent = a + op;
    // }
    if (a) {
        op = this.getAttribute('data-operator');
        secondaryScreen.textContent = a + op;
    }
    
    console.log('--------setOperator----------')
    console.log("a: " + a);
    console.log("b: " + b); 
    console.log('op: ' + op);
    console.log('result: ' + result);
}

function doFunc(e) {
    const funcButton = e.target.getAttribute('data-func');
    // const opButton = e.target.getAttribute('data-operator');
    // console.log(funcButton, opButton);

    if ((funcButton == '=' || op) && b) {
        result = calc.calculate(Number(a), Number(b), op);
        screen.textContent = result;
        // secondaryScreen.textContent = result + op;
        secondaryScreen.textContent += b + '=';
        a = null;
        b = null;
        op = null;
    }

    console.log('--------doFunc----------')
    console.log("a: " + a, );
    console.log("b: " + b); 
    console.log('op: ' + op);
    console.log('result: ' + result);
}

const screen = document.querySelector('.screen .primary');
const secondaryScreen = document.querySelector('.screen .secondary');


const numberBtns = document.querySelectorAll('button[data-number]');
numberBtns.forEach(btn => {
    btn.addEventListener("click", getNumber);
    });

const operatorBtns = document.querySelectorAll('button[data-operator]');
operatorBtns.forEach(btn => {
    btn.addEventListener("click", setOperator);
    });

const funcBtns = document.querySelectorAll('button[data-func]');
funcBtns.forEach(btn => {
    btn.addEventListener("click", doFunc);
    });