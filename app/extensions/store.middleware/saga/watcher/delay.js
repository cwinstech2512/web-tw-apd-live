/**
 * action effect - delay 的監聽
 */
import { put, take, call, fork, actionChannel } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import taskManager from '../task-manager';

/* 任務 */
function* delayTask({ action, duration }) {
  /* 直接使用 redux-saga 提供的 delay 行為 */
  yield call(delay, duration);
  /* 上面的延遲時間到才會往下 */
  yield put(action);
}

export default function*() {
  /* 建立一個 channel 監聽 */
  const delayChannel = yield actionChannel('SAGA_DELAY');
  try {
    while (true) {
      /* 只有在 action type === SAGA_DELAY 的時候，會往下執行 */
      let action = yield take(delayChannel);
      /* 開始運行任務 */
      const { payload } = action;
      const task = yield fork(delayTask, payload);
      /* 寫入任務識別 */
      action.task = task;
      /* 將行為添加到任務管理中 */
      yield call(taskManager.append, task);
    }
  } finally {
    /* 發生例外就中斷監聽 */
    delayChannel.close();
  }
}
