/* @flow */
import React from 'react';
import { useLinkTo } from '@core/hooks';
import { withStyle } from '@core/container';
import { isNil, F } from 'ramda';
import styles from './main-title.scss';

export default (React.memo: any)(
  withStyle(styles)(({ title, id = null }) => {
    const linkTo = useLinkTo();
    return (
      <div
        styleName="main-title h5"
        onClick={isNil(id) ? F : linkTo(`/main/${id}`)}
        style={isNil(id) ? {} : { cursor: 'pointer' }}>
        {title}
      </div>
    );
  })
);
