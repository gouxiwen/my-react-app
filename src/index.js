import './mock';
import { ConfigProvider } from 'antd';
import moment from 'moment';
// import React from 'react';
// import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'antd/dist/antd.css';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import store from './store/index';
import { Provider } from 'react-redux';
// import { Provider } from './kReactRedux';
import React from './kReact';
// import ReactDOM from './kReact/reactDom';
import ReactDOM from './kReact/reactDomfiber';
import Component from './kReact/component';
moment.locale('zh-cn');

// ReactDOM.render(
//   <ConfigProvider locale={zhCN}>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </ConfigProvider>,
//   document.getElementById('root')
// );

// 使用自己实现的react来渲染

// 类组件必须大写
class ClassComponent extends Component {
  static defaultProps = {
    color: 'pink'
  }
  render() {
    return (
      <div className="border">
        class组件-{this.props.name}
        <p className={this.props.color}>omg</p>
      </div>
    );
  }
}
// 函数组件
function FunctionComponent(props) {
  return (
    <div className="border">
        函数组件-{props.name}
      </div>
  )
}

const jsx = ( 
<div className="border">
  <p>全栈</p>
  <a href="http://www.kaikeba.com">开课吧</a>
  {/* <ClassComponent  name="class" />
  <FunctionComponent  name="函数" />
  {
    [1,2,3].map(item => {
      return <div key={item}>{item}</div>
    })
  } */}
  {/* 每个item没有多余的div包裹，本地源码暂未实现 */}
  {/* {
    [1,2,3].map(item => {
      return <React.Fragment>{item}</React.Fragment>
    })
  } */}
  {/* <>
    <h1>aaa</h1>
    <h1>bbb</h1>
  </> */}
</div>
)

ReactDOM.render(jsx, document.getElementById('root'));