import * as React from 'react';
import classNames from 'classnames';
import { toFieldPath, getFieldPath, StackbitFieldPath } from '@stackbit/annotations';
import type * as types from 'types';

import { mapStylesToClassNames as mapStyles } from '../../utils/map-styles-to-class-names';

export type Props = types.Badge & StackbitFieldPath & { className?: string };

export const Badge: React.FC<Props> = (props) => {
    const { elementId, className, label, styles = {} } = props;
    if (!label) {
        return null;
    }
    const fieldPath = getFieldPath(props);
    const annotations = fieldPath ? [fieldPath, `${fieldPath}.elementId#@id`] : [];
    return (
        <div
            id={elementId || undefined}
            className={classNames('sb-component', 'sb-component-block', 'sb-component-badge', className, styles.self ? mapStyles(styles.self) : null)}
            {...toFieldPath(...annotations)}
        >
            <span {...toFieldPath('.label')}>{label}</span>
        </div>
    );
};
