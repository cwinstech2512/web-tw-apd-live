/* @flow */
import React from 'react';
import { usePathSelector } from '@core/hooks';
import { withStyle } from '@core/container';
import SectionListItem from './section-list';
import SectionListItemPc from './section-list-pc';
import SectionListSmItem from './section-list-sm';
import SectionBigPic from './section-big-pic';
import SectionBigPicPc from './section-big-pic-pc';
import SectionBlock from './section-block';
import SectionBlockPc from './section-block-pc';
import SectionText from './section-text';
import MainTitle from '@src/dist/shared/gear/main-title';
import { EmptyResult } from '@src/dist/shared/gear/error-block';
import BtnMore from '@src/dist/shared/gear/btn-more';
import { times, isEmpty, tail } from 'ramda';
import c_styles from './section-c.scss';
import e_styles from './section-e.scss';

/**
 * SectionA
 * @desc 文章列表
 * @requires
 * @property {Array<number>} list 文章id列表 from jsx
 * @property {number} [max=5] 列表個數 from jsx
 * @property {string} [highlight=''] 關鍵字 from jsx
 * @example
 *   <SectionA list={[100,111,112]} max={10} highlight="keyword"/>
 */
export const SectionA = ({
  list,
  max = 5,
  highlight = ''
}: {
  list: Array<number>,
  max?: number,
  highlight?: string
}) => {
  if (isEmpty(list)) return null;

  const posts = usePathSelector('wp-posts.posts', {});

  if (list.length < max) max = list.length;

  return (
    <div>
      {times(
        idx => (
          <SectionListItem
            key={`section-${list[idx]}`}
            {...posts[list[idx]]}
            id={list[idx]}
            highlight={highlight}
          />
        ),
        max
      )}
    </div>
  );
};

/**
 * SectionB
 * @desc 文章列表（第一張圖）
 * @requires
 * @property {Array<number>} list 文章id列表 from jsx
 * @property {number} [max=5] 列表個數 from jsx
 * @example
 *   <SectionB list={[100,111,112]} max={10} />
 */
export const SectionB = ({
  list,
  max = 5
}: {
  list: Array<number>,
  max?: number
}) => {
  if (isEmpty(list)) return null;

  const posts = usePathSelector('wp-posts.posts', {});

  if (list.length < max) max = list.length;

  return (
    <div>
      <SectionBigPic {...posts[list[0]]} />
      {times(
        idx => (
          <SectionListSmItem
            key={`section-${list[idx + 1]}`}
            {...posts[list[idx + 1]]}
            id={list[idx + 1]}
          />
        ),
        max - 1
      )}
    </div>
  );
};

/**
 * SectionC
 * @desc 文章列表(區塊)
 * @requires
 * @property {Array<number>} list 文章id列表 from jsx
 * @property {number} [max=4] 列表個數 from jsx
 * @example
 *   <SectionC list={[100,111,112]} max={10} />
 */
export const SectionC = withStyle(c_styles)(
  ({ list, max = 4 }: { list: Array<number>, max?: number }) => {
    if (isEmpty(list)) return null;

    const posts = usePathSelector('wp-posts.posts', {});

    if (list.length < max) max = list.length;

    return (
      <div styleName="section">
        {times(
          idx => (
            <SectionBlock
              key={`section-${list[idx]}`}
              {...posts[list[idx]]}
              id={list[idx]}
            />
          ),
          max
        )}
      </div>
    );
  }
);

/**
 * SectionD
 * @desc 文章列表(標題、無圖片)
 * @requires
 * @property {Array<number>} list 文章id列表 from jsx
 * @property {number} [max=4] 列表個數 from jsx
 * @property {string} [highlight=''] 關鍵字 from jsx
 * @example
 *   <SectionD list={[100,111,112]} max={10} highlight="keyword"/>
 */
export const SectionD = ({
  list,
  max = 4,
  highlight = ''
}: {
  list: Array<number>,
  max?: number,
  highlight: string
}) => {
  if (isEmpty(list)) return null;
  const posts = usePathSelector('wp-posts.posts', {});

  if (list.length < max) max = list.length;

  return (
    <div style={{ marginTop: '-8px' }}>
      {times(
        idx => (
          <SectionText
            key={`section-${list[idx]}`}
            {...posts[list[idx]]}
            id={list[idx]}
            highlight={highlight}
          />
        ),
        max
      )}
    </div>
  );
};

/**
 * SectionE
 * @desc 電腦版文章列表，三欄（第一張圖）
 * @requires
 * @property {Array<number>} list 文章id列表 from jsx
 * @property {string} title 類別標題 from jsx
 * @property {number} [max=21] 列表個數 from jsx
 * @property {string} [highlight=''] 關鍵字 from jsx
 * @property {string} [emptyTitle=''] 資料為空的錯誤訊息 from jsx
 * @property {number} [btnShowId=-1] 要不要顯示更多按鈕，
 *                                   -1為否，正數為秀出與連結 category id from jsx
 * @example
 *   <SectionE list={[100,111,112]} max={10} title="特別企劃"/>
 */
