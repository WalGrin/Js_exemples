function noop() {
} // пустая функция

class MyPromise {
    constructor(executer) {
        this.chainOfThen = [];
        this.errorHandler = noop; // то же самое, если здесь написать () =>{}
        this.finallyHandler = noop;
        try { //                        resolve                    reject
            executer.call(null, this.onResolve.bind(this), this.onReject.bind(this))
        } catch (e) {
            this.errorHandler(e);
        } finally {
            this.finallyHandler();
        }

    }

    onResolve(data) {
        this.chainOfThen.forEach(callback => {
            data = callback(data);
        })

        this.finallyHandler();
    }

    onReject(error) {
        this.errorHandler(error);

        this.finallyHandler();
    }

    then(fn) {
        this.chainOfThen.push(fn);
        return this; // возвращается класс MyPromise
    }

    catch(fn) {
        this.errorHandler = fn;
        return this;
    }

    finally(fn) {
        this.finallyHandler = fn;
        return this;
    }
}

const promise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('NgRx')
    }, 150);
})

promise
    .then(cource => cource.toUpperCase())
    .then(title => console.log('My promise', title))
    .catch(err => console.log('Error' ,err))
    .finally(() => console.log('Finally'))
