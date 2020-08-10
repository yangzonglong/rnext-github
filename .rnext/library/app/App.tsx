import React, { Suspense } from 'react';
import { Router, Switch, Route, withRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import history from './history';
import routes from './routes';
import Layout from './layout/Layout';
import Loading from './../components/loading/Loading';
import $app from './crWApp';
import { CSSTransition } from 'react-transition-group';
import i18n from './i18n';
import enUS from 'antd/lib/locale/en_US';
import zhCN from 'antd/lib/locale/zh_CN';
import 'normalize.css';
import './app.scss';

window.$app = $app;

const Routes = withRouter(({ location }) => (
  <Switch location={location}>
    {routes.map(item => (
      <Route key={item.path} exact path={item.path}>
        {({ match }) => (
          <CSSTransition
            appear
            in={match != null}
            timeout={0}
            classNames='routeAnimation'
            unmountOnExit>
            <div className='routeAnimation'>
              <item.component />
            </div>
          </CSSTransition>
        )}
      </Route>
    ))}
  </Switch>
));


function App() {
  return (
    <ConfigProvider locale={i18n.language === 'en' ? enUS : zhCN}>
      <Router history={history}>
        <Layout>
          <Suspense fallback={<Loading visible />}>
            <Routes />
          </Suspense>
        </Layout>
      </Router>
    </ConfigProvider>
  );
}

export default App;
