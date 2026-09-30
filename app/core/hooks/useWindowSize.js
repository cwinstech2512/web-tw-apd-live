/* @flow */
import { useState, useEffect } from 'react';

/**
 * useWindowSize
 * @link https://usehooks.com/useWindowSize/
 * @returns {Array<number|undefined>} 螢幕寬與高，單位 px
 *
 * @example
 *
 * import { useWindowSize } from '@core/hooks'
 *
 * export const Component = () => {
 *   const [width, height] = useWindowSize();
 *
 *   return <div>window size: {width}px / {height}px</div>
 * }
 */
function useWindowSize() {
  const isClient = typeof window === 'object';

  function getSize() {
    return [
      isClient ? window.innerWidth : undefined,
      isClient ? window.innerHeight : undefined
    ];
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) return () => false;

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

export default useWindowSize;
