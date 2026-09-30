/**
 * action effect - photonConnect、photonDisconnect、photonEmit 的監聽
 * @link https://doc-api.photonengine.com/en/javascript/current/Photon.PhotonPeer.html
 */
import {
  call,
  fork,
  take,
  put,
  all,
  cancel,
  cancelled,
  takeLatest
} from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import { findCombineConfig } from '@core/roots';
import { cancelAll } from '@core/action/effects';
import taskManager from '../task-manager';
import {
  pipe,
  values,
  forEach,
  reduce,
  keysIn,
  append,
  map,
  has,
  keys
} from 'ramda';

/**
 * -----------------------------------------------
 * 常數設定
 * -----------------------------------------------
 */

/* photon 伺服器網址 */
const HOST_URL = CONFIG.REMOTE.PHOTON_URL;

/* Code of received response */
const OPERATION_CODE = 100;

/* [統整] 從 config 中拿寫好的 sagas */
const _flattenSaga = reduce(
  (sagaSet, saga) => {
    forEach(key => {
      if (!has(key, sagaSet)) sagaSet[key] = [];

      sagaSet[key] = append(saga[key], sagaSet[key]);
    }, keysIn(saga));
    return sagaSet;
  },
  {},
  findCombineConfig('sagas')
);

/* [轉換] 將 saga 轉成想要的格式 */
const rootSagas = reduce(
  (obj, key) => {
    obj[key] = response =>
      function*() {
        yield all(map(sagaFunc => call(sagaFunc, response), _flattenSaga[key]));
      };
    return obj;
  },
  {},
  keys(_flattenSaga)
);

/**
 * -----------------------------------------------
 * 行為操作
 * -----------------------------------------------
 */

/**
 * build
 * @desc 產生 photon 連線物件
 * @return {PhotonClientObject}
 * @typedef {Object} PhotonClientObject
 */
const build = () => new Photon.PhotonPeer(HOST_URL);

/**
 * connect
 * @desc 連線操作
 * @param {PhotonClientObject} client
 */
const connect = client => {
  console.debug('%c[PHOTON] photon emit connect.' + HOST_URL, 'color:gray;');
  if (!client.isConnected()) client.connect();
};

/**
 * disconnect
 * @desc 斷線操作
 * @param {PhotonClientObject} client
 */
const disconnect = client => {
  console.debug('%c[PHOTON] photon emit disconnect.', 'color:gray;');
  client.disconnect();
};

/**
 * @desc photon take 的 callback
 * @param {number} code api代碼
 * @param {Object} payload photonTake 的 payload
 *
 */
const takeCallbackEmit = (code, payload) =>
  function*() {
    return yield put({
      type: `SAGA_PHOTON_EMIT_${code}`,
      payload
    });
  };

/**
 * updateStatus
 * @desc 更新連線狀態
 * @param {Photon.PhotonPeer.StatusCodes} statusCode
 * @return {function}
 */
const updateStatus = statusCode => {
  console.debug(
    '%c[PHOTON] addPeerStatusListener ' + statusCode,
    'color:gray;'
  );
  return function*() {
    /* 連線關閉，清掉所有 task */
    if (statusCode === 'connectClosed') yield put(cancelAll());
    yield put({ type: 'PHOTON_STATUS_SET', payload: statusCode });
  };
};

/**
 * emitTask
 * @desc 請求發送的任務
 * @param {PhotonClientObject} client
 */
const emitTask = client => {
  return function*(payload) {
    console.debug('%c[PHOTON SEND]:', 'color:green;', payload);
    client.sendOperation(OPERATION_CODE, [0, payload], true);
  };
};

/**
 * response
 * @desc api response 的處理
 * @param {function} emit 給 eventHandler 處理的回傳
 * @return {(res:Object) => void} 來自 server 的回傳資料
 */
