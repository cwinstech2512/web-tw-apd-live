/* @flow */
import React, { Fragment, useEffect } from 'react';
import { withStyle } from '@core/container';

import { ErrorMsg, EmptyResult } from '@src/dist/shared/gear/error-block';
import ShareMedia from '@src/dist/shared/gear/share-media';
import { SectionF, SectionG } from '@src/dist/shared/gear/section';
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
 * PcArticle
 * @desc 電腦版-文章內頁
 * @example
 *   <PcArticle articleId={articleId} categoryId={categoryId}
 *      post={post} recent={recent} more={more}
 *      fontSizeBigger={fontSizeBigger} />
 */
export default (React.memo: any)(
  withStyle(styles)(
    ({
      articleId,
      categoryId,
      post,
      recent,
      more,
      fontSizeBigger,
      ...other
    }) => {
      console.log(
        articleId,
        categoryId,
        post,
        recent,
        more,
        fontSizeBigger,
        other
      );
      useEffect(() => {
        if (window.instgrm) window.instgrm.Embeds.process();
      }, [post.content]);

      return (
        <div styleName="wrapper">
          <ScrollToTop smooth />
          <div styleName="row">
            <div styleName="col-8">
              <div styleName="section">
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
                      {post.prev ? <Prev id={post.prev} /> : null}
                      {post.next ? <Next id={post.next} /> : null}
                    </div>
                    <ShareMedia post={post} />
                  </Fragment>
                )}
              </div>
              {!validId(articleId) || isEmpty(post) ? null : (
                <FbComment id={articleId} />
              )}
              <div>
                <div styleName="section-title">
                  <div styleName="section-sub-title pl-2">查看更多</div>
                </div>
                <div>
                  {isEmpty(more) ? (
                    <EmptyResult title="查無文章" />
                  ) : (
                    <SectionG list={more} max={6} />
                  )}
                </div>
              </div>
              <FbOgMeta post={post} />
            </div>
            <div styleName="col-4">
              <div styleName="section">
                <div styleName="section-title">
                  <div styleName="section-sub-title">熱門瀏覽</div>
                </div>
                {isEmpty(recent) ? (
                  <EmptyResult title="查無文章" />
                ) : (
                  <SectionF list={recent} max={15} />
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }
  )
);
