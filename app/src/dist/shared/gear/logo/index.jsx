/* @flow */
import React from 'react';
import { withStyle } from '@core/container';
import styles from './logo.scss';

/**
 * Logo
 * @desc Logo
 * @property {''|'center'} [position=''] 位置
 * @property {''|'white'|'text'} [type=''] 用
 * @example
 *   <Logo position="center" type={'white'} />
 */
export default withStyle(styles)(({ type = '', position = '' }) => (
  <div style={{ width: '250px', height: '100%' }}>
    <div
      styleName={`logo animated tada ${position} ${type}`}
      style={{ width: '143px', float: 'left' }}></div>
    {/* <div styleName={`logo animated tada ${position} uesB`}  style={{width: "100px", float: "right"}}>

    </div> */}
  </div>
));
