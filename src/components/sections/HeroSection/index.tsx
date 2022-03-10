import * as React from 'react';
import classNames from 'classnames';
import { toFieldPath, pickDataAttrs } from '@stackbit/annotations';
import type * as types from 'types';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { Section } from '../Section';
import { Action } from '../../atoms/Action';
import { Badge } from '../../atoms/Badge';
import { DynamicComponent } from '../../DynamicComponent';
import { Markdown } from '../../atoms/Markdown';

export type Props = types.HeroSection;

export const HeroSection: React.FC<Props> = (props) => {
    const { elementId, colors, badge, title, subtitle, text, media, actions = [], styles = {} } = props;
    const sectionFlexDirection = styles.self?.flexDirection ?? 'row';
    const sectionAlignItems = styles.self?.alignItems ?? 'center';
    return (
        <Section elementId={elementId} className="sb-component-hero-section" colors={colors} styles={styles.self} {...pickDataAttrs(props)}>
            <div
                className={classNames('flex', mapFlexDirectionStyles(sectionFlexDirection), mapStyles({ alignItems: sectionAlignItems }), 'space-y-8', {
                    'lg:space-y-0 lg:space-x-8': sectionFlexDirection === 'row',
                    'space-y-reverse lg:space-y-0 lg:space-x-8 lg:space-x-reverse': sectionFlexDirection === 'row-reverse',
                    'space-y-reverse': sectionFlexDirection === 'col-reverse'
                })}
            >
                <div className="flex-1 w-full">
                    <HeroBody badge={badge} title={title} subtitle={subtitle} text={text} styles={styles} />
                    <HeroActions actions={actions} styles={styles.actions} hasTopMargin={!!(badge?.label || title || subtitle || text)} />
                </div>
                {media && (
                    <div className="flex-1 w-full">
                        <DynamicComponent {...media} {...toFieldPath('.media')} />
                    </div>
                )}
            </div>
        </Section>
    );
};

type HeroBodyProps = {
    title?: string;
    subtitle?: string;
    badge?: types.Badge;
    text?: string;
    styles?: types.Styles;
};

const HeroBody: React.FC<HeroBodyProps> = (props) => {
    const { badge, title, subtitle, text, styles = {} } = props;
    return (
        <>
            {badge && <Badge {...badge} {...toFieldPath('.badge')} />}
            {title && (
                <h2
                    className={classNames('h1', styles.title ? mapStyles(styles.title) : null, {
                        'mt-4': badge?.label
                    })}
                    {...toFieldPath('.title')}
                >
                    {title}
                </h2>
            )}
            {subtitle && (
                <p
                    className={classNames('text-xl', 'sm:text-2xl', styles.subtitle ? mapStyles(styles.subtitle) : null, {
                        'mt-4': badge?.label || title
                    })}
                    {...toFieldPath('.subtitle')}
                >
                    {subtitle}
                </p>
            )}
            {text && (
                <Markdown
                    text={text}
                    className={classNames('sb-markdown', 'sm:text-lg', styles.text ? mapStyles(styles.text) : null, {
                        'mt-6': badge?.label || title || subtitle
                    })}
                    {...toFieldPath('.text')}
                />
            )}
        </>
    );
};

type HeroActionsProps = {
    actions?: types.Action[];
    hasTopMargin?: boolean;
    styles?: types.Styles;
};

const HeroActions: React.FC<HeroActionsProps> = (props) => {
    const { actions = [], styles = {}, hasTopMargin } = props;
    if (actions.length === 0) {
        return null;
    }
    return (
        <div
            className={classNames('overflow-x-hidden', {
                'mt-8': hasTopMargin
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

function mapFlexDirectionStyles(flexDirection: string) {
    switch (flexDirection) {
        case 'row':
            return ['flex-col', 'lg:flex-row'];
        case 'row-reverse':
            return ['flex-col-reverse', 'lg:flex-row-reverse'];
        case 'col':
            return ['flex-col'];
        case 'col-reverse':
            return ['flex-col-reverse'];
        default:
            return null;
    }
}
