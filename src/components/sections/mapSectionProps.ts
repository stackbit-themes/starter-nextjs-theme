import type * as types from 'types';

import { Props as FeaturedPostsSectionProps } from './FeaturedPostsSection';
import { Props as RecentPostsSectionProps } from './RecentPostsSection';
import { Props as FeaturedPeopleSectionProps } from './FeaturedPeopleSection';
import { mapProps as mapFeaturedPeopleSectionProps } from './FeaturedPeopleSection/mapProps';
import { mapProps as mapFeaturedPostsSectionProps } from './FeaturedPostsSection/mapProps';
import { mapProps as mapRecentPostsSectionProps } from './RecentPostsSection/mapProps';
import { mapProps as mapFormBlockProps } from '../blocks/FormBlock/mapProps';

export type SectionsProps =
    | Exclude<types.Sections, types.RecentPostsSection | types.FeaturedPostsSection | types.FeaturedPeopleSection>
    | RecentPostsSectionProps
    | FeaturedPostsSectionProps
    | FeaturedPeopleSectionProps;

export const mapSectionProps = async (sections: types.Sections[] = [], allDocuments: types.DocumentTypes[]): Promise<SectionsProps[]> => {
    return Promise.all(
        (sections ?? []).map(async (section) => {
            switch (section.type) {
                case 'FeaturedPostsSection':
                    return mapFeaturedPostsSectionProps(section, allDocuments);
                case 'RecentPostsSection':
                    return mapRecentPostsSectionProps(section, allDocuments);
                case 'FeaturedPeopleSection':
                    return mapFeaturedPeopleSectionProps(section, allDocuments);
                case 'HeroSection':
                    if (section.media?.type !== 'FormBlock') {
                        return section;
                    }
                    return {
                        ...section,
                        media: await mapFormBlockProps(section.media)
                    };
                case 'ContactSection':
                    if (!section.form) {
                        return section;
                    }
                    return {
                        ...section,
                        form: await mapFormBlockProps(section.form)
                    };
                default:
                    return section;
            }
        })
    );
};