const response = emit => res => {
  const { errCode, errMsg, vals } = res;
  if (errCode === 0) {
    /* 為零表示格式正確 */
    const { code, data, errCode, time } = vals[0];
    console.debug('%c[PHOTON GET RESPONSE]:', 'color:palegreen;', code, res);
    /* 如果rootSagas中有監聽這個訊號的處理 */
    if (rootSagas.hasOwnProperty(code)) {
      emit(
        errCode === 1
          ? rootSagas[code](success(data, time))
          : rootSagas[code](failed(errCode.toString(), time))
      );
      /* 這個是給 photonTake 系列用的 */
      emit(
        takeCallbackEmit(
          code,
          errCode === 1 ? success(data, time) : failed(errCode.toString(), time)
        )
      );
    }
  } else {
    console.debug('%c[PHOTON]' + errMsg, 'color:red;');
  }
};

/**
 * eventResponse
 * @desc 主動發送或稱廣播(event response)的訊息處理
 * @param {function} emit 給 eventHandler 處理的回傳
 * @return {(Object) => void} 來自 server 的回傳資料
 */
const eventResponse = emit => ({ vals }) => {
  const { code, data, time } = vals[0];
  console.debug('%c[PHOTON GET EVENT RESPONSE]:', 'color:yellow;', code, vals);
  if (rootSagas.hasOwnProperty(code)) {
    /* 主動發送過來的一律視為 success */
    emit(rootSagas[code](success(data, time, false)));
    emit(takeCallbackEmit(code, success(data, time, false)));
  }
};

/**
 * -----------------------------------------------
 * 格式轉換
 * -----------------------------------------------
 */

/**
 * success
 * @desc 格式轉換 - success
 * @param {any} data 後端丟過來的資料
 * @param {number} time 後端丟過來的時間
 * @param {boolean} isResponse 是不是api的response(非廣播)
 */
const success = (data, time, isResponse = true) => ({
  isResponse,
  success: true,
  data,
  time
});

/**
 * failed
 * @desc 格式轉換 - failed
 * @param {string} reason 失敗理由
 * @param {number} time 後端丟過來的時間
 * @param {boolean} isResponse 是不是api的response(非廣播)
 */
const failed = (reason, time, isResponse = true) => ({
  isResponse,
  success: false,
  errorMessage: reason,
  time
});

/**
 * -----------------------------------------------
 * 行為監聽
 * -----------------------------------------------
 */

/**
 * subscribe
 * @desc 一系列的監聽
 * @param {PhotonClientObject} client
 */
const subscribe = client => {
  return eventChannel(emit => {
    /* 監聽回傳 */
    client.addResponseListener(OPERATION_CODE, response(emit));
    client.addEventListener(OPERATION_CODE, eventResponse(emit));
    /* 連線狀態監聽 */
    pipe(
      values,
      forEach(statusCode => {
        client.addPeerStatusListener(statusCode, () => {
          emit(updateStatus(statusCode));
          /* 連線關閉就終止 */
          if (statusCode === 'connectClosed') emit(END);
        });
      })
    )(Photon.PhotonPeer.StatusCodes);

    /* 綁好監聽再連線 */
    connect(client);

    return () => {
      /* 終止時斷線 */
      disconnect(client);
    };
  });
};

/**
 * eventHandler
 * @desc 接收監聽的回傳
 * @param {PhotonClientObject} client
 */
function* eventHandler(client) {
  const channel = yield call(subscribe, client);
  try {
    while (true) {
      const saga = yield take(channel);
      yield call(saga);
    }
  } finally {
    channel.close();
  }
}

/**
 * emit
 * @desc 發送行為的監聽
 * @param {PhotonClientObject} client
 */
function* emit(client) {
  while (true) {
    const { payload } = yield take('SAGA_PHOTON_EMIT');
    const task = yield fork(emitTask(client), payload);
    yield call(taskManager.append, task);
  }
}

/**
 * -----------------------------------------------
 * 流程
 * -----------------------------------------------
 */

/* 連線流程 */
function* start() {
  /* 建立 photon 連線物件 */
  const client = yield call(build);
  yield all([
    /* 開始回傳的監聽 */
    fork(eventHandler, client),
    /* 開始發送的監聽 */
    fork(emit, client),
    /* 開始斷線的監聽 */
    fork(takeLatest, 'SAGA_PHOTON_STOP', disconnect, client)
  ]);
}

/* 等待 action type: SAGA_PHOTON_START 的觸發 */
export default function*() {
  yield fork(takeLatest, 'SAGA_PHOTON_START', start);
}
