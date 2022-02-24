import { SignJWT } from 'jose/jwt/sign';
import crypto from 'crypto';

import {
    getRootPagePath,
    resolveReferences,
    getAllPostsSorted,
    getAllCategoryPostsSorted,
    getAllAuthorPostsSorted,
    getPagedItemsForPage,
    mapDeepAsync
} from './data-utils';

export function resolveStaticProps(urlPath, data) {
    // get root path of paged path: /blog/page/2 => /blog
    const rootUrlPath = getRootPagePath(urlPath);
    const { __metadata, ...rest } = data.pages.find((page) => page.__metadata.urlPath === rootUrlPath);
    const props = {
        page: {
            __metadata: {
                ...__metadata,
                // override urlPath in metadata with paged path: /blog => /blog/page/2
                urlPath
            },
            ...rest
        },
        ...data.props
    };
    return mapDeepAsync(
      props,
      async (value, keyPath, stack) => {
          const objectType = value?.type || value?.layout;
          if (objectType && StaticPropsResolvers[objectType]) {
              const resolver = StaticPropsResolvers[objectType];
              return resolver(value, data, { keyPath, stack });
          }
          return value;
      },
      { postOrder: true }
    );
}

const StaticPropsResolvers = {
    PostLayout: (props, data, debugContext) => {
        return resolveReferences(props, ['author', 'category'], data.objects, debugContext);
    },
    PostFeedLayout: (props, data) => {
        const numOfPostsPerPage = props.numOfPostsPerPage ?? 10;
        const allPosts = getAllPostsSorted(data.objects);
        const paginationData = getPagedItemsForPage(props, allPosts, numOfPostsPerPage);
        const items = resolveReferences(paginationData.items, ['author', 'category'], data.objects);
        return {
            ...props,
            ...paginationData,
            items
        };
    },
    PostFeedCategoryLayout: (props, data) => {
        const categoryId = props.__metadata?.id;
        const numOfPostsPerPage = props.numOfPostsPerPage ?? 10;
        const allCategoryPosts = getAllCategoryPostsSorted(data.objects, categoryId);
        const paginationData = getPagedItemsForPage(props, allCategoryPosts, numOfPostsPerPage);
        const items = resolveReferences(paginationData.items, ['author', 'category'], data.objects);
        return {
            ...props,
            ...paginationData,
            items
        };
    },
    Person: (props, data) => {
        const authorId = props.__metadata?.id;
        const allAuthorPosts = getAllAuthorPostsSorted(data.objects, authorId);
        const paginationData = getPagedItemsForPage(props, allAuthorPosts, 10);
        const items = resolveReferences(paginationData.items, ['author', 'category'], data.objects);
        return {
            ...props,
            ...paginationData,
            items,
            layout: 'PostFeedLayout',
            postFeed: {
                showAuthor: true,
                showDate: true,
                variant: 'variant-d',
            }
        };
    },
    RecentPostsSection: (props, data) => {
        const allPosts = getAllPostsSorted(data.objects).slice(0, props.recentCount || 6);
        const recentPosts = resolveReferences(allPosts, ['author', 'category'], data.objects);
        return {
            ...props,
            posts: recentPosts
        };
    },
    FeaturedPostsSection: (props, data, debugContext) => {
        return resolveReferences(props, ['posts.author', 'posts.category'], data.objects, debugContext);
    },
    FeaturedPeopleSection: (props, data, debugContext) => {
        return resolveReferences(props, ['people'], data.objects, debugContext);
    },
    FormBlock: async (props) => {
        if (!props.destination) {
            return props;
        }
        if (!process.env.STACKBIT_CONTACT_FORM_SECRET) {
            console.error(`No STACKBIT_CONTACT_FORM_SECRET provided. It will not work properly for production build.`);
            return props;
        }
        const secretKey = crypto.createHash('sha256').update(process.env.STACKBIT_CONTACT_FORM_SECRET).digest();
        const destination = await new SignJWT({ email: props.destination }).setProtectedHeader({ alg: 'HS256' }).sign(secretKey);
        return {
            ...props,
            destination
        };
    }
};
