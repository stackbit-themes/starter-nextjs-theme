import * as React from 'react';
import classNames from 'classnames';
import { toFieldPath, pickDataAttrs } from '@stackbit/annotations';
import type * as types from 'types';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { Section } from '../Section';
import { Markdown } from '../../atoms/Markdown';

export type Props = types.QuoteSection;

export const QuoteSection: React.FC<Props> = (props) => {
    const { elementId, colors, quote, name, title, backgroundImage, styles = {} } = props;
    return (
        <Section
            elementId={elementId}
            className="sb-component-quote-section"
            colors={colors}
            backgroundImage={backgroundImage}
            styles={styles.self}
            {...pickDataAttrs(props)}
        >
            <blockquote>
                {quote && (
                    <Markdown
                        text={quote}
                        className={classNames('sb-markdown', 'text-3xl', 'sm:text-4xl', styles.quote ? mapStyles(styles.quote) : null)}
                        {...toFieldPath('.quote')}
                    />
                )}
                {(name || title) && (
                    <footer>
                        {name && (
                            <span
                                className={classNames('block', 'text-2xl', 'sm:text-3xl', styles.name ? mapStyles(styles.name) : null)}
                                {...toFieldPath('.name')}
                            >
                                {name}
                            </span>
                        )}
                        {title && (
                            <span
                                className={classNames('block', 'text-lg', 'mt-1.5', styles.title ? mapStyles(styles.title) : null)}
                                {...toFieldPath('.title')}
                            >
                                {title}
                            </span>
                        )}
                    </footer>
                )}
            </blockquote>
        </Section>
    );
};
