import { lazy } from 'react';

export default [
    {
        name: '登录',
        key: 'login',
        exact: true,
        path: '/',
        component: lazy(() => import('./pages/Login/Login'))
    },
    {
        name: '主页',
        key: 'index',
        exact: false,
        path: '/index',
        redirect: '/index/message',
        component: lazy(() => import('./pages/Index/Index')),
        children: [
            {
                name: '消息',
                key: 'message',
                exact: true,
                path: '/index/message',
                icon: 'message',
                component: lazy(() => import('./pages/Message/Message'))
            },
            {
                name: '通讯录',
                key: 'contact',
                exact: true,
                path: '/index/contact',
                icon: 'contact',
                component: lazy(() => import('./pages/Contact/Contact'))
            },
            {
                name: 'demo',
                key: 'demo',
                exact: true,
                path: '/index/demo',
                icon: 'demo',
                component: lazy(() => import('./pages/Demo/Demo'))
            },
            {
                name: 'demo1',
                key: 'demo1',
                exact: true,
                path: '/index/demo1',
                icon: 'demo1',
                component: lazy(() => import('./pages/Demo/Demo1'))
            },
            {
                name: 'HocPage',
                key: 'HocPage',
                exact: true,
                path: '/index/HocPage',
                icon: 'HocPage',
                component: lazy(() => import('./pages/HocPage/HocPage'))
            },
            {
                name: 'FormPage',
                key: 'FormPage',
                exact: true,
                path: '/index/FormPage',
                icon: 'FormPage',
                component: lazy(() => import('./pages/FormPage/FormPage'))
            },
            {
                name: 'kFormCreateDemo',
                key: 'kFormCreateDemo',
                exact: true,
                path: '/index/kFormCreateDemo',
                icon: 'kFormCreateDemo',
                component: lazy(() => import('./pages/kFormCreateDemo/kFormCreateDemo'))
            },
            {
                name: 'DialogPage',
                key: 'DialogPage',
                exact: true,
                path: '/index/DialogPage',
                icon: 'DialogPage',
                component: lazy(() => import('./pages/DialogPage/DialogPage'))
            },
            {
                name: 'ContextPage',
                key: 'ContextPage',
                exact: true,
                path: '/index/ContextPage',
                icon: 'ContextPage',
                component: lazy(() => import('./pages/ContextPage/ContextPage'))
            },
            {
                name: 'ReduxPage',
                key: 'ReduxPage',
                exact: true,
                path: '/index/ReduxPage',
                icon: 'ReduxPage',
                component: lazy(() => import('./pages/ReduxPage/ReduxPage'))
            },
        ]
    },
    
]