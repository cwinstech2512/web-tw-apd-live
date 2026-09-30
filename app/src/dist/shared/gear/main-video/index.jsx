/* @flow */
import React from 'react';
import { withStyle } from '@core/container';
import { useBreakPoint, usePathSelector } from '@core/hooks';
import YoutubeEmbed from '@src/dist/shared/gear/youtube-iframe';
import { isEmpty } from 'ramda';

export default (React.memo: any)(
  withStyle()(() => {
    const deviceTheme = useBreakPoint();
    const video = usePathSelector('wp-video', '');

    if (isEmpty(video)) return null;

    return (
      <div styleName={deviceTheme === 'mobile' ? 'm-1 mb-2' : ''}>
        <YoutubeEmbed url={video} />
      </div>
    );
  })
);
