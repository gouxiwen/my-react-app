import { TEXT } from "./const"

function render(vnode, container) {
  // vnode来自React.createElement
  console.log('vnode', vnode)
  // 1.vnode -> node
  const node = createNode(vnode)
  // 2.node 插入container
  container.appendChild(node)
}

// 创建真实node，这里有22中节点类型需要区分
function createNode(vnode) {
  const {type, props} = vnode
  let node = null
  if (type === TEXT) {
    node = document.createTextNode('')
  } else if (typeof type === 'string') {
    node = document.createElement(type) 
  } else if (typeof type === 'function') {
    node = type.isClassComponent ?  updateClassComponent(vnode) : updateFunctionComponent(vnode)
  } else {
    // type是undefined
    // 文档片段
    node = document.createDocumentFragment()
  }
  updateNodeAttr(node, props)
  recencileChildren(props.children, node)
  return node
}

// 处理类组件
function updateClassComponent(vnode) {
  const {type, props} = vnode
  let newProps = {}
  if(type.defaultProps) {
    newProps = Object.assign(type.defaultProps, props)
  }
  // 实例化
  let instance = new type(newProps)
  // 调用实例render方法
  const vvnode = instance.render()
  const node = createNode(vvnode)
  return node
}

// 处理函数组件
function updateFunctionComponent(vnode) {
  const {type, props} = vnode
  const vvnode = type(props)
  const node = createNode(vvnode)
  return node
}

// 更新属性值
function updateNodeAttr(node, nextValue) {
  Object.keys(nextValue).filter(key => key !== 'children').forEach(k => {
    node[k] = nextValue[k]
  })
}

// 遍历children属性，源码里的协调，即diff算法是在这个方法里实现的
function recencileChildren(children, node) {
  for (let index = 0; index < children.length; index++) {
    let child = children[index]
    if(Array.isArray(child)) {
      child.forEach(c => {
        render(c, node)
      })
    } else {
      render(child, node)

    }
  }
}
export default {
  render
}