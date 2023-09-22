function Calculator() {
    this['+'] = (a, b) => a + b;
    this['-'] = (a, b) => a - b;
    this['*'] = (a, b) => a * b;
    this['÷'] = (a, b) => a / b;
    this['^'] = (a, b) => a ** b;

    this.calculate = (a, b, op) => {
        const mathOperationResult = this[op](parseFloat(a), parseFloat(b));
        let aDecimals = 0;
        let bDecimals = 0;

        if (a.toString().includes('.')) aDecimals = a.split('').slice(a.split('').indexOf('.') + 1).length;
        if (b.toString().includes('.')) bDecimals = b.split('').slice(b.split('').indexOf('.') + 1).length;


        if (aDecimals > bDecimals) {
            return mathOperationResult.toFixed(aDecimals);
        } else {
            return mathOperationResult.toFixed(bDecimals);
        }
    }
}

const calc = new Calculator();

let a = null;
let b = null;
let op = null;
let result = null;

function getNumber() {
    const number = this.getAttribute('data-number');
    if (!op) {
        if (a === null) { 
            result = null;
            a = parseFloat(number);
            updateScreen(a, ' ');
        } else if (a !== null ) {
            // && a.toString().length < 15
            a += number;

            if (a.includes('.')) {
                a = parseFloat(a).toFixed(a.split('').slice(a.split('').indexOf('.')).length - 1);
            } else {
                a = parseFloat(a);
            }

            updateScreen(a, null);
        }
    } else if (op) {
        if (b === null) {
            b = parseFloat(number);
            updateScreen(b, null);
        } else if (b !== null) {
            b += number;

            if (b.includes('.')) {
                b = parseFloat(b).toFixed(b.split('').slice(b.split('').indexOf('.')).length - 1);
            } else {
                b = parseFloat(b);
            }

            updateScreen(b, null);
        }
    }

    console.log(a.toString().length);

    console.log('---------getNumber---------')
    console.log("a: ", a);
    console.log("b: ", b); 
    console.log('op: ', op);
    console.log('result: ', result);
}

function setOperator(e) {
     if (op && (b !== null)) { 
        doFunc(e);
        a = result;
        result = null;
    } else if (result !== null) { 
        a = result;
        result = null;
    } 

    if (a !== null) {
        op = this.getAttribute('data-operator');
        updateScreen(' ', `${a} ${op}`);
    }
    
    console.log('--------setOperator----------')
    console.log("a: ", a);
    console.log("b: ", b); 
    console.log('op: ', op);
    console.log('result: ', result);
}

function doFunc(e) {
    const funcButton = e.target.getAttribute('data-func');
    const isOpPressedTwice = e.target.hasAttribute('data-operator');

    if ((funcButton == '=' || isOpPressedTwice) && (b !== null)) {
        result = calc.calculate(a, b, op);
        updateScreen(result, `${a} ${op} ${b} =`);
        a = null;
        b = null;
        op = null;
    }

    if (funcButton == 'reset') {
        a = null;
        b = null;
        op = null;
        result = null;
        updateScreen(' ', ' ');
    } 

    if (funcButton == 'del') {
        if (a !== null) {
            if (a.toString().length == 1) {
                a = null;
                updateScreen(' ', null);

            } else if (!op) {
                if (a && a.toString().length === 2 && a.toString().split('')[0] === '-') {
                    a = null;
                } else {
                    a = parseFloat(a.toString().split('').slice(0, a.toString().length - 1).join(''));
                }
                updateScreen(a, null);
            }
        }

        if (b !== null) {
            if (b.toString().length == 1) {
                b = null;
                updateScreen(' ', null);

            } else if (op) {
                b = parseFloat(b.toString().split('').slice(0, b.toString().length - 1).join(''));
                updateScreen(b, null);   
            } 
        }
    }

    if (funcButton == '.') {
        if (!op) {
            if (a !== null && !a.toString().includes('.')) {
                a = a.toString().split('').concat('.').join('');
                updateScreen(a, null);
           
            } else if (a === null) {
                a = '0.';
                updateScreen(a, null);
            }
        }
        
        if (op) {
            if (b !== null && !b.toString().includes('.')) {
                b = b.toString().split('').concat('.').join('');
                updateScreen(b, null);

            } else if (b === null) {
                b = '0.';
                updateScreen(b, null);
            }
        }
    }

    if (funcButton == '+/-') {
        if (!op) {
            if (a && a.toString().split('')[0] === '-') {
                a = ['+'].concat(a.toString().split('').slice(1)).join('');
            } else if (a && a.toString().split('')[0] === '+') {
                a = ['-'].concat(a.toString().split('').slice(1)).join('');
            } else if (a) {
                a = ['-'].concat(a.toString().split('').slice(0)).join('');
            }
            if (a) {
                a = parseFloat(a);
                updateScreen(a, null);
            }
        }
        if (op) {
            if (b && b.toString().split('')[0] === '-') {
                b = ['+'].concat(b.toString().split('').slice(1)).join('');
            } else if (b && b.toString().split('')[0] === '+') {
                b = ['-'].concat(b.toString().split('').slice(1)).join('');
            } else if (b) {
                b = ['-'].concat(b.toString().split('').slice(0)).join('');
            }
            if (b) {
                b = parseFloat(b);
                updateScreen(b, null);
            }
        }
 
    }

    console.log('--------doFunc----------')
    console.log("a: ", a);
    console.log("b: ", b); 
    console.log('op: ', op);
    console.log('result: ', result);
}

function updateScreen(primaryScreenText, secondaryScreenText) {
    // console.clear();
    console.log(
    '---updateScreen---',
    '\narg1:',primaryScreenText, 
    '\narg2:', secondaryScreenText);

    if (secondaryScreenText === null) {
        primaryScreen.textContent = primaryScreenText;
        console.log('Primary screen updated')
    }
    if (primaryScreenText === null) {
        secondaryScreen.textContent = secondaryScreenText;
        console.log('Secondary screen updated')
    }

    if ((secondaryScreenText !== null) && (primaryScreenText !== null)) {
        primaryScreen.textContent = primaryScreenText;
        secondaryScreen.textContent = secondaryScreenText;
        console.log('Both screens updated');
    }

    console.log(
    'Primary screen textContent:', primaryScreen.textContent, 
    '\nSecondary screen textContent:', secondaryScreen.textContent);
}


const numberBtns = document.querySelectorAll('button[data-number]');
const operatorBtns = document.querySelectorAll('button[data-operator]');
const funcBtns = document.querySelectorAll('button[data-func]');
const primaryScreen = document.querySelector('.screen div.primary');
const secondaryScreen = document.querySelector('.screen div.secondary');

numberBtns.forEach(btn => {
    btn.addEventListener("click", getNumber);
    });


operatorBtns.forEach(btn => {
    btn.addEventListener("click", setOperator);
    });


funcBtns.forEach(btn => {
    btn.addEventListener("click", doFunc);
    });

