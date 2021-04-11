import React from 'react';

// 创建上下文，可以提供一个默认值
export const ThemeContext = React.createContext({themeColor: 'redTheme'});
// 运输上下文
export const ThemeProvider = ThemeContext.Provider
// 消费上下文
export const ThemeConsumer = ThemeContext.Consumer