/* @flow */
import { emit } from '@core/action/effects';
import React, { Fragment, useEffect } from 'react';
import { withStyle } from '@core/container';
import { useLinkTo, usePathSelector } from '@core/hooks';
import { useDispatch } from 'react-redux';
import { getTagById } from '@src/libraries/axios-manager';
import { map, isEmpty, contains, forEach, pipe, join } from 'ramda';
import styles from './tag.scss';

const Tag = (React.memo: any)(
  withStyle(styles)(({ id, name }) => {
    const linkTo = useLinkTo();
    return (
      <span onClick={linkTo(`/tag/${id}`)} styleName="tag">
        #{name}{' '}
      </span>
    );
  })
);

/**
 * Tags
 * @desc Tag列表
 * @requires
 * @property {Array<number>} list tag id列表 from jsx
 * @example
 *   <Tags list={[100,111,112]}/>
 */
export default ({ list }: { list: Array<number> }) => {
  if (isEmpty(list)) return null;
  const dispatch = useDispatch();
  const { data, tagList } = usePathSelector('wp-tags', {});

  /* 檢查是否每個id都有資料 */
  useEffect(() => {
    if (!isEmpty(data)) {
      forEach(id => {
        if (!contains(id, tagList)) {
          dispatch(getTagById(id));
        }
      }, list);
    }
  }, [data]);

  return (
    <Fragment>
      關鍵字：
      {map(id => {
        return data[id] && data[id].enable ? (
          <Tag key={`tag-${id}`} id={id} name={data[id].name} />
        ) : null;
      }, list)}
    </Fragment>
  );
};

export const tagList = (list: Array<number>) => {
  if (isEmpty(list)) return '';
  const dispatch = useDispatch();
  const { data, tagList } = usePathSelector('wp-tags', {});

  /* 檢查是否每個id都有資料 */
  useEffect(() => {
    if (!isEmpty(data)) {
      forEach(id => {
        if (!contains(id, tagList)) {
          dispatch(getTagById(id));
        }
      }, list);
    }
  }, [data]);

  return !isEmpty(data) && !isEmpty(tagList)
    ? pipe(
        map(id => data[id].name),
        join(',')
      )(list)
    : '';
};
