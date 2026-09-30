/**
 * 遠端資源的設定都在這裡
 */

/* share remote */
module.exports.SHARE_URL =
  process.env.PUBLIC_SITE_URL || 'https://www.apdaily.com.tw/';

/* wordpress api remote */
module.exports.WP_URL =
  process.env.WP_API_ORIGIN || 'https://wp.apdaily.com.tw/';

/* member login api remote */
module.exports.MEMBER_URL = process.env.MEMBER_API_ORIGIN || '';

/* 公開靜態版預設停用會員 API；只有明確提供設定時才啟用。 */
module.exports.MEMBER_ENABLED = process.env.ENABLE_MEMBER_API === 'true';
module.exports.TOKEN_1_KEY = process.env.MEMBER_TOKEN_KEY || '';

/* FB APP ID */
module.exports.FB_APP_ID = '728712041548299';
// '279536576364406';

/* Twitter username  */
module.exports.TWITTER_NAME = 'apdaily';

/* Rss Link  */
module.exports.RSS_LINK = 'https://wp.apdaily.com.tw/feed/';
