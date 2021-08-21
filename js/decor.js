let factor = function factorial(n) {
    return n === 1 ? 1 : n * factorial(n - 1);
}

function logResultDecorator(func, funcName) {
    return function (m) {
        let result = func(m);
        console.log(`Результат функции ${funcName}: ${result}`);
        return result;
    }
}

function callCountDecorator(func, funcName) {
    let count = 0;
    return function (m) {
        count++;
        console.log(`Функция ${funcName} была вызвана ${count} раз`);
        return func(m);
    }
}

function timeDecorator(func, funcName) {
    return function () {
        let startTime = performance.now();
        let result = func.apply(this, arguments);
        let time = performance.now() - startTime;
        console.log(`Функция ${funcName} выполнялась ${time} мс`);
        return result;
    }
}

factor = logResultDecorator(factor, 'Факториал');
factor = callCountDecorator(factor, 'Факториал');
factor = timeDecorator(factor, 'Факториал');

factor(7);