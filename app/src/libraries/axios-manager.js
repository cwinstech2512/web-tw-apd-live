import axios from 'axios';
import { emit } from '@core/action/effects';
import {
  POST_LIST_ADD,
  POST_FOCUS,
  POST_FAST,
  POST_GALLERY,
  POST_VIDEO,
  POST_AD,
  POST_MORE,
  POST_RECENT,
  POST_CATEGORY,
  POST_SEARCH
} from '@src/storage/reducers/wp-posts';
import { CATEGORY_LIST } from '@src/storage/reducers/wp-category';
import { TAG_LIST, TAG_HOT_LIST } from '@src/storage/reducers/wp-tags';
import { VIDEO_DATA } from '@src/storage/reducers/wp-video';
import {
  filterHotTags,
  transformPost,
  transformVideo,
  pickId
} from '@src/helper/transformData';
import { filter, take, pipe, concat } from 'ramda';

// Server Name
export const WP = 'WP';

// 不同來源 api 或是定義 axios config
const wpUrl = CONFIG.REMOTE.WP_URL.replace(/\/+$/, '') + '/wp-json/wp/v2/';

// 創建axios實例
const requestWP = axios.create({
  baseURL: wpUrl
});

// 處理資料的方式
export const queryWP = (query: string) =>
  requestWP
    .get(query)
    .then(res => {
      if (res.status === 200) {
        return {
          success: true,
          data: res.data,
          total: res.headers['x-wp-total'],
          pages: res.headers['x-wp-totalpages']
        };
      }
    })
    .catch(error => {
      console.log('queryWP error', error);
      return { success: false };
    });

/* 取得所有分類 */
export const getAllCategories = async () => {
  try {
    const { success, data = [] } = await queryWP('categories?per_page=100');
    if (!success) return null;
    console.log("取得所有分類", data)
    return emit(CATEGORY_LIST, data);
  } catch (err) {
    console.error(err);
  }
};

/* 取得首頁輪播(最新8筆) */
export const getFocusPosts = async (focusId: number) => {
  try {
    const { success, data = [] } = await queryWP(
      `posts?categories=${focusId}&per_page=8`
    );
    if (!success) return null;
    console.log("取得首頁輪播", data)
    return [
      emit(POST_LIST_ADD, transformPost(data)),
      emit(POST_FOCUS, pickId(data))
    ];
  } catch (err) {
    console.error(err);
  }
};

/* 取得廣告輪播(最新8筆) */
export const getAdPosts = async (adId: number) => {
  try {
    const { success, data = [] } = await queryWP(
      `posts?categories=${adId}&per_page=8`
    );
    if (!success) return null;
    return [
      emit(POST_LIST_ADD, transformPost(data)),
      emit(POST_AD, pickId(data))
    ];
  } catch (err) {
    console.error(err);
  }
};

/* 取得快訊(最新10筆) */
export const getFastPosts = async (fastId: number) => {
  try {
    const { success, data = [] } = await queryWP(
      `posts?categories=${fastId}&per_page=10`
    );
    if (!success) return null;
    return [
      emit(POST_LIST_ADD, transformPost(data)),
      emit(POST_FAST, pickId(data))
    ];
  } catch (err) {
    console.error(err);
  }
};

/* 取得精選圖輯(最新20筆) */
export const getGalleryPosts = async (galleryId: number) => {
  try {
    const { success, data = [] } = await queryWP(
      `posts?categories=${galleryId}&per_page=20`
    );
    if (!success) return null;
    return [
      emit(POST_LIST_ADD, transformPost(data)),
      emit(POST_GALLERY, pickId(data))
    ];
  } catch (err) {
    console.error(err);
  }
};

/* 取得影音專區(最新10筆) */
export const getVideoPosts = async (
  videoId: number,
  perPage: number = 10,
  page: number = 1
) => {
  try {
    const { success, data = [], total = 0, pages = 0 } = await queryWP(
      `posts?categories=${videoId}&per_page=${perPage}&page=${page}`
    );
    if (!success) return null;
    return [
      emit(POST_LIST_ADD, transformPost(data)),
      emit(POST_VIDEO, {
        list: pickId(data),
        pagination: {
          total: parseInt(total),
          pages: parseInt(pages),
          now: page
        }
      })
    ];
  } catch (err) {
    console.error(err);
  }
};

