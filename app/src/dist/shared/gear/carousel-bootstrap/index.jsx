/* @flow */
import React from 'react';
import { useLinkTo, usePathSelector, useBreakPoint } from '@core/hooks';
import { withStyle } from '@core/container';
import Carousel from 'react-bootstrap/Carousel';
import ErrImg from '@src/dist/shared/gear/img-ele/preview.png';
import { ErrorMsgSm } from '@src/dist/shared/gear/error-block';
import { map, isEmpty } from 'ramda';
import styles from './carousel-bootstrap.scss';

const theme = {
  pc: {
    itemClass: 'carousel-pc-item',
    titleClass: 'pc-title',
    max: 58
  },
  mobile: {
    itemClass: 'carousel-item',
    titleClass: 'title',
    max: 18
  }
};

export default withStyle(styles)(({ type = 'focus', showTitle = false }) => {
  const linkTo = useLinkTo();
  const deviceTheme = useBreakPoint();
  const posts = usePathSelector('wp-posts.posts', {});
  const idList = usePathSelector(`wp-posts.${type}`, []);

  if (isEmpty(posts) || isEmpty(idList))
    return (
      <div styleName="carousel">
        <ErrorMsgSm msg="尚無資料" />
      </div>
    );

  let list = [];
  if (!isEmpty(posts)) {
    if (isEmpty(idList)) return null;

    list = map(
      id => ({
        id,
        src: posts[id].previewImg,
        title: posts[id].title
      }),
      idList
    );
  }

  return (
    <div styleName="carousel">
      <Carousel indicators={false} interval={type == 'ad'? 20000 : 3000}>
        {map(
          ({ id, src, title }) => (
            <Carousel.Item key={`carousel-item-${id}`}>
              <div
                styleName={theme[deviceTheme].itemClass}
                onClick={linkTo(`/article/${id}`)}>
                <div
                  styleName="carousel-item-img"
                  alt={title}
                  style={{
                    backgroundImage: `url(${src || ErrImg})`
                  }}
                />
              </div>
              {showTitle && (
                <div
                  styleName={theme[deviceTheme].titleClass}
                  onClick={linkTo(`/article/${id}`)}>
                  {title.length >= theme[deviceTheme].max
                    ? `${title.substr(0, theme[deviceTheme].max)}..`
                    : title}
                </div>
              )}
            </Carousel.Item>
          ),
          list
        )}
      </Carousel>
    </div>
  );
});
