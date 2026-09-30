/* @flow */
import React from 'react';
import { useLinkTo } from '@core/hooks';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  link: {
    color: `${theme.palette.primary.main} !important`,
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline !important'
    }
  }
}));

export default () => {
  const classes = useStyles();
  const linkTo = useLinkTo();
  return (
    <div style={{ marginBottom: '2rem' }}>
      當您點選登入本網站成為青傳媒新聞報員，視為同意
      <Link
        color="primary"
        className={classes.link}
        onClick={linkTo('/privacy')}>
        本網站聲明、政策及使用條款
      </Link>
      ．
    </div>
  );
};
