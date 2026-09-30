/* @flow */
import React from 'react';
import { withStyle } from '@core/container';
import preView from './preview.png';
import styles from './img.scss';

/**
 * Image
 * @desc 圖＋處理錯誤（預設圖片）
 * @requires
 * @property {string} [className=''] from jsx
 * @example
 *   <Image className='' alt='' src=''/>
 */
export default withStyle(styles)(({ className = '', alt = '', src = '' }) => {
  const imgOnError = e => {
    e.target.src = preView;
  };

  return (
    <img
      className={className}
      alt={alt}
      src={src || preView}
      onError={imgOnError}
    />
  );
});
