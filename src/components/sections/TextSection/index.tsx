import * as React from 'react';
import classNames from 'classnames';
import { toFieldPath, pickDataAttrs } from '@stackbit/annotations';
import type * as types from 'types';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { Section } from '../Section';
import { Markdown } from '../../atoms/Markdown';

export type Props = types.TextSection;

export const TextSection: React.FC<Props> = (props) => {
    const { elementId, colors, title, subtitle, text, styles = {} } = props;
    return (
        <Section elementId={elementId} className="sb-component-text-section" colors={colors} styles={styles.self} {...pickDataAttrs(props)}>
            {title && (
                <h2 className={classNames(styles.title ? mapStyles(styles.title) : null)} {...toFieldPath('.title')}>
                    {title}
                </h2>
            )}
            {subtitle && (
                <p
                    className={classNames('text-xl', 'sm:text-2xl', styles.subtitle ? mapStyles(styles.subtitle) : null, {
                        'mt-2': title
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
                        'mt-6': title || subtitle
                    })}
                    {...toFieldPath('.text')}
                />
            )}
        </Section>
    );
};
