import * as React from 'react';
import { toFieldPath } from '@stackbit/annotations';
import type * as types from 'types';

import { DynamicComponent } from '../../DynamicComponent';
import type { SectionsProps } from '../../sections/mapSectionProps';

export type Props = Omit<types.PageLayout, 'sections'> & {
    sections: SectionsProps[];
};

export const PageLayout: React.FC<Props> = (page) => {
    return (
        <main id="main" className="sb-layout sb-page-layout">
            {page.title && (
                <h1 className="sr-only" {...toFieldPath('title')}>
                    {page.title}
                </h1>
            )}
            {page.sections.length > 0 && (
                <div {...toFieldPath('sections')}>
                    {page.sections.map((section, index) => (
                        <DynamicComponent key={index} {...section} {...toFieldPath(`sections.${index}`)} />
                    ))}
                </div>
            )}
        </main>
    );
};
