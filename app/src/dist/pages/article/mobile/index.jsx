/* @flow */
import React, { Fragment, useEffect } from 'react';
import { withStyle } from '@core/container';

import { ErrorMsg } from '@src/dist/shared/gear/error-block';
import ShareMedia from '@src/dist/shared/gear/share-media';
import { SectionA, SectionC } from '@src/dist/shared/gear/section';
import Tags from '@src/dist/shared/gear/tags';
import FbComment from '@src/dist/shared/gear/fb-comment';
import FbLike from '@src/dist/shared/gear/fb-like';
import FbOgMeta from '@src/dist/shared/gear/fb-meta';
import BtnFontSize from '@src/dist/shared/gear/btn-font-size';
import BootstraspCarouselAd from '@src/dist/shared/gear/carousel-bootstrap-ad';
import { Next, Prev } from '../link-article';
import { validId } from '@src/helper/transformData.js';
import { isEmpty } from 'ramda';
import ScrollToTop from "react-scroll-to-top";

import styles from './article.scss';

/**
 * MobileArticle
 * @desc 手機版-文章內頁
 * @example
 *   <MobileArticle articleId={articleId} categoryId={categoryId}
 *      post={post} recent={recent} more={more}
 *      fontSizeBigger={fontSizeBigger} />
 */
export default (React.memo: any)(
  withStyle(styles)(
    ({ articleId, categoryId, post, recent, more, fontSizeBigger }) => {
      useEffect(() => {
        if (window.instgrm) window.instgrm.Embeds.process();
      }, [post.content]);

      return (
        <div>
          <ScrollToTop smooth />
          {!validId(articleId) || isEmpty(post) ? (
            <ErrorMsg />
          ) : (
            <Fragment>
              <div styleName="article-title">{post.title}</div>
              <div styleName="article-sub">
                <div styleName="article-date">
                  更新時間：{post.date ? post.date.replace(/T/, ' ') : ''}
                </div>
                <div styleName="article-like">
                  <FbLike id={articleId} />
                </div>
                <BtnFontSize />
              </div>
              <div
                styleName={`article-content ${
                  fontSizeBigger ? 'content-big' : ''
                }`}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: post.content
                  }}
                />
              </div>
              <BootstraspCarouselAd type="ad" />
              <div styleName="article-tags">
                <Tags list={post.tags || []} />
              </div>
              <div styleName="article-content">
                {/* 上下一則 */}
                <Prev id={post.prev} />
                <Next id={post.next} />
              </div>
              <ShareMedia post={post} />
            </Fragment>
          )}
          {!validId(articleId) || isEmpty(post) ? null : (
            <div styleName="mb-1">
              <FbComment id={articleId} />
            </div>
          )}
          {!isEmpty(more) ? (
            <Fragment>
              <div styleName="article-sub-title">查看更多</div>
              <div styleName="mb-2">
                <SectionC list={more} max={4} />
              </div>
            </Fragment>
          ) : null}
          {!isEmpty(recent) ? (
            <Fragment>
              <div styleName="article-sub-title">熱門瀏覽</div>
              <div styleName="mb-2">
                <SectionA list={recent} max={5} />
              </div>
            </Fragment>
          ) : null}
          <FbOgMeta post={post} />
        </div>
      );
    }
  )
);
