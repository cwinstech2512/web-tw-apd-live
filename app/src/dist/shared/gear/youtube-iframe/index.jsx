/* @flow */
import React from 'react';
import { withStyle } from '@core/container';

import { ErrorMsgSm } from '@src/dist/shared/gear/error-block';
import styles from './video.scss';

/* 取得 youtube id */
const youtube_parser = url => {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
};

export default (React.memo: any)(
  withStyle(styles)(({ url = '' }) => {
    if (!url) return <ErrorMsgSm />;

    const videoId = youtube_parser(url);
    if (!videoId) return <ErrorMsgSm />;

    return (
      <div styleName="container">
        <iframe
          styleName="video"
          src={`https://www.youtube.com/embed/${videoId}?`}
          frameBorder="0"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"></iframe>
      </div>
    );
  })
);
