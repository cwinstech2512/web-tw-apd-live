/* @flow */
import React, { Fragment, useEffect } from 'react';
import { useBreakPoint, usePathSelector } from '@core/hooks';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { withStyle } from '@core/container';
import { getCategoryPosts } from '@src/libraries/axios-manager';
import OwnCategory from './own-page';
import TreeCategory from './tree-page';
import { has } from 'ramda';
import styles from './category.scss';

const PER_PAGE = {
  mobile: 15,
  pc: 21
};

/**
 * MainCategory
 * @desc 主分類頁
 * @example
 *   <MainCategory />
 */
export default withStyle(styles)(() => {
  const dispatch = useDispatch();
  const deviceTheme = useBreakPoint();
  let { categoryId = '' } = useParams();
  const categoryTree = usePathSelector('wp-category.treeData', {});

  const hasChild = has(categoryId, categoryTree);
  const perPage = PER_PAGE[deviceTheme];

  /* 取得該分類文章 */
  useEffect(() => {
    dispatch(getCategoryPosts(categoryId, perPage, 1));

    /* 取得子分類文章 */
    if (hasChild) {
      const children = categoryTree[categoryId];
      for (let i = 0; i < children.length; i++) {
        dispatch(getCategoryPosts(children[i], perPage, 1));
      }
    }
  }, [hasChild, categoryId]);

  return (
    <div styleName="wrapper">
      {hasChild ? (
        <TreeCategory idList={categoryTree[categoryId]} />
      ) : (
        <OwnCategory id={categoryId} perPage={perPage} />
      )}
    </div>
  );
});
