/* @flow */
import React, { useState, useEffect, useRef } from 'react';
import { useBreakPoint } from '@core/hooks';
import { withStyle } from '@core/container';
import copy from 'copy-to-clipboard';
import { requestTimeout } from '@core/helpers/raf-timer';
import styles from './share.scss';
import Popup from 'reactjs-popup';
import QRCode from 'react-qr-code';

/**
 * ShareMedia
 * @desc 社群分享
 * @example
 *   <ShareMedia post={post} />
 */
export default withStyle(styles)(({ post = null }: { post: Object }) => {
  const deviceTheme = useBreakPoint();
  const _req = useRef(null);
  const [tooltip, setTooptip] = useState('');
  const url = `${CONFIG.REMOTE.SHARE_URL}article/${post ? post.id : ''}`;
  // const url = `${CONFIG.REMOTE.SHARE_URL}/post.php?id=${post ? post.id : ''}`;

  useEffect(() => {
    return () => {
      if (_req.current) {
        _req.current.clear();
      }
    };
  }, []);

  const share = type => () => {
    if (!post) return null;
    let link = null;
    switch (type) {
      case 'fb':
        link =
          'https://m.facebook.com/sharer.php?u=' +
          encodeURIComponent(url) +
          '&quote=' +
          encodeURIComponent(post.title) +
          '&picture=' +
          encodeURIComponent(post.previewImg) +
          '&title=' +
          encodeURIComponent(post.title);
        break;
      case 'line':
        link =
          'http://line.naver.jp/R/msg/text/?' +
          encodeURIComponent(post.title) +
          '%0D%0A' +
          encodeURIComponent(url);
        break;
      case 'tweet':
        link =
          'https://twitter.com/intent/tweet?text=' +
          encodeURIComponent(post.title) +
          '&url=' +
          encodeURIComponent(url) +
          (CONFIG.REMOTE.TWITTER_NAME !== ''
            ? '&via=' + CONFIG.REMOTE.TWITTER_NAME
            : '') +
          '&related=' +
          encodeURIComponent(post.previewImg);
        break;
      case 'weibo':
        link =
          'http://v.t.sina.com.cn/share/share.php?title=' +
          encodeURIComponent(post.title) +
          '&url=' +
          encodeURIComponent(url);
        break;
      case 'telegram':
        link =
          'https://t.me/share/url?url=' +
          encodeURIComponent(url) +
          '&text=' +
          encodeURIComponent(post.title);
        break;
      case 'messenger':
        link = 'fb-messenger://share?link=' + encodeURIComponent(url); //+ "&app_id="
        break;
    }

    // 電腦版，大螢幕的版本
    // link && window.open(link, "share", "height=400, width=400, toolbar=no, menubar=no, scrollbars=yes, resizable=yes, location=no, status=no")
    link && window.open(link, 'share');
  };

  const btnCopy = () => {
    copy(url);
    setTooptip('active');
    _req.current = requestTimeout(() => {
      setTooptip('');
    }, 1000);
  };

  return (
    <div styleName="share">
      <div styleName="share-box">
        <div styleName="share-btn share-fb" onClick={share('fb')} />
        <div styleName="share-btn share-line" onClick={share('line')} />
        <div styleName="share-btn share-twitter" onClick={share('tweet')} />
        {/*<div styleName="share-btn share-weibo" onClick={share('weibo')} />*/}
        <div styleName="share-btn share-telegram" onClick={share('telegram')} />

        <Popup
          trigger={<div styleName="share-btn share-wechat" />}
          position="bottom center">
          <div style={{ background: 'white', padding: '16px' }}>
            <QRCode value={url} />
          </div>
        </Popup>
        {deviceTheme === 'mobile' ? (
          <div
            styleName="share-btn share-messenger"
            onClick={share('messenger')}
          />
        ) : null}
        <div styleName="share-btn share-other" onClick={btnCopy}>
          <span aria-hidden="true">
            <i class="fas fa-link"></i>
          </span>
          <span styleName={`tooltip-text ${tooltip}`}>copied</span>
        </div>
      </div>
    </div>
  );
});
