/* @flow */
import React from 'react';
import { useLinkTo, usePathSelector } from '@core/hooks';
import { withStyle } from '@core/container';
import ErrImg from '@src/dist/shared/gear/img-ele/preview.png';
import { times, isEmpty, min, map } from 'ramda';
import styles from './gallery.scss';

/**
 * Gallery
 * @desc 精選圖題，放首頁，最多20
 * @property {'light'|'dark'} [bg='light'] 背景樣式
 * @example
 *   <Gallery />
 */
export default withStyle(styles)(({ bg = 'light' }) => {
  const linkTo = useLinkTo();
  const idList = usePathSelector('wp-posts.gallery', []);
  const posts = usePathSelector('wp-posts.posts', []);

  // let list = [];
  if (!isEmpty(posts)) {
    if (isEmpty(idList)) return null;

    // list = map(
    //   id => ({
    //     id,
    //     src: posts[id].previewImg,
    //     title: posts[id].title,
    //     remote_url: posts[id].ad_remote_url,
    //     logo_url: posts[id].ad_image_url,
    //   }),
    //   idList
    // );
  }
  // console.log(list)
  return (
    <div styleName={`gallery-container gallery-${bg}`}>
      <div styleName="container">
        <div styleName="row">
          {times(idx => {
            const article = posts[idList[idx]];
            return (
              <div
                key={`gallery-${idList[idx]}`}
                styleName="col-6 col-sm-4 col-md-3 gallery">
                <div
                  styleName="gallery-img"
                  alt={article.title}
                  onClick={()=> window.open(article.ad_remote_url, "_blank")}
                  style={{
                    backgroundImage: `url(${article.previewImg || ErrImg})`
                  }}></div>
              </div>
            );
          }, min(20, idList.length))}
        </div>
      </div>
    </div>
  );
});
