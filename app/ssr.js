import { Helmet, HelmetProvider } from 'react-helmet-async';
import router from '@core/router';
// var app = express();
import React from 'react';
import ReactDOM from 'react-dom';
import { renderToString } from 'react-dom/server';
import { StaticRouter, BrowserRouter } from "react-router-dom";

/* 監聽 crash */
const windowError = err => {
  console.log('CRASH: ' + err.message, window.location.pathname);
};

const helmetContext = {};
const c_router = router({
  router_index: '/',
  i18n_init: CONFIG.LOCALE.LANGUAGE_INIT,
  i18n_fallback: CONFIG.LOCALE.LANGUAGE_FALLBACK,
  routerMiddleware: (store, routerParams) => (render, redirectTo) => {
    return render()
  }
})
const App = () => (
  <div>
    {c_router}
  </div>
  // <HelmetProvider context={helmetContext}>
  //   <Helmet>
  //     <title>Hello world page</title>
  //   </Helmet>
  //   <h1>Hello world!</h1>
  // </HelmetProvider>
);

if (document.body) {
  const div = document.getElementById('container');
  console.log("div", div)
  ReactDOM.hydrate(
    <BrowserRouter><App /></BrowserRouter>, div);
}

export default () => {
  // This testing flag tells react-helmet-async to use
  // server config when document is present in UMD bundle.
  HelmetProvider.canUseDOM = false;

  const html = renderToString(<StaticRouter location={req.url}><App /></StaticRouter>);

  const { helmet } = helmetContext;

  // If you return an array instead of a string, the plugin
  // assumes the first item in the array is the rendered
  // markup and appends the second to the head of the page.
  return [html, helmet.title.toString()];
};