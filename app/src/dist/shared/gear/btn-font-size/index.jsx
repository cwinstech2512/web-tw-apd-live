/* @flow */
import React from 'react';
import { emit } from '@core/action/effects';
import { useDispatch } from 'react-redux';
import { withStyle } from '@core/container';
import { TOGGLE_FONT_SIZE } from '@src/storage/reducers/setting';
import styles from './btn-font-size.scss';

/**
 * BtnFontSize
 * @desc 切換文字大小
 * @example
 *   <BtnFontSize />
 */
export default withStyle(styles)(({}) => {
  const dispatch = useDispatch();
  const toggleFont = () => {
    dispatch(emit(TOGGLE_FONT_SIZE));
  };
  return (
    <div styleName="btn-font" onClick={toggleFont} onKeyDown={toggleFont}>
      AA
    </div>
  );
});
