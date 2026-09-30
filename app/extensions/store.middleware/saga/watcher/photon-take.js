/**
 * action effect - photonTake 的監聽
 */
import { put, take, call, fork } from 'redux-saga/effects';
import taskManager from '../task-manager';

/* 任務 */
export function* takeTask(payload) {
  let { reserve, api, callback } = payload;
  /* 每次執行完 reserve - 1 */
  while (reserve > 0) {
    const action = yield take('SAGA_PHOTON_EMIT_' + api);
    reserve--;
    /* 執行監聽事件 */
    const actionOrVoid = yield call(callback, action.payload);
    /* 如果有回傳 action 就 put 他 */
    if (actionOrVoid) yield put(actionOrVoid);
  }
}

export default function*() {
  while (true) {
    /* 只有在 action type === SAGA_PHOTON_TAKE 的時候，會往下執行 */
    let action = yield take('SAGA_PHOTON_TAKE');
    /* 開始運行任務 */
    const { payload } = action;
    const task = yield fork(takeTask, payload);
    /* 寫入任務識別 */
    action.task = task;
    /* 將行為添加到任務管理中 */
    yield call(taskManager.append, task);
  }
}
