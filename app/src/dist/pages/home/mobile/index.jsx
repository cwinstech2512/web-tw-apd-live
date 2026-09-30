/* @flow */
import React, { useEffect, Fragment } from 'react';
import { usePathSelector } from '@core/hooks';
import { useDispatch } from 'react-redux';
import { getCategoryPosts } from '@src/libraries/axios-manager';
import Block from '@src/dist/shared/gear/block';
import VideoBlock from '@src/dist/shared/gear/block-video';
import BootstraspCarousel from '@src/dist/shared/gear/carousel-bootstrap';
import BootstraspCarouselAd from '@src/dist/shared/gear/carousel-bootstrap-ad';
import Gallery from '@src/dist/shared/gear/gallery';
import ScrollToTop from "react-scroll-to-top";

import { has, isEmpty, times, min, max } from 'ramda';

const bg = ['dark', 'light'];
const type = ['circle', 'card', 'normal'];

/**
 * MobileHome
 * @desc 手機版首頁
 * @example
 *   <MobileHome />
 */
export default () => {
  const dispatch = useDispatch();
  const {
    length,
    data,
    treeData: { '0': categoryList = [], ...otherTree }
  } = usePathSelector('wp-category', {
    length: 0,
    data: {},
    treeData: { '0': [] }
  });

  useEffect(() => {
    if (!isEmpty(categoryList)) {
      for (let i = 0; i < categoryList.length; i++) {
        dispatch(getCategoryPosts(categoryList[i]));
      }
    }
  }, [length]);

  return (
    <Fragment>
      <ScrollToTop smooth />
      {/* 首頁論播 */}
      <BootstraspCarousel type="focus" showTitle={true} />
      {/* 廣告論播 */}
      <BootstraspCarouselAd type="ad" />
      {/* 前三個區塊 */}
      {!isEmpty(categoryList) && has(categoryList[0], otherTree) ? (
        <Block
          type={type[1]}
          bg={bg[0]}
          childList={otherTree[categoryList[0]]}
          more={false}
          branch={true}
          categoryId={categoryList[0]}
          title={data[categoryList[0]] ? data[categoryList[0]].name : ''}
        />
      ) : (
        <Block
          type={type[1]}
          bg={bg[0]}
          categoryId={categoryList[0]}
          more
          title={data[categoryList[0]] ? data[categoryList[0]].name : ''}
        />
      )}
      {/* 插入影音專區 */}
      <VideoBlock bg={bg[1]} more title="影音專區" />
      {!isEmpty(categoryList) && categoryList.length >= 2 && (
        <Block
          type={type[1]}
          bg={bg[0]}
          categoryId={categoryList[1]}
          more
          title={data[categoryList[1]] ? data[categoryList[1]].name : ''}
        />
      )}
      {!isEmpty(categoryList) && categoryList.length >= 3 && (
        <Block
          type={type[1]}
          bg={bg[1]}
          categoryId={categoryList[2]}
          more
          title={data[categoryList[2]] ? data[categoryList[2]].name : ''}
        />
      )}
      {/* 剩下的區塊 */}
      {!isEmpty(categoryList) &&
        times(
          idx => (
            <Block
              key={`block-${idx}`}
              type={type[1]}
              bg={bg[(idx + 4) % 2]}
              categoryId={categoryList[idx + 3]}
              more
              title={
                data[categoryList[idx + 3]]
                  ? data[categoryList[idx + 3]].name
                  : ''
              }
            />
          ),
          max(0, categoryList.length - 3)
        )}
      {/* 精選圖輯 */}
      <Gallery />
    </Fragment>
  );
};
