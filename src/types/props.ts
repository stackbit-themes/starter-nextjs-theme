import * as types from './index';

export type Pagination<T> = {
    pageIndex: number;
    baseUrlPath: string;
    numOfPages: number;
    numOfTotalItems: number;
    items: T[];
};

// explicitly omit 'bottomSections' and set it to 'never' to ensure that pages like
// PostFeedLayout that don't render post's sections will not be bundled with unused data
export type PostLayoutResolvedWithoutSections = Omit<types.PostLayout, 'author' | 'category' | 'bottomSections'> & {
    author?: PersonProps;
    category?: CategoryProps;
    bottomSections?: never;
};

export type PersonProps = types.Person & { pageUrl?: string };

export type CategoryProps = types.BlogCategory & { pageUrl?: string };
