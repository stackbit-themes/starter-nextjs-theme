import type * as types from 'types';

import { findPostLayouts, isNotNullable, isPostLayout, resolvePostLayout } from '../../../utils/static-resolver-utils';
import type { Props as FeaturedPostsSectionProps } from './index';

export const mapProps = (section: types.FeaturedPostsSection, allDocuments: types.DocumentTypes[]): FeaturedPostsSectionProps => {
    const allPosts = findPostLayouts(allDocuments);
    const posts = section.posts
        .map((postId) => allPosts.find((post) => post.__metadata.id === postId))
        .filter(isNotNullable)
        .filter(isPostLayout)
        .map((post) => resolvePostLayout(post, allDocuments));

    return { ...section, posts };
};
