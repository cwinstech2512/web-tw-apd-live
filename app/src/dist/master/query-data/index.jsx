/* @flow */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { usePathSelector } from '@core/hooks';
import {
  FAST,
  FOCUS,
  YOUTUBE,
  AD,
  VIDEO,
  GALLERY,
  MOBILE_POPAD
} from '@src/constant/feature';
import {
  getHotTagsWithLastPosts,
  getAllCategories,
  getFocusPosts,
  getFastPosts,
  getGalleryPosts,
  getVideoPosts,
  getAdPosts,
  getTopTags,
  getHomeVideo,
  getPopAdPosts
} from '@src/libraries/axios-manager';
import {
  getUserProfile,
  setToken
} from '@src/libraries/axios-member-manager.js';
import { requestTimeout } from '@core/helpers/raf-timer';
import { isEmpty } from 'ramda';

/**
 * QueryData
 * @desc 查詢資料
 */
export default () => {
  const dispatch = useDispatch();
  const video = usePathSelector('wp-video', '');
  const popList = usePathSelector('wp-ads.list', []);
  const categories = usePathSelector('wp-category', {});
  const {
    fast: fastPosts,
    focus: focusPosts,
    ad: adPosts,
    gallery: galleryPosts,
    video: { list: videoPosts }
  } = usePathSelector('wp-posts', {});
  const { tagList, hotList } = usePathSelector('wp-tags', {
    tagList: [],
    hotList: []
  });

  useEffect(() => {
    let _reqTopTags: ?Object = null;
    let _reqHotTags: ?Object = null;
    /* 撈所有類別資料 */
    if (categories.length === 0) dispatch(getAllCategories());

    /* 取得前100 Tags */
    if (isEmpty(tagList)) {
      _reqTopTags = requestTimeout(() => {
        dispatch(getTopTags());
      }, 5000);
    }

    /* 取前10筆文章，撈熱門關鍵字 */
    if (isEmpty(hotList)) {
      _reqHotTags = requestTimeout(() => {
        dispatch(getHotTagsWithLastPosts());
      }, 5000);
    }

    /* 檢查是否有localStorage token */
    const token = localStorage.getItem('token');
    if (CONFIG.REMOTE.MEMBER_ENABLED && token) {
      setToken(token);
      dispatch(getUserProfile(token));
    }

    return () => {
      if (_reqTopTags) _reqTopTags.clear();
      if (_reqHotTags) _reqHotTags.clear();
    };
  }, []);

  /* 撈彈出廣告 */
  // useEffect(() => {
  //   if (popList.length === 0 && categories[MOBILE_POPAD] && categories[MOBILE_POPAD].id) {
  //     dispatch(getPopAdPosts(categories[MOBILE_POPAD].id));
  //   }
  // }, [categories[MOBILE_POPAD]]);

  /* 撈首頁輪播類別的文章 */
  useEffect(() => {
    // console.log("撈首頁輪播類別的文章[focusPosts]", focusPosts, categories[FOCUS])
    if (focusPosts.length === 0 && categories[FOCUS] && categories[FOCUS].id) {
      // console.log("撈首頁輪播類別的文章[focusPosts] start")
      dispatch(getFocusPosts(categories[FOCUS].id));
      // console.log("撈首頁輪播類別的文章[focusPosts] end")
    }
  }, [categories[FOCUS]]);

  /* 撈廣告輪播類別的文章 */
  useEffect(() => {
    if (adPosts.length === 0 && categories[AD] && categories[AD].id) {
      dispatch(getAdPosts(categories[AD].id));
    }
  }, [categories[AD]]);

  /* 撈快訊類別的文章 */
  useEffect(() => {
    if (fastPosts.length === 0 && categories[FAST] && categories[FAST].id) {
      dispatch(getFastPosts(categories[FAST].id));
    }
  }, [categories[FAST]]);

  /* 撈精選圖輯類別的文章 */
  useEffect(() => {
    let _reqGallery: ?Object = null;
    if (
      galleryPosts.length === 0 &&
      categories[GALLERY] &&
      categories[GALLERY].id
    ) {
      _reqGallery = requestTimeout(() => {
        dispatch(getGalleryPosts(categories[GALLERY].id));
      }, 3000);
    }
    return () => {
      if (_reqGallery) _reqGallery.clear();
    };
  }, [categories[GALLERY]]);

  /* 撈影音專區的文章 */
  useEffect(() => {
    if (videoPosts.length === 0 && categories[VIDEO] && categories[VIDEO].id) {
      dispatch(getVideoPosts(categories[VIDEO].id));
    }
  }, [categories[VIDEO]]);

  /* 撈首頁影片 */
  useEffect(() => {
    if (isEmpty(video) && categories[YOUTUBE] && categories[YOUTUBE].id) {
      dispatch(getHomeVideo(categories[YOUTUBE].id));
    }
  }, [categories[YOUTUBE]]);

  return <div />;
};
