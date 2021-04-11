import './index.scss'
import React, { Component } from 'react';
import { createPortal } from 'react-dom';

class Dialog extends Component {
  constructor(props) {
    super(props);
    this.node = window.document.createElement('div')
    window.document.body.appendChild(this.node)
  }
  
  componentWillUnmount() {
    window.document.body.removeChild(this.node)
  }
  render() {
    return createPortal(
      <div className="dialog-bg">
        <div className="dialog-content" onClick={ this.props.onClick }>
          <div>Dialog</div>
          <div>{this.props.children}</div>
        </div>
      </div>
      ,
      this.node
    );
  }
}
class DialogPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDialog: false
    }
  }
  
  render() {
    return (
      <div className="dialog-page">
        <h3>DialogPage</h3>
        <button onClick={() => this.setState({showDialog: !this.state.showDialog})}>toggle</button>
        {this.state.showDialog &&
          <Dialog onClick={() => this.setState({showDialog: !this.state.showDialog})}>
            弹窗文本
          </Dialog>}
      </div>
    );
  }
}

export default DialogPage;
