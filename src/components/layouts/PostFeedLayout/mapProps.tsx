import type * as types from 'types';

import { resolvePostLayout } from '../../../utils/static-resolver-utils';
import { mapSectionProps } from '../../sections/mapSectionProps';
import type { Props as PostFeedLayoutProps } from './index';

export const mapProps = async (
    postFeedLayout: types.PostFeedLayout & types.Pagination<types.PostLayout>,
    allDocuments: types.DocumentTypes[]
): Promise<PostFeedLayoutProps> => {
    const items = postFeedLayout.items.map((post) => {
        return resolvePostLayout(post, allDocuments);
    });

    return {
        ...postFeedLayout,
        items,
        topSections: await mapSectionProps(postFeedLayout.topSections ?? [], allDocuments),
        bottomSections: await mapSectionProps(postFeedLayout.bottomSections ?? [], allDocuments)
    };
};
