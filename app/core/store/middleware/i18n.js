/* 多國語系 */
import { setTranslations } from 'redux-i18n';
import { rootLocales } from '../../roots';

export default store => next => {
  setTranslations(rootLocales)(next, store.getState);
  return action => next(action);
};
