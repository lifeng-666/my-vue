import compile from './compile.js'

export default function render (vnode, data) {
    if (vnode.realDom.nodeType === 3) {
      const str = compile(vnode.template, data);
      vnode.realDom.nodeValue = str;
    } else {
        for (let i = 0; i < vnode.childs.length; i ++) {
            render(vnode.childs[i], data);
        }
    }
}