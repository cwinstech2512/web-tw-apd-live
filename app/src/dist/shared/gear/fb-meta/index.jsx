import React, { Fragment } from 'react';
import { useEffect } from 'react';
import { append, isNil } from 'ramda';
import {Helmet, HelmetProvider} from "react-helmet-async";
import MetaTags from 'react-meta-tags';
const url = CONFIG.REMOTE.SHARE_URL;

/**
 * FbOgMeta
 * @desc FB Og Meta
 * @property {Object} post 文章資料 from jsx
 * @example
 *   <FbOgMeta post={post}/>
 */
export default ({ post = null }: { post: Object }) => {
  if (!post) return null;

  return (
      // <Fragment></Fragment>
        <MetaTags>
          <meta property="og:url" content={`${CONFIG.REMOTE.SHARE_URL}/post.php?id=${post ? post.id : ''}`} />
          <meta property="og:title" content={CONFIG.ENV.PROJECT_NAME} />
          <meta property="og:description" content={post.title} />
          <meta property="og:image" content={post.previewImg} /> 
        </MetaTags>
  );
};
