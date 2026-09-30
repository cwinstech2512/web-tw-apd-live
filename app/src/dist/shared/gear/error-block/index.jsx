/* @flow */
import React from 'react';
import Loading from '../loading';
import { withStyle } from '@core/container';
import styles from './error.scss';

export const ErrorMsg = withStyle(styles)(({ msg = '無效連結' }) => (
  <div styleName="error">
    <div styleName="loading">
      <Loading />
    </div>
    <div styleName="error-block">
      <div styleName="error-title">{msg}</div>
      <div styleName="error-icon">
        <span aria-hidden="true">
          <i class="fas fa-exclamation-triangle"></i>
        </span>
      </div>
    </div>
  </div>
));

export const ErrorMsgSm = withStyle(styles)(({ msg = '無效連結' }) => (
  <div styleName="error-sm">
    <div styleName="loading">
      <Loading />
    </div>
    <div styleName="error-sm-block">
      <div styleName="error-sm-icon">
        <span aria-hidden="true">
          <i class="fas fa-exclamation-triangle"></i>
        </span>
      </div>
      <div styleName="error-sm-title">{msg}</div>
    </div>
  </div>
));

export const EmptyResult = withStyle(styles)(
  ({ title = '尚無文章' }: { title: string }) => (
    <div styleName="empty">
      <div styleName="loading">
        <Loading />
      </div>
      <div styleName="empty-title">{title}</div>
    </div>
  )
);
