/* @flow */
import React from 'react';
import { usePathSelector } from '@core/hooks';
import { withStyle } from '@core/container';
import SwiperCore, { Pagination, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ErrorMsgSm } from '@src/dist/shared/gear/error-block';
import CircleItem from './circle';
import CardItem from './card';
import NormalItem from './normal';
import CategoryItem from './category';
import { min, times, isNil, isEmpty } from 'ramda';

// install Swiper components
SwiperCore.use([Pagination, A11y, Autoplay]);

/* slider 項目 */
const sliderItem = {
  normal: { element: NormalItem },
  circle: { element: CircleItem },
  card: { element: CardItem }
};

/**
 * ArticleSwiper
 * @desc [手機版]文章排列滑動區塊
 * @property {'circle'|'card'|'normal'} [type='normal'] 文章區塊類型/樣式
 * @property {string} categoryId 類別id
 * @example
 *    <ArticleSwiper type='circle' categoryId={107} />
 */
export default withStyle()(({ type = 'normal', categoryId = -1 }) => {
  const articleList = usePathSelector(`wp-posts.main.${categoryId}.list`, []);

  if (isNil(categoryId) || categoryId === -1)
    return <ErrorMsgSm msg="category id error" />;

  const SliderItem = sliderItem[type].element;

  return (
    <Swiper
      loop={true}
      autoplay={{
        delay: 8000
      }}
      slidesPerView={1}
      centeredSlides={true}
      pagination={{ clickable: true }}>
      {times(
        idx => (
          <SwiperSlide key={`article-${categoryId}-${idx}`} styleName="pb-5">
            <SliderItem articleId={articleList[idx]} />
          </SwiperSlide>
        ),
        min(6, articleList.length)
      )}
    </Swiper>
  );
});

/**
 * CategorySwiper
 * @desc [手機版]子類別排列滑動區塊
 * @property {Array<string>} [list=[]] 子類別id列表
 * @example
 *    <CategorySwiper list={[105,106,107]} />
 */
export const CategorySwiper = withStyle()(({ list = [] }) => {
  if (isEmpty(list)) return <ErrorMsgSm msg="category list error" />;

  return (
    <Swiper
      loop={true}
      autoplay={{
        delay: 8000
      }}
      slidesPerView={1}
      centeredSlides={true}
      pagination={{ clickable: true }}>
      {times(
        idx => (
          <SwiperSlide key={`category-${idx}`} styleName="pb-3">
            <CategoryItem idx={idx} id={list[idx]} />
          </SwiperSlide>
        ),
        min(4, list.length)
      )}
    </Swiper>
  );
});
