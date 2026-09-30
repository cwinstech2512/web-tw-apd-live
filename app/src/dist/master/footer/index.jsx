/* @flow */
import React from 'react';
import { useLinkTo } from '@core/hooks';
import { withStyle } from '@core/container';
import styles from './footer.scss';

const socialLink = {
  fb: 'https://www.facebook.com/apdnewmedia.cn/',
  ig: 'https://www.facebook.com/apdnewmedia.cn/',
  youtube: 'https://www.youtube.com/channel/UCE7hT2-s8Qt0ltuTaS8m2vQ',
  rss: 'https://wp.apdaily.com.tw/feed/'
};

export default withStyle(styles)(({ children }: any) => {
  const linkTo = useLinkTo();
  return (
    <footer styleName="footer mt-auto py-3">
      <div styleName="container text-secondary text-center">
        <div styleName="footer-icon-list">
          <div styleName="p-2">
            <a
              href={socialLink.fb}
              styleName="btn-lg btn-icon"
              aria-label="Facebook">
              <span aria-hidden="true">
                <i class="fab fa-facebook-square"></i>
              </span>
            </a>
          </div>
          <div styleName="p-2">
            <a
              href={socialLink.ig}
              styleName="btn-lg btn-icon"
              aria-label="Instagram">
              <span aria-hidden="true">
                <i class="fab fa-instagram"></i>
              </span>
            </a>
          </div>
          <div styleName="p-2">
            <a
              href={socialLink.youtube}
              styleName="btn-lg btn-icon"
              aria-label="Youtube">
              <span aria-hidden="true">
                <i class="fab fa-youtube"></i>
              </span>
            </a>
          </div>
          <div styleName="p-2">
            <a
              href={socialLink.rss}
              styleName="btn-lg btn-icon"
              aria-label="Rss">
              <span aria-hidden="true">
                <i class="fas fa-rss-square"></i>
              </span>
            </a>
          </div>
        </div>
        <p styleName="mb-1">
          <a onClick={linkTo('/privacy')} styleName="text-secondary link mr-2">
            隱私權政策
          </a>
          <a onClick={linkTo('/about')} styleName="text-secondary link mr-2">
            關於我們
          </a>
          {/* <a onClick={linkTo('/covenant')} styleName="text-secondary link">
            線上記者規約
          </a> */}
        </p>
        <div>
          <div>亞太日報社版權所有不得轉載。</div>
          <div>{`Copyright © ${new Date().getFullYear()} ASIA PACIFIC DAILY TAIWAN.`}</div>
        </div>
      </div>
    </footer>
  );
});
