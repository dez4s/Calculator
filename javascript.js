function Calculator() {
    this.a = null;
    this.b = null;
    this.op = null;
    this.result = null;

    this['+'] = (a, b) => a + b;
    this['-'] = (a, b) => a - b;
    this['*'] = (a, b) => a * b;
    this['%'] = (a, b) => a % b;
    this['/'] = (a, b) => a / b;

    this.calculate = () => {
        if (this.b !== null) {

            const getOperationResult = this[this.op](parseFloat(this.a), parseFloat(this.b));

            if ((this.b === '0' || this.b === '-0') && this.op === '/') {
                this.result = 'Division by zero is undefined';

            } else if (this.a.includes('.') && this.b.includes('.'))  {
                let aDecimals = 0;
                let bDecimals = 0;

                aDecimals = this.a.split('.')[1].length;
                bDecimals = this.b.split('.')[1].length;

                if (aDecimals > bDecimals) {
                    this.result = parseFloat(getOperationResult.toFixed(aDecimals));
                } else {
                    this.result = parseFloat(getOperationResult.toFixed(bDecimals));
                }

            } else if (this.a.includes('.')) {
                let aDecimals = 0;
                aDecimals = this.a.split('.')[1].length;
                this.result = parseFloat(getOperationResult.toFixed(aDecimals));

            } else if (this.b.includes('.')) {
                let bDecimals = 0;
                bDecimals = this.b.split('.')[1].length;
                this.result = parseFloat(getOperationResult.toFixed(bDecimals));

            } else {
                this.result = getOperationResult;
            } // set the length of the result if it is a floating point number (only in case of one or both numbers inserted are floating point numbers); the length  will be the largest between the two; 0.555 + 1.55555 = 2,11055; TO AVOID HOW JS HANDLES FLOATING-POINT ARITHMETICS; Ex: 5 - 4.001 = 0.9989999999999997; This work-around will make the result 0.999.

            // this.result = getOperationResult;
            this.a = null;
            this.b = null;
            this.op = null;            
            primaryScreen.style.fontSize = '1.6rem';
        }
    }

    this.getNumber = function (number) {
        if (!this.op) {
            if (this.a === null) { 
                this.result = null;
                this.a = number;
                primaryScreen.style.fontSize = '1.6rem';
               
            } else if (this.a !== null && this.a.length < 250) {
                this.a += number;

                if (this.a.length > 150) primaryScreen.style.fontSize = '1.25rem';

                if (this.a[0] == 0 && !this.a.includes('.')) this.a = parseFloat(this.a); // when the string starts with '0', parse the string and convert to number type, to avoid getting strings like '00000'; if a number dif than '0' is being inputted after '0', ex '02', the string will be parsed as '2' and this 'if' will no longer be passed
                if (typeof this.a === 'number') this.a = this.a.toString(); // when pressing a number button after '0' is inputted and the `if` above will run the code, the strings will be parsed as numbers (as long as the `if` passes the validation); to avoid getting errors in the rest of the calculator functions due to the variables being numbers, this will convert them to strings
            }
        } else if (this.op) {
            if (this.b === null) {
                this.b = number;
                primaryScreen.style.fontSize = '1.6rem';
         
            } else if (this.b !== null & this.b.length < 250) {
                this.b += number;

                if (this.b.length > 150) {
                    primaryScreen.style.fontSize = '1.25rem';
                    secondaryScreen.style.fontSize = '1.1rem';
                }
                if (this.b[0] == 0 && !this.b.includes('.')) this.b = parseFloat(this.b);
                if (typeof this.b === 'number') this.b = this.b.toString();
            }
        }
    }

    this.setOperator = function (operator) {
        if (this.op && (this.b !== null)) { 
            this.calculate();
            if (typeof this.result === `number`) { 
                this.a = this.result.toString();
                this.result = null;
            } else { // this else runs when `this.result` contains the error message (string, so the first if is falsy) for division by 0
                this.updateScreen('Error');
            }
            secondaryScreen.style.fontSize = '1.25rem';

        } else if (this.result !== null && typeof this.result === `number`) { 
            this.a = this.result.toString();
            this.result = null;
            secondaryScreen.style.fontSize = '1.25rem';
        } 

        if (this.a !== null) {
            this.op = operator;
            if (this.a.includes('.') && this.a.split('.')[1].length === 0) {
                this.a = this.a.split('.')[0]; // avoid getting ex: '5.' instead of '5' on secondaryScreen when pressing an operator
            }
        }
    }

    this.delete = function () {
        if (this.a !== null && !this.op) {
            if (this.a.length === 1) {
                this.a = null;

            } else {
                if (this.a && this.a.length === 2 && this.a[0] === '-') {
                    this.a = null;
                } else {
                    this.a = this.a.slice(0, this.a.length - 1);
                }
            }
        }

        if (this.b !== null && this.op) {
            if (this.b.length === 1) {
                this.b = null;

            } else {
                if (this.b && this.b.length === 2 && this.b[0] === '-') {
                    this.b = null;
                } else {
                    this.b = this.b.slice(0, this.b.length - 1);
                }
            }
        }
    }

     this.clear = function () {
        this.a = null;
        this.b = null;
        this.op = null;
        this.result = null;
    } 

    this.float = function () {
        if (!this.op) {
            if (this.a !== null && !this.a.includes('.')) {
                this.a = this.a.concat('.');
           
            } else if (this.a === null) {
                this.result = null;
                this.a = '0.';
            }
        }
        
        if (this.op) {
            if (this.b !== null && !this.b.includes('.')) {
                this.b = this.b.concat('.');

            } else if (this.b === null) {
                this.b = '0.';
            }
        }
    } 
    
    this.changeSign = function () {
        if (!this.op) {
            if (this.a && this.a[0] === '-') {
                this.a = ''.concat(this.a.slice(1));
            } else if (this.a && this.a[0] === '+') {
                this.a = '-'.concat(this.a.slice(1));
            } else if (this.a) {
                this.a = '-'.concat(this.a.slice(0));
            } 
        }
        if (this.op) {
            if (this.b && this.b[0] === '-') {
                this.b = ''.concat(this.b.slice(1));
            } else if (this.b && this.b[0] === '+') {
                this.b = '-'.concat(this.b.slice(1));
            } else if (this.b) {
                this.b = '-'.concat(this.b.slice(0));
            }
        }
    }

    this.updateScreen = function (buttonType) {
        if (!this.op && this.result === null) {
            secondaryScreen.textContent = null;
            primaryScreen.textContent = this.a;
        } else if (this.op) {
            secondaryScreen.textContent = `${this.a} ${this.op}`;
            primaryScreen.textContent = this.b;
        }    

        if ((buttonType === '=' || buttonType === 'Enter' || buttonType === 'Error') && this.result !== null) {
            secondaryScreen.textContent = null;
            primaryScreen.textContent = this.result;
        }

        console.clear();
        console.log('--------DEBUG----------')
        console.log("a: ", this.a);
        console.log("b: ", this.b); 
        console.log('op: ', this.op);
        console.log('result: ', this.result);
    }
}

