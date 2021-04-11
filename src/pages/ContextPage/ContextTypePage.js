import React, { Component } from 'react';
import { ThemeConsumer, ThemeContext } from './ThemeContext';

// 类组件
// class ContextTypePage extends Component {
//   // 接收上下文，挂载到this.context上
//   static contextType = ThemeContext
//   render() {
//     console.log('this', this)
//     const { themeColor } = this.context
//     return (
//       <div className={themeColor}>
//         类子组件消费上下文
//       </div>
//     );
//   }
// }
// 不使用static contextType就在这里挂载
// ContextTypePage.contextType = ThemeContext

// 函数组件
function ContextTypePage(props) {
  return (
    <ThemeConsumer>
      {
        ctx => {
          return (
            <div className={ctx.themeColor}>
              函数子组件消费上下文
            </div>
          )
        }
      }
    </ThemeConsumer>
  );
}
export default ContextTypePage;
