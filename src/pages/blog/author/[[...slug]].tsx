import { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { sourcebitDataClient } from 'sourcebit-target-next';
import { hotContentReload } from 'sourcebit-target-next/hot-content-reload';

import type { PageProps } from '../../../components/layouts';
import { BaseLayout } from '../../../components/layouts/BaseLayout';
import { PostFeedLayout, Props as PostFeedLayoutProps } from '../../../components/layouts/PostFeedLayout';
import { mapProps as mapPostFeedLayoutProps } from '../../../components/layouts/PostFeedLayout/mapProps';
import {
    BLOG_AUTHOR_URL,
    isAuthorFeedLayout,
    findPostLayouts,
    urlPathForDocument,
    isPerson,
    getPagedPathsForPagePath,
    findAndSortAuthorPosts,
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
    const authorPostFeedLayouts = documents.filter(isAuthorFeedLayout);
    const allPosts = findPostLayouts(documents);
    const paths = authorPostFeedLayouts.reduce((paths: string[], authorPostFeedLayout) => {
        const authorId = authorPostFeedLayout.author;
        const urlPath = urlPathForDocument(authorPostFeedLayout);
        const numOfItemsPerPage = authorPostFeedLayout.numOfPostsPerPage ?? DEFAULT_NUM_OF_POSTS_PER_PAGE;
        const authorPosts = allPosts.filter((post) => post.author === authorId);
        const authorPaths = getPagedPathsForPagePath(urlPath, authorPosts, numOfItemsPerPage);
        return paths.concat(authorPaths);
    }, []);
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, { slug: string[] }> = async ({ params }) => {
    const data = await sourcebitDataClient.getData();
    const documents = data.objects;
    const urlPath = `${BLOG_AUTHOR_URL}/${params?.slug.join('/')}`;
    const authorPostFeedLayout = documents.filter(isAuthorFeedLayout).find((authorPostFeedLayout) => urlPathForDocument(authorPostFeedLayout) === urlPath)!;
    const author = documents.filter(isPerson).find((person) => person.__metadata.id === authorPostFeedLayout.author);
    const authorPosts = author ? findAndSortAuthorPosts(documents, author.__metadata.id) : [];
    const numOfItemsPerPage = authorPostFeedLayout.numOfPostsPerPage ?? DEFAULT_NUM_OF_POSTS_PER_PAGE;
    const paginationData = getPaginationDataForPagePath(urlPath, authorPosts, numOfItemsPerPage);
    const postFeedLayoutProps = await mapPostFeedLayoutProps(
        {
            ...authorPostFeedLayout,
            type: 'PostFeedLayout',
            ...paginationData
        },
        documents
    );
    const props = toPageProps(postFeedLayoutProps, urlPath, documents);
    return { props };
};