const numberBtns = document.querySelectorAll('button[data-number]');
const operatorBtns = document.querySelectorAll('button[data-operator]');
const funcBtns = document.querySelectorAll('button[data-func]');
const primaryScreen = document.querySelector('.screen div.primary');
const secondaryScreen = document.querySelector('.screen div.secondary');
const equals = document.querySelector('[data-func="="]');
const del = document.querySelector('[data-func="DEL"]');
const clear = document.querySelector('[data-func="AC"]');
const float = document.querySelector('[data-func="."]');
const signChanger = document.querySelector('[data-func="+/-"]');

const calc = new Calculator();

numberBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        calc.getNumber(btn.getAttribute('data-number'));
        calc.updateScreen();
        btn.blur();
    });
});

operatorBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        calc.setOperator(btn.getAttribute('data-operator'));
        calc.updateScreen();
        btn.blur();
    });
});

equals.addEventListener('click', (e) => {
    e.preventDefault();
    calc.calculate();
    calc.updateScreen(equals.getAttribute('data-func'));
    equals.blur();
});

del.addEventListener('click', (e) => {
    e.preventDefault();
    calc.delete();
    calc.updateScreen(del.getAttribute('data-func'));
    del.blur();
});

clear.addEventListener('click', (e) => {
    e.preventDefault();
    calc.clear();
    calc.updateScreen();
    clear.blur();
});

float.addEventListener('click', (e) => {
    e.preventDefault();
    calc.float();
    calc.updateScreen();
    float.blur();
});

signChanger.addEventListener('click', (e) => {
    e.preventDefault();
    calc.changeSign();
    calc.updateScreen();
    signChanger.blur();
});

window.addEventListener('keydown', (e) => {
    if (e.key >= 0 && e.key < 10) {
        calc.getNumber(e.key);
        calc.updateScreen();
    }

    if (e.key === '+' || 
        e.key === '-' || 
        e.key === '*' || 
        e.key === '%' || 
        e.key === '/') {
        calc.setOperator(e.key);
        calc.updateScreen();
    }

    if (e.key === "Enter" || e.key === '=') {
        calc.calculate();
        calc.updateScreen(e.key);
    }

    if (e.key === "Backspace") {
        calc.delete();
        calc.updateScreen();
    }

    if (e.key.toLowerCase() === "c") {
        calc.clear();
        calc.updateScreen();
    }

    if (e.key === ".") {
        calc.float();
        calc.updateScreen();
    }

    if (e.key === "|") {
        calc.changeSign();
        calc.updateScreen();
    }
});
