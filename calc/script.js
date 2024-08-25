document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    let currentInput = '';
    let operator = '';
    let firstOperand = '';

    function updateDisplay(value) {
        display.value = value;
    }

    function handleNumber(num) {
        if (currentInput === '' && num === '0') return;
        currentInput += num;
        updateDisplay(firstOperand + operator + currentInput);
    }

    function handleOperator(op) {
        if (currentInput === '' && op !== '-') return;
        if (firstOperand === '') {
            firstOperand = currentInput;
            operator = op;
            currentInput = '';
        } else {
            calculate();
            operator = op;
        }
        updateDisplay(firstOperand + operator + currentInput);
    }

    function handleClear() {
        currentInput = '';
        operator = '';
        firstOperand = '';
        updateDisplay('0');
    }

    function calculate() {
        if (firstOperand === '' || currentInput === '' || operator === '') return;
        let result;
        const num1 = parseFloat(firstOperand);
        const num2 = parseFloat(currentInput);

        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                result = num1 / num2;
                break;
            case '%':
                result = num1 % num2;
                break;
            default:
                return;
        }
        updateDisplay(result);
        firstOperand = result;
        currentInput = '';
        operator = '';
    }

    document.querySelectorAll('.btn-num').forEach(button => {
        button.addEventListener('click', function() {
            handleNumber(this.value);
        });
    });

    document.querySelectorAll('.btn-op').forEach(button => {
        button.addEventListener('click', function() {
            handleOperator(this.value);
        });
    });

    document.querySelector('.btn-clear').addEventListener('click', function() {
        handleClear();
    });

    document.querySelector('.btn-equals').addEventListener('click', function() {
        calculate();
        updateDisplay(firstOperand);
    });
});
