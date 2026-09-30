import { map, prop, pipe, head, path, reduce, uniq, concat, take } from 'ramda';

/* 過濾類別資料 */
export const transformCategory = map(
  ({ id, description, name, slug, parent, count }) => ({
    id,
    description,
    name,
    slug,
    parent,
    count
  })
);

/* 過濾文章資料 */
export const transformPost = map(
  ({
    id,
    date = '',
    modified = '',
    title: { rendered: title = '' },
    content: { rendered: content = '' },
    acf: { 
      image_url: previewImg = null, 
      youtube = null,
      ad_image_url = null,
      ad_remote_url = null
    },
    categories = [],
    tags = [],
    prev_page_id = null,
    next_page_id = null
  }) => ({
    id,
    date,
    modified,
    title,
    content,
    previewImg,
    youtube,
    ad_image_url,
    ad_remote_url,
    categories,
    tags,
    prev: prev_page_id,
    next: next_page_id
  })
);

/* 取得影片資料 */
export const transformVideo = pipe(head, path(['acf', 'youtube']));

export const filterHotTags = pipe(
  map(prop('tags')),
  reduce(concat, []),
  uniq,
  take(10)
);

export const pickId = map(prop('id'));

/* 都是數字 */
const regId = /^\d+$/;

/* 驗證合法id */
export const validId = (id: string): boolean => regId.test('' + id);

/* 帳號格式 */
export const regAccount = new RegExp(
  '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d-_]{3,30}'
);
