/**
 * redux-saga 配置
 * @link https://redux-saga.js.org/docs/introduction/BeginnerTutorial.html
 */
import createSagaMiddleware from 'redux-saga';
import { fork, all } from 'redux-saga/effects';
import { values, map } from 'ramda';

/* 自己寫的 watcher */
import * as watchers from './watcher';

/* 啟動所有監聽 */
function* startWatch() {
  yield all(map(fork, values(watchers)));
}

/* 建立一個 saga middleware */
const sagaMiddleware = createSagaMiddleware();

/* 添加執行行為到 __run__ 下，方便 store 引用 */
sagaMiddleware.__run__ = () => sagaMiddleware.run(startWatch);

export default sagaMiddleware;
