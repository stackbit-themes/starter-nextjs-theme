import { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { sourcebitDataClient } from 'sourcebit-target-next';
import { hotContentReload } from 'sourcebit-target-next/hot-content-reload';

import type { PageProps } from '../../components/layouts';
import { BaseLayout } from '../../components/layouts/BaseLayout';
import { PostFeedLayout, Props as PostFeedLayoutProps } from '../../components/layouts/PostFeedLayout';
import { mapProps as mapPostFeedLayoutProps } from '../../components/layouts/PostFeedLayout/mapProps';
import {
    BLOG_URL,
    findPostLayouts,
    findPostFeedLayout,
    findAndSortAllPost,
    getPagedPathsForPagePath,
    getPaginationDataForPagePath,
    toPageProps
} from '../../utils/static-resolver-utils';

export type Props = PageProps<PostFeedLayoutProps>;

const Page: FC<Props> = (props) => {
    const { page, site } = props;
    return (
        <BaseLayout site={site} page={page}>
            <PostFeedLayout {...page} annotateFields={true} />
        </BaseLayout>
    );
};

const withHotContentReload = hotContentReload({ disable: process.env.NODE_ENV === 'production' });
export default withHotContentReload(Page);

const DEFAULT_NUM_OF_POSTS_PER_PAGE = 10;

/**
 * Returns URL paths for the paginated blog pages in the '/blog/page/{N}' format.
 * The 'N' is the page number starting with 2. The URL path of the first page is
 * always the '/blog'.
 *
 * @example
 * If `numOfPostsPerPage` is 4, and there are 10 pages of type `PostLayout`,
 * this function will return following URL paths:
 * ['/blog', '/blog/2', '/blog/3']
 */
export const getStaticPaths: GetStaticPaths = async () => {
    const data = await sourcebitDataClient.getData();
    const documents = data.objects;
    const postFeedLayout = findPostFeedLayout(documents);
    if (!postFeedLayout) {
        return { paths: [], fallback: false };
    }
    const allPosts = findPostLayouts(documents);
    const numOfItemsPerPage = postFeedLayout.numOfPostsPerPage ?? DEFAULT_NUM_OF_POSTS_PER_PAGE;
    const paths = getPagedPathsForPagePath(BLOG_URL, allPosts, numOfItemsPerPage);
    return { paths, fallback: false };
};

/**
 * Returns props for a paginated blog page.
 *
 * @example
 * If `numOfPostsPerPage` is 4, and there are 10 pages of type `PostLayout`, and
 * the rendered page is '/blog/2', this method will return props for `PostFeedLayout`
 * with `PostLayout` items sorted by date at indexes 4 to 7.
 *
 * @param params
 */
export const getStaticProps: GetStaticProps<Props, { slug: string[] }> = async ({ params }) => {
    const data = await sourcebitDataClient.getData();
    const documents = data.objects;
    const pageNumber = (params?.slug || []).join('/');
    const urlPath = BLOG_URL + (pageNumber ? `/${pageNumber}` : '');
    const { __metadata, ...postFeedLayout } = findPostFeedLayout(documents)!;
    const allPostsSorted = findAndSortAllPost(documents);
    const numOfItemsPerPage = postFeedLayout.numOfPostsPerPage ?? DEFAULT_NUM_OF_POSTS_PER_PAGE;
    const paginationData = getPaginationDataForPagePath(urlPath, allPostsSorted, numOfItemsPerPage);
    const postFeedLayoutProps = await mapPostFeedLayoutProps(
        {
            __metadata,
            ...postFeedLayout,
            ...paginationData
        },
        documents
    );
    const props = toPageProps(postFeedLayoutProps, urlPath, documents);
    return { props };
};
