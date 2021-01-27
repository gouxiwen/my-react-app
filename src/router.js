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
        ]
    },
    
]