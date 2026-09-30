/**
 * action effect - polling 的監聽
 */
import { put, take, call, fork, actionChannel } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import { requestInterval } from '@core/helpers/raf-timer';
import taskManager from '../task-manager';

/* 任務 */
export function* pollingTask(payload) {
  const channel = yield call(subscribe, payload);
  try {
    /* 先執行一次 */
    yield put(payload.action);
    /* 開始 interval 監聽 */
    while (true) {
      /* 等待 subscribe 觸發 */
      let action = yield take(channel);
      /* 收到來自 subscribe 的 emit 就會往下執行 */
      yield put(action);
    }
  } finally {
    channel.close();
  }
}

export function subscribe({ action, interval }) {
  return eventChannel(emit => {
    let request = requestInterval(() => {
      /* 一段時間執行 */
      emit(action);
    }, interval);

    return () => {
      /* 監聽結束要做的事 */
      request.clear();
    };
  });
}

export default function*() {
  /* 建立一個 channel 監聽 */
  const pollingChannel = yield actionChannel('SAGA_POLLING');
  try {
    while (true) {
      /* 只有在 action type === SAGA_POLLING 的時候，會往下執行 */
      let action = yield take(pollingChannel);
      /* 開始運行任務 */
      const { payload } = action;
      const task = yield fork(pollingTask, payload);
      /* 寫入任務識別 */
      action.task = task;
      /* 將行為添加到任務管理中 */
      yield call(taskManager.append, task);
    }
  } finally {
    /* 發生例外就中斷監聽 */
    pollingChannel.close();
  }
}
