import * as React from 'react';
import classNames from 'classnames';
import { toFieldPath, getFieldPath, StackbitFieldPath } from '@stackbit/annotations';
import type * as types from 'types';

import { Link } from './Link';
import { iconMap } from '../svgs';

export type Props = (types.Link | types.Button) & StackbitFieldPath & { className?: string };

export const Action: React.FC<Props> = (props) => {
    const { type, elementId, className, label, altText, url, showIcon, icon, iconPosition = 'right' } = props;
    const IconComponent = icon ? iconMap[icon] : null;
    const annotationPrefix = getFieldPath(props);
    const annotations = annotationPrefix
        ? [annotationPrefix, `${annotationPrefix}.url#@href`, `${annotationPrefix}.altText#@aria-label`, `${annotationPrefix}.elementId#@id`]
        : [];
    const style = type === 'Button' ? props.style ?? 'primary' : undefined;

    return (
        <Link
            href={url}
            aria-label={altText}
            id={elementId}
            className={classNames(
                'sb-component',
                'sb-component-block',
                type === 'Link' ? 'sb-component-link' : 'sb-component-button',
                {
                    'sb-component-button-primary': style === 'primary',
                    'sb-component-button-secondary': style === 'secondary'
                },
                className
            )}
            {...toFieldPath(...annotations)}
        >
            {label && <span {...toFieldPath('.label')}>{label}</span>}
            {showIcon && IconComponent && (
                <IconComponent
                    {...toFieldPath('.icon')}
                    className={classNames('fill-current h-5 w-5', {
                        'order-first': iconPosition === 'left',
                        'mr-1.5': label && iconPosition === 'left',
                        'ml-1.5': label && iconPosition === 'right'
                    })}
                />
            )}
        </Link>
    );
};
