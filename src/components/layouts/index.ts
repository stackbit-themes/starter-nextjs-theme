import * as types from 'types';

import type { Props as PageLayoutProps } from './PageLayout';
import type { Props as PostLayoutProps } from './PostLayout';
import type { Props as PostFeedLayoutProps } from './PostFeedLayout';

export type AllPageLayoutProps = PageLayoutProps | PostLayoutProps | PostFeedLayoutProps;

export type Site = types.Config & { env?: Record<string, string>; baseLayout?: string };

export type PageProps<T extends AllPageLayoutProps> = {
    site: Site;
    page: T & { baseLayout?: string };
};
