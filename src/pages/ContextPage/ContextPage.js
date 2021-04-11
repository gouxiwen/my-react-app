import './index.scss';
import React, { Component } from 'react';
import { Button } from 'antd';
import ContextTypePage from './ContextTypePage';
import { ThemeProvider } from './ThemeContext';

class ContextPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: {
        themeColor: 'redTheme'
      }
    }
  }
  
  handleChangeTheme = (themeColor) => {
    this.setState({
      theme: {
        themeColor
      }
    })
  }
  render() {
    const { theme } = this.state
    return (
      <div>
        <h3>ContextPage</h3>
        <Button onClick={() => this.handleChangeTheme('redTheme')}>红色主题</Button>
        <Button onClick={() => this.handleChangeTheme('greenTheme')}>绿色主题</Button>
        {/* 提供上下文 */}
        <ThemeProvider value={theme}>
          <ContextTypePage />
        </ThemeProvider>
      </div>
    );
  }
}

export default ContextPage;
