import type * as types from 'types';

import { resolvePostLayout } from '../../../utils/static-resolver-utils';
import { mapSectionProps } from '../../sections/mapSectionProps';
import type { Props as PostLayoutProps } from './index';

export const mapProps = async (post: types.PostLayout, allDocuments: types.DocumentTypes[]): Promise<PostLayoutProps> => {
    return {
        ...resolvePostLayout(post, allDocuments),
        bottomSections: await mapSectionProps(post.bottomSections ?? [], allDocuments)
    };
};