export const SectionE = withStyle(e_styles)(
  ({
    list,
    title = '',
    max = 21,
    btnShowId = -1,
    emptyTitle = '尚無文章',
    highlight = ''
  }: {
    list: Array<number>,
    title: string,
    max?: number,
    btnShowId?: number,
    emptyTitle: string,
    highlight: string
  }) => {
    const posts = usePathSelector('wp-posts.posts', {});

    if (list.length < max) max = list.length;
    const entire = Math.floor((max - 9) / 3);
    const remainder = (max - 9) % 3;
    const perCol =
      max <= 9
        ? [0, max <= 5 ? max - 1 : 4, max > 5 ? max - 5 : 0]
        : [
            entire + (remainder >= 1 ? 1 : 0),
            4 + entire + (remainder >= 2 ? 1 : 0),
            4 + entire
          ];

    return (
      <div styleName="section">
        <div>
          <MainTitle title={title} id={btnShowId !== -1 ? btnShowId : null} />
        </div>
        {isEmpty(list) ? (
          <EmptyResult title={emptyTitle} />
        ) : (
          <div styleName="row">
            <div styleName="col">
              <SectionBigPicPc {...posts[list[0]]} highlight={highlight} />
              {times(
                idx => (
                  <SectionListItemPc
                    key={`section-col1-${idx}`}
                    {...posts[list[idx + 1]]}
                    id={list[idx + 1]}
                    highlight={highlight}
                  />
                ),
                perCol[0]
              )}
            </div>
            <div styleName="col">
              {times(
                idx => (
                  <SectionListItemPc
                    key={`section-col2-${idx}`}
                    {...posts[list[idx + (1 + perCol[0])]]}
                    id={list[idx + (1 + perCol[0])]}
                    highlight={highlight}
                  />
                ),
                perCol[1]
              )}
            </div>
            <div styleName="col">
              {times(
                idx => (
                  <SectionListItemPc
                    key={`section-col3-${idx}`}
                    {...posts[list[idx + (1 + perCol[0] + perCol[1])]]}
                    id={list[idx + (1 + perCol[0] + perCol[1])]}
                    highlight={highlight}
                  />
                ),
                perCol[2]
              )}
              {btnShowId !== -1 ? (
                <div styleName="section-btn">
                  <BtnMore categoryId={'' + btnShowId} />
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    );
  }
);

/**
 * SectionF
 * @desc 電腦版文章列表，單欄
 * @requires
 * @property {Array<number>} list 文章id列表 from jsx
 * @property {number} [max=15] 列表個數 from jsx
 * @example
 *   <SectionF list={[100,111,112]} max={15} />
 */
export const SectionF = ({
  list,
  max = 15
}: {
  list: Array<number>,
  max?: number
}) => {
  if (isEmpty(list)) return null;

  const posts = usePathSelector('wp-posts.posts', {});

  if (list.length < max) max = list.length;

  return (
    <div>
      {times(
        idx => (
          <SectionListItemPc
            key={`section-${list[idx]}`}
            {...posts[list[idx]]}
            id={list[idx]}
          />
        ),
        max
      )}
    </div>
  );
};

/**
 * SectionG
 * @desc 電腦版文章列表(區塊)，三欄
 * @requires
 * @property {Array<number>} list 文章id列表 from jsx
 * @property {number} [max=6] 列表個數 from jsx
 * @example
 *   <SectionG list={[100,111,112]} max={6} />
 */
export const SectionG = withStyle(c_styles)(
  ({ list, max = 6 }: { list: Array<number>, max?: number }) => {
    if (isEmpty(list)) return null;

    const posts = usePathSelector('wp-posts.posts', {});

    if (list.length < max) max = list.length;

    return (
      <div styleName="section">
        {times(
          idx => (
            <SectionBlockPc
              key={`section-${list[idx]}`}
              {...posts[list[idx]]}
              id={list[idx]}
            />
          ),
          max
        )}
      </div>
    );
  }
);

/**
 * SectionH
 * @desc 電腦版文章列表，單欄（第一張圖）
 * @requires
 * @property {Array<number>} list 文章id列表 from jsx
 * @property {number} [max=15] 列表個數 from jsx
 * @example
 *   <SectionH list={[100,111,112]} max={15} />
 */
export const SectionH = ({
  list,
  max = 15
}: {
  list: Array<number>,
  max?: number
}) => {
  if (isEmpty(list)) return null;

  const posts = usePathSelector('wp-posts.posts', {});

  if (list.length < max) max = list.length;

  return (
    <div>
      <SectionBigPicPc {...posts[list[0]]} />
      {times(
        idx => (
          <SectionListItemPc
            key={`section-${list[idx]}`}
            {...posts[list[idx + 1]]}
            id={list[idx + 1]}
          />
        ),
        max - 1
      )}
    </div>
  );
};
