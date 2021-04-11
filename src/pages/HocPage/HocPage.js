import './index.scss'
import React, { Component } from 'react';
// HOC 一个函数接收一个组件，返回一个组件
// 这里可以是function或者class组件，如果是作为装饰器使用，则要用在class组件前面
const foo = Cmp => props => {
  return (
    <div className="border">
      <Cmp {...props}></Cmp>
    </div>
  )
}
const foo2 = Cmp => props => {
  return (
    <div className="greenborder">
      <Cmp {...props}></Cmp>
    </div>
  )
}
// 便于理解高阶
// const foo = Cpm => {
//   return (props) => {
//     return (
//       <div className="border">
//         <Cmp {...props}></Cmp>
//       </div>
//     )
//   }
// }
function Child(props) {
  return (
    <div>Child{props.age}岁</div>
  )
}
const Foo = foo(Child)

@foo2
@foo
class Child2 extends Component {
  render() {
    return (
      <div>Child{this.props.age}岁</div>
    );
  }
}
class HocPage extends Component {
  render() {
    return (
      <div className="hoc-page">
        <h3>HocPage</h3>
        <Foo age={3}></Foo>
        <Child2 age={4}></Child2>
      </div>
    );
  }
}

export default HocPage;
