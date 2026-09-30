/* @flow */
import React, { Fragment } from 'react';
import { withStyle } from '@core/container';
import styles from './about.scss';

/**
 * About
 * @desc 關於我們
 * @example
 *   <About />
 */
export default withStyle(styles)(() => {
  return (
    <Fragment>
      <div styleName="about bg-dark">
        <div styleName="wrapper">
          <div styleName="about-title">關於我們 About Us</div>
          {/* <div styleName="about-p">
            關於時尚的、品味的、歡樂的；
            <br />
            追求更美好的生活態度
          </div> */}
          <div styleName="about-p">
            北京
            <br />
            電話：13621214967
            <br />
            聯繫地址：北京市東城區北新橋三條一號院七號樓
            <br />
            <br />
            香港
            <br />
            電話：（852）31074176
            <br />
            地址：香港德輔道西246號，東慈商業中心，17樓1702室
            <br />
            <br />
            深圳
            <br />
            電話：18923881128
            <br />
            地址：廣東省深圳市福田區深南中路1002號新聞大廈1號樓2層
            <br />
            <br />
            廣告合作 ：<br />
            zhangshiyu@apdnews.com
            <br />
            gongchen@apdnews.com
          </div>
        </div>
      </div>
      <div styleName="about">
        <div styleName="wrapper">
          <div styleName="about-title">聯絡我們 Contact Us</div>
          <div styleName="contact-p">
            <div styleName="contact-li">
              <span aria-hidden="true" styleName="pr-2">
                <i class="far fa-envelope"></i>
              </span>
              zhangshiyu@apdnews.com
            </div>
            <div styleName="contact-li">
              <span aria-hidden="true" styleName="pr-2">
                <i class="fas fa-map-marker-alt"></i>
              </span>
              臺中市北區新興里太平路75巷28之1號
            </div>
            <div styleName="contact-li">
              <span aria-hidden="true" styleName="pr-2">
                <i class="fas fa-phone"></i>
              </span>
              （852）31074176
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
});
