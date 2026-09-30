/* @flow */
import { useState, useEffect } from 'react';

/**
 * useBreakPoint
 * @link https://usehooks.com/useWindowSize/
 * @returns {Array<number|undefined>} 螢幕寬與高，單位 px
 *
 * @example
 *
 * import { useBreakPoint } from '@core/hooks'
 *
 * export const Component = () => {
 *   const deviceTheme = useBreakPoint();
 *
 *   return <div>Device Theme: {deviceTheme} </div>
 * }
 */
function useBreakPoint() {
  const isClient = typeof window === 'object';
  var iOS = /iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  function getSize() {
    return iOS
      ? 'mobile'
      : (isClient ? window.innerWidth : 0) >= 768
      ? 'pc'
      : 'mobile';
  }

  const [device, setDevice] = useState(getSize);

  useEffect(() => {
    if (!isClient) return () => false;

    function handleResize() {
      setDevice(getSize);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return device;
}

export default useBreakPoint;
