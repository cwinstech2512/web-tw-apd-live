/* @flow */
import React, { Fragment, useState, useEffect } from 'react';
import { VIDEO } from '@src/constant/feature';
import { withStyle } from '@core/container';
import { useDispatch } from 'react-redux';
import { useBreakPoint, usePathSelector } from '@core/hooks';
import MainTitle from '@src/dist/shared/gear/main-title';
import { EmptyResult } from '@src/dist/shared/gear/error-block';
import Pagination from '@src/dist/shared/gear/pagination';
import SectionVedio from '@src/dist/shared/gear/section-video';
import VideoItem from '@src/dist/shared/gear/block-video/swiper/video';
import { getVideoPosts } from '@src/libraries/axios-manager';
import { isEmpty, min, times } from 'ramda';
import styles from './video-area.scss';

const MobileVideo = ({ perPage = 10 }: Object) => {
  const dispatch = useDispatch();
  const videoId = usePathSelector(`wp-category.${VIDEO}.id`, null);
  const {
    pagination: { total = 0, pages = 0, now = 0 },
    list
  } = usePathSelector('wp-posts.video', {});
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getVideoPosts(videoId, perPage, 1));
    if (page !== 1) setPage(1);
  }, [videoId]);

  /* 處理換頁 */
  const handleChange = p => () => {
    setPage(p);
    dispatch(getVideoPosts(videoId, perPage, p));
  };
  return (
    <Fragment>
      <MainTitle title="影音專區" />
      {isEmpty(list) ? (
        <EmptyResult title="尚無文章" />
      ) : (
        <Fragment>
          <SectionVedio max={perPage} list={list} />
          <Pagination count={pages} page={page} pageChange={handleChange} />
        </Fragment>
      )}
    </Fragment>
  );
};

const PcVideo = withStyle(styles)(({ perPage }) => {
  const dispatch = useDispatch();
  const videoId = usePathSelector(`wp-category.${VIDEO}.id`, null);
  const {
    pagination: { total = 0, pages = 0, now = 0 },
    list
  } = usePathSelector('wp-posts.video', {});
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getVideoPosts(videoId, perPage, 1));
    if (page !== 1) setPage(1);
  }, [videoId]);

  /* 處理換頁 */
  const handleChange = p => () => {
    setPage(p);
    dispatch(getVideoPosts(videoId, perPage, p));
  };

  return (
    <div styleName="wrapper">
      <MainTitle title="影音專區" />
      {isEmpty(list) ? (
        <EmptyResult title="尚無文章" />
      ) : (
        <Fragment>
          <div styleName="row">
            {times(
              idx => (
                <div key={`article-${idx}`} styleName="col-4 pb-5">
                  <VideoItem articleId={list[idx]} />
                </div>
              ),
              min(perPage, list.length)
            )}
          </div>
          <Pagination count={pages} page={page} pageChange={handleChange} />
        </Fragment>
      )}
    </div>
  );
});

export default () => {
  const deviceTheme = useBreakPoint();
  return deviceTheme === 'mobile' ? (
    <MobileVideo perPage={10} />
  ) : (
    <PcVideo perPage={9} />
  );
};
