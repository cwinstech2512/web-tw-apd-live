import React from 'react';
import { withStyle } from '@core/container';
import { validId } from '@src/helper/transformData';

import { FacebookProvider, Comments } from 'react-facebook';
import styles from '@assets/mixins/spacing.scss';

const url = CONFIG.REMOTE.SHARE_URL;

/**
 * FbComment
 * @desc FB 留言外掛
 * @property {string} id 文章id from jsx
 * @example
 *   <FbComment id="10"/>
 */
export default React.memo(
  withStyle(styles)(({ id = null }) => {
    if (!id || !validId(id)) return null;

    return (
      <div styleName="mb-2">
        <FacebookProvider
          appId={CONFIG.REMOTE.FB_APP_ID}
          language="zh_TW"
          version="v7.0">
          <Comments href={`${url}/article/${id}`} width="100%" />
        </FacebookProvider>
      </div>
    );
  })
);
