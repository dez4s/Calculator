function Calculator() {
    this.a = null;
    this.b = null;
    this.op = null;
    this.result = null;

    this['+'] = (a, b) => a + b;
    this['-'] = (a, b) => a - b;
    this['*'] = (a, b) => a * b;
    this['%'] = (a, b) => a % b;
    this['÷'] = (a, b) => a / b;

    this.calculate = () => {
        if (this.b !== null) {
            this.b = parseFloat(this.b);
            const getOperationResult = this[this.op](this.a, this.b);

           this.result = getOperationResult;

            if (this.a.toString().includes('.') && this.b.toString().includes('.'))  {
                let aDecimals = 0;
                let bDecimals = 0;

                aDecimals = this.a.toString().split('').slice(this.a.toString().split('').indexOf('.') + 1).length;
                bDecimals = this.b.toString().split('').slice(this.b.toString().split('').indexOf('.') + 1).length;

                if (aDecimals > bDecimals) {
                    this.result = getOperationResult.toFixed(aDecimals);
                } else {
                    this.result = getOperationResult.toFixed(bDecimals);
                }
            }

            this.a = null;
            this.b = null;
            this.op = null;            
        }
    }

    this.getNumber = function (number) {
        if (!this.op) {
            if (this.a === null) { 
                this.result = null;
                this.a = parseFloat(number);
            } else if (this.a !== null ) {
                this.a += number;
    
                if (this.a.includes('.')) {
                    this.a = parseFloat(this.a).toFixed(this.a.split('').slice(this.a.split('').indexOf('.')).length - 1);
                } else {
                    this.a = parseFloat(this.a);
                }
            }
        } else if (this.op) {
            if (this.b === null) {
                this.b = parseFloat(number);
            } else if (this.b !== null) {
                this.b += number;
    
                if (this.b.includes('.')) {
                    this.b = parseFloat(this.b).toFixed(this.b.split('').slice(this.b.split('').indexOf('.')).length - 1);
                } else {
                    this.b = parseFloat(this.b);
                }
            }
        }
    }

    this.setOperator = function (operator) {
        if (this.op && (this.b !== null)) { 
            this.b = parseFloat(this.b);
            this.calculate();
            this.a = this.result;
            this.result = null;
        } else if (this.result !== null) { 
            this.a = this.result;
            this.result = null;
        } 

        if (this.a !== null) {
            this.op = operator;
            this.a = parseFloat(this.a);
        }
    }

    this.delete = function () {
        if (this.a !== null) {
            if (this.a.toString().length == 1) {
                this.a = null;

            } else if (!this.op) {
                if (this.a && this.a.toString().length === 2 && this.a.toString().split('')[0] === '-') {
                    this.a = null;
                } else {
                    this.a = parseFloat(this.a.toString().split('').slice(0, this.a.toString().length - 1).join(''));
                }
            }
        }

        if (this.b !== null) {
            if (this.b.toString().length == 1) {
                this.b = null;

            } else if (this.op) {
                this.b = parseFloat(this.b.toString().split('').slice(0, this.b.toString().length - 1).join(''));
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
                this.a = this.a.toString().split('').concat('.').join('');
           
            } else if (this.a === null) {
                this.result = null;
                this.a = '0.';
            }
        }
        
        if (this.op) {
            if (this.b !== null && !this.b.toString().includes('.')) {
                this.b = this.b.toString().split('').concat('.').join('');

            } else if (this.b === null) {
                this.b = '0.';
            }
        }
    } 
    
    this.changeSign = function () {
        if (!this.op) {
            if (this.a && this.a.toString().split('')[0] === '-') {
                this.a = ['+'].concat(this.a.toString().split('').slice(1)).join('');
            } else if (this.a && this.a.toString().split('')[0] === '+') {
                this.a = ['-'].concat(this.a.toString().split('').slice(1)).join('');
            } else if (this.a) {
                this.a = ['-'].concat(this.a.toString().split('').slice(0)).join('');
            }
            if (this.a) {
                this.a = parseFloat(this.a);
            }
        }
        if (this.op) {
            if (this.b && this.b.toString().split('')[0] === '-') {
                this.b = ['+'].concat(this.b.toString().split('').slice(1)).join('');
            } else if (this.b && this.b.toString().split('')[0] === '+') {
                this.b = ['-'].concat(this.b.toString().split('').slice(1)).join('');
            } else if (this.b) {
                this.b = ['-'].concat(this.b.toString().split('').slice(0)).join('');
            }
            if (this.b) {
                this.b = parseFloat(this.b);
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

        if (buttonType === '=' && this.result !== null) {
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

const calc = new Calculator();

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

numberBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        calc.getNumber(btn.getAttribute('data-number'));
        calc.updateScreen();
    });
});

operatorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        calc.setOperator(btn.getAttribute('data-operator'));
        calc.updateScreen();
    });
});

equals.addEventListener('click', () => {
    calc.calculate();
    calc.updateScreen(equals.getAttribute('data-func'));
});

del.addEventListener('click', () => {
    calc.delete();
    calc.updateScreen(del.getAttribute('data-func'));
});

clear.addEventListener('click', () => {
    calc.clear();
    calc.updateScreen();
});

float.addEventListener('click', () => {
    calc.float();
    calc.updateScreen();
});

signChanger.addEventListener('click', () => {
    calc.changeSign();
    calc.updateScreen();
});

window.addEventListener('keydown', (e) => {
    console.log(e.key);
});

