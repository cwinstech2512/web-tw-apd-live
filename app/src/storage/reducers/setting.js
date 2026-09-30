/* @flow */
import { reducerCreator } from '@core/reducer';

/* action type */
export const TOGGLE_FONT_SIZE = 'TOGGLE_FONT_SIZE';
export const SET_ACTIVE_MAIN = 'SET_ACTIVE_MAIN';
export const SETTING_RESTORE = 'SETTING_RESTORE';

/**
 * 個人喜愛設定
 * ex: 字級大小
 */
export const defaultState = {
  fontSizeBigger: false, // 字級大小
  activeId: -1 // 主分類導覽的 activeId
};

export default reducerCreator(defaultState, {
  [TOGGLE_FONT_SIZE]: ({ fontSizeBigger, ...other }) => ({
    ...other,
    fontSizeBigger: !fontSizeBigger
  }),

  [SET_ACTIVE_MAIN]: (preState, activeId) => ({
    ...preState,
    activeId
  }),

  [SETTING_RESTORE]: () => defaultState
});
