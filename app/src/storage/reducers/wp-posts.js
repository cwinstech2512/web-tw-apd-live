/* @flow */
import { reducerCreator } from '@core/reducer';
import { reduce, assoc } from 'ramda';
/* action type */
export const POST_LIST_ADD = 'POST_LIST_ADD';
export const POST_FOCUS = 'POST_FOCUS';
export const POST_AD = 'POST_AD';
export const POST_FAST = 'POST_FAST';
export const POST_GALLERY = 'POST_GALLERY';
export const POST_VIDEO = 'POST_VIDEO';
export const POST_MORE = 'POST_MORE';
export const POST_RECENT = 'POST_RECENT';
export const POST_CATEGORY = 'POST_CATEGORY';
export const POST_SEARCH = 'POST_SEARCH';
export const POST_RESTORE = 'POSTS_RESTORE';

type Post = {
  id: number,
  date: string,
  modified: string,
  title: string,
  content: string,
  previewImg: string,
  youtube: ?string,
  categories: Array<number>,
  tags: Array<number>,
  prev: number,
  next: number
};

type State = {
  posts: {
    [key: string]: Post
  },
  main: {
    [key: string]: {
      list: ?Array<number>,
      pagination: Pagination
    }
  },
  fast: ?Array<number>,
  focus: ?Array<number>,
  ad: ?Array<number>,
  gallery: ?Array<number>,
  video: {
    list: ?Array<number>,
    pagination: Pagination
  },
  recent: ?Array<number>,
  more: ?Array<number>,
  search: {
    list: ?Array<number>,
    pagination: Pagination
  }
};

export type Pagination = {
  total: number,
  pages: number,
  now: number
};

/**
 * 文章相關
 */
export const defaultState: State = {
  posts: {}, // 放所有文章資料
  fast: [], // 放快訊文章id列表,
  focus: [], // 放輪播文章id列表
  ad: [], // 放廣吿輪播文章id列表
  gallery: [], // 放精選圖輯id列表
  video: {
    list: [],
    pagination: {
      total: 0,
      pages: 1,
      now: 1
    }
  }, // 放影音專區id列表、分頁
  main: {}, // 放主分類的文章id列表、分頁
  recent: [], // 放近期文章id列表
  more: [], // 放更多文章id列表
  search: {
    list: [],
    pagination: {
      total: 0,
      pages: 1,
      now: 1
    }
  } // 放搜尋結果文章id列表、分頁
};

export default reducerCreator(defaultState, {
  /* 增加資料 */
  [POST_LIST_ADD]: ({ posts: prePosts, ...other }, posts: Array<Post> = []) => {
    return {
      ...other,
      posts: reduce(
        (orign, { id, ...other }) =>
          assoc('' + id, { id, ...other } || '', orign),
        prePosts,
        posts
      )
    };
  },

  /* 輪播文章id列表 */
  [POST_FOCUS]: (preState, focus: Array<number> = []) => {
    return {
      ...preState,
      focus
    };
  },

  /* 廣告輪播文章id列表 */
  [POST_AD]: (preState, ad: Array<number> = []) => {
    return {
      ...preState,
      ad
    };
  },

  /* 快訊文章id列表 */
  [POST_FAST]: (preState, fast: Array<number> = []) => {
    return {
      ...preState,
      fast
    };
  },

  /* 精選圖輯文章id列表 */
  [POST_GALLERY]: (preState, gallery: Array<number> = []) => {
    return {
      ...preState,
      gallery
    };
  },

  /* 影音專區文章id列表 */
  [POST_VIDEO]: ({ video, ...preState }, { list, pagination }) => {
    return {
      ...preState,
      video: {
        ...video,
        list,
        pagination
      }
    };
  },

  /* 更多文章列表 */
  [POST_MORE]: (preState, more: Array<number> = []) => {
    return {
      ...preState,
      more
    };
  },

  /* 近期文章列表 */
  [POST_RECENT]: (preState, recent: Array<number> = []) => {
    return {
      ...preState,
      recent
    };
  },

  /* 主分類文章列表與分頁資訊 */
  [POST_CATEGORY]: ({ main, ...preState }, { id, list, pagination }) => {
    return {
      ...preState,
      main: {
        ...main,
        [id]: {
          list,
          pagination
        }
      }
    };
  },

  /* 搜尋文章列表與分頁資訊 */
  [POST_SEARCH]: (preState, { list, pagination }) => {
    return {
      ...preState,
      search: {
        list,
        pagination
      }
    };
  },

  [POST_RESTORE]: () => defaultState
});
