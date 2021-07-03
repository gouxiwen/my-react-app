import { TEXT } from "./const"

function createElement(type, config, ...children) {
  // 区分文本节点类型，因为经过babel转换文本节点没有type属性，只是个字符串
  children = children.map(child => typeof child === 'object' ? child : createTextNode(child))
  const props = {
    ...config,
    children
  }
  return {
    type,
    props
  }
}

// 加工文本节点
function createTextNode(text) {
  return {
    type: TEXT,
    props: {
      children: [],
      nodeValue: text
    }
  }
}
export default {
  createElement 
}