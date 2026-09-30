import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { i18nState } from 'redux-i18n';
/* build result */
import router from './_router';
import reducer from './_reducer';
import others from './_config';
import locales from './_locale';
import master from './_master';

export const rootReducer = history =>
  combineReducers({
    ...reducer,
    /* 他說一定要叫 router */
    router: connectRouter(history),
    i18nState
  });

export const rootRoutes = router.sort((a, b) => b.path.length - a.path.length);

export const rootLocales = locales;

export const rootMaster = master;

export const findCombineConfig = keyName => others[keyName];
