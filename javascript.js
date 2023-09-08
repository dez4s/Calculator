function Calculator() {
    this['+'] = (a, b) => a + b;
    this['-'] = (a, b) => a - b;
    this['*'] = (a, b) => a * b;
    this['÷'] = (a, b) => a / b;

    this.calculate = (a, b, op) => {
        return this[op](a, b);
    }
}

const calc = new Calculator();

let a = null;
let b = null;
let op = null;
let result;

function getNumber() {
    if (!op) {
        if (!a) { // if `a` will be equal to 0 (number type not string), the equality test will return true and it will overwrite the 0 value assigned to `a`. Alternative 'if (a === null)' =>  The equality test returns true only if `a` is null and only then it will assign a new value to `a`, not if `a` is equal to 0. Both methods work and it depends on the type of behavior is wanted for the calculator to have.
            result = null;
            a = this.getAttribute('data-number');
            primaryScreen.textContent = a;
            secondaryScreen.textContent = '';
        } else {
            a += this.getAttribute('data-number');
            primaryScreen.textContent = a;
        }
    } else if (op) {
        if (b === null) {
            b = this.getAttribute('data-number');
            primaryScreen.textContent = b;
        } else {
            b += this.getAttribute('data-number');
            primaryScreen.textContent = b;
        }
    }

    console.log('---------getNumber---------')
    console.log("a: " + a);
    console.log("b: " + b); 
    console.log('op: ' + op);
    console.log('result: ' + result);
}

function setOperator(e) {
     if (op && (b)) { 
        doFunc(e);
        a = result;
        result = null;
    } else if (result) { // the equality test returns false if `result` will be equal to 0 (number type not string). For example, if the return to the calculate method is not transformed to a string, and is equal to 0 number type. Alternative: `if (result !== null)`, will work with `result = 0`. Same logic applies to `a` and `b`. Both methods work and it depends on the type of behavior is wanted for the calculator to have.
        a = result;
        result = null;
    } 

    if (a) {
        op = this.getAttribute('data-operator');
        secondaryScreen.textContent = a + " " + op + " ";
        primaryScreen.textContent = b;
    }
    
    console.log('--------setOperator----------')
    console.log("a: " + a);
    console.log("b: " + b); 
    console.log('op: ' + op);
    console.log('result: ' + result);
}

function doFunc(e) {
    
    const funcButton = e.target.getAttribute('data-func');
    const isOpPressedTwice = e.target.hasAttribute('data-operator');
    if ((funcButton == '=' || isOpPressedTwice) && (b !== null)) {
        result = calc.calculate(Number(a), Number(b), op).toString();
        primaryScreen.textContent = result;
        secondaryScreen.textContent += b + ' =';
        a = null;
        b = null;
        op = null;
    }

    if (funcButton == 'reset') {
        a = null;
        b = null;
        op = null;
        result = null;
        primaryScreen.textContent = '';
        secondaryScreen.textContent = '';
    }

    if (funcButton == 'del') {
        if (a && !op) {
            a = a.split('').slice(0, a.length - 1).join('');
            primaryScreen.textContent = a;
            if (a.length == 0) {
                a = null;
                primaryScreen.textContent = '';
            }
        } else if (op && b) {
            b = b.split('').slice(0, b.length - 1).join('');
            primaryScreen.textContent = b;
            if (b.length == 0) {
                b = null;
                primaryScreen.textContent = '';
            }
        } 
        //   else if (result) {
        //     result = result.split('').slice(0, result.length - 1).join('');
        //     primaryScreen.textContent = result;
        //     if (result.length == 0) {
        //         result = null;
        //         primaryScreen.textContent = 0;
        //     }
        // }
    }

    console.log('--------doFunc----------')
    console.log("a: " + a, );
    console.log("b: " + b); 
    console.log('op: ' + op);
    console.log('result: ' + result);
}

function updateScreen(primaryScreenText, secondaryScreenText) {
    primaryScreen.textContent = primaryScreenText;
    secondaryScreen = secondaryScreenText;
}


const numberBtns = document.querySelectorAll('button[data-number]');
const operatorBtns = document.querySelectorAll('button[data-operator]');
const funcBtns = document.querySelectorAll('button[data-func]');
const primaryScreen = document.querySelector('.screen .primary');
const secondaryScreen = document.querySelector('.screen .secondary');

numberBtns.forEach(btn => {
    btn.addEventListener("click", getNumber);
    });


operatorBtns.forEach(btn => {
    btn.addEventListener("click", setOperator);
    });


funcBtns.forEach(btn => {
    btn.addEventListener("click", doFunc);
    });