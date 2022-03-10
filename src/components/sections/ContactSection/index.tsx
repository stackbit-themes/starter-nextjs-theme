import * as React from 'react';
import classNames from 'classnames';
import { toFieldPath, pickDataAttrs } from '@stackbit/annotations';
import type * as types from 'types';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { Section } from '../Section';
import { FormBlock } from '../../blocks/FormBlock';
import { DynamicComponent } from '../../DynamicComponent';
import { Markdown } from '../../atoms/Markdown';

export type Props = types.ContactSection;

export const ContactSection: React.FC<Props> = (props) => {
    const { elementId, colors, backgroundSize, title, text, form, media, styles = {} } = props;
    const sectionFlexDirection = styles.self?.flexDirection ?? 'row';
    const sectionAlignItems = styles.self?.alignItems ?? 'center';
    return (
        <Section
            elementId={elementId}
            className="sb-component-contact-section"
            colors={colors}
            backgroundSize={backgroundSize}
            styles={styles.self}
            {...pickDataAttrs(props)}
        >
            <div
                className={classNames('flex', mapFlexDirectionStyles(sectionFlexDirection), mapStyles({ alignItems: sectionAlignItems }), 'space-y-8', {
                    'lg:space-y-0 lg:space-x-8': sectionFlexDirection === 'row',
                    'space-y-reverse lg:space-y-0 lg:space-x-8 lg:space-x-reverse': sectionFlexDirection === 'row-reverse',
                    'space-y-reverse': sectionFlexDirection === 'col-reverse'
                })}
            >
                <div className="flex-1 w-full">
                    <ContactBody title={title} text={text} styles={styles} />
                    {form && (
                        <div
                            className={classNames('sb-contact-section-form', {
                                'mt-12': title || text
                            })}
                        >
                            <FormBlock {...form} className="inline-block w-full max-w-screen-sm" {...toFieldPath('.form')} />
                        </div>
                    )}
                </div>
                {media && (
                    <div className="flex-1 w-full">
                        <DynamicComponent {...media} {...toFieldPath('.media')} />
                    </div>
                )}
            </div>
        </Section>
    );
};

type ContactBodyProps = {
    title?: string;
    text?: string;
    styles?: types.Styles;
};

const ContactBody: React.FC<ContactBodyProps> = (props) => {
    const { title, text, styles = {} } = props;
    return (
        <>
            {title && (
                <h2 className={classNames(styles.title ? mapStyles(styles.title) : null)} {...toFieldPath('.title')}>
                    {title}
                </h2>
            )}
            {text && (
                <Markdown
                    text={text}
                    className={classNames('sb-markdown', styles.text ? mapStyles(styles.text) : null, {
                        'mt-4': title
                    })}
                    {...toFieldPath('.text')}
                />
            )}
        </>
    );
};

function mapFlexDirectionStyles(flexDirection: string) {
    switch (flexDirection) {
        case 'row':
            return ['flex-col', 'lg:flex-row'];
        case 'row-reverse':
            return ['flex-col-reverse', 'lg:flex-row-reverse'];
        case 'col':
            return ['flex-col'];
        case 'col-reverse':
            return ['flex-col-reverse'];
        default:
            return null;
    }
}
