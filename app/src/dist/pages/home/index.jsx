/* @flow */
import React from 'react';
import { useBreakPoint } from '@core/hooks';
import MobileHome from './mobile';
import PcHome from './pc';

/**
 * Home
 * @desc 首頁
 * @example
 *   <Home />
 */
export default () => {
  const deviceTheme = useBreakPoint();
  return deviceTheme === 'mobile' ? <MobileHome /> : <PcHome />;
};
