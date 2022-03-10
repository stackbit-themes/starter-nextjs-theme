import * as React from 'react';
import classNames from 'classnames';
import { toFieldPath, pickDataAttrs, StackbitFieldPath } from '@stackbit/annotations';
import type * as types from 'types';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { Action } from '../../atoms/Action';
import { ImageBlock } from '../../blocks/ImageBlock';
import { Markdown } from '../../atoms/Markdown';

export type Props = types.FeaturedItem & StackbitFieldPath;

export const FeaturedItem: React.FC<Props> = (props) => {
    const { elementId, title, subtitle, text, featuredImage, actions = [], enableHover, styles = {} } = props;
    const { self = {} } = styles;
    const { borderWidth, ...otherStyles } = self;
    return (
        <article
            id={elementId || undefined}
            className={classNames(
                'sb-component',
                'sb-component-block',
                'sb-component-item',
                enableHover ? 'sb-component-item-hover' : null,
                mapStyles(otherStyles)
            )}
            style={{
                borderWidth: borderWidth ? `${borderWidth}px` : undefined
            }}
            {...pickDataAttrs(props)}
        >
            {featuredImage && (
                <div className="mb-6">
                    <ImageBlock {...featuredImage} className="inline-block" {...toFieldPath('.featuredImage')} />
                </div>
            )}
            {title && (
                <h3 className={classNames(styles.title ? mapStyles(styles.title) : null)} {...toFieldPath('.title')}>
                    {title}
                </h3>
            )}
            {subtitle && (
                <p
                    className={classNames('text-lg', styles.subtitle ? mapStyles(styles.subtitle) : null, {
                        'mt-1': title
                    })}
                    {...toFieldPath('.subtitle')}
                >
                    {subtitle}
                </p>
            )}
            {text && (
                <Markdown
                    text={text}
                    {...toFieldPath('.text')}
                    className={classNames('sb-markdown', {
                        'mt-4': title || subtitle
                    })}
                />
            )}
            <ItemActions actions={actions} textAlign={otherStyles.textAlign} hasTopMargin={!!(title || subtitle || text)} />
        </article>
    );
};

type ItemActionsProps = {
    actions?: types.Action[];
    textAlign?: string;
    hasTopMargin?: boolean;
};

const ItemActions: React.FC<ItemActionsProps> = (props) => {
    const { actions = [], textAlign, hasTopMargin } = props;
    if (actions.length === 0) {
        return null;
    }
    return (
        <div
            className={classNames('overflow-x-hidden', {
                'mt-6': hasTopMargin
            })}
        >
            <div
                className={classNames('flex', 'flex-wrap', 'items-center', '-mx-2', {
                    'justify-center': textAlign === 'center',
                    'justify-end': textAlign === 'right'
                })}
                {...toFieldPath('.actions')}
            >
                {actions.map((action, index) => (
                    <Action key={index} {...action} className="mx-2 mb-3 lg:whitespace-nowrap" {...toFieldPath(`.${index}`)} />
                ))}
            </div>
        </div>
    );
};
