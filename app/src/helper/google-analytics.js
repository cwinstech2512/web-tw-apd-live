/* @flow */
import ReactGA from 'react-ga';
import {
  keys,
  map,
  join,
  pipe,
  evolve,
  toString,
  is,
  ifElse,
  identity
} from 'ramda';

const methods: Object = {};

/* 初始化 */
methods.initGA = () => false;

/**
 * 自定義的設定值
 * @param props
 */
methods.logSet = (props: Object) => false;

/**
 * 頁面
 * @param {string} pathname 路徑
 */
methods.logPageView = (pathname: string) => false;

/**
 * 事件追蹤，opts 中 value 一定要數值，label 一定要字串
 * @param {string} category 事件分類
 * @param {string} action 行為
 * @param {{value?:number, label?:string}} [opts={}] 其他條件
 */
methods.logEvent = (category: string, action: string, opts?: Object = {}) =>
  false;

/**
 * 錯誤追蹤
 * @param {string} description 錯誤描述
 * @param {string} file 發生錯誤的檔案位置
 * @param {any} [object={}] 錯誤的值
 * @param {0|1|2|3} [level=0] 錯誤等級：0-弱 1-中 2-強 3-後端資料有誤
 */
methods.logException = (
  description: string,
  file: string,
  object?: Object = {},
  level?: 0 | 1 | 2 | 3 = 0
) => false;

if (process.env.NODE_ENV === 'production' && CONFIG.GA.ENABLED) {
  methods.initGA = () => {
    ReactGA.initialize(CONFIG.GA.TRACKING_ID);
  };

  methods.logPageView = (pathname: string) => {
    ReactGA.pageview(pathname);
  };

  methods.logSet = (props: Object) => {
    ReactGA.set(props);
  };

  methods.logEvent = (category: string, action: string, opts?: Object = {}) => {
    opts = (evolve: any)({
      label: pipe(ifElse(is(String), identity, toString)),
      value: str => (isNaN(parseFloat(str)) ? 0 : parseFloat(str))
    })(opts);
    ReactGA.event({ category, action, ...opts });
  };

  methods.logException = (
    description: string,
    file: string,
    object?: Object = {},
    level?: 0 | 1 | 2 | 3 = 0
  ) => {
    let category = '錯誤追蹤-弱';
    switch (level) {
      case 1:
        category = '錯誤追蹤-中';
        break;
      case 2:
        category = '錯誤追蹤-強';
        break;
      case 3:
        category = '錯誤追蹤-後端資料有誤';
        break;
    }
    ReactGA.event({
      category,
      action: description,
      label: file
    });
    ReactGA.exception({
      description: `${description}, at ${file}`,
      fatal: level === 3
    });
  };
} else if (process.env.NODE_ENV === 'development') {
  methods.initGA = () => {
    console.log('GA init', CONFIG.GA.TRACKING_ID);
  };

  methods.logPageView = (pathname: string) => {
    console.log(`GA Logging pageview for ${pathname}`);
  };

  methods.logSet = (props: Object) => {
    console.log(`GA logSet: ${JSON.stringify(props)}`);
  };

  methods.logEvent = (category: string, action: string, opts?: Object = {}) => {
    if ('value' in opts && isNaN(parseFloat(opts.value)))
      throw 'opt.value 格式錯誤';

    opts = (evolve: any)({
      label: pipe(ifElse(is(String), identity, toString)),
      value: str => (isNaN(parseFloat(str)) ? 0 : parseFloat(str))
    })(opts);
    console.log(`GA logEvent: ${category}, ${action}, ${JSON.stringify(opts)}`);
  };

  methods.logException = (
    description: string,
    file: string,
    object?: Object = {},
    level?: 0 | 1 | 2 | 3 = 0
  ) => {
    let category = '錯誤追蹤-弱';
    switch (level) {
      case 1:
        category = '錯誤追蹤-中';
        break;
      case 2:
        category = '錯誤追蹤-強';
        break;
      case 3:
        category = '錯誤追蹤-後端資料有誤';
        break;
    }
    console.log(`GA Exception: ${category} @ ${file}, ${description}`);
  };
}

export const initGA = methods.initGA;
export const logSet = methods.logSet;
export const logPageView = methods.logPageView;
export const logEvent = methods.logEvent;
export const logException = methods.logException;
