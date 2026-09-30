/* @flow */
import React from 'react';
import { useBreakPoint, useLinkTo, usePathSelector } from '@core/hooks';
import { withStyle } from '@core/container';

import YoutubeEmbed from '@src/dist/shared/gear/youtube-iframe';
import { isNil } from 'ramda';

import styles from '../slider.scss';

const MAX_LENGTH = {
  mobile: 30,
  pc: 20
};

/**
 * VideoItem
 * @desc 滑動的影音項目
 * @property {string} articleId 類別id
 * @example
 *   <VideoItem articleId={107} />
 */
export default (React.memo: any)(
  withStyle(styles)(({ articleId = 0 }) => {
    const deviceTheme = useBreakPoint();
    const linkTo = useLinkTo();
    const { title = '', youtube } = usePathSelector(
      `wp-posts.posts.${articleId}`,
      {}
    );

    if (articleId === 0)
      return <div styleName="text-center">article id error</div>;

    return (
      <div styleName="slider-normal">
        <div styleName="mb-2 slider-video">
          <YoutubeEmbed url={youtube} />
        </div>
        <div
          styleName="mb-4 mt-2 slider-normal-title slider-title"
          onClick={linkTo(`/article/${articleId}`)}>
          {title.length >= MAX_LENGTH[deviceTheme]
            ? `${title.substr(0, MAX_LENGTH[deviceTheme])}..`
            : title}
        </div>
      </div>
    );
  })
);
