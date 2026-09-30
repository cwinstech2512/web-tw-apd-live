/* @flow */
import React from 'react';
import { VIDEO } from '@src/constant/feature';
import { useBreakPoint, usePathSelector } from '@core/hooks';
import { withStyle } from '@core/container';
import SwiperCore, { Pagination, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import VideoItem from './video';
import { min, times, isEmpty } from 'ramda';

// install Swiper components
SwiperCore.use([Pagination, A11y, Autoplay]);

/**
 * MobileVedioSwiper
 * @desc [手機版]影音專區排列滑動區塊
 * @example
 *    <VedioSwiper />
 */
const MobileVedioSwiper = withStyle()(() => {
  const articleList = usePathSelector(`wp-posts.video.list`, []);

  if (isEmpty(articleList))
    return <div styleName="text-center h4 p-3">尚無影片</div>;

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
          <SwiperSlide key={`video-${idx}`} styleName="pb-5">
            <VideoItem articleId={articleList[idx]} />
          </SwiperSlide>
        ),
        min(6, articleList.length)
      )}
    </Swiper>
  );
});

const PcVideo = withStyle()(() => {
  const articleList = usePathSelector(`wp-posts.video.list`, []);

  if (isEmpty(articleList))
    return <div styleName="text-center h4 p-3">尚無影片</div>;

  return (
    <div styleName="row">
      {times(
        idx => (
          <div key={`article-${idx}`} styleName="col-4 pb-5">
            <VideoItem articleId={articleList[idx]} />
          </div>
        ),
        min(6, articleList.length)
      )}
    </div>
  );
});

export default () => {
  const deviceTheme = useBreakPoint();
  return deviceTheme === 'mobile' ? <MobileVedioSwiper /> : <PcVideo />;
};
