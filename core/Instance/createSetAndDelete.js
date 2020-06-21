export function createSet (target, key, value) {
    if (typeof target === 'object') {
        if (target[key] === value) {
            return;
        }
        target[key] = value;
    } else {
        throw new TypeError('$set must be array or object');
    }
    console.log('render函数执行!');
}

export function createDelete (target, key) {
    if (Array.isArray(target)) {
        target.splice(key, 1);
    } else if (typeof target === 'object') {
        delete target[key];
        console.log('render函数执行!');
    } else {
        throw new TypeError('$delete must be array or object');
    }
}