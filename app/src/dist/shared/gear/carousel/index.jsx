/* @flow */
import React from 'react';
import { useBreakPoint } from '@core/hooks';
import { usePathSelector } from '@core/hooks';
import { withStyle } from '@core/container';
import { Banner } from '../banner';
import { map, isEmpty, contains, forEach } from 'ramda';
import styles from './carousel.scss';

/**
 * Carousel
 * @desc 輪播
 * @example
 *   <Carousel />
 */
export default (React.memo: any)(
  withStyle(styles)(({ anchor = true }) => {
    const deviceTheme = useBreakPoint();

    const { focus, posts } = usePathSelector('wp-posts', {
      focus: [],
      posts: {}
    });

    let list = [];
    if (!isEmpty(posts)) {
      if (isEmpty(focus)) return null;

      list = map(
        id => ({
          id,
          url: posts[id].previewImg,
          title: posts[id].title
        }),
        focus
      );
    }

    return isEmpty(list) ? null : (
      <div styleName="carousel">
        <Banner
          list={list}
          size={deviceTheme === 'mobile' ? 'normal' : 'slim'}
          anchor={anchor}
        />
      </div>
    );
  })
);

export const FocusCarousel = (React.memo: any)(
  withStyle(styles)(({ anchor = true }) => {
    const deviceTheme = useBreakPoint();

    const { focus, posts } = usePathSelector('wp-posts', {
      focus: [],
      posts: {}
    });

    let list = [];
    if (!isEmpty(posts)) {
      if (isEmpty(focus)) return null;

      list = map(
        id => ({
          id,
          url: posts[id].previewImg,
          title: posts[id].title
        }),
        focus
      );
    }

    return isEmpty(list) ? null : (
      <div styleName="carousel">
        <Banner
          list={list}
          size={deviceTheme === 'mobile' ? 'normal' : 'slim'}
          anchor={anchor}
          showTitle
        />
      </div>
    );
  })
);

export const AdCarousel = (React.memo: any)(
  withStyle(styles)(({ anchor = true }) => {
    const deviceTheme = useBreakPoint();

    const { ad, posts } = usePathSelector('wp-posts', {
      ad: [],
      posts: {}
    });

    let list = [];
    if (!isEmpty(posts)) {
      if (isEmpty(ad)) return null;

      list = map(
        id => ({
          id,
          url: posts[id].previewImg,
          title: posts[id].title
        }),
        ad
      );
    }

    return isEmpty(list) ? null : (
      <div styleName="carousel">
        <Banner
          list={list}
          size={deviceTheme === 'mobile' ? 'normal' : 'slim'}
          anchor={anchor}
        />
      </div>
    );
  })
);
