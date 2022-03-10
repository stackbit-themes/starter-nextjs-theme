import type * as types from 'types';

import { findPostLayouts, resolvePostLayout, sortPostsByDateDesc } from '../../../utils/static-resolver-utils';
import type { Props as RecentPostsSectionProps } from './index';

export const mapProps = (section: types.RecentPostsSection, allDocuments: types.DocumentTypes[]): RecentPostsSectionProps => {
    const recentPosts = findPostLayouts(allDocuments)
        .sort(sortPostsByDateDesc)
        .slice(0, section.recentCount)
        .map((post) => resolvePostLayout(post, allDocuments));

    return { ...section, posts: recentPosts };
};
