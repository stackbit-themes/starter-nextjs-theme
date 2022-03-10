import * as React from 'react';
import classNames from 'classnames';
import { pickDataAttrs } from '@stackbit/annotations';
import type * as types from 'types';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { BackgroundImage } from '../../atoms/BackgroundImage';

export type Props = React.PropsWithChildren<{
    type?: string;
    elementId?: string;
    colors?: types.Colors;
    backgroundSize?: 'full' | 'inset';
    backgroundImage?: types.BackgroundImage;
    styles?: types.Styles;
    className?: string;
}>;

export const Section: React.FC<Props> = (props) => {
    const { backgroundSize = 'full', ...rest } = props;
    if (backgroundSize === 'inset') {
        return <SectionInset {...rest} />;
    } else {
        return <SectionFullWidth {...rest} />;
    }
};

export const SectionInset: React.FC<Props> = (props) => {
    const { elementId, className, colors = 'colors-a', backgroundImage, styles = {}, children } = props;
    return (
        <div
            id={elementId || undefined}
            {...pickDataAttrs(props)}
            className={classNames(
                'sb-component',
                'sb-component-section',
                className,
                'flex',
                mapStyles({ justifyContent: styles.justifyContent ?? 'center' }),
                styles.margin
            )}
        >
            <div
                className={classNames(
                    colors,
                    'flex',
                    'flex-col',
                    'justify-center',
                    'relative',
                    'w-full',
                    mapStyles({ width: styles.width ?? 'wide' }),
                    mapStyles({ height: styles.height ?? 'auto' }),
                    styles.padding ?? 'py-12 px-4',
                    styles.borderColor,
                    styles.borderStyle ? mapStyles({ borderStyle: styles.borderStyle }) : null,
                    styles.borderRadius ? mapStyles({ borderRadius: styles.borderRadius }) : null,
                    styles.boxShadow ? mapStyles({ boxShadow: styles.boxShadow }) : null
                )}
                style={{
                    borderWidth: styles.borderWidth ? `${styles.borderWidth}px` : undefined
                }}
            >
                {backgroundImage && <BackgroundImage {...backgroundImage} />}
                <div className="relative w-full">{children}</div>
            </div>
        </div>
    );
};

export const SectionFullWidth: React.FC<Props> = (props) => {
    const { elementId, className, colors = 'colors-a', backgroundImage, styles = {}, children } = props;
    return (
        <div
            id={elementId || undefined}
            {...pickDataAttrs(props)}
            className={classNames(
                'sb-component',
                'sb-component-section',
                className,
                colors,
                'flex',
                'flex-col',
                'justify-center',
                'relative',
                mapStyles({ height: styles.height ?? 'auto' }),
                styles.margin,
                styles.padding ?? 'py-12 px-4',
                styles.borderColor,
                styles.borderStyle ? mapStyles({ borderStyle: styles.borderStyle }) : null,
                styles.borderRadius ? mapStyles({ borderRadius: styles.borderRadius }) : null,
                styles.boxShadow ? mapStyles({ boxShadow: styles.boxShadow }) : null
            )}
            style={{
                borderWidth: styles.borderWidth ? `${styles.borderWidth}px` : undefined
            }}
        >
            {backgroundImage && <BackgroundImage {...backgroundImage} />}
            <div className={classNames('flex', 'w-full', mapStyles({ justifyContent: styles.justifyContent ?? 'center' }))}>
                <div className={classNames('relative', 'w-full', mapStyles({ width: styles.width ?? 'wide' }))}>{children}</div>
            </div>
        </div>
    );
};
