function Calculator() {
    this['+'] = (a, b) => a + b;
    this['-'] = (a, b) => a - b;
    this['*'] = (a, b) => a * b;
    this['/'] = (a, b) => a / b;

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
        if (!a) {
            result = null;
            a = this.getAttribute('data-number');
            primaryScreen.textContent = a;
        } else {
            a += this.getAttribute('data-number');
            primaryScreen.textContent = a;
        }
    } else if (op) {
        if (!b) {
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
     if (op && b) {
        doFunc(e);
        a = result;
        result = null;
    } else if (result) {
        a = result;
        result = null;
    } 

    if (a) {
        op = this.getAttribute('data-operator');
        secondaryScreen.textContent = a + " " + op + " ";
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
    if ((funcButton == '=' || isOpPressedTwice) && b) {
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
        primaryScreen.textContent = '0';
        secondaryScreen.textContent = '';
    }

    if (funcButton == 'del') {
        if (!op && !result) {
            a = a.split('').slice(0, a.length - 1).join('');
            primaryScreen.textContent = a;
            if (a.length == 0) {
                a = null;
                primaryScreen.textContent = 0;
            }
        } else if (op && b) {
            b = b.split('').slice(0, b.length - 1).join('');
            primaryScreen.textContent = b;
            if (b.length == 0) {
                b = null;
                primaryScreen.textContent = 0;
            }
        } else if (result) {
            result = result.split('').slice(0, result.length - 1).join('');
            primaryScreen.textContent = result;
            if (result.length == 0) {
                result = null;
                primaryScreen.textContent = 0;
            }
        }
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

const primaryScreen = document.querySelector('.screen .primary');
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