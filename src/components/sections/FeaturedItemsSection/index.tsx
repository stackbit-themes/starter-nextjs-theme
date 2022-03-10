import * as React from 'react';
import classNames from 'classnames';
import { toFieldPath, pickDataAttrs } from '@stackbit/annotations';
import type * as types from 'types';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { Section } from '../Section';
import { Action } from '../../atoms/Action';
import { FeaturedItem } from './FeaturedItem';

export type Props = types.FeaturedItemsSection;

export const FeaturedItemsSection: React.FC<Props> = (props) => {
    const { elementId, colors, title, subtitle, actions = [], items = [], columns = 3, enableHover, styles = {} } = props;
    return (
        <Section elementId={elementId} className="sb-component-featured-items-section" colors={colors} styles={styles.self} {...pickDataAttrs(props)}>
            {title && (
                <h2 className={classNames(styles.title ? mapStyles(styles.title) : null)} {...toFieldPath('.title')}>
                    {title}
                </h2>
            )}
            {subtitle && (
                <p
                    className={classNames('text-lg', 'sm:text-xl', styles.subtitle ? mapStyles(styles.subtitle) : null, {
                        'mt-6': title
                    })}
                    {...toFieldPath('.subtitle')}
                >
                    {subtitle}
                </p>
            )}
            {items.length > 0 && (
                <div
                    className={classNames('grid', 'gap-6', 'lg:gap-8', mapColStyles(columns), {
                        'mt-12': title || subtitle
                    })}
                    {...toFieldPath('.items')}
                >
                    {items.map((item, index) => (
                        <FeaturedItem key={index} {...item} enableHover={enableHover} {...toFieldPath(`.${index}`)} />
                    ))}
                </div>
            )}
            <FeaturedItemsActions actions={actions} styles={styles.actions} hasTopMargin={!!(title || subtitle || items.length > 0)} />
        </Section>
    );
};

type FeaturedItemsActionsProps = {
    actions?: types.Action[];
    hasTopMargin?: boolean;
    styles?: types.Styles;
};

const FeaturedItemsActions: React.FC<FeaturedItemsActionsProps> = (props) => {
    const { actions = [], styles = {}, hasTopMargin } = props;
    if (actions.length === 0) {
        return null;
    }
    return (
        <div
            className={classNames('overflow-x-hidden', {
                'mt-12': hasTopMargin
            })}
        >
            <div className={classNames('flex', 'flex-wrap', 'items-center', '-mx-2', mapStyles(styles))} {...toFieldPath('.actions')}>
                {actions.map((action, index) => (
                    <Action key={index} {...action} className="mx-2 mb-3 lg:whitespace-nowrap" {...toFieldPath(`.${index}`)} />
                ))}
            </div>
        </div>
    );
};

function mapColStyles(columns: number) {
    switch (columns) {
        case 4:
            return 'md:grid-cols-4';
        case 3:
            return 'md:grid-cols-3';
        case 2:
            return 'md:grid-cols-2';
        default:
            return null;
    }
}
