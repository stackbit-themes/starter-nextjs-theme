import * as React from 'react';
import type * as types from 'types';

import { PostFeedSection, PostFeedSectionPostsProps } from '../PostFeedSection';

export type Props = Omit<types.FeaturedPostsSection, 'posts'> & {
    posts: PostFeedSectionPostsProps[];
};

export const FeaturedPostsSection: React.FC<Props> = (props) => {
    return <PostFeedSection {...props} annotatePosts={true} />;
};
