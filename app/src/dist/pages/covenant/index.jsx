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
      <div styleName="about">
        <div styleName="wrapper">
          <div styleName="about-title">『青傳媒新聞報』記者規約</div>
          <div styleName="contact-p">
            <div styleName="contact-li">
              青傳媒新聞報提供記者撰寫新聞平台，記者應遵守相關規約如下：
            </div>
            <div styleName="contact-li">
              一、記者撰寫之新聞標題、新聞文稿及相片之全部法律責任概由發稿記者自行負責，與報社無關， 記者在外行為與發生各項情事，本社不負連帶之責任。
            </div>
            <div styleName="contact-li">
              二、稿件新聞標題、新聞文稿及相片絕對不能抄襲及侵害他人著作權的行為。
            </div>
            <div styleName="contact-li">
              三、請勿跨區踩線，發稿內容同意報社有權修改及刪稿，絕無異議。
            </div>
            <div styleName="contact-li">
              四、提供之新聞標題、新聞文稿及相片無條件同意報社授權其他媒體無償使用。
            </div>
            <div styleName="contact-li">
              五、發稿需查證新聞來源並平衡報導，請注意勿不實報導； 撰寫負面新聞需注意法律問題，撰寫新聞涉及毀謗及侵犯著作權如文字、圖片，由發稿記者自負責任。
            </div>
            <div styleName="contact-li">
              六、醫藥及器材、博弈及選舉新聞發布內容請注意有關單位訂定之規定，醫療新聞發布以醫院通稿為主，如發稿內容遭主管單位罰款由記者自負責任。
            </div>
            <div styleName="contact-li">
              七、煙、酒新聞請加註，請在文末須加警語：《吸菸有害健康》、《未成年請勿吸 菸》； 酒類新聞請加註，請在文末須加警語：《未成年請勿飲酒》、《飲酒過量有害健 康》、《開車不喝酒》。
            </div>
          </div>
          <div styleName="contact-p">
          </div>
          <div styleName="contact-p">
            <div styleName="contact-li">
              線上記者注意事項：
            </div>
            <div styleName="contact-li">
              一、記者發稿及名片需用身分證本名，如有違規定立即停權。
            </div>
            <div styleName="contact-li">
              二、如離開本社須繳回記者證，如未繳回本社將以公告為依據。
            </div>
            <div styleName="contact-li">
              三、本規約以本網頁公告或紙本簽訂為依據。
            </div>
            <div styleName="contact-li">
              四、規約內容等同簽約，如有修改更新，以本網頁記者規約修訂公告日期為依據。（修訂日111.03.08）
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
});
