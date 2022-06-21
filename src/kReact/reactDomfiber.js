// firber架构的react-dom实现
import { TEXT, PLACEMENT } from "./const"

// 下一个任务 fiber
let nextUnitOfWork = null
// work in progress fiber root 正在执行的根fiber
let  wipRoot = null

// function render_old(vnode, container) {
//   // vnode来自React.createElement
//   console.log('vnode', vnode)
//   // 1.vnode -> node
//   const node = createNode(vnode)
//   // 2.node 插入container
//   container.appendChild(node)
// }

function render(vnode, container) {
  wipRoot = {
    node: container,
    props: {
      children: [vnode]
    }
  }
  nextUnitOfWork = wipRoot
}

// 创建真实node，这里有22中节点类型需要区分
// function createNode_old(vnode) {
//   const {type, props} = vnode
//   let node = null
//   if (type === TEXT) {
//     node = document.createTextNode('')
//   } else if (typeof type === 'string') {
//     node = document.createElement(type) 
//   } else if (typeof type === 'function') {
//     node = type.isClassComponent ?  updateClassComponent_old(vnode) : updateFunctionComponent_old(vnode)
//   } else {
//     // type是undefined
//     // 文档片段
//     node = document.createDocumentFragment()
//   }
//   updateNodeAttr(node, props)
//   recencileChildren(props.children, node)
//   return node
// }
function createNode(vnode) {
  const {type, props} = vnode
  let node = null
  if (type === TEXT) {
    node = document.createTextNode('')
  } else if (typeof type === 'string') {
    node = document.createElement(type) 
  // } else if (typeof type === 'function') {
  //   node = type.isClassComponent ?  updateClassComponent(vnode) : updateFunctionComponent(vnode)
  // } else {
  //   // type是undefined
  //   // 文档片段
  //   node = document.createDocumentFragment()
  }
  updateNodeAttr(node, props)
  // recencileChildren(props.children, node)
  return node
}

// 处理类组件
// function updateClassComponent_old(vnode) {
//   const {type, props} = vnode
//   let newProps = {}
//   if(type.defaultProps) {
//     newProps = Object.assign(type.defaultProps, props)
//   }
//   // 实例化
//   let instance = new type(newProps)
//   // 调用实例render方法
//   const vvnode = instance.render()
//   const node = createNode_old(vvnode)
//   return node
// }
function updateClassComponent(fiber) {
  const {type, props} = fiber
  let newProps = {}
  if(type.defaultProps) {
    newProps = Object.assign(type.defaultProps, props)
  }
  // 实例化
  let instance = new type(newProps)
  // 调用实例render方法，render返回的jsx会被babel和React.createElement自动处理
  const children = [instance.render()]
  recencileChildren(fiber, children)
}

// 处理函数组件
// function updateFunctionComponent_old(vnode) {
//   const {type, props} = vnode
//   const vvnode = type(props)
//   const node = createNode_old(vvnode)
//   return node
// }
function updateFunctionComponent(fiber) {
  const {type, props} = fiber
  // function组件返回的jsx会被babel和React.createElement自动处理
  const children = [type(props)]
  recencileChildren(fiber, children)
}

// 更新属性值
function updateNodeAttr(node, nextValue) {
  Object.keys(nextValue).filter(key => key !== 'children').forEach(k => {
    node[k] = nextValue[k]
  })
}

// 遍历children属性，源码里的协调，即diff算法是在这个方法里实现的
function recencileChildren_old(children, node) {
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
/**
 * fiber架构
 * type: 节点类型
 * key: 标记当前层级下的唯一性
 * child：第一个子元素 fiber
 * sibling：下一个兄弟元素 fiber
 * return：父fiber
 * node：真实dom
 * props：属性值
 * base：上次节点 fiber
 * effectTag：标记要执行的操作类型【删除、插入、更新】 
 */

function recencileChildren(workInProgressFiber, children) {
  // 构建fiber架构
  let prevSlibing = null
  for (let index = 0; index < children.length; index++) {
    let child = children[index];
    // 目前只考虑初次渲染
    // 创建一个新的fiber
    let newFiber = {
      type: child.type,
      props: child.props,
      node: null,
      base: null, // 老节点对象
      return: workInProgressFiber,
      effectTag: PLACEMENT // 操作类型
    }

    // 形成一个链表
    if(index === 0) {
      workInProgressFiber.child = newFiber
      workInProgressFiber.sibling = workInProgressFiber.sibling || null
    } else {
      prevSlibing.sibling = newFiber
    }
    prevSlibing = newFiber
  }
}

function workLoop(deadline) {
  // 这里的时间是模拟的，源码中用的过期时间
  while(nextUnitOfWork && deadline.timeRemaining() > 1) {
    // 执行当前任务
    // 获取下一任务(fiber)
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
  }
  if(!nextUnitOfWork &&  wipRoot) {
    // 提交（更新dom）
    commitRoot()
  }
  // 继续下一轮工作
  requestIdleCallback(workLoop)
}

function commitRoot() {
  commitWork(wipRoot.child)
  wipRoot = null
}

function commitWork(fiber) {
  if(!fiber) return

  // 找到有真实dom的祖先节点进行插入/更新，找到最近有node节点的祖先fiber
  let parentNodefiber = fiber.return
  while(!parentNodefiber.node) {
    parentNodefiber = parentNodefiber.return
  }

  const parentNode = parentNodefiber.node
  if(fiber.effectTag === PLACEMENT && fiber.node !== null) {
    // 新增插入
    parentNode.appendChild(fiber.node)
  }
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}

function performUnitOfWork(fiber) {
  // 执行当前任务
  // todo
  const { type } = fiber
  if(typeof type === 'function') {
    // 组件
    type.isClassComponent ?  updateClassComponent(fiber) : updateFunctionComponent(fiber)
  } else {
    // 原生标签，组件经过recencileChildren后一定会走到原生标签这里，从而添加真实dom到fiber，而组件fiber没有真实dom，在commitWork阶段中会找到最近的祖先节点进行插入
    updateHostComponent(fiber)
  }
  // 获取下一任务
  if(fiber.child) {
    return fiber.child
  }
  // 没有子节点就找兄弟节点
  let currentFindFiber = fiber
  while(currentFindFiber) {
    if(currentFindFiber.sibling) {
      return currentFindFiber.sibling
    } 
    // 没有兄弟节点就找父节点的兄弟节点
    currentFindFiber = currentFindFiber.return;
  }
}

function updateHostComponent(fiber) {
  if(!fiber.node) {
    fiber.node = createNode(fiber)
  }
  // 协调子元素
  const { children } = fiber.props
  recencileChildren(fiber, children)
  console.log('fiber----->', fiber)
}

// 这里使用原生requestIdleCallback，由于兼容性问题react源码里自己实现了这个函数
requestIdleCallback(workLoop)
export default {
  render
}
