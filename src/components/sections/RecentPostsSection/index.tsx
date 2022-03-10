import * as React from 'react';

import type * as types from 'types';
import { PostFeedSection, PostFeedSectionPostsProps } from '../PostFeedSection';

export type Props = types.RecentPostsSection & {
    posts: PostFeedSectionPostsProps[];
};

export const RecentPostsSection: React.FC<Props> = (props) => {
    return <PostFeedSection {...props} />;
};
