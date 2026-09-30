/* @flow */
import { reducerCreator } from '@core/reducer';

/* actions */
export const ACTION_MODAL = {
  ON: 'MODAL_ON', // 開啟視窗
  OFF: 'MODAL_OFF' // 關閉視窗
};

/* type */
export type PayloadModal = {
  ON: { title: string, content: string, applyFunction?: any },
  OFF: null
};
type ModalState = {
  title: string,
  content: string,
  isDisplay: boolean,
  applyFunction: any,
  isCheck: boolean
};

/* defaultState */
export const defaultState: ModalState = {
  title: '',
  content: '',
  isDisplay: false,
  applyFunction: null,
  isCheck: true
};

export default reducerCreator(defaultState, {
  [ACTION_MODAL.ON]: (
    preState: ModalState,
    { title, content, applyFunction = null, isCheck = true }
  ): ModalState => ({
    title,
    content,
    applyFunction,
    isCheck,
    isDisplay: true
  }),

  [ACTION_MODAL.OFF]: (preState: ModalState): ModalState => defaultState
});
