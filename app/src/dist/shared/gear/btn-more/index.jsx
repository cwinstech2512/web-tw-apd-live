/* @flow */
import React from 'react';
import { useLinkTo } from '@core/hooks';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  btn: {
    width: '100%',
    borderRadius: '0',
    fontSize: '13px',
    fontWeight: '400',
    padding: '3px 0',
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.main,
      color: '#fff'
    }
  }
}));

export default ({ categoryId }: { categoryId: string }) => {
  const classes = useStyles();
  const linkTo = useLinkTo();
  return (
    <Box p={1} mb={2}>
      <Button
        variant="outlined"
        color="primary"
        className={classes.btn}
        onClick={linkTo(`/main/${categoryId}`)}>
        + 看更多 +
      </Button>
    </Box>
  );
};
