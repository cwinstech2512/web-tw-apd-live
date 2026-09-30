import React from 'react';
import * as analytics from '@src/helper/google-analytics';
import { render } from 'react-dom';
import router from '@core/router';
import { emit } from '@core/action/effects';
import { SET_ACTIVE_MAIN } from '@src/storage/reducers/setting';
import { pipe, split, last } from 'ramda';
require("babel-core/register");
const regMain = new RegExp('^/main/\\d+$');

/* 初始化 google analytics */
analytics.initGA();

/* 初始化 FB */
try {
  window.fbAsyncInit = function() {
    FB.init({
      appId: CONFIG.REMOTE.FB_APP_ID,
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v7.0'
    });
  };
} catch (error) {
  console.log('Fb Init ERROR: ', error);
}

/* 監聽 crash */
const windowError = err => {
  console.log('CRASH: ' + err.message, window.location.pathname);
  analytics.logException(
    'CRASH: ' + err.message,
    window.location.pathname,
    {},
    2
  );
};

try {
  render(
    router({
      router_index: '/',
      i18n_init: CONFIG.LOCALE.LANGUAGE_INIT,
      i18n_fallback: CONFIG.LOCALE.LANGUAGE_FALLBACK,
      routerMiddleware: (store, routerParams) => (render, redirectTo) => {
        /* 每到新頁面就重新綁定一次 */
        window.removeEventListener('error', windowError);
        window.addEventListener('error', windowError, { once: true });

        /* 監聽pathname 設定導覽列的 activeId  */
        const { pathname, search = '' } = store.getState()['router'].location;
        store.dispatch(
          emit(
            SET_ACTIVE_MAIN,
            regMain.test(pathname) ? pipe(split('/'), last)(pathname) : -1
          )
        );
        analytics.logPageView(pathname);

        return render();
      }
    }),
    document.getElementById('container')
  );
} catch (error) {
  console.log('ERROR: ', error);
}
