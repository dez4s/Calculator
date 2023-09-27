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

            if (this.a.toString().includes('.') && this.b.toString().includes('.'))  {
                let aDecimals = 0;
                let bDecimals = 0;

                aDecimals = this.a.toString().split('.')[1].length;
                bDecimals = this.b.toString().split('.')[1].length;

                if (aDecimals > bDecimals) {
                    this.result = parseFloat(getOperationResult.toFixed(aDecimals));
                } else {
                    this.result = parseFloat(getOperationResult.toFixed(bDecimals));
                }

            } else if (this.a.toString().includes('.')) {
                let aDecimals = 0;
                aDecimals = this.a.toString().split('.')[1].length;
                this.result = parseFloat(getOperationResult.toFixed(aDecimals));

            } else if (this.b.toString().includes('.')) {
                let bDecimals = 0;
                bDecimals = this.b.toString().split('.')[1].length;
                this.result = parseFloat(getOperationResult.toFixed(bDecimals));

            } else {
                this.result = getOperationResult;
            } // set length after the floating point if one or both of the numbers are floating point numbers; the length  will be the largest between the two; 0.555 + 1.55555 = 2,11055; TO AVOID HOW JS HANDLES FLOATING-POINT ARITHMETICS; Ex: 5 - 4.001 = 0.9989999999999997; This work-around will make the result 0.999.

            // this.result = getOperationResult;
            this.a = null;
            this.b = null;
            this.op = null;            
        }
    }

    this.getNumber = function (number) {
        if (!this.op) {
            if (this.a === null) { 
                this.result = null;
                this.a = number;

            } else if (this.a !== null ) {
                this.a += number;
                if (this.a.toString()[0] == '0' && !this.a.toString().includes('.')) this.a = parseFloat(this.a);
            }
        } else if (this.op) {
            if (this.b === null) {
                this.b = number;

            } else if (this.b !== null) {
                this.b += number;
                if (this.b.toString()[0] == '0' && !this.b.toString().includes('.')) this.b = parseFloat(this.b);
            }
        }
    }

    this.setOperator = function (operator) {
        if (this.op && (this.b !== null)) { 
            this.calculate();
            this.a = this.result.toString();
            this.result = null;

        } else if (this.result !== null) { 
            this.a = this.result.toString();
            this.result = null;
        } 

        if (this.a !== null) {
            this.op = operator;
            if (this.a.toString().includes('.') && this.a.toString().split('.')[1].length === 0) {
                this.a = this.a.toString().split('.')[0]; // to avoid getting ex: '5.' instead of '5' on secondaryScreen when pressing an operator
            }
        }
    }

    this.delete = function () {
        if (this.a !== null && !this.op) {
            if (this.a.toString().length === 1) {
                this.a = null;

            } else {
                if (this.a && this.a.toString().length === 2 && this.a.toString()[0] === '-') {
                    this.a = null;
                } else {
                    this.a = this.a.toString().slice(0, this.a.toString().length - 1);
                }
            }
        }

        if (this.b !== null && this.op) {
            if (this.b.toString().length === 1) {
                this.b = null;

            } else {
                if (this.b && this.b.toString().length === 2 && this.b.toString()[0] === '-') {
                    this.b = null;
                } else {
                    this.b = this.b.toString().slice(0, this.b.toString().length - 1);
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
            if (this.a !== null && !this.a.toString().includes('.')) {
                this.a = this.a.toString().concat('.');
           
            } else if (this.a === null) {
                this.result = null;
                this.a = '0.';
            }
        }
        
        if (this.op) {
            if (this.b !== null && !this.b.toString().includes('.')) {
                this.b = this.b.toString().concat('.');

            } else if (this.b === null) {
                this.b = '0.';
            }
        }
    } 
    
    this.changeSign = function () {
        if (!this.op) {
            if (this.a && this.a.toString()[0] === '-') {
                this.a = ''.concat(this.a.toString().slice(1));
            } else if (this.a && this.a.toString()[0] === '+') {
                this.a = '-'.concat(this.a.toString().slice(1));
            } else if (this.a) {
                this.a = '-'.concat(this.a.toString().slice(0));
            } 
        }
        if (this.op) {
            if (this.b && this.b.toString()[0] === '-') {
                this.b = ''.concat(this.b.toString().slice(1));
            } else if (this.b && this.b.toString()[0] === '+') {
                this.b = '-'.concat(this.b.toString().slice(1));
            } else if (this.b) {
                this.b = '-'.concat(this.b.toString().slice(0));
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

        if ((buttonType === '=' || buttonType === 'Enter') && this.result !== null) {
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
        calc.setOperator(btn.textContent);
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
