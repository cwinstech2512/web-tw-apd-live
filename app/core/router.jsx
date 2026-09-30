import React, { createFactory, Fragment } from 'react';
/* redux */
import { Provider } from 'react-redux';
/* 多國語系 */
import I18n from 'redux-i18n';
/* router */
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
/* 系統設定 */
import { rootRoutes, rootLocales, rootMaster } from './roots';
import { storeCreator, history } from './store';
/* helper */
import { merge, map, flatten, addIndex } from 'ramda';

/**
 * i18nInit  [預設語系，預設為 zh_tw]
 * i18nFallback [未翻譯文字語言，預設為 en]
 * routerIndex [預設頁面路徑]
 * routerNotFound [not found 路徑，沒有填寫就是預設路徑]
 * routerMiddleware [路由要處理的 middleware]
 */
export default (setting = {}) => {
  const {
    i18nInit,
    i18nFallback,
    routerIndex,
    routerNotFound,
    routerMiddleware,
    reducerMiddleware
  } = merge(
    {
      i18nInit: 'zh_tw',
      i18nFallback: 'en',
      routerIndex: '/',
      routerNotFound: null,
      routerMiddleware: null,
      reducerMiddleware: reducer => (state, action) => reducer(state, action)
    },
    setting
  );

  /* store */
  const store = storeCreator.create(reducerMiddleware);
  /* 開始啟用 middleware */
  storeCreator.run();

  /* 預設的路由處理 */
  const routerDefaultMiddleware = () => render => render();

  /* 路由邏輯 */
  const routerLogic = Wrapper => {
    const middleware =
      routerMiddleware === null ? routerDefaultMiddleware : routerMiddleware;

    const renderHandler = (routerProps, { path = '' }) => () => (
      <Master isHome={path === '/'}>
        <Wrapper {...routerProps} />
      </Master>
    );
    // createFactory(Wrapper)(routerProps);
    const redirectHandler = path => <Redirect to={path} />;

    return routerParams => routerProps =>
      middleware(store, routerParams)(
        renderHandler(routerProps, routerParams),
        redirectHandler
      );
  };

  const routes = (
    <Switch>
      {flatten(
        addIndex(map)(({ path, component: Wrapper, params }, index) => {
          if (Array.isArray(path)) {
            return addIndex(map)(
              (p, pathIdx) => (
                <Route
                  key={`root-route-${index}-${pathIdx}`}
                  path={p}
                  render={routerLogic(Wrapper)({ path: p, params })}
                />
              ),
              path
            );
          } else {
            return (
              <Route
                key={`root-route-${index}`}
                path={path}
                render={routerLogic(Wrapper)({ path, params })}
              />
            );
          }
        }, rootRoutes)
      )}
      <Redirect exact path="/" to={routerIndex} />
      <Redirect path="*" to={routerNotFound || routerIndex} />
    </Switch>
  );

  const Master = rootMaster;

  return (
    <Provider store={store}>
      <I18n
        translations={rootLocales}
        initialLang={i18nInit}
        fallbackLang={i18nFallback}
        useReducer>
        <ConnectedRouter history={history}>
          {routes}
          {/*Master ? <Master>{routes}</Master> : routes*/}
        </ConnectedRouter>
      </I18n>
    </Provider>
  );
};
