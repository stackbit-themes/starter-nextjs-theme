import * as React from 'react';
import classNames from 'classnames';
import { toFieldPath, getFieldPath, StackbitFieldPath } from '@stackbit/annotations';
import type * as types from 'types';

export type Props = types.ImageBlock & { className?: string } & StackbitFieldPath;

export const ImageBlock: React.FC<Props> = (props) => {
    const { elementId, className, url, altText = '' } = props;
    if (!url) {
        return null;
    }
    const annotationPrefix = getFieldPath(props);
    const annotations = annotationPrefix
        ? [annotationPrefix, `${annotationPrefix}.url#@src`, `${annotationPrefix}.altText#@alt`, `${annotationPrefix}.elementId#@id`]
        : [];
    return (
        <img
            id={elementId || undefined}
            className={classNames('sb-component', 'sb-component-block', 'sb-component-image-block', className)}
            src={url}
            alt={altText}
            {...toFieldPath(...annotations)}
        />
    );
};
