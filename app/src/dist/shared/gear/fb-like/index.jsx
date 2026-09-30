import React from 'react';
import { validId } from '@src/helper/transformData';
import { FacebookProvider, Like } from 'react-facebook';

const url = CONFIG.REMOTE.SHARE_URL;

/**
 * FbLike
 * @desc FB 按讚
 * @property {string} id 文章id from jsx
 * @example
 *   <FbLike id="10"/>
 */
export default React.memo(({ id }: { id: ?string } = { id: null }) => {
  if (!id || !validId(id)) return null;

  return (
    <div>
      <div id="fb-root"></div>
      <script async defer crossorigin="anonymous" src="https://connect.facebook.net/zh_TW/sdk.js#xfbml=1&version=v15.0&appId=728712041548299&autoLogAppEvents=1" nonce="Zwu7l86V"></script>
      <div class="fb-like" data-href={`https://www.facebook.com/apdnewmedia.cn/`} data-width="" data-layout="button_count" data-action="like" data-size="small" data-share="false"></div>
    </div>
  );
});
