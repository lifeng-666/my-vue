export default function proxyD (data, _this, callback) {
    const proxyData = {};
    for (const key in data) {
       observe(data, key, proxyData, callback);
       observe(data, key, _this, callback);
    }
    return proxyData;
}

function observe (data, prop, proxyData, callback) {
    if (Array.isArray(data[prop])) {
        proxyArr[prop] = data[prop];
        proxyArr[prop].__proto__ = proxyArr(callback);
    }
    if (typeof data[prop] === 'object' && !Array.isArray(data[prop])) {
       proxyData[prop] = proxyD(data[prop]);
    }
    Object.defineProperty(proxyData, prop, {
        get () {
            return data[prop];
        },
        set (value) {
            if (value !== data[prop]) {
                data[prop] = value;
                callback();
            }
        }
    })
}

function proxyArr (callback) {
    const arrProto = Object.create(Array.prototype);
    ['push', 'pop', 'splice', 'reverse', 'sort', 'shift', 'unshift'].forEach( item => {
        const oldFunc = arrProto[item];
        arrProto[item] = function (...data) {
            oldFunc.call(this, ...data);
            callback();
        }
    } )
    return arrProto;
}