/* 取前10筆文章，撈熱門關鍵字 */
export const getHotTagsWithLastPosts = async () => {
  try {
    const { success, data = [] } = await queryWP('posts');
    if (!success) return null;
    return emit(TAG_HOT_LIST, filterHotTags(data));
  } catch (err) {
    console.error(err);
  }
};

/* 首頁影片，取得影片(只一筆最新) */
export const getHomeVideo = async (videoId: number) => {
  try {
    const { success, data = [] } = await queryWP(`posts?categories=${videoId}`);
    if (!success) return null;
    return emit(VIDEO_DATA, transformVideo(data));
  } catch (err) {
    console.error(err);
  }
};

/* 取得分類(一頁15筆、分頁) */
export const getCategoryPosts = async (
  categoryId: number = 0,
  perPage: number = 15,
  page: number = 1
) => {
  try {
    const { success, data = [], total = 0, pages = 0 } = await queryWP(
      `posts?categories=${categoryId}&per_page=${perPage}&page=${page}`
    );
    if (!success) return null;
    return [
      emit(POST_LIST_ADD, transformPost(data)),
      emit(POST_CATEGORY, {
        id: categoryId,
        list: pickId(data),
        pagination: {
          total: parseInt(total),
          pages: parseInt(pages),
          now: page
        }
      })
    ];
  } catch (err) {
    console.error(err);
  }
};

/* 取得更多、熱門瀏覽：更多取同分類最新、熱門取全站最新 */
const more = 4; // pc: 6, mobile: 4
const recent = 5; // pc: 15, mobile: 5
export const getMorePosts = async (
  categoryId: number = 0,
  filterId: string = ''
) => {
  try {
    const { data: moreData = [] } = await queryWP(
      `posts?categories=${categoryId}&per_page=10`
    );

    const { data: recentData = [] } = await queryWP(`posts?per_page=20`);

    /* 過濾掉目前文章 */
    const moreList = filter(id => '' + id !== filterId)(pickId(moreData));

    const recentList = filter(id => '' + id !== filterId)(pickId(recentData));

    return [
      emit(POST_LIST_ADD, transformPost(concat(moreData, recentData))),
      emit(POST_MORE, moreList),
      emit(POST_RECENT, recentList)
    ];
  } catch (err) {
    console.error(err);
  }
};

export const getPostById = async (articleId: string = null) => {
  if (!articleId) return null;
  try {
    const { success, data } = await queryWP(`posts/${articleId}`);
    if (!success) return null;

    return emit(POST_LIST_ADD, transformPost([data]));
  } catch (err) {
    console.error(err);
  }
};

/* 關鍵字搜尋 */
export const getPostBySearch = async (
  text: string = '',
  perPage: number = 15,
  page: number = 1
) => {
  if (text === '') return null;
  try {
    const { success, data = [], total = 0, pages = 0 } = await queryWP(
      `posts?search=${text}&per_page=${perPage}&page=${page}`
    );
    if (!success) return null;

    return [
      emit(POST_LIST_ADD, transformPost(data)),
      emit(POST_SEARCH, {
        list: pickId(data),
        pagination: {
          total: parseInt(total),
          pages: parseInt(pages),
          now: page
        }
      })
    ];
  } catch (err) {
    console.error(err);
  }
};

/* hashtag搜尋 */
export const getPostByTag = async (
  tagId: string = '',
  perPage: number = 15,
  page: number = 1
) => {
  if (tagId === '') return null;
  try {
    const { success, data = [], total = 0, pages = 0 } = await queryWP(
      `posts?tags=${tagId}&per_page=${perPage}&page=${page}`
    );
    if (!success) return null;

    return [
      emit(POST_LIST_ADD, transformPost(data)),
      emit(POST_SEARCH, {
        list: pickId(data),
        pagination: {
          total: parseInt(total),
          pages: parseInt(pages),
          now: page
        }
      })
    ];
  } catch (err) {
    console.error(err);
  }
};

/* 取得前100 Tags */
export const getTopTags = async () => {
  try {
    const { success, data = [] } = await queryWP('tags?per_page=100');
    if (!success) return null;
    return emit(TAG_LIST, data);
  } catch (err) {
    console.error(err);
  }
};

export const getTagById = async (tagId: string = null) => {
  if (!tagId) return null;
  try {
    const { success, data = [] } = await queryWP(`tags/${tagId}`);

    if (!success) return null;
    return emit(TAG_LIST, [data]);
  } catch (err) {
    console.error(err);
  }
};
