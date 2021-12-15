import * as React from 'react';
import Markdown from 'markdown-to-jsx';
import classNames from 'classnames';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { getDataAttrs } from '../../../utils/get-data-attrs';

export default function QuoteSection(props) {
    const cssId = props.elementId || null;
    const colors = props.colors || 'colors-a';
    const sectionStyles = props.styles?.self || {};
    const sectionWidth = sectionStyles.width || 'wide';
    const sectionHeight = sectionStyles.height || 'auto';
    const sectionJustifyContent = sectionStyles.justifyContent || 'center';
    return (
        <div
            id={cssId}
            {...getDataAttrs(props)}
            className={classNames(
                'sb-component',
                'sb-component-section',
                'sb-component-quote-section',
                colors,
                'flex',
                'flex-col',
                'justify-center',
                'relative',
                mapMinHeightStyles(sectionHeight),
                sectionStyles.margin,
                sectionStyles.padding || 'py-12 px-4',
                sectionStyles.borderColor,
                sectionStyles.borderStyle ? mapStyles({ borderStyle: sectionStyles.borderStyle }) : 'border-none',
                sectionStyles.borderRadius ? mapStyles({ borderRadius: sectionStyles.borderRadius }) : null
            )}
            style={{
                borderWidth: sectionStyles.borderWidth ? `${sectionStyles.borderWidth}px` : null
            }}
        >
            {props.backgroundImage && quoteBackgroundImage(props.backgroundImage)}
            <div
                className={classNames(
                    'flex',
                    'relative',
                    'w-full',
                    mapStyles({ justifyContent: sectionJustifyContent })
                )}
            >
                <div className={classNames('w-full', mapMaxWidthStyles(sectionWidth))}>{quoteContent(props)}</div>
            </div>
        </div>
    );
}

function quoteBackgroundImage(image) {
    const imageUrl = image.url;
    if (!imageUrl) {
        return null;
    }
    const imageStyles = image.styles?.self || {};
    const imageOpacity = imageStyles.opacity || imageStyles.opacity === 0 ? imageStyles.opacity : 100;
    return (
        <div
            className="bg-cover bg-center block absolute inset-0"
            style={{
                backgroundImage: `url('${imageUrl}')`,
                opacity: imageOpacity * 0.01
            }}
        />
    );
}

function quoteContent(props) {
    const styles = props.styles || {};
    return (
        <blockquote>
            {props.quote && (
                <Markdown
                    options={{ forceBlock: true, forceWrapper: true }}
                    className={classNames('sb-markdown', 'text-3xl', 'sm:text-4xl', styles.quote ? mapStyles(styles.quote) : null)}
                    data-sb-field-path=".quote"
                >
                    {props.quote}
                </Markdown>
            )}
            {(props.name || props.title) && (
                <footer>
                    {props.name && (
                        <span
                            className={classNames('block', 'text-2xl', 'sm:text-3xl', styles.name ? mapStyles(styles.name) : null)}
                            data-sb-field-path=".name"
                        >
                            {props.name}
                        </span>
                    )}
                    {props.title && (
                        <span className={classNames('block', 'text-lg', 'mt-1.5', styles.title ? mapStyles(styles.title) : null)} data-sb-field-path=".title">
                            {props.title}
                        </span>
                    )}
                </footer>
            )}
        </blockquote>
    );
}

function mapMinHeightStyles(height) {
    switch (height) {
        case 'auto':
            return 'min-h-0';
        case 'screen':
            return 'min-h-screen';
    }
    return null;
}

function mapMaxWidthStyles(width) {
    switch (width) {
        case 'narrow':
            return 'max-w-screen-md';
        case 'wide':
            return 'max-w-screen-xl';
        case 'full':
            return 'max-w-full';
    }
    return null;
}
