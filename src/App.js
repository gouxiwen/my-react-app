import React, { PureComponent, Suspense } from 'react';
import { Switch, HashRouter } from 'react-router-dom';
import Loading from './components/Loading/Loading';
import routes from './router';

import { renderRoutes } from 'react-router-config';
// PureComponent和Component的区别：
// shouldComponentUpate()是用来判断组件是否需要更新的，默认为true
// PureComponent会自动通过props和state的浅对比来实现shouldComponentUpate()，防止一些不必要的更新
// Component没有实现shouldComponentUpate()
export default class App extends PureComponent {
    render () {
        return (
            <HashRouter>
                <Suspense fallback={<Loading />}>
                    <Switch>
                        {
                            renderRoutes(routes)
                            // AppRoute.map(item => {
                            //     return <Route exact={item.exact} key={item.key} path={item.path} render={props => <item.component {...props} />} />;
                            //     })
                        }
                    </Switch>
                </Suspense>
            </HashRouter>
        )
    }
}