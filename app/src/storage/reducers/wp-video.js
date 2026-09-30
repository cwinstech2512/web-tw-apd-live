/* @flow */
import { reducerCreator } from '@core/reducer';
/* action type */
export const VIDEO_DATA = 'VIDEO_DATA';
export const VIDEO_RESTORE = 'VIDEO_RESTORE';

export const defaultState: string = '';

export default reducerCreator(defaultState, {
  [VIDEO_DATA]: (prestate, video) => video,

  [VIDEO_RESTORE]: () => defaultState
});
