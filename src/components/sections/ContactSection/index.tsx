import * as React from 'react';
import Markdown from 'markdown-to-jsx';
import classNames from 'classnames';

import { getComponent } from '../../components-registry';
import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { getDataAttrs } from '../../../utils/get-data-attrs';
import FormBlock from '../../molecules/FormBlock';

export default function ContactSection(props) {
    const cssId = props.elementId || null;
    const colors = props.colors || 'colors-a';
    const bgSize = props.backgroundSize || 'full';
    const sectionStyles = props.styles?.self || {};
    const sectionWidth = sectionStyles.width || 'wide';
    const sectionHeight = sectionStyles.height || 'auto';
    const sectionJustifyContent = sectionStyles.justifyContent || 'center';
    const sectionFlexDirection = sectionStyles.flexDirection || 'row';
    const sectionAlignItems = sectionStyles.alignItems || 'center';
    return (
        <div
            id={cssId}
            {...getDataAttrs(props)}
            className={classNames(
                'sb-component',
                'sb-component-section',
                'sb-component-contact-section',
                bgSize === 'inset' ? 'flex': null,
                bgSize === 'inset' ? mapStyles({ justifyContent: sectionJustifyContent }) : null,
                sectionStyles.margin
            )}
        >
            <div
                className={classNames(
                    colors,
                    'flex',
                    'flex-col',
                    'justify-center',
                    bgSize === 'inset' ? 'w-full': null,
                    bgSize === 'inset' ? mapMaxWidthStyles(sectionWidth) : null,
                    mapMinHeightStyles(sectionHeight),
                    sectionStyles.padding || 'py-12 px-4',
                    sectionStyles.borderColor,
                    sectionStyles.borderStyle ? mapStyles({ borderStyle: sectionStyles.borderStyle }) : 'border-none',
                    sectionStyles.borderRadius ? mapStyles({ borderRadius: sectionStyles.borderRadius }) : null,
                    sectionStyles.boxShadow ? mapStyles({ boxShadow: sectionStyles.boxShadow }) : null
                )}
                style={{
                    borderWidth: sectionStyles.borderWidth ? `${sectionStyles.borderWidth}px` : null
                }}
            >
                <div
                    className={classNames(
                        'w-full',
                        bgSize === 'full' ? 'flex': null,
                        bgSize === 'full' ? mapStyles({ justifyContent: sectionJustifyContent }) : null
                    )}
                >
                    <div
                        className={classNames(
                            'w-full',
                            bgSize === 'full' ? mapMaxWidthStyles(sectionWidth) : null
                        )}
                    >
                        <div
                            className={classNames(
                                'flex',
                                mapFlexDirectionStyles(sectionFlexDirection),
                                mapStyles({ alignItems: sectionAlignItems }),
                                'space-y-8',
                                {
                                    'lg:space-y-0 lg:space-x-8': sectionFlexDirection === 'row',
                                    'space-y-reverse lg:space-y-0 lg:space-x-8 lg:space-x-reverse': sectionFlexDirection === 'row-reverse',
                                    'space-y-reverse': sectionFlexDirection === 'col-reverse'
                                }
                            )}
                        >
                            <div className="flex-1 w-full">
                                {contactBody(props)}
                                {props.form && (
                                    <div className={classNames('sb-contact-section-form', { 'mt-12': props.title || props.text })}>
                                        <FormBlock {...props.form} className="inline-block w-full max-w-screen-sm" data-sb-field-path=".form" />
                                    </div>
                                )}
                            </div>
                            {props.media && (
                                <div className="flex-1 w-full">
                                    <div>{contactMedia(props.media)}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function contactMedia(media) {
    const mediaType = media.type;
    if (!mediaType) {
        throw new Error(`contact section media does not have the 'type' property`);
    }
    const Media = getComponent(mediaType);
    if (!Media) {
        throw new Error(`no component matching the contact section media type: ${mediaType}`);
    }
    return <Media {...media} data-sb-field-path=".media" />;
}

function contactBody(props) {
    const styles = props.styles || {};
    return (
        <>
            {props.title && (
                <h2 className={classNames(styles.title ? mapStyles(styles.title) : null)} data-sb-field-path=".title">
                    {props.title}
                </h2>
            )}
            {props.text && (
                <Markdown
                    options={{ forceBlock: true, forceWrapper: true }}
                    className={classNames('sb-markdown', styles.text ? mapStyles(styles.text) : null, { 'mt-4': props.title })}
                    data-sb-field-path=".text"
                >
                    {props.text}
                </Markdown>
            )}
        </>
    );
}

function mapMinHeightStyles(height) {
    switch (height) {
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

function mapFlexDirectionStyles(flexDirection) {
    switch (flexDirection) {
        case 'row':
            return ['flex-col', 'lg:flex-row'];
        case 'row-reverse':
            return ['flex-col-reverse', 'lg:flex-row-reverse'];
        case 'col':
            return ['flex-col'];
        case 'col-reverse':
            return ['flex-col-reverse'];
    }
    return null;
}
