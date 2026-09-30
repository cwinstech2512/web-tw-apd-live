/* @flow */
import { emit } from '@core/action/effects';
import React, { Fragment, useState, useEffect } from 'react';
import { useBreakPoint } from '@core/hooks';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { usePathSelector } from '@core/hooks';

import MobileArticle from './mobile';
import PcArticle from './pc';

import { getMorePosts, getPostById } from '@src/libraries/axios-manager';
import { validId } from '@src/helper/transformData.js';
import { map, isEmpty, isNil } from 'ramda';

/**
 * Article
 * @desc 文章內頁
 * @example
 *   <Article />
 */
export default () => {
  const deviceTheme = useBreakPoint();
  const dispatch = useDispatch();
  let { articleId = '' } = useParams();
  const fontSizeBigger = usePathSelector('setting.fontSizeBigger', {});
  const posts = usePathSelector('wp-posts.posts', {});
  const recent = usePathSelector('wp-posts.recent', []);
  const more = usePathSelector('wp-posts.more', []);

  const post = posts[articleId] || {};

  let categoryId = post.categories ? post.categories.sort()[0] : null;

  /* 查詢該文章 */
  useEffect(() => {
    if (articleId !== '') {
      dispatch(getPostById(articleId));
    }
  }, []);

  useEffect(() => {
    if (categoryId) dispatch(getMorePosts(categoryId, articleId));
  }, [categoryId]);

  return deviceTheme === 'mobile' ? (
    <MobileArticle
      articleId={articleId}
      categoryId={categoryId}
      post={post}
      recent={recent}
      more={more}
      fontSizeBigger={fontSizeBigger}
    />
  ) : (
    <PcArticle
      articleId={articleId}
      categoryId={categoryId}
      post={post}
      recent={recent}
      more={more}
      fontSizeBigger={fontSizeBigger}
    />
  );
};
