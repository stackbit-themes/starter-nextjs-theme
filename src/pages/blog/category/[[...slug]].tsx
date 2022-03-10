import { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { sourcebitDataClient } from 'sourcebit-target-next';
import { hotContentReload } from 'sourcebit-target-next/hot-content-reload';

import type { PageProps } from '../../../components/layouts';
import { BaseLayout } from '../../../components/layouts/BaseLayout';
import { PostFeedLayout, Props as PostFeedLayoutProps } from '../../../components/layouts/PostFeedLayout';
import { mapProps as mapPostFeedLayoutProps } from '../../../components/layouts/PostFeedLayout/mapProps';
import {
    BLOG_CATEGORY_URL,
    isCategoryFeedLayout,
    findPostLayouts,
    urlPathForDocument,
    isBlogCategory,
    getPagedPathsForPagePath,
    findAndSortCategoryPosts,
    getPaginationDataForPagePath,
    toPageProps
} from '../../../utils/static-resolver-utils';

export type Props = PageProps<PostFeedLayoutProps>;

const Page: FC<Props> = (props) => {
    const { page, site } = props;
    return (
        <BaseLayout site={site} page={page}>
            <PostFeedLayout {...page} />
        </BaseLayout>
    );
};

const withHotContentReload = hotContentReload({ disable: process.env.NODE_ENV === 'production' });
export default withHotContentReload(Page);

const DEFAULT_NUM_OF_POSTS_PER_PAGE = 10;

export const getStaticPaths: GetStaticPaths = async () => {
    const data = await sourcebitDataClient.getData();
    const documents = data.objects;
    const categoryPostFeedLayouts = documents.filter(isCategoryFeedLayout);
    const allPosts = findPostLayouts(documents);
    const paths = categoryPostFeedLayouts.reduce((paths: string[], categoryPostFeedLayout) => {
        const categoryId = categoryPostFeedLayout.category;
        const urlPath = urlPathForDocument(categoryPostFeedLayout);
        const numOfItemsPerPage = categoryPostFeedLayout.numOfPostsPerPage ?? DEFAULT_NUM_OF_POSTS_PER_PAGE;
        const categoryPosts = allPosts.filter((post) => post.category === categoryId);
        const categoryPaths = getPagedPathsForPagePath(urlPath, categoryPosts, numOfItemsPerPage);
        return paths.concat(categoryPaths);
    }, []);
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, { slug: string[] }> = async ({ params }) => {
    const data = await sourcebitDataClient.getData();
    const documents = data.objects;
    const urlPath = `${BLOG_CATEGORY_URL}/${params?.slug.join('/')}`;
    const categoryPostFeedLayout = documents
        .filter(isCategoryFeedLayout)
        .find((categoryPostFeedLayout) => urlPathForDocument(categoryPostFeedLayout) === urlPath)!;
    const category = documents.filter(isBlogCategory).find((category) => category.__metadata.id === categoryPostFeedLayout.category);
    const categoryPosts = category ? findAndSortCategoryPosts(documents, category.__metadata.id) : [];
    const numOfItemsPerPage = categoryPostFeedLayout.numOfPostsPerPage ?? DEFAULT_NUM_OF_POSTS_PER_PAGE;
    const paginationData = getPaginationDataForPagePath(urlPath, categoryPosts, numOfItemsPerPage);
    const postFeedLayoutProps = await mapPostFeedLayoutProps(
        {
            ...categoryPostFeedLayout,
            type: 'PostFeedLayout',
            ...paginationData
        },
        documents
    );
    const props = toPageProps(postFeedLayoutProps, urlPath, documents);
    return { props };
};
