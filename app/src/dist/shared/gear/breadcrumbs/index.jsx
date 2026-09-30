/* @flow */
import React from 'react';
import { useLinkTo } from '@core/hooks';
import { Typography, Breadcrumbs, Link } from '@material-ui/core';
import { withStyle } from '@core/container';
import { map, addIndex } from 'ramda';
import styles from '@assets/mixins/spacing.scss';

const mapIndexed = addIndex(map);

/**
 * Breadcrumbs
 * @desc 麵包屑
 * @property {Array<{name:string,path:string}>} [list=[]] 首頁之後的路徑
 * @property {?string} [tail=null] 最後的路徑
 * @example
 *   <Breadcrumbs list=[] tail="隱私權聲明"/>
 */
export default withStyle(styles)(({ list = [], tail = null }) => {
  const linkTo = useLinkTo();

  return (
    <div styleName="m-2">
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" styleName="link" onClick={linkTo('/')}>
          首頁
        </Link>
        {mapIndexed(
          ({ name, path }, idx) => (
            <Link
              key={`bread-${idx}`}
              color="inherit"
              styleName="link"
              onClick={linkTo(path)}>
              {name}
            </Link>
          ),
          list
        )}
        {tail ? <Typography color="textPrimary">{tail}</Typography> : null}
      </Breadcrumbs>
    </div>
  );
});
