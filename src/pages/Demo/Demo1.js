import React, { useContext, useReducer, useState} from 'react';
// useContext Hooks
const themes = {
    light: {
        foreground: "#000000",
        background: "#eeeeee"
    },
    dark: {
        foreground: "#ffffff",
        background: "#222222"
      }
}
const ThemeContext = React.createContext(themes.light);
function ThemeButton() {
    const content = useContext(ThemeContext);
    return (
        <button
        style={{ background: content.value.background, color: content.value.foreground }}
        onClick={() => {content.fun()}}>
        I am styled by theme context!
      </button>
    )
}
function Toobar() {
    return (
        <div>
            <ThemeButton></ThemeButton>
        </div>
    )
}
// useReducer Hooks
const initialState = {count: 0};
function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return {count: state.count + 1}
        case 'decrement':
            return {count: state.count - 1}
        default:
            throw new Error();
    }
}
function Counter() {
    const [state, dispath] = useReducer(reducer, initialState);
    return (
        <>
            Count: {state.count}
            <button onClick={() => dispath({type: 'decrement'})}>-</button>
            <button onClick={() => dispath({type: 'increment'})}>+</button>
        </>
    )
}
// useReducer Hooks 惰性初始化
function init(initialCount) {
    return {count: initialCount};
}
function reducerLazy(state, action) {
    switch (action.type) {
        case 'increment':
            return {count: state.count + 1}
        case 'decrement':
            return {count: state.count - 1}
        case 'reset':
            return init(action.payload)
        default:
            throw new Error();
    }
}
function CounterLazy({initialCount}) {
    const [state, dispath] = useReducer(reducerLazy, initialCount, init);
    return (
        <>
            Count: {state.count}
            <button onClick={() => dispath({type: 'reset', payload: initialCount})}>重置</button>
            <button onClick={() => dispath({type: 'decrement'})}>-</button>
            <button onClick={() => dispath({type: 'increment'})}>+</button>
        </>
    )
}
function Demo() {
    const [theme, setTheme] = useState(themes.light);
    let value = {
        value: theme,
        fun: () => {
            if (theme === themes.light) {
                setTheme(themes.dark)
            } else setTheme(themes.light)
        }
    }
    return (
        <ThemeContext.Provider value={value}>
            useContext:<br />
            <Toobar></Toobar>
            <hr/>
            useReducer:<br />
            <Counter></Counter>
            <hr/>
            useReducer(惰性初始化):<br />
            <CounterLazy initialCount={10}></CounterLazy>
        </ThemeContext.Provider>
    )
}
export default Demo;
