import path from 'path';
import * as types from 'types';

import { PageProps, AllPageLayoutProps } from '../components/layouts';

export const BLOG_URL = '/blog';
export const BLOG_AUTHOR_URL = `${BLOG_URL}/author`;
export const BLOG_CATEGORY_URL = `${BLOG_URL}/category`;

export function isNotNullable<T>(value: T | undefined): value is NonNullable<T> {
    return value !== undefined && value !== null;
}

export function findAndSortAllPost(documents: types.DocumentTypes[]) {
    return findPostLayouts(documents).sort(sortPostsByDateDesc);
}

export function findAndSortCategoryPosts(documents: types.DocumentTypes[], categoryId: string) {
    return findPostLayouts(documents)
        .filter((post) => post.category === categoryId)
        .sort(sortPostsByDateDesc);
}

export function findAndSortAuthorPosts(documents: types.DocumentTypes[], authorId: string) {
    return findPostLayouts(documents)
        .filter((post) => post.author === authorId)
        .sort(sortPostsByDateDesc);
}

export function sortPostsByDateDesc(postA: types.PostLayout, postB: types.PostLayout) {
    return new Date(postB.date).getTime() - new Date(postA.date).getTime();
}

export function findPageLayouts(documents: types.DocumentTypes[]) {
    return documents.filter(isPageLayout);
}

export function findPostLayouts(documents: types.DocumentTypes[]) {
    return documents.filter(isPostLayout);
}

export function findPeople(documents: types.DocumentTypes[]) {
    return documents.filter(isPerson);
}

export function findPostFeedLayout(documents: types.DocumentTypes[]) {
    return documents.find(isPostFeedLayout);
}

export function findConfig(documents: types.DocumentTypes[]) {
    return documents.find(isConfig);
}

export function isPageLayout(document: types.DocumentTypes): document is types.PageLayout {
    return document.type === 'PageLayout';
}

export function isPostLayout(document: types.DocumentTypes): document is types.PostLayout {
    return document.type === 'PostLayout';
}

export function isPerson(document: types.DocumentTypes): document is types.Person {
    return document.type === 'Person';
}

export function isBlogCategory(document: types.DocumentTypes): document is types.BlogCategory {
    return document.type === 'BlogCategory';
}

export function isPostFeedLayout(document: types.DocumentTypes): document is types.PostFeedLayout {
    return document.type === 'PostFeedLayout';
}

export function isAuthorFeedLayout(document: types.DocumentTypes): document is types.AuthorPostFeedLayout {
    return document.type === 'AuthorPostFeedLayout';
}

export function isCategoryFeedLayout(document: types.DocumentTypes): document is types.CategoryPostFeedLayout {
    return document.type === 'CategoryPostFeedLayout';
}

export function isConfig(document: types.DocumentTypes): document is types.Config {
    return document.type === 'Config';
}

export function toPageProps<T extends AllPageLayoutProps>(pageLayoutProps: T, urlPath: string, documents: types.DocumentTypes[]): PageProps<T> {
    const config = findConfig(documents)!;
    const pageCssClasses = cssClassesFromUrlPath(urlPath);

    return {
        site: {
            ...config,
            env: {
                ...(process?.env?.URL && { URL: process.env.URL })
            }
        },
        page: {
            ...pageLayoutProps,
            __metadata: {
                ...pageLayoutProps.__metadata,
                urlPath,
                pageCssClasses
            }
        } as T
    };
}

function cssClassesFromUrlPath(urlPath: string) {
    const parts = splitUrl(urlPath);
    let css = 'page';
    return parts.map((part) => {
        css += `-${part}`;
        return css;
    });
}

export function splitUrl(urlPath: string) {
    const cleanUrlPath = urlPath.replace(/^\/|\/$/g, '');
    return cleanUrlPath.split('/');
}

export function resolvePostLayout(postLayout: types.PostLayout, allDocuments: types.DocumentTypes[]): types.PostLayoutResolvedWithoutSections {
    const allPeople = allDocuments.filter(isPerson);
    const allCategories = allDocuments.filter(isBlogCategory);
    const { author: authorId, category: categoryId, __metadata, bottomSections, ...rest } = postLayout;
    const author = allPeople.find((doc) => doc.__metadata.id === authorId);
    const category = allCategories.find((doc) => doc.__metadata.id === categoryId);
    const authorPostFeedLayouts = allDocuments.filter(isAuthorFeedLayout);
    const authorPostFeedLayout = authorPostFeedLayouts.find((authorPostFeedLayout) => authorPostFeedLayout.author === authorId);
    const categoryPostFeedLayout = allDocuments.filter(isCategoryFeedLayout).find((categoryPostFeedLayout) => categoryPostFeedLayout.category === categoryId);
    return {
        __metadata: {
            ...__metadata,
            urlPath: urlPathForDocument(postLayout)
        },
        ...rest,
        ...(author && {
            author: {
                ...author,
                ...(authorPostFeedLayout ? { pageUrl: urlPathForDocument(authorPostFeedLayout) } : null)
            }
        }),
        ...(category && {
            category: {
                ...category,
                ...(categoryPostFeedLayout ? { pageUrl: urlPathForDocument(categoryPostFeedLayout) } : null)
            }
        })
    };
}

