/* @flow */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { usePathSelector } from '@core/hooks';
import {
  getAllCategories,
  getFocusPosts,
  getFastPosts,
  getAdPosts,
  getCategoryPosts
} from '@src/libraries/axios-manager';
import { FAST, FOCUS, YOUTUBE, AD, VIDEO } from '@src/constant/feature';
import { map, isEmpty, forEach, times } from 'ramda';

let init = {
  categories: false,
  mainPosts: false
};
const testPostId = '75';
let preCategory = [];

/**
 * API 測試撈資料
 * @desc
 * @requires handler
 */
export default () => {
  /* dispatch */
  const dispatch = useDispatch();
  const categories = usePathSelector('wp-category', {});
  const {
    posts,
    fast: fastPosts,
    focus: focusPosts,
    ad: adPosts,
    main
  } = usePathSelector('wp-posts', {});

  useEffect(() => {
    // 若沒有資料，開始撈資料
    if (categories.length === 0 && !init.categories) {
      init.categories = true;
      dispatch(getAllCategories());
    }
    
    if (focusPosts.length === 0 && categories[FOCUS].id) {
      dispatch(getFocusPosts(categories[FOCUS].id));
    }

    if (fastPosts.length === 0 && categories[FAST].id) {
      dispatch(getFastPosts(categories[FAST].id));
    }

    if (adPosts.length === 0 && categories[AD].id) {
      dispatch(getAdPosts(categories[AD].id));
    }

    if (!isEmpty(categories.treeData) && !init.mainPosts) {
      init.mainPosts = true;
      for (let i = 0; i < 3; i++) {
        dispatch(getCategoryPosts(categories.treeData['0'][i]));
        preCategory.push(categories.treeData['0'][i]);
      }
    }
  });

  return (
    <div>
      <h4>
        特殊分類：
        {`${categories[FAST].name}:${categories[FAST].id}`}、
        {`${categories[FOCUS].name}:${categories[FOCUS].id}`}、
        {categories[YOUTUBE] &&
          `${categories[YOUTUBE].name}:${categories[YOUTUBE].id}`}
        、{categories[AD] && `${categories[AD].name}:${categories[AD].id}`}、
        {categories[VIDEO] &&
          `${categories[VIDEO].name}:${categories[VIDEO].id}`}
      </h4>
      <h4>首頁主分類：{categories.length}</h4>
      <div>
        {map(
          id => `${categories.data[id].name} (#${id}), `,
          categories.treeData['0'] || []
        )}
      </div>
      <h4>側欄主副分類：</h4>
      <div>
        {map(
          id => (
            <div key={`menu-main-${id}`}>
              {`${categories.data[id].name} (#${id}): `}
              {map(
                cid => `${categories.data[cid].name} (#${cid}), `,
                categories.treeData[id] || []
              )}
            </div>
          ),
          categories.treeData['0'] || []
        )}
      </div>
      <h4>首頁輪播：(最新8筆)</h4>
      <div>
        <ol>
          {map(
            id => (
              <li key={`focus-${id}`}>
                {posts[id].title} (#{id})
              </li>
            ),
            focusPosts
          )}
        </ol>
      </div>
      <h4>快訊：(最新10筆)</h4>
      <div>
        <ol>
          {map(
            id => (
              <li key={`fast-${id}`}>
                {posts[id].title} (#{id})
              </li>
            ),
            fastPosts
          )}
        </ol>
      </div>
      <h4>首頁前三個大類別：</h4>
      <div>
        {!isEmpty(main)
          ? map(id => {
              return (
                <div key={`main-${id}`}>
                  <h5>
                    ***{categories.data[id].name} (#{id})***
                  </h5>
                  {main[id]
                    ? map(
                        pid => (
                          <p key={`main-${id}-${pid}`}>
                            (#{pid})-{posts[pid].title}
                          </p>
                        ),
                        main[id].list
                      )
                    : null}
                </div>
              );
            }, preCategory)
          : null}
      </div>
      <h4>熱搜詞：</h4>
      <div></div>
      <h4>文章內文：(id={testPostId})</h4>
      <div>
        <div
          dangerouslySetInnerHTML={{
            __html: posts[testPostId] ? posts[testPostId].content : null
          }}
        />
      </div>
    </div>
  );
};
