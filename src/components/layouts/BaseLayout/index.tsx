import * as React from 'react';

import { DefaultBaseLayout } from './DefaultBaseLayout';
import { BlankBaseLayout } from './BlankBaseLayout';
import type { AllPageLayoutProps, PageProps } from '../index';

export const BaseLayout: React.FC<PageProps<AllPageLayoutProps>> = (props) => {
    const { page, site, children } = props;
    const layout = page.baseLayout ?? site.baseLayout;
    if (layout === 'BlankBaseLayout') {
        return (
            <BlankBaseLayout site={site} page={page}>
                {children}
            </BlankBaseLayout>
        );
    } else {
        return (
            <DefaultBaseLayout site={site} page={page}>
                {children}
            </DefaultBaseLayout>
        );
    }
};
