/* @flow */
import React from 'react';
import { withStyle } from '@core/container';
import VideoItem from '@src/dist/shared/gear/block-video/swiper/video';
import { times, isEmpty, tail, min } from 'ramda';

/**
 * SectionVideo
 * @desc 文章列表
 * @requires
 * @property {Array<number>} list 文章id列表 from jsx
 * @property {number} [max=5] 列表個數 from jsx
 * @example
 *   <SectionVideo list={[100,111,112]} max={10} />
 */
export default withStyle()(
  ({ list, max = 5 }: { list: Array<number>, max?: number }) => {
    if (isEmpty(list)) return null;

    return (
      <div>
        {times(
          idx => (
            <div key={`video-${list[idx]}`} styleName="mb-3">
              <VideoItem articleId={list[idx]} />
            </div>
          ),
          min(list.length, max)
        )}
      </div>
    );
  }
);
