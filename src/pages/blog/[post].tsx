import { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { sourcebitDataClient } from 'sourcebit-target-next';
import { hotContentReload } from 'sourcebit-target-next/hot-content-reload';

import type { PageProps } from '../../components/layouts';
import { BaseLayout } from '../../components/layouts/BaseLayout';
import { PostLayout, Props as PostLayoutProps } from '../../components/layouts/PostLayout';
import { BLOG_URL, findPostLayouts, urlPathForDocument, toPageProps } from '../../utils/static-resolver-utils';
import { mapProps as mapPostLayoutProps } from '../../components/layouts/PostLayout/mapProps';

export type Props = PageProps<PostLayoutProps>;

const Page: FC<Props> = (props) => {
    const { page, site } = props;
    return (
        <BaseLayout site={site} page={page}>
            <PostLayout {...page} />
        </BaseLayout>
    );
};

const withHotContentReload = hotContentReload({ disable: process.env.NODE_ENV === 'production' });
export default withHotContentReload(Page);

export const getStaticPaths: GetStaticPaths = async () => {
    const data = await sourcebitDataClient.getData();
    const documents = data.objects;
    const paths = findPostLayouts(documents).map((post) => urlPathForDocument(post));
    return { paths: paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, { post: string }> = async ({ params }) => {
    const data = await sourcebitDataClient.getData();
    const documents = data.objects;
    const urlPath = `${BLOG_URL}/${params?.post}`;
    const post = findPostLayouts(documents).find((post) => urlPathForDocument(post) === urlPath)!;
    const postLayoutProps = await mapPostLayoutProps(post, documents);
    const props = toPageProps(postLayoutProps, urlPath, documents);
    return { props };
};
