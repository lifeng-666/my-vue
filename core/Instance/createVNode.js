function VNode (realDom, template) {
    this.realDom = realDom;
    this.template = template;
    this.childs = [];
}

export default function createVNode (root) {
    const VRoot = new VNode(root, '');
    let node = null;
    for (let i = 0; i < root.childNodes.length; i ++) {
        if (root.childNodes[i].nodeType === 3) {
             node = new VNode(root.childNodes[i], root.childNodes[i].nodeValue);
        } else {
             node = createVNode(root.childNodes[i]);
        }
        VRoot.childs.push(node);
    }
    return VRoot;
}