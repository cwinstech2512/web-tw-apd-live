/* @flow */
import React, { useEffect } from 'react';
import { withStyle } from '@core/container';
import { usePathSelector, useLinkTo } from '@core/hooks';
import { useDispatch } from 'react-redux';
import { getPostById } from '@src/libraries/axios-manager';
import { isEmpty } from 'ramda';
import styles from './link.scss';

/**
 * LinkArticle
 * @desc 文章連結（上一則新聞、下一則新聞）
 * @property {'prev'|'next'|'normal'} [type='normal'] 類型
 * @property {string} id 文章id
 * @example
 *   <LinkArticle type="normal" id={120}/>
 */
const LinkArticle = withStyle(styles)(
  ({ id = 0, type = 'normal' }: { id: number, type: string }) => {
    const dispatch = useDispatch();
    const linkTo = useLinkTo();
    const data = usePathSelector(`wp-posts.posts.${id}`, {});

    if(!id) return
    /* 查詢該文章 */
    useEffect(() => {
      if (isEmpty(data)) {
        dispatch(getPostById(id));
      }
    }, [id]);

    return (
      <div styleName="link" onClick={linkTo(`/article/${id}`)}>
        {type === 'normal' ? null : (
          <span aria-hidden="true" styleName="mr-2">
            <i class={`fas fa-caret-${type === 'prev' ? 'left' : 'right'}`}></i>
          </span>
        )}
        {data.title}
      </div>
    );
  }
);

export const Prev = ({ id = 0 }: { id: number }) => {
  return <LinkArticle id={id} type="prev" />;
};

export const Next = ({ id = 0 }: { id: number }) => {
  return <LinkArticle id={id} type="next" />;
};
