/* @flow */
import React, { Fragment } from 'react';
import { useBreakPoint } from '@core/hooks';
import QueryData from './query-data';
import Mobile from './mobile';
import PC from './pc';

export default ({ children, isHome }: any) => {
  const deviceTheme = useBreakPoint();

  return (
    <Fragment>
      <QueryData />
      {deviceTheme === 'mobile' ? (
        <Mobile>{children}</Mobile>
      ) : (
        <PC isHome={isHome}>{children}</PC>
      )}
    </Fragment>
  );
};