/**
 * Takes a document and returns URL path for that document.
 * The URL path is inferred from the document's filepath relative to the source
 * folder this document was loaded from.
 *
 * The return URL path is always prefixed with forward slash. If file name is
 * 'index', it is not included in the URL path.
 *
 * For example, if the source folder for page documents is content/pages, and
 * a file representing a was loaded from content/pages/company/about.md, the
 * inferred URL path will be "/company/about"
 *
 * @param document
 */
export function urlPathForDocument(document: types.DocumentTypes) {
    const relSourcePath = document.__metadata.relSourcePath;
    const pathObject = path.posix.parse(relSourcePath);
    const parts = pathObject.dir.split(path.posix.sep).filter(Boolean);
    if (pathObject.name !== 'index') {
        parts.push(pathObject.name);
    }
    const urlPath = parts.join('/').toLowerCase();
    return '/' + urlPath;
}

/**
 * Takes URL path, collection of items to paginate, and number of items per page,
 * and returns array of paginated URL paths in the '.../page/{N}' form, where N
 * is the page number starting with 2. The first page is always the original
 * URL path.
 *
 * @example
 * getPagedPathsForPagePath('/blog', ['a', 'b', 'c', 'd', 'e', 'f', 'g'], 3)
 * => [
 *   '/blog',
 *   '/blog/2',
 *   '/blog/3'
 * ]
 *
 * @param pageUrlPath
 * @param items
 * @param numOfItemsPerPage
 */
export function getPagedPathsForPagePath(pageUrlPath: string, items: any[], numOfItemsPerPage: number) {
    if (numOfItemsPerPage === 0) {
        return [pageUrlPath];
    }
    const numOfPages = Math.ceil(items.length / numOfItemsPerPage) || 1;
    const paths = [];
    for (let i = 0; i < numOfPages; i++) {
        paths.push(i === 0 ? pageUrlPath : `${pageUrlPath}/page/${i + 1}`);
    }
    return paths;
}

/**
 * Takes paginated URL path in the '.../page/{N}' form, collection of items,
 * and number of items per page, and returns the Pagination object with items
 * matching the page number specified in the URL path.
 *
 * The first page should not have '.../page/{N}'
 *
 * @example
 * getPaginationDataForPagePath('/blog/page/2', ['a', 'b', 'c', 'd', 'e', 'f', 'g'], 3)
 * => {
 *     pageIndex: 1,
 *     baseUrlPath: '/blog'
 *     numOfPages: 3,
 *     numOfTotalItems: 7,
 *     items: ['d', 'e', 'f']
 * }
 *
 * @param pageUrlPath Paginated URL path in the '.../page/{N}' form
 * @param items Array of items to paginate
 * @param numOfItemsPerPage Number of items per page
 */
export function getPaginationDataForPagePath<T>(pageUrlPath: string, items: T[], numOfItemsPerPage: number): types.Pagination<T> {
    const baseUrlPath = getRootPagePath(pageUrlPath);
    if (numOfItemsPerPage === 0) {
        return {
            pageIndex: 0,
            baseUrlPath,
            numOfPages: 1,
            numOfTotalItems: items.length,
            items: items
        };
    }
    const pageIndexMatch = pageUrlPath.match(/\/page\/(\d+)$/);
    const pageIndex = pageIndexMatch ? parseInt(pageIndexMatch[1]) - 1 : 0;
    const numOfPages = Math.ceil(items.length / numOfItemsPerPage) || 1;
    const startIndex = pageIndex * numOfItemsPerPage;
    const endIndex = startIndex + numOfItemsPerPage;
    return {
        pageIndex,
        baseUrlPath,
        numOfPages: numOfPages,
        numOfTotalItems: items.length,
        items: items.slice(startIndex, endIndex)
    };
}

/**
 * Takes paginated URL path in the '.../page/{N}' form, and returns the base
 * URL path without the '/page/{N}' part.
 *
 * @example
 * getRootPagePath('/blog/page/3');
 * => '/blog'
 * getRootPagePath('/blog/category/react/page/2');
 * => '/blog/category/react'
 * getRootPagePath('/regular/page');
 * => '/regular/page'
 *
 * @param pagePath Paginated URL path in the '.../page/{N}' form
 */
export function getRootPagePath(pagePath: string) {
    const pagedPathMatch = pagePath.match(/\/page\/\d+$/);
    if (!pagedPathMatch) {
        return pagePath;
    }
    return pagePath.substring(0, pagedPathMatch.index);
}
