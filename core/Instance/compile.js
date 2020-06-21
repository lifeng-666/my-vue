export default function compile (tpl, data) {
    let str = tpl;
    const matchs = getFragment(str);
    if (matchs === null) {
        return;
    }
    for (let i = 0; i < matchs.length; i ++) {
        str = str.replace(matchs[i], getValue(matchs[i], data));
    }
    return str;
}

function getFragment (tpl) {
    return tpl.match(/{{[^}]+}}/g);
}

function getValue (frgment, data) {
    const str = frgment.replace('{{', '').replace('}}', '');
    const arr = str.split('.');
    let result = data;
    for (let i = 0; i < arr.length; i ++) {
        result = result[arr[i]];
    }
    return result;
}