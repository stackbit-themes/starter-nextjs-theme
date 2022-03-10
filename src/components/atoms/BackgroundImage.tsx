import * as React from 'react';
import classNames from 'classnames';
import { mapStylesToClassNames as mapStyles } from '../../utils/map-styles-to-class-names';
import type * as types from 'types';

export type Props = types.BackgroundImage & { className?: string };

export const BackgroundImage: React.FC<Props> = (props) => {
    const { url, className, backgroundSize, backgroundPosition, backgroundRepeat, opacity } = props;
    if (!url) {
        return null;
    }
    return (
        <div
            className={classNames(
                'absolute',
                'inset-0',
                mapStyles({
                    backgroundSize: backgroundSize ?? 'cover',
                    backgroundPosition: backgroundPosition ?? 'center',
                    backgroundRepeat: backgroundRepeat ?? 'no-repeat'
                }),
                className
            )}
            style={{
                backgroundImage: `url('${url}')`,
                opacity: (opacity ?? 100) * 0.01
            }}
        />
    );
};
