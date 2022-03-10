import * as React from 'react';
import classNames from 'classnames';
import { toFieldPath, pickDataAttrs } from '@stackbit/annotations';
import type * as types from 'types';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { Section } from '../Section';
import { Action } from '../../atoms/Action';
import { Markdown } from '../../atoms/Markdown';

export type Props = types.CtaSection;

export const CtaSection: React.FC<Props> = (props) => {
    const { elementId, colors, backgroundSize, backgroundImage, title, text, actions = [], styles = {} } = props;
    const sectionFlexDirection = styles.self?.flexDirection ?? 'row';
    const sectionAlignItems = styles.self?.alignItems ?? 'center';
    return (
        <Section
            elementId={elementId}
            className="sb-component-cta-section"
            colors={colors}
            backgroundSize={backgroundSize}
            backgroundImage={backgroundImage}
            styles={styles.self}
            {...pickDataAttrs(props)}
        >
            <div
                className={classNames('flex', mapFlexDirectionStyles(sectionFlexDirection), mapStyles({ alignItems: sectionAlignItems }), 'space-y-8', {
                    'lg:space-y-0 lg:space-x-8': sectionFlexDirection === 'row'
                })}
            >
                <CtaBody title={title} text={text} styles={styles} />
                <CtaActions actions={actions} styles={styles} />
            </div>
        </Section>
    );
};

type CtaBodyProps = {
    title?: string;
    text?: string;
    styles?: types.Styles;
};

const CtaBody: React.FC<CtaBodyProps> = (props) => {
    const { title, text, styles = {} } = props;
    if (!title && !text) {
        return null;
    }
    return (
        <div className="w-full lg:flex-grow">
            {title && (
                <h2 className={classNames(styles.title ? mapStyles(styles.title) : null)} {...toFieldPath('.title')}>
                    {title}
                </h2>
            )}
            {text && (
                <Markdown
                    text={text}
                    className={classNames('sb-markdown', 'sm:text-lg', styles.text ? mapStyles(styles.text) : null, {
                        'mt-4': title
                    })}
                    {...toFieldPath('.text')}
                />
            )}
        </div>
    );
};

type CtaActionsProps = {
    actions?: types.Action[];
    styles?: types.Styles;
};

const CtaActions: React.FC<CtaActionsProps> = (props) => {
    const { actions = [], styles = {} } = props;
    if (actions.length === 0) {
        return null;
    }
    return (
        <div className={classNames('w-full', { 'lg:w-auto': styles.self?.flexDirection === 'row' })}>
            <div className="overflow-x-hidden">
                <div
                    className={classNames('flex', 'flex-wrap', 'items-center', '-mx-2', 'lg:flex-nowrap', styles.actions ? mapStyles(styles.actions) : null)}
                    {...toFieldPath('.actions')}
                >
                    {actions.map((action, index) => (
                        <Action key={index} {...action} className="mx-2 mb-3 lg:whitespace-nowrap" {...toFieldPath(`.${index}`)} />
                    ))}
                </div>
            </div>
        </div>
    );
};

function mapFlexDirectionStyles(flexDirection: string) {
    switch (flexDirection) {
        case 'row':
            return ['flex-col', 'lg:flex-row', 'lg:justify-between'];
        case 'col':
            return ['flex-col'];
        default:
            return null;
    }
}
