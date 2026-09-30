/* redux */
import { createStore, applyMiddleware, compose } from 'redux';

/* router */
import { createBrowserHistory as createHistory } from 'history';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router';

/* helper */
import { values } from 'ramda';

/* 系統設定 */
import { rootReducer } from '../roots';

/* middleware */
import * as storeMiddleware from './middleware';

/* find storeMiddleware */
const {
  promise: promiseMiddleware,
  multipleActions: multipleActionsMiddleware,
  ...othersMiddleware
} = storeMiddleware;

/**
 * Router setting
 */
const history = createHistory({ basename: CONFIG.ROUTE.ROUTE_BASENAME });

/* store creator */
const storeCreator = {
  create: (() => {
    if (CONFIG.ENV.ENABLE_DEV_TOOLS) {
      const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

      return reducerMiddleware =>
        createStore(
          reducerMiddleware(rootReducer(history)),
          composeEnhancers(
            applyMiddleware(
              routerMiddleware(history),
              multipleActionsMiddleware,
              promiseMiddleware,
              ...values(othersMiddleware)
            )
          )
        );
    } else {
      return reducerMiddleware =>
        createStore(
          reducerMiddleware(rootReducer(history)),
          applyMiddleware(
            routerMiddleware(history),
            multipleActionsMiddleware,
            promiseMiddleware,
            ...values(othersMiddleware)
          )
        );
    }
  })(),
  run: () => {
    values(othersMiddleware).map(middleware => {
      middleware.__run__ && middleware.__run__();
    });
  }
};

export { storeCreator, history };
