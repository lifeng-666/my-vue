import Due from './index.js';
import proxyData from './proxyData.js';
import {createSet, createDelete} from './createSetAndDelete.js';
import createVNode from './createVNode.js'
import render from './render.js'

let that = null;

function callback () {
    render(that.$vnode, that.$data);
}

Due.prototype.init = function (config) {
    that = this;
    this.$data = proxyData(config.data, this, callback);
    this.$el = document.querySelector(config.el);
    this.$vnode = createVNode(this.$el);
    this.$set = function (data, key, value) {
        createSet(data, key, value);
    };
    this.$delete = function (data, key) {
        createDelete(data, key);
    };
    render(this.$vnode, config.data);
}

export default Due.prototype.init;